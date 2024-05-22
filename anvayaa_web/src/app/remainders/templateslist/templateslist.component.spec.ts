import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateslistComponent } from './templateslist.component';

describe('TemplateslistComponent', () => {
  let component: TemplateslistComponent;
  let fixture: ComponentFixture<TemplateslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
