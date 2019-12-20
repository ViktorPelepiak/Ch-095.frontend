import { TestBed } from '@angular/core/testing';

import { CheckOpportunityService } from '../../services/check-opportunity.service';

describe('CheckOpportunityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckOpportunityService = TestBed.get(CheckOpportunityService);
    expect(service).toBeTruthy();
  });
});
