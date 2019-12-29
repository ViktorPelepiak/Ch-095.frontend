import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-bar-chart-component',
  templateUrl: './question..component.html',
  styleUrls: ['./question-statistic.component.css'],

})
export class QuestionStatisticComponent implements OnInit {

  constructor(){
  }

  public title: string;
  public question : string ;
  public barChartData: any[] = [{data :[]}] ;
  public barChartLabels: string[] = [] ;
  public answers: string[][];
  public typeQuestions = '';
  public numberVoters: number;


  ngOnInit()
  {

  }

}


