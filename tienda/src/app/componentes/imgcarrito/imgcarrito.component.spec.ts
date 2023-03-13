import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgcarritoComponent } from './imgcarrito.component';

describe('ImgcarritoComponent', () => {
  let component: ImgcarritoComponent;
  let fixture: ComponentFixture<ImgcarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgcarritoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgcarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
