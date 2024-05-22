import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestConfigurationComponent } from './request-configuration.component';

describe('RequestConfigurationComponent', () => {
  let component: RequestConfigurationComponent;
  let fixture: ComponentFixture<RequestConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
