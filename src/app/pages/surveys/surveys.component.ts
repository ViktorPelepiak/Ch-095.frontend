import {Component, OnInit} from '@angular/core';
import {Survey} from '../../models/survey';
import {SurveyService} from "../../services/survey.service";
import {Pageable} from "../../models/pageable";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css']
})
export class SurveysComponent implements OnInit {

  surveys: Survey[];
  tempSurvey: Survey;
  pageable: Pageable;

  constructor(private service: SurveyService, private route: ActivatedRoute) {
    this.surveys = [
      {
        id: 1, image: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?' +
          'ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80', title: 'Large height photo lol and super large text!'
      },
      {
        id: 2, image: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/1572B/production/' +
          '_88615878_976x1024n0037151.jpg', title: 'Hands for what..'
      },
      {
        id: 3, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS7HCO7' +
          'BueXUImWfcyS9l8SMSFMKOhskNIxFJrxZbI2hQ_HlrpY', title: 'Large width photo :)'
      },
      {
        id: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSfGfvz' +
          'nfrejjL7jIzy_shCzbcIiwlSJdVsdz3hity-M73V67Wo', title: 'Small photo'
      },
      {
        id: 5, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQYJlgh' +
          '5AVnwhfACl71fmhnQdn80Dj0gSSkPLxlYWLbkoStNtCs', title: 'Wtf lol..'
      },
    ];
    this.tempSurvey = {id: 0, image: "", title: ""};
  }

  ngOnInit() {
    let direction: string = this.route.snapshot.queryParamMap.get("direction");
    direction = direction === null ? 'ASC' : direction;
    this.pageable = {
      currentPage: Number(this.route.snapshot.paramMap.get("page")),
      lastPage: 0,
      size: +this.route.snapshot.queryParamMap.get("size"),
      sort: {direction,
        fields:this.route.snapshot.queryParamMap.getAll("direction")}
    };
    this.service.getSurveys(this.pageable)
      .toPromise()
      .then(e => {
        console.log(e);
        // this.surveys = e.result.items
      })
      .catch(e => console.log(e));
  }

  clone(isClearContacts: boolean) {
    this.service.cloneSurvey(this.tempSurvey.id, isClearContacts)
      .toPromise()
      .then(e => console.log(e))
      .catch(e => console.log(e));
  }

}
