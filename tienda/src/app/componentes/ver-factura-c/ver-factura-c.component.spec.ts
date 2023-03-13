import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerFacturaCComponent } from './ver-factura-c.component';

describe('VerFacturaCComponent', () => {
  let component: VerFacturaCComponent;
  let fixture: ComponentFixture<VerFacturaCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerFacturaCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerFacturaCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
