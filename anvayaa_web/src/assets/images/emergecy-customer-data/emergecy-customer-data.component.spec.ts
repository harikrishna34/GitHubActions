import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergecyCustomerDataComponent } from './emergecy-customer-data.component';

describe('EmergecyCustomerDataComponent', () => {
  let component: EmergecyCustomerDataComponent;
  let fixture: ComponentFixture<EmergecyCustomerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergecyCustomerDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergecyCustomerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
