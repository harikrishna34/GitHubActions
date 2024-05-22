import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAmbulanceComponent } from './create-ambulance.component';

describe('CreateAmbulanceComponent', () => {
  let component: CreateAmbulanceComponent;
  let fixture: ComponentFixture<CreateAmbulanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAmbulanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAmbulanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
