import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DementiadashboardComponent } from './dementiadashboard.component';

describe('DementiadashboardComponent', () => {
  let component: DementiadashboardComponent;
  let fixture: ComponentFixture<DementiadashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DementiadashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DementiadashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
