import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDashboardComponent } from './request-dashboard.component';

describe('RequestDashboardComponent', () => {
  let component: RequestDashboardComponent;
  let fixture: ComponentFixture<RequestDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
