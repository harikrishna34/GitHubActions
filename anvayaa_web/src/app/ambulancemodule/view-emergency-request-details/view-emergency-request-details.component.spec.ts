import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmergencyRequestDetailsComponent } from './view-emergency-request-details.component';

describe('ViewEmergencyRequestDetailsComponent', () => {
  let component: ViewEmergencyRequestDetailsComponent;
  let fixture: ComponentFixture<ViewEmergencyRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmergencyRequestDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmergencyRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
