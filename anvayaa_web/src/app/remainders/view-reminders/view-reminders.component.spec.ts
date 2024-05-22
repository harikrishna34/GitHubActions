import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRemindersComponent } from './view-reminders.component';

describe('ViewRemindersComponent', () => {
  let component: ViewRemindersComponent;
  let fixture: ComponentFixture<ViewRemindersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRemindersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRemindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
