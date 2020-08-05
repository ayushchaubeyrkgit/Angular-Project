import { Component, OnInit, Input } from '@angular/core';
import { LoginResponse, ListFir } from '../feedback-data';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { SendToServerService } from '../send-to-server.service';


@Component({
  selector: 'app-login-detail',
  templateUrl: './login-detail.component.html',
  styleUrls: ['./login-detail.component.css']
})
export class LoginDetailComponent implements OnInit {

  @Input() public data: LoginResponse;
  // @Input() public data_list: ListFir;
  public $time: Observable<Date> = timer(0, 1000).pipe(map(() => new Date()));
  public todayString : string = new Date().toDateString();
  public tog: number = 0;
  public jFRef = {
    ref_key: ''
  };
  public displayDetails: boolean = true;
  
  constructor(public sendSer: SendToServerService) { }

  ngOnInit(): void {
  }

  change(event, val) {
    this.tog = val;
    // console.log(val);
  }

  detailForm(value) {
    this.jFRef.ref_key = value;
    this.sendSer.sendRefGetFull(this.jFRef).subscribe((response) =>{
      this.sendSer.dataRec = response;
      this.displayDetails = false;
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  toggleDisplay() {
    this.displayDetails = true;
  }
}
