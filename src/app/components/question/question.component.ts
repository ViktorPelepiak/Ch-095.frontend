import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../models/question";
import {SaveSurveyService} from "../../services/save-survey.service";
declare function require(path: string);

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
 @Input() public question: Question;
  isButtonDisable:boolean = true;
  isTypeSet:boolean = false;
  previewUrls:any[] = [];


  constructor(private saveSurveyService: SaveSurveyService) {
    this.previewUrls.push(null);
  }

  ngOnInit() {
  }

  setType(event:any){
   this.question.type = event.target.value;
   this.isTypeSet = true;
    if(this.question.type === 'CHECKBOX'){
     this.question.answers.push('');
    }
    if(this.question.type === "RADIOBUTTON"){
     this.question.answers.push('');
    }
    if(this.question.type === "TEXTBOX"){
     this.question.answers.push('');
    }
    if(this.question.type === "RADIO_PICTURE"){
      this.question.answers.push('');
    }
    if(this.question.type === "CHECKBOX_PICTURE"){
      this.question.answers.push('');
    }
    console.log(JSON.stringify(this.question));
  }

  deleteVariant(variantOfAnswerIndex:number){
   this.question.answers.splice(variantOfAnswerIndex,1);
   if(this.question.answers.length === 0)  this.question.type = 'not set';
   console.log(this.question.answers);
  }

  addAnswerVariant(){
  this.question.answers.push(" ");
  this.isButtonDisable = true;
  }

  setAnswerVariant(index,variantOfAnswer){
    this.question.answers[index]= variantOfAnswer;
    this.isButtonDisable = false;
  }

  //////////UPLOADING Picture///////////////

  uploadPicture(event,index){
    if(QuestionComponent.isPicture(event.target.files[0].type)){
      this.question.uploadingFiles[index] = event.target.files[0];
      this.question.answers[index] = event.target.files[0].name;
      this.isButtonDisable = false;
      this.preview(index);
    }
   else {

    }
  }

  preview(index) {
    let reader = new FileReader();
    reader.readAsDataURL(this.question.uploadingFiles[index]);
    reader.onload = (_event) => {
      this.previewUrls[index] = reader.result;
    }
  }

  private static isPicture(fileType: string) {
    return fileType.substr(0,5) === "image";
  }

  deletePicture(index:number){
    this.question.answers.splice(index,1);
    this.question.uploadingFiles.splice(index,1);
    this.previewUrls.splice(index,1);
    if(this.question.answers.length === 0) this.question.type = 'not set'
  }
}
