import {Component, OnInit} from '@angular/core';
import {RedirectUtil} from '../../util/redirect-util';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-survey-top-buttons',
  templateUrl: './survey-top-buttons.component.html',
  styleUrls: ['./survey-top-buttons.component.css']
})
export class SurveyTopButtonsComponent implements OnInit {

  private redirects: RedirectUtil;
  private link: any[] = ['surveys'];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.redirects = new RedirectUtil(router, route);
  }

  ngOnInit() {
  }

  setParam(name: string, value: string) {
    this.redirects.setParam(name, value, this.link);
  }

  deleteParam(name: string) {
    this.redirects.deleteParam(name, this.link)
  }

  setParam2(name: string, value: string, name2: string, value2: string) {
    this.redirects.setParam2(name, value, name2, value2, this.link);
  }

}
