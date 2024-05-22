import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HhcPartnerInvoicesComponent } from './hhc-partner-invoices.component';

describe('HhcPartnerInvoicesComponent', () => {
  let component: HhcPartnerInvoicesComponent;
  let fixture: ComponentFixture<HhcPartnerInvoicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HhcPartnerInvoicesComponent]
    });
    fixture = TestBed.createComponent(HhcPartnerInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
