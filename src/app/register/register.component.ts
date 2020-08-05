import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [`
  
  `]
})
export class RegisterComponent implements OnInit {
  constructor(private _headerService: HeaderService) { }

  ngOnInit(): void {
    this._headerService.chgHeaderValue(0);
  }

}
