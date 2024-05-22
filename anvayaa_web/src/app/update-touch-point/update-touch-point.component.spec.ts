import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTouchPointComponent } from './update-touch-point.component';

describe('UpdateTouchPointComponent', () => {
  let component: UpdateTouchPointComponent;
  let fixture: ComponentFixture<UpdateTouchPointComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTouchPointComponent]
    });
    fixture = TestBed.createComponent(UpdateTouchPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
