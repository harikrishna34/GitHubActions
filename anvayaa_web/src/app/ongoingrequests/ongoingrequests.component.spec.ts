import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingrequestsComponent } from './ongoingrequests.component';

describe('OngoingrequestsComponent', () => {
  let component: OngoingrequestsComponent;
  let fixture: ComponentFixture<OngoingrequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngoingrequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
