import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'questionGeneralStatistic',
  templateUrl: './question..component.html',
  styleUrls: ['./question-general-statistic.component.css'],

})
export class QuestionGeneralStatisticComponent implements OnInit {

  constructor(){
  }

  @Input() public question : string ;
  @Input() public barChartData: any[] ;
  @Input() public barChartLabels: string[] ;
  @Input() public answers: string[][];
  @Input() public typeQuestions ;
  @Input() public numberVoters: number;
  @Input() public images: string[];

  ngOnInit()
  {

  }

}


