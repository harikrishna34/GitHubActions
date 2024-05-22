import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DementiafeedbackandopenfbComponent } from './dementiafeedbackandopenfb.component';

describe('DementiafeedbackandopenfbComponent', () => {
  let component: DementiafeedbackandopenfbComponent;
  let fixture: ComponentFixture<DementiafeedbackandopenfbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DementiafeedbackandopenfbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DementiafeedbackandopenfbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
