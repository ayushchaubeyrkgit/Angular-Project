import { Component, OnInit, Input } from '@angular/core';
import { FirData } from '../fir-data-reactive';

@Component({
  selector: 'app-preview-fir',
  templateUrl: './preview-fir.component.html',
  styleUrls: ['./preview-fir.component.css']
})
export class PreviewFirComponent implements OnInit {

  @Input() public parentData;
  constructor() { }

  ngOnInit(): void {
    
  }

}
