import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PWDAttachmentsComponent } from './pwd-attachments.component';

describe('PWDAttachmentsComponent', () => {
  let component: PWDAttachmentsComponent;
  let fixture: ComponentFixture<PWDAttachmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PWDAttachmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PWDAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
