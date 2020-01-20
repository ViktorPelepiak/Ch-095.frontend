import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../models/question";
import {SaveSurvey} from "../../models/SaveSurvey";
import {SaveSurveyService} from "../../services/save-survey.service";
import {ActivatedRoute, Router} from '@angular/router';
import {EditSurvey} from "../../models/EditSurvey";
import {SurveyService} from "../../services/survey.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-form-constructor',
  templateUrl: './form-constructor.component.html',
  styleUrls: ['./form-constructor.component.css']
})
export class FormConstructorComponent implements OnInit {

  surveyId: string;
  @Input() surveyName: string;
  questionCounter;
  questions: Question[];
  uploadingPhoto: any;
  surveyPhoto: File;
  surveyType: string;
  surveyPhotoName: string;
  errorValidation: string;

  constructor(private surveyService: SurveyService, private saveSurveyService: SaveSurveyService,
              private router: Router, private route: ActivatedRoute) {
    this.surveyName = '';
    this.questionCounter = 0;
    this.questions = [];
    this.uploadingPhoto = [];

  }

  ngOnInit() {
    this.surveyId = this.route.snapshot.paramMap.get('id');
    if (this.surveyId !== null) {
      this.surveyService.editSurvey(this.surveyId)
        .toPromise()
        .then(data => {
          this.questions = data.questions;
          console.log(this.questions);
          this.surveyName = data.title;
          // this.surveyType = data.surveyType;
          this.surveyPhotoName = data.surveyPhotoName;
          this.questionCounter = data.questions.length;
        });
    }
  }


  deleteQuestion(index: number) {
    this.questionCounter--;
    this.questions.splice(index - 1, 1);
    for (let questionIndex = 0; questionIndex < this.questions.length; questionIndex++) {
      this.questions[questionIndex].index = questionIndex + 1;
    }
  }

  setSurveyType(event: any) {
    this.surveyType = event.target.value;
    this.addRequiredQuestionForCommonSurvey();
  }

  addRequiredQuestionForCommonSurvey(){
    let question = new Question();
    question.index = 0;
    question.question = '';
    question.type = "TEXTBOX";
    question.choiceAnswers = [];
    question.required = false;
    if(this.questions.length > 0){
      this.questionCounter = this.questionCounter + 1;
    }
    this.questions.unshift(question);
  }


  addNewQuestion() {
    this.questionCounter = this.questionCounter + 1;
    let question = new Question();
    question.index = this.questionCounter;
    question.question = '';
    question.type = "not set";
    question.choiceAnswers = [];
    question.required = false;
    this.questions.push(question);
  }


  uploadSurveyPhoto(event) {
    this.surveyPhoto = event.target.files[0];
    this.surveyPhotoName = event.target.files[0].name;
    (document.getElementById('surveyPhoto') as HTMLImageElement).src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABr0lEQVRIie2Svy9DURTHv+fequa1fwKmtsFIu7KwWAQxWRg8j4UQiY3VImHRt7GLjhYSs9faGNpgKH+BeF6q7x6L+vHUfU11kfhu937v+X7OuTnAXxeFPcjsl7dA2PyheNuxUhstA3ThzULeAZnczRigbABdusAmdA9BZsFMngCA+LhvSzgAdEGxXT+IL0b71N0IoNORUmqoariJquEmCDwM0HEzhaEAAq8UrNS0BD10PsdnOp/jMyRVpWAlpxhY+y3gyLHSu9lcaY4FXTGzzcy28uV1dr80W7RSOwzO6xt8UyZX5qCplBqSoAcWdAUgFrA9If1+ZtnDCufB2oKVotAJagnvkgmjDcIBIMa1yIj7Ui3qMrQA/zFCJMS3yepSgjnhR7UZWtOQHQPw1SkAr4HtSeGf+R0YaBnAEMvOUvqWmBcDEI+JrIv53jsQVloGADw5mCuvOovpAyH9fmIyicmMcK2vuJA8zNildQDjugTtFn1Mwnli2qvGXQcAok9G9q3zH8PrWxTRT1DvgiZAmIi6RqCtcH3+ovvmy0JV+Q4QZH42fhNOILMNOf9qk14BwZ+bhyOqPgEAAAAASUVORK5CYII=";
  }


  sendSurvey() {
    if (this.surveyId) {
      let editSurvey: EditSurvey = new EditSurvey();
      editSurvey.surveyPhotoName = this.surveyPhotoName;
      editSurvey.title = this.surveyName;
      editSurvey.questions = this.questions;
      editSurvey.surveyId = this.surveyId;
      if (this.isValidSurvey(editSurvey)) {
        this.savePhoto();
        this.surveyService.saveEditedSurvey(editSurvey).subscribe(x => this.router.navigateByUrl("/surveys"));
      }
    } else {
      let saveSurvey: SaveSurvey = new SaveSurvey();
      saveSurvey.surveyPhotoName = this.surveyPhotoName;
      saveSurvey.title = this.surveyName;
      saveSurvey.questions = this.questions;
      if (this.isValidSurvey(saveSurvey)) {
        this.savePhoto();
        this.saveSurveyService.saveSurvey(saveSurvey).subscribe(x => this.router.navigateByUrl("/surveys"));
      }
    }
  }


  savePhoto() {
    if (this.surveyPhoto) this.uploadingPhoto.push(this.surveyPhoto);
    this.questions.forEach(x => x.uploadingPhotos.forEach(y => this.uploadingPhoto.push(y)));
    this.saveSurveyService.savePhotos(this.uploadingPhoto).subscribe();
  }


  isValidSurvey(saveSurvey: SaveSurvey) {
    let isValidSurvey: boolean = true;
    if (!this.isValidSurveyName(saveSurvey.title)) isValidSurvey = false;
    if (!this.isSurveyHasQuestions(saveSurvey.questions.length)) isValidSurvey = false;
    if (!this.isAllQuestionsInput(saveSurvey.questions)) isValidSurvey = false;
    if (!this.isInAllQuestionsUserChooseType(saveSurvey.questions)) isValidSurvey = false;
    return isValidSurvey;
  }

  private isValidSurveyName(surveyName: string) {
    this.errorValidation = " ";
    if (surveyName.length < 1) {
      document.getElementById("surveyName").style.borderBottom = "3px dotted #000000";
      this.errorValidation += "Input survey name. "
      return false;
    } else {
      document.getElementById("surveyName").style.borderBottom = "1px solid #000000";
      return true;
    }
  }

  private isSurveyHasQuestions(questionsQuantity: number) {
    if (questionsQuantity > 0) {
      return true;
    } else {
      this.errorValidation += "Add minimum 1 question. "
      return false;
    }
  }

  private isAllQuestionsInput(questions: Question[]) {
    let isValidSurvey = true;
    let atLeastOneQuestionAbsent = false;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].question.length && questions[i].question.length > 0) {
        document.getElementById("UserQuestion" + (i + 1)).style.borderBottom = "1px solid #000000";

      } else {
        if (!atLeastOneQuestionAbsent) {
          this.errorValidation += "Input your question № : " + (i + 1);
          atLeastOneQuestionAbsent = true;
        } else {
          this.errorValidation += ", " + (i + 1);
        }
        atLeastOneQuestionAbsent = true;
        document.getElementById("UserQuestion" + (i + 1)).style.borderBottom = "3px dotted #000000";
        isValidSurvey = false;
      }
    }
    if (atLeastOneQuestionAbsent) this.errorValidation += ". ";
    return isValidSurvey;
  }

  private isInAllQuestionsUserChooseType(questions: Question[]) {
    let atLeastOneQuestionHasntGotType = false;
    let isValidSurvey = true;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].type === 'not set') {
        if (!atLeastOneQuestionHasntGotType) {
          this.errorValidation += "Choose type in question № : " + (i + 1);
          atLeastOneQuestionHasntGotType = true;
        } else {
          this.errorValidation += "," + (i + 1);
        }
        isValidSurvey = false;
      }
    }
    return isValidSurvey;
  }

}
