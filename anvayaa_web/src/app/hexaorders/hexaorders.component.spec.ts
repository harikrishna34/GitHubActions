import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HexaordersComponent } from './hexaorders.component';

describe('HexaordersComponent', () => {
  let component: HexaordersComponent;
  let fixture: ComponentFixture<HexaordersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HexaordersComponent]
    });
    fixture = TestBed.createComponent(HexaordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
