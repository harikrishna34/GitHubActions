import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseTicketsComponent } from './close-tickets.component';

describe('CloseTicketsComponent', () => {
  let component: CloseTicketsComponent;
  let fixture: ComponentFixture<CloseTicketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CloseTicketsComponent]
    });
    fixture = TestBed.createComponent(CloseTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
