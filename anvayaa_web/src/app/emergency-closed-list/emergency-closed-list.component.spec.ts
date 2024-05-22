import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyClosedListComponent } from './emergency-closed-list.component';

describe('EmergencyClosedListComponent', () => {
  let component: EmergencyClosedListComponent;
  let fixture: ComponentFixture<EmergencyClosedListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmergencyClosedListComponent]
    });
    fixture = TestBed.createComponent(EmergencyClosedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
