import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckCommonComponent } from '../../pages/check-possibility/check-common/check-common.component';

describe('CheckCommonComponent', () => {
  let component: CheckCommonComponent;
  let fixture: ComponentFixture<CheckCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
