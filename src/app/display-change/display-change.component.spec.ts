import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayChangeComponent } from './display-change.component';

describe('DisplayChangeComponent', () => {
  let component: DisplayChangeComponent;
  let fixture: ComponentFixture<DisplayChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
