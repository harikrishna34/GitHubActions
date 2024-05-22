import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRequestScreenComponent } from './all-request-screen.component';

describe('AllRequestScreenComponent', () => {
  let component: AllRequestScreenComponent;
  let fixture: ComponentFixture<AllRequestScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllRequestScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRequestScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
