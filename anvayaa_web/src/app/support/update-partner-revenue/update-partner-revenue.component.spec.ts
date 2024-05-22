import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePartnerRevenueComponent } from './update-partner-revenue.component';

describe('UpdatePartnerRevenueComponent', () => {
  let component: UpdatePartnerRevenueComponent;
  let fixture: ComponentFixture<UpdatePartnerRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePartnerRevenueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePartnerRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
