import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyTopButtonsComponent } from '../../components/survey-top-buttons/survey-top-buttons.component';

describe('SurveyTopButtonsComponent', () => {
  let component: SurveyTopButtonsComponent;
  let fixture: ComponentFixture<SurveyTopButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyTopButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyTopButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
