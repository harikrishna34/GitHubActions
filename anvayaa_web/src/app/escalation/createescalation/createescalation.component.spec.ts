import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateescalationComponent } from './createescalation.component';

describe('CreateescalationComponent', () => {
  let component: CreateescalationComponent;
  let fixture: ComponentFixture<CreateescalationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateescalationComponent]
    });
    fixture = TestBed.createComponent(CreateescalationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
