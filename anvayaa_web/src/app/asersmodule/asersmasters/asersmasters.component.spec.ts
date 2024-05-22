import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsersmastersComponent } from './asersmasters.component';

describe('AsersmastersComponent', () => {
  let component: AsersmastersComponent;
  let fixture: ComponentFixture<AsersmastersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsersmastersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsersmastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
