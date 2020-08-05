import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
  `]
})
export class HeaderComponent implements OnInit {
  public white_text = {color: 'white'};
  public active_head = {
    backgroundColor: '#fff',
    color: '#941511',
    fontWeight: 'bold'
  };
  constructor(public _headerService: HeaderService) { }

  ngOnInit(): void {
  }

  chgNavCol(event, val) {
    this._headerService.chgHeaderValue(val);
  }
}
