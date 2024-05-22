import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementdetailsComponent } from './agreementdetails.component';

describe('AgreementdetailsComponent', () => {
  let component: AgreementdetailsComponent;
  let fixture: ComponentFixture<AgreementdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgreementdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
