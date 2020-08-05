import { TestBed } from '@angular/core/testing';

import { VoiceDataService } from './voice-data.service';

describe('VoiceDataService', () => {
  let service: VoiceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoiceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
