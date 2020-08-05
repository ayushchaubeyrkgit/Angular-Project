import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormShoComponent } from './form-sho.component';

describe('FormShoComponent', () => {
  let component: FormShoComponent;
  let fixture: ComponentFixture<FormShoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormShoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormShoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
