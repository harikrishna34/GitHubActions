import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestconfigurationsComponent } from './requestconfigurations.component';

describe('RequestconfigurationsComponent', () => {
  let component: RequestconfigurationsComponent;
  let fixture: ComponentFixture<RequestconfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestconfigurationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestconfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
