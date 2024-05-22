import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsersmonitoringComponent } from './asersmonitoring.component';

describe('AsersmonitoringComponent', () => {
  let component: AsersmonitoringComponent;
  let fixture: ComponentFixture<AsersmonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsersmonitoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsersmonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
