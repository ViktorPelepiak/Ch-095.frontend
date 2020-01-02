import {TestBed} from '@angular/core/testing';

import {SaveSurveyService} from './save-survey.service';

describe('SaveSurveyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveSurveyService = TestBed.get(SaveSurveyService);
    expect(service).toBeTruthy();
  });
});
