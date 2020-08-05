import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header.service';
import { DataForMapService } from '../data-for-map.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [`
  agm-map {
    height: 300px;
  }
  `]
})
export class HomePageComponent implements OnInit {
  public latitude;
  public longitude;
  public display_map= false;
  public districtList = [];
  public thanaList: {
    id: string,
    districtName: string,
    thana: string
  }[];
  public printThanaList:string[] = new Array();
  public errorMessage;
  public disabledThana: boolean = true;
  public selectedDistrict: string = '';
  public carData = [];
  public insData = [];

  constructor(private _headerService: HeaderService, private _dataMap: DataForMapService) { }

  ngOnInit(): void {
    if(!navigator.geolocation) {
      console.log('cannot read location');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });

    //data for map
    this._dataMap.getData()
                  .subscribe(data => this.districtList = data,
                              error => console.log(error));

    this._dataMap.getDataThana()
                  .subscribe(data => this.thanaList = data,
                              error => console.log(error));

    this._dataMap.getDataCarousel()
                  .subscribe(data => this.carData = data,
                              error => console.log(error));

    this._dataMap.getDataInstruction()
                  .subscribe(data => this.insData = data,
                              error => console.log(error));
                              
  }

  chnValue(event, val) {
    this._headerService.chgHeaderValue(val);
  }

  displayMap() {
    this.display_map = true;
    console.log(`hi ${this.districtList[0].id} and ${this.districtList[0].districtName}`);
  }

  trimThana() {
    // console.log('hi');
    if(!(this.selectedDistrict === '' || this.selectedDistrict === 'Select your District')) {
      // console.log('in');
      this.printThanaList = [];
      for(let i =1; i < this.thanaList.length; i++) {
        if(this.thanaList[i].districtName === this.selectedDistrict) {
          var l = this.printThanaList.push(this.thanaList[i].thana);
        }
      }
    }
  }

}
