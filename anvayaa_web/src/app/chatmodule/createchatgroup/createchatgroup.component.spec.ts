import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatechatgroupComponent } from './createchatgroup.component';

describe('CreatechatgroupComponent', () => {
  let component: CreatechatgroupComponent;
  let fixture: ComponentFixture<CreatechatgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatechatgroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatechatgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
