import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HexadevicesdetailsComponent } from './hexadevicesdetails.component';

describe('HexadevicesdetailsComponent', () => {
  let component: HexadevicesdetailsComponent;
  let fixture: ComponentFixture<HexadevicesdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HexadevicesdetailsComponent]
    });
    fixture = TestBed.createComponent(HexadevicesdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
