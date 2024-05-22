import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRequestsModuleComponent } from './my-requests-module.component';

describe('MyRequestsModuleComponent', () => {
  let component: MyRequestsModuleComponent;
  let fixture: ComponentFixture<MyRequestsModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRequestsModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRequestsModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
