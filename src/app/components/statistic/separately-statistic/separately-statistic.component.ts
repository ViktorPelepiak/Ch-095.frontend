import {Component, Input, OnInit} from '@angular/core';
import {OneQuestionSeparatelyStatistic} from "../../../models/OneQuestionSeparatelyStatistic";

@Component({
  selector: 'questionSeparatelyStatistic',
  templateUrl: './separately-statistic.component.html',
  styleUrls: ['./separately-statistic.component.css']
})
export class SeparatelyStatisticComponent implements OnInit {


  private imageThing = 'data:image/png;base64,';

  constructor() { }
  ngOnInit() {
  }

  @Input() public email:string;
  @Input() public models: OneQuestionSeparatelyStatistic[];
}

