import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionStatisticComponent } from './question-statistic.component';

describe('BarChartComponentComponent', () => {
  let component: QuestionStatisticComponent;
  let fixture: ComponentFixture<QuestionStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
