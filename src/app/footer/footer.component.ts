import { Component, OnInit } from '@angular/core';
import { FeedbackData } from '../feedback-data';
import { SendToServerService } from '../send-to-server.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent implements OnInit {

  feedbackData = new FeedbackData('','','');
  public success: boolean = false;
  constructor(private sendService: SendToServerService) { }

  ngOnInit(): void {
  }

  hideSuccess() {
    this.success = false; 
  }

   sendFeedbackData() {
     this.success = true;
     this.sendService.sendFeedback(this.feedbackData).subscribe((response) => {
       console.log(response);
     }, error => {
       console.log(error);
     });
     setTimeout(() => this.hideSuccess(),2000);
     this.feedbackData.emailF = '';
     this.feedbackData.nameF = '';
     this.feedbackData.msgF = '';
   }
}
