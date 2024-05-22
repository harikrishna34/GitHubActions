import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDetailsToChatComponent } from './add-details-to-chat.component';

describe('AddDetailsToChatComponent', () => {
  let component: AddDetailsToChatComponent;
  let fixture: ComponentFixture<AddDetailsToChatComponent>;

  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDetailsToChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDetailsToChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
