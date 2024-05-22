import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CometChatComponent } from './comet-chat.component';

describe('CometChatComponent', () => {
  let component: CometChatComponent;
  let fixture: ComponentFixture<CometChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CometChatComponent]
    });
    fixture = TestBed.createComponent(CometChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
