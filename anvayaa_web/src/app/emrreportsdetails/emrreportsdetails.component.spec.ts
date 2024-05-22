import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmrreportsdetailsComponent } from './emrreportsdetails.component';

describe('EmrreportsdetailsComponent', () => {
  let component: EmrreportsdetailsComponent;
  let fixture: ComponentFixture<EmrreportsdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmrreportsdetailsComponent]
    });
    fixture = TestBed.createComponent(EmrreportsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
