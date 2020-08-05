import { TestBed } from '@angular/core/testing';

import { DataForMapService } from './data-for-map.service';

describe('DataForMapService', () => {
  let service: DataForMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataForMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
