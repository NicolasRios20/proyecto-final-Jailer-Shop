import { TestBed } from '@angular/core/testing';

import { SrviciosService } from './srvicios.service';

describe('SrviciosService', () => {
  let service: SrviciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrviciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
