import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Question} from "../../models/question";
import {SaveSurvey} from "../../models/SaveSurvey";
import {SaveSurveyService} from "../../services/save-survey.service";

@Component({
  selector: 'app-form-constructor',
  templateUrl: './form-constructor.component.html',
  styleUrls: ['./form-constructor.component.css']
})
export class FormConstructorComponent implements OnInit {
  @Input() surveyName:string;
  questionCounter:number;
  questions:Question[];
  uploadingPhoto:{ prototype: File; new(fileBits: BlobPart[], fileName: string, options?: FilePropertyBag): File }[];

  constructor(private saveSurveyService : SaveSurveyService) {
    this.questionCounter = 0;
    this.questions = [];
    this.uploadingPhoto = [File];
  }

  ngOnInit() {
  }

  addNewQuestion(){
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

  sendSurvey(){
    let saveSurvey:SaveSurvey = new SaveSurvey();
    saveSurvey.title = this.surveyName;
    console.log(saveSurvey.title);
    saveSurvey.questions = this.questions;
    this.savePhoto();
    this.saveSurveyService.saveSurvey(saveSurvey).subscribe(x => {console.log("done")});
  }

  savePhoto(){
    this.questions.forEach(x => x.uploadingFiles.forEach( y => this.uploadingPhoto.push(y)));
    this.saveSurveyService.savePicture(this.uploadingPhoto).subscribe(x => console.log("photos uploaded"));
  }


}
