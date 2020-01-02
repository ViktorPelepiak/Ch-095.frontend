import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SurveySkltnComponent} from '../../components/survey-skltn/survey-skltn.component';

describe('SurveySkltnComponent', () => {
  let component: SurveySkltnComponent;
  let fixture: ComponentFixture<SurveySkltnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveySkltnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveySkltnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
