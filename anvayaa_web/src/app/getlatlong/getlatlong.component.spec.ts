import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetlatlongComponent } from './getlatlong.component';

describe('GetlatlongComponent', () => {
  let component: GetlatlongComponent;
  let fixture: ComponentFixture<GetlatlongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetlatlongComponent]
    });
    fixture = TestBed.createComponent(GetlatlongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
