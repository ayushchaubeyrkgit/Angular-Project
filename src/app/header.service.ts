import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public header_active = 1;

  getHeaderValue() {
    return this.header_active;
  }

  chgHeaderValue(val) {
    this.header_active = val;
  }
  constructor() { }
}
