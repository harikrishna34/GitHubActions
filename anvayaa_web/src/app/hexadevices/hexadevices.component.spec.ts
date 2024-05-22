import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HexadevicesComponent } from './hexadevices.component';

describe('HexadevicesComponent', () => {
  let component: HexadevicesComponent;
  let fixture: ComponentFixture<HexadevicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HexadevicesComponent]
    });
    fixture = TestBed.createComponent(HexadevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
