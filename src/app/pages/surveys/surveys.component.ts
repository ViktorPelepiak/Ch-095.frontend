import {Component, OnInit} from '@angular/core';
import {Survey} from '../../models/survey';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css']
})
export class SurveysComponent implements OnInit {

  surveys: Survey[];

  constructor() {
    this.surveys = [
      {id: 1, image: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?' +
          'ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80', title: 'Large height photo lol and super large text!'},
      {id: 2, image: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/1572B/production/' +
          '_88615878_976x1024n0037151.jpg', title: 'Hands for what..'},
      {id: 3, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS7HCO7' +
          'BueXUImWfcyS9l8SMSFMKOhskNIxFJrxZbI2hQ_HlrpY', title: 'Large width photo :)'},
      {id: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSfGfvz' +
          'nfrejjL7jIzy_shCzbcIiwlSJdVsdz3hity-M73V67Wo', title: 'Small photo'},
      {id: 5, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQYJlgh' +
          '5AVnwhfACl71fmhnQdn80Dj0gSSkPLxlYWLbkoStNtCs', title: 'Wtf lol..'},
    ];
  }

  ngOnInit() {
  }

}
