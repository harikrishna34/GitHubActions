import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DementiacompleteandopenrequestComponent } from './dementiacompleteandopenrequest.component';

describe('DementiacompleteandopenrequestComponent', () => {
  let component: DementiacompleteandopenrequestComponent;
  let fixture: ComponentFixture<DementiacompleteandopenrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DementiacompleteandopenrequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DementiacompleteandopenrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
