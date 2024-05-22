import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewactivecustomersComponent } from './viewactivecustomers.component';

describe('ViewactivecustomersComponent', () => {
  let component: ViewactivecustomersComponent;
  let fixture: ComponentFixture<ViewactivecustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewactivecustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewactivecustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
