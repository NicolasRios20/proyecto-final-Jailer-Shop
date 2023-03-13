import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalfuormularioproveedorComponent } from './modalfuormularioproveedor.component';

describe('ModalfuormularioproveedorComponent', () => {
  let component: ModalfuormularioproveedorComponent;
  let fixture: ComponentFixture<ModalfuormularioproveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalfuormularioproveedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalfuormularioproveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
