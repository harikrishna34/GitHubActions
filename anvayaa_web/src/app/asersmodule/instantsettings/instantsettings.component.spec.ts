import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstantsettingsComponent } from './instantsettings.component';

describe('InstantsettingsComponent', () => {
  let component: InstantsettingsComponent;
  let fixture: ComponentFixture<InstantsettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstantsettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstantsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
