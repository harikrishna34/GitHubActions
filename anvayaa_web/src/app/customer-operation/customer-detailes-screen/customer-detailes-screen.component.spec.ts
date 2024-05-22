import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailesScreenComponent } from './customer-detailes-screen.component';

describe('CustomerDetailesScreenComponent', () => {
  let component: CustomerDetailesScreenComponent;
  let fixture: ComponentFixture<CustomerDetailesScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDetailesScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
