import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NesttableComponent } from './nesttable.component';

describe('NesttableComponent', () => {
  let component: NesttableComponent;
  let fixture: ComponentFixture<NesttableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NesttableComponent]
    });
    fixture = TestBed.createComponent(NesttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
