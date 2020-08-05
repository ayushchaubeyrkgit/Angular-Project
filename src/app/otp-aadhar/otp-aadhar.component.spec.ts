import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpAadharComponent } from './otp-aadhar.component';

describe('OtpAadharComponent', () => {
  let component: OtpAadharComponent;
  let fixture: ComponentFixture<OtpAadharComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpAadharComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpAadharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
