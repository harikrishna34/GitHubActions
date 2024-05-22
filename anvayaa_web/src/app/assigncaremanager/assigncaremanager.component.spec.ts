import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigncaremanagerComponent } from './assigncaremanager.component';

describe('AssigncaremanagerComponent', () => {
  let component: AssigncaremanagerComponent;
  let fixture: ComponentFixture<AssigncaremanagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssigncaremanagerComponent]
    });
    fixture = TestBed.createComponent(AssigncaremanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
