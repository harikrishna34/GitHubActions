import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingcaremanagerdetailsComponent } from './ongoingcaremanagerdetails.component';

describe('OngoingcaremanagerdetailsComponent', () => {
  let component: OngoingcaremanagerdetailsComponent;
  let fixture: ComponentFixture<OngoingcaremanagerdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OngoingcaremanagerdetailsComponent]
    });
    fixture = TestBed.createComponent(OngoingcaremanagerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
