import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSeparatelyComponent } from './question-separately.component';

describe('EachQuestionComponent', () => {
  let component: QuestionSeparatelyComponent;
  let fixture: ComponentFixture<QuestionSeparatelyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionSeparatelyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSeparatelyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
