export class FirData {
    constructor(
        public docName: string,
        public docFname: string,
        public docDob: string,
        public docNationality: string,
        public docIdType: string,
        public docIdNo: string,
        public docAddress: string,
        public docDistrict: string,
        public docPin: string,
        public docOccupation: string,
        public docPhone: string,
        public doiDesc: string,
        public doiDateStart: string,
        public doiDateEnd: string,
        public doiTimeStart: string,
        public doiTimeEnd: string,
        public doiAddress: string,
        public doiDistrict: string,
        public doiPin: string,
        public doiReason: string,
        public dos: {
            dosName: string,
            dosRname: string,
            dosAddress: string,
            dosDistrict: string,
            dosPin: string,
        }[],
        public dow: {
            dowName: string,
            dowPhone: string,
            dowAddress: string,
            dowDistrict: string,
            dowPin: string,
        }[],
        public ipAddress: string,
        public dateTime: string,
        public signUrl: string,
        public aadNum: string
    ) { }
}
