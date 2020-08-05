import { Component, ViewChild, OnInit } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';
import {  SendToServerService } from '../send-to-server.service';

@Component({
  selector: 'app-signature-pad-page',
  templateUrl: './signature-pad-page.component.html',
  styleUrls: ['./signature-pad-page.component.css']
})
export class SignaturePadPageComponent implements OnInit {

  // public url = '';
  public isDisable: boolean = false;
  public errorSign: boolean = false;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor

    'canvasWidth': 350,
    'canvasHeight': 200
  };

  constructor(public urlService: SendToServerService) {
    // no-op
  }

  ngOnInit(): void {
    this.urlService.urlForSign = '';
    // this.urlService.signClear = false;
  }

  ngAfterViewInit() {
    if(!this.urlService.signClear) {
      this.signaturePad.set('minWidth', 5);
      this.signaturePad.clear();
    }
  }

  drawComplete() {
    // console.log(this.signaturePad.toDataURL());
    this.urlService.urlForSign = this.signaturePad.toDataURL();
  }

  drawStart() {
    // console.log('begin drawing');
  }

  del() {
    this.signaturePad.clear();
    this.urlService.urlForSign = '';
    this.urlService.signClear = false;
    // if(this.urlService.activeShoDetail)
    //   this.urlService.dataRec.de_officer_sign = '';
  }

  done() {
    if(this.urlService.urlForSign === '' || this.urlService.urlForSign === undefined)
    {
      this.errorSign = true;
    } 
    else {
      this.errorSign = false;
      this.isDisable = true;
      this.signaturePad.clear();
      // if(this.urlService.activeShoDetail) {
        // this.urlService.dataRec.de_officer_sign = this.urlService.urlForSign;
      // } else {
        this.urlService.signClear = true;
      // }
    }
  }
  
  reDone() {
    this.isDisable = false;
    this.urlService.urlForSign='';
    // if(this.urlService.activeShoDetail)
      // this.urlService.dataRec.de_officer_sign = '';
    this.urlService.signClear = false;
    // this.signaturePad.clear();
  }
}
