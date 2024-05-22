import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortlistprofileComponent } from './shortlistprofile.component';

describe('ShortlistprofileComponent', () => {
  let component: ShortlistprofileComponent;
  let fixture: ComponentFixture<ShortlistprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShortlistprofileComponent]
    });
    fixture = TestBed.createComponent(ShortlistprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
