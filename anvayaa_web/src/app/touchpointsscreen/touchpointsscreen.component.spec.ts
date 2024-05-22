import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouchpointsscreenComponent } from './touchpointsscreen.component';

describe('TouchpointsscreenComponent', () => {
  let component: TouchpointsscreenComponent;
  let fixture: ComponentFixture<TouchpointsscreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TouchpointsscreenComponent]
    });
    fixture = TestBed.createComponent(TouchpointsscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
