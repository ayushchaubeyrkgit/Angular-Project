import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewFirComponent } from './preview-fir.component';

describe('PreviewFirComponent', () => {
  let component: PreviewFirComponent;
  let fixture: ComponentFixture<PreviewFirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewFirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewFirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
