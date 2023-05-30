import { TestBed } from '@angular/core/testing';

import { MikrolokacijeService } from './mikrolokacije.service';

describe('MikrolokacijeService', () => {
  let service: MikrolokacijeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MikrolokacijeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
