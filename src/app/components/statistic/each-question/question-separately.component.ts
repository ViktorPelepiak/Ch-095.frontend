import {Component, Input, OnInit, Output} from '@angular/core';
import {OneQuestionSeparatelyStatistic} from "../../../models/OneQuestionSeparatelyStatistic";

@Component({
  selector: 'questionSeparatelyStatistic',
  templateUrl: './question-separately.component.html',
  styleUrls: ['./question-separately.component.css']
})
export class QuestionSeparatelyStatisticComponent implements OnInit {

  constructor() { }
  ngOnInit() {
  }

  @Input() public email:string;
  @Input() public models: OneQuestionSeparatelyStatistic[];
}

