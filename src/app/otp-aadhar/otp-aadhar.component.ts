import { Component, OnInit } from '@angular/core';
import { SendToServerService } from '../send-to-server.service';

@Component({
  selector: 'app-otp-aadhar',
  templateUrl: './otp-aadhar.component.html',
  styleUrls: ['./otp-aadhar.component.css']
})
export class OtpAadharComponent implements OnInit {
  
  public errorAadhar: boolean = false;
  public aadharNum = {
    aadNum: ''
  };
  public otpRec;
  public firstSection: boolean = true;
  public otpEntered = '';
  public otpSuccess: number = 0;

  constructor(public sendDataService: SendToServerService) { }

  ngOnInit(): void {
  }

  checkAadhar(value): boolean {
    if(value.length === 12) {
      this.errorAadhar = false;
      return true;
    } 
    else {
      this.errorAadhar = true;
      return false;
    }
  }

  aadharHandler(value) {
    if(this.checkAadhar(value) === true){
      this.firstSection = false;
      this.aadharNum.aadNum = value;
      this.sendDataService.aadharNumber = this.aadharNum.aadNum;
      this.sendDataService.sendAadhar(this.aadharNum).subscribe((response) => {
        this.otpRec = response;
        console.log(response);
      }, error => {
        console.log(error);
      });
      console.log(this.aadharNum.aadNum);
    }
  }

  changeDisplaySection() {
    this.firstSection = true;
    this.otpSuccess = 0;
  }

  resendOtp() {
    this.sendDataService.aadharNumber = this.aadharNum.aadNum;
    this.sendDataService.sendAadhar(this.aadharNum).subscribe((response) => {
      this.otpRec = response;
      // console.log(this.otpRec,response);
      }, error => {
      console.log(error);
    });
    console.log(this.aadharNum.aadNum);
  }

  onOtpChange(event) {
    if(event.length === 6)
      this.otpEntered = event;
  }

  verification() {
    if(this.otpRec == this.otpEntered) {
      this.otpSuccess = 1;
      this.sendDataService.otpClear = true;
    }
    else  
      this.otpSuccess = -1;
    // console.log('ho',this.otpEntered);
  }

}
