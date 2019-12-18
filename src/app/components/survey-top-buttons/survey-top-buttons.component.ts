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

  setParam(name: string, value: string){
    RedirectUtil.setParam(name, value)
  }

  deleteParam(name: string){
    RedirectUtil.deleteParam(name)
  }

  setParam2(name: string, value: string, name2: string, value2: string){
    RedirectUtil.setParam2(name, value, name2, value2);
  }

}
