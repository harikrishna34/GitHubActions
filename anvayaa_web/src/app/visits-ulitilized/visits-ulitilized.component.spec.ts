import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitsUlitilizedComponent } from './visits-ulitilized.component';

describe('VisitsUlitilizedComponent', () => {
  let component: VisitsUlitilizedComponent;
  let fixture: ComponentFixture<VisitsUlitilizedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitsUlitilizedComponent]
    });
    fixture = TestBed.createComponent(VisitsUlitilizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
