import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DementiaInitialAssessmentFormComponent } from './dementia-initial-assessment-form.component';

describe('DementiaInitialAssessmentFormComponent', () => {
  let component: DementiaInitialAssessmentFormComponent;
  let fixture: ComponentFixture<DementiaInitialAssessmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DementiaInitialAssessmentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DementiaInitialAssessmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
