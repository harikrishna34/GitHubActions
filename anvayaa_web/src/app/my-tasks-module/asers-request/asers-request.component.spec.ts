import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsersRequestComponent } from './asers-request.component';

describe('AsersRequestComponent', () => {
  let component: AsersRequestComponent;
  let fixture: ComponentFixture<AsersRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsersRequestComponent]
    });
    fixture = TestBed.createComponent(AsersRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
