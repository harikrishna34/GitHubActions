import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DementiaRequestComponent } from './dementia-request.component';

describe('DementiaRequestComponent', () => {
  let component: DementiaRequestComponent;
  let fixture: ComponentFixture<DementiaRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DementiaRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DementiaRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
