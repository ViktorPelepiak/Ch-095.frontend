import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from "../../models/question";
import {SaveSurveyService} from "../../services/save-survey.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() public question: Question;
  isButtonDisable: boolean = true;
  isTypeSet: boolean = false;
  previewUrls: any[] = [];
  photoValidation: string;
  static readonly MAX_UPLOAD_SIZE = 2 * 1024 * 1024;
  static readonly MAX_NUMBER_OF_OPTIONS = 4;

  @Output() deleteQuestion = new EventEmitter<number>();

  deleteQuestionFromConstructor(index: number) {
    this.deleteQuestion.next(index);
  }

  constructor() {

  }

  ngOnInit() {
    for (let i = 0; i < this.question.uploadingPhotos.length; i++) {
      this.previewUrls[i] = 'data:image/png;base64,' + this.question.uploadingPhotos[i];
    }
    this.isButtonDisable = false;
  }

  setType(event: any) {
    this.question.type = event.target.value;
    this.isTypeSet = true;
    this.question.choiceAnswers.push('');
  }

  deleteVariant(variantOfAnswerIndex: number) {
    this.question.choiceAnswers.splice(variantOfAnswerIndex, 1);
    if (this.question.choiceAnswers.length === 0) {
      this.question.type = 'not set';
    }
    if (this.isButtonDisable && this.question.choiceAnswers.length < QuestionComponent.MAX_NUMBER_OF_OPTIONS) {
      this.isButtonDisable = false;
    }
  }

  addAnswerVariant(question: Question) {
    if (question.choiceAnswers.length < QuestionComponent.MAX_NUMBER_OF_OPTIONS) {
      this.question.choiceAnswers.push(" ");
      this.isButtonDisable = true;
    }
  }

  setAnswerVariant(index, variantOfAnswer) {
    this.question.choiceAnswers[index] = variantOfAnswer;
    if (this.question.choiceAnswers.length < QuestionComponent.MAX_NUMBER_OF_OPTIONS) {
      this.isButtonDisable = false;
    }
  }

  //////////UPLOADING PHOTOS///////////////

  uploadPhoto(event, index) {
    if (this.question.choiceAnswers.length < QuestionComponent.MAX_NUMBER_OF_OPTIONS) {
      this.isButtonDisable = false;
    }
    if (this.isValidPhoto(event.target.files[0])) {
      let uploadFile = event.target.files[0];
      let blob = uploadFile.slice(0, uploadFile.size, 'image/png');
      let file = new File([blob], this.generateRandomNameForPhoto() + event.target.files[0].name, {type: 'image/png'});
      this.question.uploadingPhotos[index] = file;
      this.question.choiceAnswers[index] = file.name;
      this.preview(index);
    }
  }

  private generateRandomNameForPhoto() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


  private isValidPhoto(file: any) {
    this.photoValidation = '';
    let isValid: boolean = true;
    if (!this.isPhoto(file.type)) {
      isValid = false;
      this.photoValidation += "You have not uploaded a type photo.";
    }
    if (!this.isPhotoSmallerThanMaxValue(file.size)) {
      isValid = false;
      this.photoValidation += "Picture did not load because its size is larger than " + (QuestionComponent.MAX_UPLOAD_SIZE / (1024 * 1024) + "MB");
    }
    return isValid;
  }

  private isPhotoSmallerThanMaxValue(size: number) {
    return size < QuestionComponent.MAX_UPLOAD_SIZE;
  }

  private isPhoto(fileType: string) {
    return fileType.substr(0, 5) === "image";
  }


  preview(index) {
    let reader = new FileReader();
    reader.readAsDataURL(this.question.uploadingPhotos[index]);
    reader.onload = (_event) => {
      this.previewUrls[index] = reader.result;
    }
  }

  deletePhoto(index: number) {
    this.photoValidation = '';
    this.question.choiceAnswers.splice(index, 1);
    if (this.question.uploadingPhotos) {
      this.question.uploadingPhotos.splice(index, 1);
      this.previewUrls.splice(index, 1);
    }
    if (this.question.choiceAnswers.length === 0) this.question.type = 'not set';
    if (this.isButtonDisable) this.isButtonDisable = false;
  }

}
