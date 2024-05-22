import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyplanComponent } from './emergencyplan.component';

describe('EmergencyplanComponent', () => {
  let component: EmergencyplanComponent;
  let fixture: ComponentFixture<EmergencyplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergencyplanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
