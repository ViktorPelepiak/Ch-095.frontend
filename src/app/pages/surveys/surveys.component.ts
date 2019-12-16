import {Component, OnInit} from '@angular/core';
import {Survey} from '../../models/survey';
import {SurveyService} from '../../services/survey.service';
import {Pageable} from '../../models/pageable';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from "@angular/forms";
import {RedirectUtil} from "../../util/redirect-util";

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css']
})
export class SurveysComponent implements OnInit {

  surveys: Survey[];
  tempSurvey: number;
  isCloneContacts: boolean;
  pageable: Pageable;
  title = new FormControl();

  constructor(private service: SurveyService, private router: Router, private route: ActivatedRoute) {
    this.tempSurvey = 0;
  }

  ngOnInit() {
    this.pageable = {
      currentPage: Number(this.route.snapshot.queryParamMap.get('page')),
      lastPage: null,
      size: +this.route.snapshot.queryParamMap.get('size'),
      sort: {
        direction: this.route.snapshot.queryParamMap.get('direction'),
        fields: this.route.snapshot.queryParamMap.getAll('sort')
      }
    };
    this.service.getSurveys(this.pageable)
      .toPromise()
      .then(e => {
        console.log(e);
        this.surveys = e.items
        this.pageable = e.pageable
        ++this.pageable.currentPage
      })
      .catch(e => console.error(e));
  }

  surveyUpdateTitle() {
    console.log(this.tempSurvey)
    this.service.surveyUpdateTitle(this.tempSurvey, this.title.value)
      .toPromise()
      .then(e => console.log(e))
      .catch(e => console.error(e));
  }

  surveyStatusDone(id: number) {
    this.service.surveyStatusDone(id)
      .toPromise()
      .then(e => console.log(e))
      .catch(e => console.error(e));
  }

  clone() {
    this.service.cloneSurvey(this.tempSurvey, this.isCloneContacts)
      .toPromise()
      .then(e => {
        this.surveys.push(e);
        console.log(e)
      })
      .catch(e => console.error(e));
  }

  deleteSurvey(id: number) {
    this.service.deleteSurvey(id)
      .toPromise()
      .then(e => {
        if (e === 'OK') {
          this.surveys.splice(this.surveys.findIndex(i => i.id === id), 1)
          console.log(e)
        }
      })
      .catch(e => console.error(e));
  }

  changeTempSurvey(survey: Survey): void {
    this.tempSurvey = survey.id;
    this.title.setValue(survey.title);
  }

  buildPages(): number[] {
    /* todo some logic */
    return [1, 2, 3, 4, 5];
  }

  previousPage(): void {
    if (this.pageable.currentPage - 1 >= 1){
      RedirectUtil.setParam('page', String(this.pageable.currentPage - 1));
    }
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.pageable.lastPage){
      RedirectUtil.setParam('page', String(this.pageable.currentPage - 1));
    }
  }

  nextPage(): void {
    if (this.pageable.currentPage + 1 <= this.pageable.lastPage){
      RedirectUtil.setParam('page', String(this.pageable.currentPage + 1));
    }
  }

}
