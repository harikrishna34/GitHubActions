import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorManagerComponent } from './anchor-manager.component';

describe('AnchorManagerComponent', () => {
  let component: AnchorManagerComponent;
  let fixture: ComponentFixture<AnchorManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnchorManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnchorManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
