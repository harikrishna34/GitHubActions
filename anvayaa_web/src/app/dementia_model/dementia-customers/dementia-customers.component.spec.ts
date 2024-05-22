import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DementiaCustomersComponent } from './dementia-customers.component';

describe('DementiaCustomersComponent', () => {
  let component: DementiaCustomersComponent;
  let fixture: ComponentFixture<DementiaCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DementiaCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DementiaCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
