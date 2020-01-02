import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormConstructorComponent} from './form-constructor.component';

describe('FormConstructorComponent', () => {
  let component: FormConstructorComponent;
  let fixture: ComponentFixture<FormConstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormConstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
