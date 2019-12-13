import {Component, Input, OnInit} from '@angular/core';
import {Survey} from '../../models/survey';
import {SurveyService} from "../../services/survey.service";

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  @Input('survey') public survey: Survey;

  constructor(private service: SurveyService) {
  }

  ngOnInit() {
  }

  clone(){ /* todo move it to surveys in modal */
    this.service.cloneSurvey(this.survey.id, true) /* todo change isCopyContacts */
      .toPromise()
      .then(e => console.log(e))
      .catch(e => console.log(e));
  }

}
