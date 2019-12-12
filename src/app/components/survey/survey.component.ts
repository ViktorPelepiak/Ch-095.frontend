import {Component, Input, OnInit} from '@angular/core';
import {Survey} from '../../models/survey';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  @Input('survey') public survey: Survey;

  constructor() {
  }

  ngOnInit() {
  }

}
