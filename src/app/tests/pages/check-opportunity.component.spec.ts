import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOpportunityComponent } from '../../pages/check-opportunity/check-opportunity.component';

describe('CheckOpportunityComponent', () => {
  let component: CheckOpportunityComponent;
  let fixture: ComponentFixture<CheckOpportunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckOpportunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
