import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer, FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-one-question',
  templateUrl: './one-question.component.html',
  styleUrls: ['./one-question.component.css']
})
export class OneQuestionComponent implements OnInit {

  @Input() oneQuestion;
  @Input() parentForm: FormGroup;
  textValue: 'string';
  oneQuestionGroup: FormGroup;

  constructor(private controlContainer: ControlContainer) { }

  ngOnInit() {
    this.oneQuestionGroup = new FormGroup({
      questionId: new FormControl(),
      answers: new FormControl()
    });
    this.parentForm.addControl(`question[${this.oneQuestion.id}]`, this.oneQuestionGroup);
  }

}
