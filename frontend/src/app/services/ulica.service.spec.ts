import { TestBed } from '@angular/core/testing';

import { UlicaService } from './ulica.service';

describe('UlicaService', () => {
  let service: UlicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UlicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
