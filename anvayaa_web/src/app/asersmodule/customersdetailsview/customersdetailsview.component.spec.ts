import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersdetailsviewComponent } from './customersdetailsview.component';

describe('CustomersdetailsviewComponent', () => {
  let component: CustomersdetailsviewComponent;
  let fixture: ComponentFixture<CustomersdetailsviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomersdetailsviewComponent]
    });
    fixture = TestBed.createComponent(CustomersdetailsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
