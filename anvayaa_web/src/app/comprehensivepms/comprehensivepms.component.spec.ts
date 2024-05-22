import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprehensivepmsComponent } from './comprehensivepms.component';

describe('ComprehensivepmsComponent', () => {
  let component: ComprehensivepmsComponent;
  let fixture: ComponentFixture<ComprehensivepmsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComprehensivepmsComponent]
    });
    fixture = TestBed.createComponent(ComprehensivepmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
