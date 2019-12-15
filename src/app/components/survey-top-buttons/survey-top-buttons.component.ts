import {Component, OnInit} from '@angular/core';
import {RedirectUtil} from '../../util/redirect-util';

@Component({
  selector: 'app-survey-top-buttons',
  templateUrl: './survey-top-buttons.component.html',
  styleUrls: ['./survey-top-buttons.component.css']
})
export class SurveyTopButtonsComponent implements OnInit {

  private redirects: RedirectUtil;

  constructor() {
    this.redirects = new RedirectUtil();
  }

  ngOnInit() {
  }

}
