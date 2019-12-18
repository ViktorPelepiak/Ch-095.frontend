import {Component, OnInit} from '@angular/core';
import {QuestionsFormService} from '../../services/questions-form.service';
import {Question} from '../../models/question';

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.css', './one-question/bootstrap.min.css']
})

export class QuestionsPageComponent implements OnInit {

  quest: [];
  surveyId;
  contactEmail;

  model: Question;
  submitted = false;

  getQuestions() {
  this.questionsFormService.getSurvey()
    .toPromise()
    .then((data: any) => {
      this.contactEmail = data.contactEmail;
      this.surveyId = data.surveyId;
      this.quest = data.questions;
      this.quest.forEach(item => {
        // @ts-ignore
        item.answers = (item.answers.length > 0) ? JSON.parse(item.answers) : [];
      });
    });
}

  onSubmit() { this.submitted = true; }

  constructor(private questionsFormService: QuestionsFormService) {
  }

  ngOnInit() {
  this.getQuestions();
  }
}
