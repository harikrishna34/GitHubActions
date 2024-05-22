import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRemaindersComponent } from './create-remainders.component';

describe('CreateRemaindersComponent', () => {
  let component: CreateRemaindersComponent;
  let fixture: ComponentFixture<CreateRemaindersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRemaindersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRemaindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
