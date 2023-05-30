import { TestBed } from '@angular/core/testing';

import { LinijaService } from './linija.service';

describe('LinijaService', () => {
  let service: LinijaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinijaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
