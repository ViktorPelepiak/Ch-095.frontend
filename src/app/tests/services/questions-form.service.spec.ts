import { TestBed } from '@angular/core/testing';

import { QuestionsFormService } from '../../services/questions-form.service';

describe('QuestionsFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionsFormService = TestBed.get(QuestionsFormService);
    expect(service).toBeTruthy();
  });
});
