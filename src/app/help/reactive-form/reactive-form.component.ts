import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { FirData } from '../fir-data-reactive';
import { VoiceDataService } from '../voice-data.service';
import { SendToServerService } from '../send-to-server.service';


@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  public sectionActive = 1;
  public linkAClass = {
    "active": true,
    "nav-link": true
  };
  public idTypes = ['Adhaar', 'Passport', 'Driving License', 'Ration Card'];
  firForm: FormGroup;
  dosDetails: FormGroup;
  dowDetails: FormGroup;
  public firD: FirData;
  public dosCount: number = 1;
  public dowCount: number = 1;


  constructor(private fb: FormBuilder, public voice: VoiceDataService, public sendDataService: SendToServerService) { }

  ngOnInit(): void {
    // this.firForm = this.fb.group({
    //   docName: ['', [Validators.required]],
    //   docFname: ['', [Validators.required]],
    //   docDob: ['', [Validators.required]],
    //   docNationality: ['', [Validators.required]],
    //   docIdType: ['', [Validators.required]],
    //   docIdNo: ['', [Validators.required]],
    //   docAddress: ['', [Validators.required]],
    //   docDistrict: ['', [Validators.required]],
    //   docPin: ['', [Validators.required]],
    //   docOccupation: ['', [Validators.required]],
    //   docPhone: ['', [Validators.required]],
    //   doiDesc: ['', [Validators.required]],
    //   doiDateStart: ['', [Validators.required]],
    //   doiDateEnd: ['', [Validators.required]],
    //   doiTimeStart: ['', [Validators.required]],
    //   doiTimeEnd: ['', [Validators.required]],
    //   doiAddress: ['', [Validators.required]],
    //   doiDistrict: ['', [Validators.required]],
    //   doiPin: ['', [Validators.required]],
    //   doiReason: [''],
    //   dos: this.fb.array([this.dosGroup()]),
    //   dow: this.fb.array([this.dowGroup()])
    // });
  }

  changeValue(event, val) {
    this.sectionActive = val;
  }

}