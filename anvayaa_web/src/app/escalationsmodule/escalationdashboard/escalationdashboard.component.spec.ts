import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalationdashboardComponent } from './escalationdashboard.component';

describe('EscalationdashboardComponent', () => {
  let component: EscalationdashboardComponent;
  let fixture: ComponentFixture<EscalationdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscalationdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalationdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
