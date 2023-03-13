import { TestBed } from '@angular/core/testing';

import { GuardRutasGuard } from './guard-rutas.guard';

describe('GuardRutasGuard', () => {
  let guard: GuardRutasGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardRutasGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
