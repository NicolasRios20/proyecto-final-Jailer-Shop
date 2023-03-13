import { TestBed } from '@angular/core/testing';

import { FacturapoveedorService } from './facturapoveedor.service';

describe('FacturapoveedorService', () => {
  let service: FacturapoveedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturapoveedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
