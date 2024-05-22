import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollbackComponent } from './rollback.component';

describe('RollbackComponent', () => {
  let component: RollbackComponent;
  let fixture: ComponentFixture<RollbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RollbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
