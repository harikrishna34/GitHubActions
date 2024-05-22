import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliationDashboardComponent } from './application-dashboard.component';

describe('AppliationDashboardComponent', () => {
  let component: AppliationDashboardComponent;
  let fixture: ComponentFixture<AppliationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliationDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
