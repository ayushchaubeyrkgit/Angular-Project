import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { FeedbackData, FullDataReceived, ListFir } from './feedback-data';

@Injectable({
  providedIn: 'root'
})
export class SendToServerService {
  public urlForSign: string = '';
  public aadharNumber: string = '';
  public signClear: boolean = false;
  public otpClear: boolean = false;
  public dataRec: FullDataReceived;
  public listF: ListFir[];// = new ListFir('', '', '');
  public spLogin: boolean = false;
  constructor(private http: HttpClient) { }

  sendFormData(data) {
  	return this.http.post<any>('http://127.0.0.1:5000/form', data);
  }

  getIPAddress()  
  {  
    return this.http.get("http://api.ipify.org/?format=json");  
  }

  sendAadhar(data) {
    return this.http.post<any>('http://127.0.0.1:5000/otp', data);
  }

  sendFeedback(data) {
    return this.http.post<FeedbackData>('http://127.0.0.1:5000/feedback',data);
  }

  sendLoginData(data) {
    return this.http.post<any>('http://127.0.0.1:5000/login',data);
  }

  sendEnquiryData(data) {
    return this.http.post<any>('http://127.0.0.1:5000/enquiry',data);
  }

  sendThana(data) {
    return this.http.post<any>('http://127.0.0.1:5000/listFir',data);
  }

  sendRefGetFull(data) {
    return this.http.post<any>('http://127.0.0.1:5000/fullData',data);
  }

  sendFromSho(data) {
    return this.http.post<any>('http://127.0.0.1:5000/fromSho',data);
  }

  sendDistrict(data) {
    return this.http.post<any>('http://127.0.0.1:5000/listFirSp', data);
  }
}
