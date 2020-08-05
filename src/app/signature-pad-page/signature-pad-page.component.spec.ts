import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaturePadPageComponent } from './signature-pad-page.component';

describe('SignaturePadPageComponent', () => {
  let component: SignaturePadPageComponent;
  let fixture: ComponentFixture<SignaturePadPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignaturePadPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignaturePadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
