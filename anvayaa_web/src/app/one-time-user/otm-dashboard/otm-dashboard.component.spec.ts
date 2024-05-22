import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OTMDashboardComponent } from './otm-dashboard.component';

describe('OTMDashboardComponent', () => {
  let component: OTMDashboardComponent;
  let fixture: ComponentFixture<OTMDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OTMDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OTMDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
