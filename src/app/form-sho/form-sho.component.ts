import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SendToServerService } from '../send-to-server.service';


@Component({
  selector: 'app-form-sho',
  templateUrl: './form-sho.component.html',
  styleUrls: ['./form-sho.component.css']
})
export class FormShoComponent implements OnInit {

  @Input() public data: any;
  @Output() public togDisp = new EventEmitter();
  public sectionActive: number = 1;
  public linkAClass = {
    "active": true,
    "nav-link": true
  };
  public valueOfficer: string = '';
  public valueOfficerId: string = '';
  public valueRejectReason: string = '';
  public warning: boolean = true;

  constructor(public serverSer: SendToServerService) { }

  ngOnInit(): void {
    this.serverSer.signClear = false;
  }

  changeValue(event, val) {
    this.sectionActive = val;
  }

  statusHandler(value) {
    console.log(value);
    if(value === 'Rejected') {
      this.valueOfficerId = '';
      this.valueOfficer = '';
      this.serverSer.urlForSign = '';
      this.serverSer.signClear = false;
    }
    else {
      this.valueOfficerId = this.data.userName;
      this.valueRejectReason = '';
    }
    this.serverSer.dataRec.de_status = value;
  }

  submitHandler() {
    this.serverSer.dataRec.de_officer_sign = this.serverSer.urlForSign;
    if((this.valueOfficer && this.valueOfficerId && this.serverSer.dataRec.de_officer_sign) || (this.valueRejectReason)) {
      this.warning = true;
      this.serverSer.dataRec.de_officer_id = this.valueOfficerId;
      this.serverSer.dataRec.de_reject_reason = this.valueRejectReason;
      this.serverSer.dataRec.de_officer = this.valueOfficer;
      this.serverSer.sendFromSho(this.serverSer.dataRec).subscribe((response) =>{
        console.log(response);
        this.serverSer.sendThana(this.data).subscribe((res) => {
          this.serverSer.listF = res;
          console.log(res);
        }, err => {
          console.log(err);
        });
      }, error => {
        console.log(error);
      });
      this.togDisp.emit(true);
    } else {
      this.warning = false;
    }
  }

}
