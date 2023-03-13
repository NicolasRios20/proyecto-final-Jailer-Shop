import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaProveedorComponent } from './factura-proveedor.component';

describe('FacturaProveedorComponent', () => {
  let component: FacturaProveedorComponent;
  let fixture: ComponentFixture<FacturaProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaProveedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturaProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
