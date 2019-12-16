import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-form-constructor',
  templateUrl: './form-constructor.component.html',
  styleUrls: ['./form-constructor.component.css']
})
export class FormConstructorComponent implements OnInit {
  @ViewChild("surveyName",{static: false}) surveyName:string;
  questionCounter:number;
  arrQuestions:[Question] = [{id:0,surveyName:this.surveyName,question:'',type: '',isTypeSet:false,answer:[],required:false}];

  constructor() {
    this.questionCounter = 1;

  }

  ngOnInit() {
  }

  addNewQuestion(){
    this.questionCounter = this.questionCounter + 1;
    let question = new Question();
    question.id = this.questionCounter;
    question.surveyName = this.surveyName.valueOf();
    question.question = '';
    question.isTypeSet = false;
    if(question.type)
    question.answer = [];
    question.required = false;
    this.arrQuestions.push(question);
  }

  setType(id,event:any){
    this.arrQuestions[id].type = event.target.value;
    this.arrQuestions[id].isTypeSet = true;
    if(this.arrQuestions[id].type === "CHECKBOX"){
      this.arrQuestions[id].answer.push('');
      this.arrQuestions[id].answer.push('');
    }
    if(this.arrQuestions[id].type === "RADIOBUTTON"){
      this.arrQuestions[id].answer.push('');
      this.arrQuestions[id].answer.push('');
    }
    if(this.arrQuestions[id].type === "TEXT"){
      this.arrQuestions[id].answer.push('');
    }
      console.log(JSON.stringify(this.arrQuestions));
    }

  setQuestion(index,value){
    this.arrQuestions[index].surveyName = this.surveyName;
    this.arrQuestions[index].question = value;
    console.log(this.arrQuestions[index]);
  }

  setSurveyName(surveyName){
    this.surveyName = surveyName;
    console.log(this.surveyName)
  }

}

export class Question{
  index:number;
  surveyName:string;
  question:string;
  type:string;
  isTypeSet:boolean;
  answer:String[];
  required:boolean;

  constructor() {
  }

}
