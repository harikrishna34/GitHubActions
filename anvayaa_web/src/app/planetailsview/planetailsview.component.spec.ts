import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetailsviewComponent } from './planetailsview.component';

describe('PlanetailsviewComponent', () => {
  let component: PlanetailsviewComponent;
  let fixture: ComponentFixture<PlanetailsviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanetailsviewComponent]
    });
    fixture = TestBed.createComponent(PlanetailsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
