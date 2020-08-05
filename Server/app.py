from flask import Flask, render_template, request
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
import random
from datetime import date
import requests

app = Flask(__name__)
api = Api(app)

CORS(app)

# Configure db
app.config['MYSQL_HOST'] = 'sql12.freemysqlhosting.net' #''
app.config['MYSQL_DATABASE_PORT'] = '3306'
app.config['MYSQL_USER'] = 'sql12357873'
app.config['MYSQL_PASSWORD'] = 'NIxRwPMxy9'
app.config['MYSQL_DB'] = 'sql12357873'

mysql = MySQL(app)

@app.route('/', methods=['POST','GET'])
def index():
    return 'go and send data from angular file'


@app.route('/form', methods = ["POST"])
def form():
    thanaArray = ['Thana1', 'Thana2', 'Thana3', 'Thana4', 'Thana5', 'Thana6', 'Thana7']
    if request.method == 'POST':
        m = request.json
        randomThana = random.choice([0, 1, 2, 3, 4, 5, 6])
        inDoc = "INSERT INTO detail_of_complainant VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        inDoi = "INSERT INTO detail_of_incident VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        inDos = "INSERT INTO detail_of_suspect VALUES(%s,%s,%s,%s,%s,%s)"
        inDow = "INSERT INTO detail_of_witness VALUES(%s,%s,%s,%s,%s,%s)"
        inDe = "INSERT INTO detail_extra VALUES(%s,%s,%s,%s,%s,'Pending','','','','')"
        moble = m['docPhone']
        cur = mysql.connection.cursor()
        cur.execute(inDoc, (m['aadNum'], m['docName'], m['docFname'], m['docDob'], m['docNationality'], m['docIdType'], m['docIdNo'], m['docAddress'], m['docDistrict'], m['docPin'], m['docOccupation'], m['docPhone']))
        cur.execute(inDoi, (m['aadNum'], m['doiDesc'], m['doiTimeStart'], m['doiTimeEnd'], m['doiDateStart'], m['doiDateEnd'], m['doiAddress'], m['doiDistrict'], m['doiPin'], m['doiReason']))
        for i in m['dos']:
            if i['dosName'] != '':
                cur.execute(inDos, (m['aadNum'], i['dosName'], i['dosRname'], i['dosAddress'], i['dosDistrict'], i['dosPin']))
        for i in m['dow']:
            if i['dowName'] != '':
                cur.execute(inDow, (m['aadNum'], i['dowName'], i['dowAddress'], i['dowDistrict'], i['dowPin'], i['dowPhone']))
        cur.execute(inDe, (m['aadNum'], m['ipAddress'], m['dateTime'], thanaArray[randomThana], m['signUrl']))
        mysql.connection.commit()
        cur.close()
        url = "https://www.fast2sms.com/dev/bulk"
        payload = (f"sender_id=FSTSMS&message=- : Your application has been submitted with Reference Key: {m['aadNum']}. &language=english&route=p&numbers={mobile}")
        headers = {'authorization': "4B7UcoNRLtG8M6fDFzqV3jrIZl2kmSPWXuHngdE1avKsJY5wpexmS5TWPo3BXvdFfQLg8bhe9DNYZOup", 'Content-Type': "application/x-www-form-urlencoded", 'Cache-Control': "no-cache",}
        response = requests.request("POST", url, data=payload, headers=headers)
        return jsonify(m)


@app.route('/otp', methods=["POST"])
def otp():
    if request.method == 'POST':
        recData = request.json
        # aadhar = recData['aadNum']
        otpGen = random.randint(100000,999999)
        cur = mysql.connection.cursor()
        cur.execute("SELECT aad_phone from aadhar_demo WHERE aad_no=%s",(recData['aadNum'],))
        data = cur.fetchone()
        mobile = int(data[0])
        cur.close()
        # url = "https://www.fast2sms.com/dev/bulk"
        # payload = (f"sender_id=FSTSMS&message=- : Hey your otp is {otpGen} &language=english&route=p&numbers={mobile}")
        # headers = {'authorization': "4B7UcoNRLtG8M6fDFzqV3jrIZl2kmSPWXuHngdE1avKsJY5wpexmS5TWPo3BXvdFfQLg8bhe9DNYZOup", 'Content-Type': "application/x-www-form-urlencoded", 'Cache-Control': "no-cache",}
        # response = requests.request("POST", url, data=payload, headers=headers)
        # return jsonify(response.text)
        # return jsonify(mobile)
        return jsonify(otpGen)


@app.route('/feedback', methods=["POST"])
def feedback():
    if request.method == 'POST':
        feedback = request.json
        inFb = "INSERT INTO feedback(name,email,message) VALUES(%s,%s,%s)"
        cur = mysql.connection.cursor()
        cur.execute(inFb, (feedback['nameF'], feedback['emailF'], feedback['msgF']))
        mysql.connection.commit()
        cur.close()
        return jsonify(feedback)
        

@app.route('/login', methods=["POST"])
def login():
    if request.method == 'POST':
        loginDetails = request.json
        inDol = """SELECT userName, f_name, m_name, l_name, b_group, dob, gender, phone, email, thana, district, pin, photo 
        from police_officer_demo WHERE userName=%s AND password=%s"""
        # getDol = "SELECT userName, thana, district FROM police_officer_demo where"
        cur = mysql.connection.cursor()
        cur.execute(inDol, (loginDetails['userName'], loginDetails['password']))
        row_headers=[x[0] for x in cur.description] #this will extract row headers
        rv = cur.fetchone()
        json_data=dict(zip(row_headers,rv))
        if json_data:
            return jsonify(json_data)
        else:
            return jsonify("0")
        # return jsonify("hi")   


@app.route('/enquiry', methods=["POST"])
def enquiry():
    if request.method == 'POST':
        ref_key = request.json
        inD = "SELECT c.ref_id, c.doc_name, c.doc_phone, c.doc_district, e.de_status from detail_of_complainant c JOIN detail_extra e ON (c.ref_id = e.ref_id) WHERE c.ref_id=%s";
        cur = mysql.connection.cursor()
        cur.execute(inD, (ref_key['refNum'],))
        row_headers = [x[0] for x in cur.description]
        data = cur.fetchone()
        json_data=dict(zip(row_headers,data))
        
        if data: 
            return jsonify(json_data)
        else:
            return jsonify("0")


@app.route('/listFir', methods=["POST"])
def listFir():
    if request.method == 'POST':
        th = request.json
        inDe = "SELECT ref_id, de_date_time, de_status FROM detail_extra WHERE de_thana=%s"
        cur = mysql.connection.cursor()
        cur.execute(inDe, (th['thana'],))
        row_headers = [x[0] for x in cur.description] #this will extract row headers
        rv = cur.fetchall()
        # ad = rv[0]
        json_data=[]
        for result in rv:
            json_data.append(dict(zip(row_headers,result)))
        if json_data:            
            return jsonify(json_data)
        else: 
            return jsonify("0")
        # return jsonify(ad)


@app.route('/listFirSp', methods=["POST"])
def listFirSp():
    if request.method == 'POST':
        th = request.json
        inDe = "SELECT d.ref_id, d.de_date_time, d.de_status FROM detail_extra d JOIN detail_of_complainant c ON (d.ref_id=c.ref_id) WHERE c.doc_district=%s"
        cur = mysql.connection.cursor()
        cur.execute(inDe, (th['district'],))
        row_headers = [x[0] for x in cur.description] #this will extract row headers
        rv = cur.fetchall()
        # ad = rv[0]
        json_data=[]
        for result in rv:
            json_data.append(dict(zip(row_headers,result)))
        if json_data:            
            return jsonify(json_data)
        else: 
            return jsonify("0")
        # return jsonify(ad)


@app.route('/fullData', methods=["POST"])
def fullData():
    if request.method == 'POST':
        rk = request.json
        myDict={}
        inD = """SELECT * FROM detail_of_complainant NATURAL JOIN detail_of_incident 
        NATURAL JOIN detail_extra WHERE ref_id=%s"""
        #ot = """SELECT * FROM detail_of_complainant NATURAL JOIN detail_of_incident NATURAL JOIN detail_extra 
        #LEFT JOIN detail_of_suspect ON detail_extra.ref_id = detail_of_suspect.ref_id LEFT JOIN detail_of_witness 
        # ON detail_of_suspect.ref_id = detail_of_witness.ref_id WHERE detail_of_complainant.ref_id=%s"""
        inS = """SELECT * FROM detail_of_suspect WHERE ref_id=%s"""
        inW = """ SELECT * FROM detail_of_witness WHERE ref_id=%s"""

        cur = mysql.connection.cursor()
        cur.execute(inD, (rk['ref_key'],))
        row_headers = [x[0] for x in cur.description]
        rv = cur.fetchone()
        json_data=dict(zip(row_headers,rv))

        cur.execute(inS, (rk['ref_key'],))
        row_headers2 = [x[0] for x in cur.description]
        rv2 = cur.fetchall()
        json_data2=[]
        for result in rv2:
            json_data2.append(dict(zip(row_headers2,result)))

        cur.execute(inW, (rk['ref_key'],))
        row_headers3 = [x[0] for x in cur.description]
        rv3 = cur.fetchall()
        json_data3=[]
        for result in rv3:
            json_data3.append(dict(zip(row_headers3,result)))

        myDict = dict(json_data)
        myDict["dos"] = json_data2
        myDict["dow"] = json_data3
        # return jsonify(ad)
        if json_data:
            return jsonify(myDict)
        else: 
            return jsonify("0")
        # return jsonify(rk)


@app.route('/fromSho', methods=["POST"])        
def fromSho():
    if request.method == 'POST':
        fD = request.json
        inDe = "UPDATE detail_extra SET de_status=%s, de_officer=%s, de_officer_id=%s, de_officer_sign=%s, de_reject_reason=%s WHERE ref_id=%s"
        cur = mysql.connection.cursor()
        cur.execute(inDe, (fD['de_status'], fD['de_officer'], fD['de_officer_id'], fD['de_officer_sign'], fD['de_reject_reason'], fD['ref_id']))
        mysql.connection.commit()
        cur.close()
        return jsonify("1")


if __name__ == '__main__':
    app.run(debug=True)	