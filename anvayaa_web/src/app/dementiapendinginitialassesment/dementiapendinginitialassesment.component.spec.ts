import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DementiapendinginitialassesmentComponent } from './dementiapendinginitialassesment.component';

describe('DementiapendinginitialassesmentComponent', () => {
  let component: DementiapendinginitialassesmentComponent;
  let fixture: ComponentFixture<DementiapendinginitialassesmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DementiapendinginitialassesmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DementiapendinginitialassesmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
