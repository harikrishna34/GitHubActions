import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DementiaScheduleModelComponent } from './dementia-schedule-model.component';

describe('DementiaScheduleModelComponent', () => {
  let component: DementiaScheduleModelComponent;
  let fixture: ComponentFixture<DementiaScheduleModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DementiaScheduleModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DementiaScheduleModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
