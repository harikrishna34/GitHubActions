import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompilitionScreenComponent } from './compilition-screen.component';

describe('CompilitionScreenComponent', () => {
  let component: CompilitionScreenComponent;
  let fixture: ComponentFixture<CompilitionScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompilitionScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompilitionScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
