import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../models/question";
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
 @Input() public question: Question;
  isButtonDisable:boolean = true;
  isTypeSet:boolean = false;

  constructor() {
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
    console.log(JSON.stringify(this.question));
  }

  deleteVariant(variantOfAnswerIndex:number){
   this.question.answers.splice(variantOfAnswerIndex,1);
   if(this.question.answers.length === 0) this.isButtonDisable = false;
   console.log(this.question.answers);
  }


  addAnswerVariant(){
  this.question.answers.push(" ");
  console.log(this.question.answers);
  }

  setAnswerVariant(index,variantOfAnswer){
    this.question.answers[index]= variantOfAnswer;
    this.isButtonDisable = false;
    console.log(this.question.answers)
  }

}
