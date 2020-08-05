import { TestBed } from '@angular/core/testing';

import { DataForEnquiryService } from './data-for-enquiry.service';

describe('DataForEnquiryService', () => {
  let service: DataForEnquiryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataForEnquiryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
