import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomercomprehensiveComponent } from './customercomprehensive.component';

describe('CustomercomprehensiveComponent', () => {
  let component: CustomercomprehensiveComponent;
  let fixture: ComponentFixture<CustomercomprehensiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomercomprehensiveComponent]
    });
    fixture = TestBed.createComponent(CustomercomprehensiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
