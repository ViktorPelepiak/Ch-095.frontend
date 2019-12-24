import {Component, Input, OnInit} from '@angular/core';
import {QuestionsFormService} from '../../services/questions-form.service';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
import {SaveAnswer} from '../../models/SaveAnswer';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.css']
})

export class QuestionsPageComponent implements OnInit {

  quest: [];
  surveyId;
  contactEmail;
  questionForm = new FormGroup({
    surveyId: new FormControl(),
    contactEmail: new FormControl(),
    // answers: new FormArray([])
  });

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

  onSubmit() {
    this.submitted = true;
    console.log('result', this.questionForm.value);
    return false;
    this.questionsFormService.saveAnswers(this.questionForm)
      .subscribe(
        response => console.log('Success', response),
        // tslint:disable-next-line:no-shadowed-variable
        error => console.error('Error', error)
      );
  }

  constructor(private questionsFormService: QuestionsFormService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.getQuestions();
  }
}
