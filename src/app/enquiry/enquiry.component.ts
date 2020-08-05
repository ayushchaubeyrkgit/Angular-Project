import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header.service';
import { SendToServerService } from '../send-to-server.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styles: [`tbody{
    background-color: white;
  }
  `]
})
export class EnquiryComponent implements OnInit {

  public gotData = false;
  public isDisabled: boolean = true;
  public data_rec = {
    ref_id: '',
    doc_name: '',
    doc_phone: '',
    doc_district: '',
    de_status: ''
  };
  public senRef = {
    refNum: ''
  };
  constructor(private _headerService: HeaderService, private enqData: SendToServerService) { }

  ngOnInit(): void {
    this._headerService.chgHeaderValue(0);
  }

  getData() {
    this.enqData.sendEnquiryData(this.senRef).subscribe((response) => {
      this.data_rec = response;
      this.gotData = true;
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  checkValid(val) {
    if(val.length === 12){
      this.isDisabled = false;
      this.senRef.refNum = val;
    }
    else {
      this.senRef.refNum = '';
      this.isDisabled = true;
    } 
  }

}
