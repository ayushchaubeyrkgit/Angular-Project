import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataForEnquiryService {
  //put real URL from workin web server
  private _url: string = "/assets/data/enquiry_data.json";
  public dataRec;
  //   = {
  //   ref_key: '',
  //   name: '',
  //   status: ''
  // };
  constructor(private http: HttpClient) {
    this.http.get(this._url).toPromise().then(data => {
      this.dataRec = data;
    });
   }

  getEnquiryData()  {    
    return this.dataRec;
  }
}
