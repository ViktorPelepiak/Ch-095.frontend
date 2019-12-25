import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../models/question";
import {SaveSurvey} from "../../models/SaveSurvey";
import {SaveSurveyService} from "../../services/save-survey.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-form-constructor',
  templateUrl: './form-constructor.component.html',
  styleUrls: ['./form-constructor.component.css']
})
export class FormConstructorComponent implements OnInit {
  @Input() surveyName: string;
  questionCounter;
  questions: Question[];
  uploadingPhoto: File[];
  surveyPhoto:File;
  surveyPhotoName:string;

  constructor(private saveSurveyService: SaveSurveyService, private router: Router ) {
    this.surveyName = '';
    this.questionCounter = 0;
    this.questions = [];
    this.uploadingPhoto = [];
  }

  ngOnInit() {
  }

  addNewQuestion() {
    this.questionCounter = this.questionCounter + 1;
    let question = new Question();
    question.index = this.questionCounter;
    question.question = '';
    question.type = "not set";
    question.answers = [];
    question.required = false;
    console.log(question);
    this.questions.push(question);
  }

  isValidSurvey(saveSurvey: SaveSurvey) {
    let isValidSurvey: boolean = true;
    if (saveSurvey.title.length < 1) {
      document.getElementById("surveyName").style.borderBottom = "3px solid #ff2600";
      isValidSurvey = false;
    } else {
      document.getElementById("surveyName").style.borderBottom = "1px solid #000000";
    }
    if(this.questions.length == 0)
      isValidSurvey = false;

    for (let i = 0; i < saveSurvey.questions.length; i++) {
      if (saveSurvey.questions[i].question.length && saveSurvey.questions[i].question.length > 0) {
        document.getElementById("UserQuestion" + (i + 1)).style.borderBottom = "1px solid #000000";
      } else {
        document.getElementById("UserQuestion" + (i + 1)).style.borderBottom = "3px solid #ff2600";
        isValidSurvey = false;
      }
    }
    return isValidSurvey;
  }

  uploadPhoto(event){
    this.surveyPhoto = event.target.files[0];
    this.surveyPhotoName = event.target.files[0].name;
    (document.getElementById('surveyPhoto') as HTMLImageElement).src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABr0lEQVRIie2Svy9DURTHv+fequa1fwKmtsFIu7KwWAQxWRg8j4UQiY3VImHRt7GLjhYSs9faGNpgKH+BeF6q7x6L+vHUfU11kfhu937v+X7OuTnAXxeFPcjsl7dA2PyheNuxUhstA3ThzULeAZnczRigbABdusAmdA9BZsFMngCA+LhvSzgAdEGxXT+IL0b71N0IoNORUmqoariJquEmCDwM0HEzhaEAAq8UrNS0BD10PsdnOp/jMyRVpWAlpxhY+y3gyLHSu9lcaY4FXTGzzcy28uV1dr80W7RSOwzO6xt8UyZX5qCplBqSoAcWdAUgFrA9If1+ZtnDCufB2oKVotAJagnvkgmjDcIBIMa1yIj7Ui3qMrQA/zFCJMS3yepSgjnhR7UZWtOQHQPw1SkAr4HtSeGf+R0YaBnAEMvOUvqWmBcDEI+JrIv53jsQVloGADw5mCuvOovpAyH9fmIyicmMcK2vuJA8zNildQDjugTtFn1Mwnli2qvGXQcAok9G9q3zH8PrWxTRT1DvgiZAmIi6RqCtcH3+ovvmy0JV+Q4QZH42fhNOILMNOf9qk14BwZ+bhyOqPgEAAAAASUVORK5CYII=";
  }


  sendSurvey() {
    let saveSurvey: SaveSurvey = new SaveSurvey();
    saveSurvey.surveyPhotoName = this.surveyPhotoName;
    saveSurvey.title = this.surveyName;
    console.log(saveSurvey.title);
    saveSurvey.questions = this.questions;
    if (this.isValidSurvey(saveSurvey) == true) {
      this.savePhoto();
      this.saveSurveyService.saveSurvey(saveSurvey).subscribe(x => this.router.navigateByUrl("/surveys"));
    }
    }


  savePhoto() {
    if(this.surveyPhoto) this.uploadingPhoto.push(this.surveyPhoto);
    this.questions.forEach(x => x.uploadingFiles.forEach(y => this.uploadingPhoto.push(y)));
    this.saveSurveyService.savePicture(this.uploadingPhoto).subscribe();
  }

}
