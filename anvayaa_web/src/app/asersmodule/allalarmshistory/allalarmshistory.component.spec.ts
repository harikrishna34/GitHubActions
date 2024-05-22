import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllalarmshistoryComponent } from './allalarmshistory.component';

describe('AllalarmshistoryComponent', () => {
  let component: AllalarmshistoryComponent;
  let fixture: ComponentFixture<AllalarmshistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllalarmshistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllalarmshistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
