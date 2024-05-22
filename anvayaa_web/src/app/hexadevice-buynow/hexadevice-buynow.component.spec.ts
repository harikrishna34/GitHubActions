import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HexadeviceBuynowComponent } from './hexadevice-buynow.component';

describe('HexadeviceBuynowComponent', () => {
  let component: HexadeviceBuynowComponent;
  let fixture: ComponentFixture<HexadeviceBuynowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HexadeviceBuynowComponent]
    });
    fixture = TestBed.createComponent(HexadeviceBuynowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
