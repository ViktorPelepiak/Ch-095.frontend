import {Component, OnInit} from '@angular/core';
import {QuestionsFormService} from '../../services/questions-form.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.css']
})

export class QuestionsPageComponent implements OnInit {

  constructor(private questionsFormService: QuestionsFormService, private router: Router) {}
  quest: [];
  surveyId;
  contactEmail;
  questionForm = new FormGroup({
    surveyId: new FormControl(),
    contactEmail: new FormControl(),
    answers: new FormArray([])
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
        item.choiceAnswers = (item.choiceAnswers.length > 0) ? JSON.parse(item.choiceAnswers) : [];
      });
    });
  }

  onSubmit() {
    this.submitted = true;
    this.questionsFormService.saveAnswers(this.questionForm.value)
      .subscribe(
        response => console.log('Success', response),
        // tslint:disable-next-line:no-shadowed-variable
        error => console.error('Error', error)
      );
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    this.getQuestions();
  }
}
