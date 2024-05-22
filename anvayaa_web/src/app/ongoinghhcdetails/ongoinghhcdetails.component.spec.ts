import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoinghhcdetailsComponent } from './ongoinghhcdetails.component';

describe('OngoinghhcdetailsComponent', () => {
  let component: OngoinghhcdetailsComponent;
  let fixture: ComponentFixture<OngoinghhcdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OngoinghhcdetailsComponent]
    });
    fixture = TestBed.createComponent(OngoinghhcdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
