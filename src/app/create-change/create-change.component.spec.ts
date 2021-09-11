import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChangeComponent } from './create-change.component';

describe('CreateChangeComponent', () => {
  let component: CreateChangeComponent;
  let fixture: ComponentFixture<CreateChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
