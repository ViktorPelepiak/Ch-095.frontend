import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralStatisticComponent } from './general-statistic.component';

describe('BarChartComponentComponent', () => {
  let component: GeneralStatisticComponent;
  let fixture: ComponentFixture<GeneralStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
