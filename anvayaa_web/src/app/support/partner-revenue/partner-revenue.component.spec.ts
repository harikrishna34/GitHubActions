import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerRevenueComponent } from './partner-revenue.component';

describe('PartnerRevenueComponent', () => {
  let component: PartnerRevenueComponent;
  let fixture: ComponentFixture<PartnerRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerRevenueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
