import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { FirData } from '../fir-data-reactive';
import { VoiceDataService } from '../voice-data.service';
import { SendToServerService } from '../send-to-server.service';
//import { dateOfBirthValidator } from '../shared/doc-name.validator';


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
  public ipAddr = {
    ip: ''
  };
  public selectedFile = null;

  get docName() {
    return this.firForm.get('docName');
  }

  get docFname() {
    return this.firForm.get('docFname');
  }

  get docDob() {
    return this.firForm.get('docDob');
  }

  get docNationality() {
    return this.firForm.get('docNationality');
  }

  get docIdType() {
    return this.firForm.get('docIdType');
  }

  get docIdNo() {
    return this.firForm.get('docIdNo');
  }

  get docAddress() {
    return this.firForm.get('docAddress');
  }

  get docDistrict() {
    return this.firForm.get('docDistrict');
  }

  get docPin() {
    return this.firForm.get('docPin');
  }

  get docOccupation() {
    return this.firForm.get('docOccupation');
  }

  get docPhone() {
    return this.firForm.get('docPhone');
  }

  get doiDesc() {
    return this.firForm.get('doiDesc');
  }

  get doiDateStart() {
    return this.firForm.get('doiDateStart');
  }

  get doiDateEnd() {
    return this.firForm.get('doiDateEnd');
  }

  get doiTimeStart() {
    return this.firForm.get('doiTimeStart');
  }

  get doiTimeEnd() {
    return this.firForm.get('doiTimeEnd');
  }

  get doiAddress() {
    return this.firForm.get('doiAddress');
  }

  get doiDistrict() {
    return this.firForm.get('doiDistrict');
  }

  get doiPin() {
    return this.firForm.get('doiPin');
  }

  get dos() {
    return this.firForm.get('dos') as FormArray;
  }

  addDos() {
    this.dosCount += 1;
    this.dos.push(this.dosGroup());
  }

  get dow() {
    return this.firForm.get('dow') as FormArray;
  }

  addDow() {
    this.dowCount += 1;
    this.dow.push(this.dowGroup());
  }

  constructor(private fb: FormBuilder, public voice: VoiceDataService, public sendDataService: SendToServerService) { }

  ngOnInit(): void {
    this.sendDataService.signClear = false;
    this.firForm = this.fb.group({
      docName: ['', [Validators.required, Validators.pattern('[a-zA-Z\\s]*')]],
      docFname: ['', [Validators.required, Validators.pattern('[a-zA-Z\\s]*')]],
      docDob: ['', [Validators.required]],
      docNationality: ['', [Validators.required]],
      docIdType: ['', [Validators.required]],
      docIdNo: ['', [Validators.required, Validators.pattern('[A-Z0-9]*')]],
      docAddress: ['', [Validators.required]],
      docDistrict: ['', [Validators.required]],
      docPin: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
      docOccupation: ['', [Validators.required]],
      docPhone: ['', [Validators.required, Validators.pattern('[6-9][0-9]{9}')]],
      doiDesc: ['', [Validators.required]],
      doiDateStart: ['', [Validators.required]],
      doiDateEnd: ['', [Validators.required]],
      doiTimeStart: ['', [Validators.required]],
      doiTimeEnd: ['', [Validators.required]],
      doiAddress: ['', [Validators.required]],
      doiDistrict: ['', [Validators.required]],
      doiPin: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
      doiReason: [''],
      dos: this.fb.array([this.dosGroup()]),
      dow: this.fb.array([this.dowGroup()])
    });
    this.sendDataService.getIPAddress().subscribe((res:any)=>{  
      // this.firD.ipAddress=res;  
      this.ipAddr.ip = res.ip;
      }, error => {
      console.log(error);
      this.firD.ipAddress='';
    });
  }

  changeValue(event, val) {
    this.sectionActive = val;
  }

  dosGroup() {
    return this.dosDetails = this.fb.group({
      dosName: [''],
      dosRname: [''],
      dosAddress: [''],
      dosDistrict: [''],
      dosPin: ['']
    });
  }

  dowGroup() {
    return this.dowDetails = this.fb.group({
      dowName: [''],
      dowPhone: [''],
      dowAddress: [''],
      dowDistrict: [''],
      dowPin: ['']
    });
  }

  onSubmit() {
    // copying values of FORM in firD variable
    this.firD = this.firForm.value;

    // adding signature
    this.firD.signUrl = this.sendDataService.urlForSign;
    
    // getting ip
    this.firD.ipAddress = this.ipAddr.ip;
    
    // getting aadhar
    this.firD.aadNum = this.sendDataService.aadharNumber;

    // getting date and time
    let date = new Date();
    this.firD.dateTime = String(date);

    console.log(this.firD);

    // sending data to server and getting response
    this.sendDataService.sendFormData(this.firD).subscribe((response) => {
      console.log('response: ', response);
    },error =>{
    console.log('error: ',error);
    });
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(event);
  }

  onUpload() {
    
  }

  putValue(val) {
    switch (val) {
      case 1:
        this.firForm.patchValue({
          docName: this.voice.voiceText
        });
        break;

      case 2:
        this.firForm.patchValue({
          docFname: this.voice.voiceText
        });
        break;

      case 3:
        this.firForm.patchValue({
          docNationality: this.voice.voiceText
        });
        break;

      case 4:
        this.firForm.patchValue({
          docIdNo: this.voice.voiceText
        });
        break;

      case 5:
        this.firForm.patchValue({
          docAddress: this.voice.voiceText
        });
        break;

      case 6:
        this.firForm.patchValue({
          docDistrict: this.voice.voiceText
        });
        break;

      case 7:
        this.firForm.patchValue({
          docPin: this.voice.voiceText
        });
        break;

      case 8:
        this.firForm.patchValue({
          docOccupation: this.voice.voiceText
        });
        break;

      case 9:
        this.firForm.patchValue({
          docPhone: this.voice.voiceText
        });
        break;

      case 10:
        this.firForm.patchValue({
          doiDesc: this.voice.voiceText
        });
        break;

      case 11:
        this.firForm.patchValue({
          doiAddress: this.voice.voiceText
        });
        break;

      case 12:
        this.firForm.patchValue({
          doiDistrict: this.voice.voiceText
        });
        break;

      case 13:
        this.firForm.patchValue({
          doiPin: this.voice.voiceText
        });
        break;

      case 14:
        this.firForm.patchValue({
          doiReason: this.voice.voiceText
        });
        break;

      case 15:
        (<FormGroup>this.firForm.controls['dos']).patchValue([{dosName: this.voice.voiceText}]);
        break;
         
      case 16:
        (<FormGroup>this.firForm.controls['dos']).patchValue([{}, {dosName: this.voice.voiceText}]);
        break;

      case 17:
        (<FormGroup>this.firForm.controls['dos']).patchValue([{}, {}, {dosName: this.voice.voiceText}]);
        break;

      case 18:
        (<FormGroup>this.firForm.controls['dos']).patchValue([{dosRname: this.voice.voiceText}]);
        break;
         
      case 19:
        (<FormGroup>this.firForm.controls['dos']).patchValue([{}, {dosRname: this.voice.voiceText}]);
        break;

      case 20:
        (<FormGroup>this.firForm.controls['dos']).patchValue([{}, {}, {dosRname: this.voice.voiceText}]);
        break;

      case 21:
        (<FormGroup>this.firForm.controls['dos']).patchValue([{dosAddress: this.voice.voiceText}]);
        break;
         
      case 22:
        (<FormGroup>this.firForm.controls['dos']).patchValue([{}, {dosAddress: this.voice.voiceText}]);
        break;

      case 23:
        (<FormGroup>this.firForm.controls['dos']).patchValue([{}, {}, {dosAddress: this.voice.voiceText}]);
        break;
      
      case 24:
        (<FormGroup>this.firForm.controls['dos']).patchValue([{dosDistrict: this.voice.voiceText}]);
        break;
         
      case 25:
        (<FormGroup>this.firForm.controls['dos']).patchValue([{}, {dosDistrict: this.voice.voiceText}]);
        break;

      case 26:
        (<FormGroup>this.firForm.controls['dos']).patchValue([{}, {}, {dosDistrict: this.voice.voiceText}]);
        break;

      case 27:
        (<FormGroup>this.firForm.controls['dos']).patchValue([{dosPin: this.voice.voiceText}]);
        break;
         
      case 28:
        (<FormGroup>this.firForm.controls['dos']).patchValue([{}, {dosPin: this.voice.voiceText}]);
        break;

      case 29:
        (<FormGroup>this.firForm.controls['dos']).patchValue([{}, {}, {dosPin: this.voice.voiceText}]);
        break;

      case 30:
        (<FormGroup>this.firForm.controls['dow']).patchValue([{dowName: this.voice.voiceText}]);
        break;
         
      case 31:
        (<FormGroup>this.firForm.controls['dow']).patchValue([{}, {dowName: this.voice.voiceText}]);
        break;

      case 32:
        (<FormGroup>this.firForm.controls['dow']).patchValue([{}, {}, {dowName: this.voice.voiceText}]);
        break;

      case 33:
        (<FormGroup>this.firForm.controls['dow']).patchValue([{dowPhone: this.voice.voiceText}]);
        break;
         
      case 34:
        (<FormGroup>this.firForm.controls['dow']).patchValue([{}, {dowPhone: this.voice.voiceText}]);
        break;

      case 35:
        (<FormGroup>this.firForm.controls['dow']).patchValue([{}, {}, {dowPhone: this.voice.voiceText}]);
        break;

      case 36:
        (<FormGroup>this.firForm.controls['dow']).patchValue([{dowAddress: this.voice.voiceText}]);
        break;
         
      case 37:
        (<FormGroup>this.firForm.controls['dow']).patchValue([{}, {dowAddress: this.voice.voiceText}]);
        break;

      case 38:
        (<FormGroup>this.firForm.controls['dow']).patchValue([{}, {}, {dowAddress: this.voice.voiceText}]);
        break;

      case 39:
        (<FormGroup>this.firForm.controls['dow']).patchValue([{dowDistrict: this.voice.voiceText}]);
        break;
         
      case 40:
        (<FormGroup>this.firForm.controls['dow']).patchValue([{}, {dowDistrict: this.voice.voiceText}]);
        break;

      case 41:
        (<FormGroup>this.firForm.controls['dow']).patchValue([{}, {}, {dowDistrict: this.voice.voiceText}]);
        break;

      case 42:
        (<FormGroup>this.firForm.controls['dow']).patchValue([{dowPin: this.voice.voiceText}]);
        break;
         
      case 43:
        (<FormGroup>this.firForm.controls['dow']).patchValue([{}, {dowPin: this.voice.voiceText}]);
        break;

      case 44:
        (<FormGroup>this.firForm.controls['dow']).patchValue([{}, {}, {dowPin: this.voice.voiceText}]);
        break;
    }
  }

  startVoiceRecognition(event, val, tv) {
    this.voice.startVoiceRecognition();
    setTimeout(() => this.putValue(val), tv);  
    this.voice.voiceText = '';
  }

}