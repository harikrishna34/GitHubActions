import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewrolesComponent } from './viewroles.component';

describe('ViewrolesComponent', () => {
  let component: ViewrolesComponent;
  let fixture: ComponentFixture<ViewrolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewrolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewrolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
