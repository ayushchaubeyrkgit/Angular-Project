import { TestBed } from '@angular/core/testing';

import { DataForQuestionsService } from './data-for-questions.service';

describe('DataForQuestionsService', () => {
  let service: DataForQuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataForQuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
