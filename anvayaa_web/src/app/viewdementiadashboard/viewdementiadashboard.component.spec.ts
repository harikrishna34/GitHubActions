import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdementiadashboardComponent } from './viewdementiadashboard.component';

describe('ViewdementiadashboardComponent', () => {
  let component: ViewdementiadashboardComponent;
  let fixture: ComponentFixture<ViewdementiadashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewdementiadashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdementiadashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
