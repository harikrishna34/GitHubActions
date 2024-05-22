import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateConfigrationFromComponent } from './update-configration-from.component';

describe('UpdateConfigrationFromComponent', () => {
  let component: UpdateConfigrationFromComponent;
  let fixture: ComponentFixture<UpdateConfigrationFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateConfigrationFromComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateConfigrationFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
