import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsersmonitoringstepsComponent } from './asersmonitoringsteps.component';

describe('AsersmonitoringstepsComponent', () => {
  let component: AsersmonitoringstepsComponent;
  let fixture: ComponentFixture<AsersmonitoringstepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsersmonitoringstepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsersmonitoringstepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
