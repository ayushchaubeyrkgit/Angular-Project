import { Component, OnInit } from '@angular/core';
import { SendToServerService } from '../send-to-server.service';
import { LoginData, LoginResponse, ListFir } from '../feedback-data';
import { HeaderService } from '../header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formData = new LoginData('', '');
  public loginSuccess: number = 0;
  public loginData = new LoginResponse('','','','','','','','','','','','','');
  // public listF = new ListFir('', '', '');
  public th = {
    thana: '',
    district: ''
  };
  constructor(private serverService: SendToServerService, private headSer: HeaderService, private router: Router) { }

  ngOnInit(): void {
    this.headSer.chgHeaderValue(4);
  }

  shoLogin() {
    console.log(this.formData);
    // this.loginSuccess = -1;
    if(this.formData.userName.charAt(0) === 'S') {
      this.serverService.sendLoginData(this.formData).subscribe((response) => {
        if(response !== "0") {
          this.serverService.spLogin = true;
          this.loginSuccess = 1;
          this.loginData = response;
          this.th.district = this.loginData.district;
          this.serverService.sendDistrict(this.th).subscribe((res) => {
            this.serverService.listF = res;
            console.log("list2 ",res);
          }, err => {
            console.log(err);
          });
        }
        else
          this.loginSuccess = -1;
      }, error => {
        this.loginSuccess = -1;
        console.log(error);
      });
    } else {    
      this.serverService.sendLoginData(this.formData).subscribe((response) => {
        if(response !== "0") {
          this.loginSuccess = 1;
          this.serverService.spLogin=false;
          this.loginData = response;
          this.th.thana = this.loginData.thana;
          this.serverService.sendThana(this.th).subscribe((res) => {
            this.serverService.listF = res;
            console.log("list ",res);
          }, err => {
            console.log(err);
          });
        }
        else
          this.loginSuccess = -1;
      }, error => {
        this.loginSuccess = -1;
        console.log(error);
      });
    }
  }
  logout(){
    this.router.navigateByUrl('home-page');
  }
}
