import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGeneralStatisticComponent } from './question-general-statistic.component';

describe('BarChartComponentComponent', () => {
  let component: QuestionGeneralStatisticComponent;
  let fixture: ComponentFixture<QuestionGeneralStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionGeneralStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionGeneralStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
