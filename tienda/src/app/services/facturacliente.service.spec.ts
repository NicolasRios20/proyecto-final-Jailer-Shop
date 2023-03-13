import { TestBed } from '@angular/core/testing';

import { FacturaclienteService } from './facturacliente.service';

describe('FacturaclienteService', () => {
  let service: FacturaclienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturaclienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
