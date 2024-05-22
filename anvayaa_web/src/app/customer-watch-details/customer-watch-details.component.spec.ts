import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerWatchDetailsComponent } from './customer-watch-details.component';

describe('CustomerWatchDetailsComponent', () => {
  let component: CustomerWatchDetailsComponent;
  let fixture: ComponentFixture<CustomerWatchDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerWatchDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerWatchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
