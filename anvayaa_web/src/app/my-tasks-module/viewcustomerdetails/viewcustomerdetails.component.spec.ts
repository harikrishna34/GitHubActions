import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcustomerdetailsComponent } from './viewcustomerdetails.component';

describe('ViewcustomerdetailsComponent', () => {
  let component: ViewcustomerdetailsComponent;
  let fixture: ComponentFixture<ViewcustomerdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewcustomerdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcustomerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
