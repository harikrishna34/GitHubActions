import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalationinteractionComponent } from './escalationinteraction.component';

describe('EscalationinteractionComponent', () => {
  let component: EscalationinteractionComponent;
  let fixture: ComponentFixture<EscalationinteractionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EscalationinteractionComponent]
    });
    fixture = TestBed.createComponent(EscalationinteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
