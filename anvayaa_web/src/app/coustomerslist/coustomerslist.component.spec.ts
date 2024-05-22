import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoustomerslistComponent } from './coustomerslist.component';

describe('CoustomerslistComponent', () => {
  let component: CoustomerslistComponent;
  let fixture: ComponentFixture<CoustomerslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoustomerslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoustomerslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
