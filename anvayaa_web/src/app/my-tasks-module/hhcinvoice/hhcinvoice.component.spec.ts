import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HHCInvoiceComponent } from './hhcinvoice.component';

describe('HHCInvoiceComponent', () => {
  let component: HHCInvoiceComponent;
  let fixture: ComponentFixture<HHCInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HHCInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HHCInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
