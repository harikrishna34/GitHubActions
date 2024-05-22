import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactiondetailsviewComponent } from './transactiondetailsview.component';

describe('TransactiondetailsviewComponent', () => {
  let component: TransactiondetailsviewComponent;
  let fixture: ComponentFixture<TransactiondetailsviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactiondetailsviewComponent]
    });
    fixture = TestBed.createComponent(TransactiondetailsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
