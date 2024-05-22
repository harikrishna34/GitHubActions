import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DementiaCreateScheduleComponent } from './dementia-create-schedule.component';

describe('DementiaCreateScheduleComponent', () => {
  let component: DementiaCreateScheduleComponent;
  let fixture: ComponentFixture<DementiaCreateScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DementiaCreateScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DementiaCreateScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
