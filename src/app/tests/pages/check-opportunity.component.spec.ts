import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CheckPossibilityComponent} from '../../pages/check-possibility/check-possibility.component';

describe('CheckOpportunityComponent', () => {
  let component: CheckPossibilityComponent;
  let fixture: ComponentFixture<CheckPossibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckPossibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckPossibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
