import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Question} from "../form-constructor/form-constructor.component";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
 @Input() public question: Question;

  constructor() {
  }

  ngOnInit() {
  }

  // addNewQuestion(){
  //   this.questionCounter++;
  //   let question = new Question();
  //   question.index = this.questionCounter;
  //   question.question = '';
  //   question.isTypeSet = false;
  //   // if(question.type)
  //     question.answers = [];
  //   question.required = false;
  //   // this.arrQuestions.push(question);
  //   this.question = question;
  // }

  // setType(event:any){
  //   this.question.type = event.target.value;
  //   // this.question.isTypeSet = true;
  //   if(this.question.type === "CHECKBOX"){
  //     this.question.answers.push('');
  //     this.question.answers.push('');
  //   }
  //   if(this.question.type === "RADIOBUTTON"){
  //     this.question.answers.push('');
  //     this.question.answers.push('');
  //   }
  //   if(this.question.type === "TEXT"){
  //     this.question.answers.push('');
  //   }
  // }
  //
  // setQuestion(value, s: string){
  //   this.question = value;
  // }

}
