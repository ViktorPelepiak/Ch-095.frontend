import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'questionGeneralStatistic',
  templateUrl: './general-statistic.component.html',
  styleUrls: ['./general-statistic.component.css'],

})
export class GeneralStatisticComponent implements OnInit {


  private imageThing = 'data:image/png;base64,';

  constructor(){
  }

  @Input() public question : string ;
  @Input() public barChartData: any[] ;
  @Input() public barChartLabels: string[] ;
  @Input() public answers: string[][];
  @Input() public typeQuestions ;
  @Input() public numberVoters: number;
  @Input() public images: string[];


  public lineChartOptions: any = {
    responsive: true,
    scales : {
      yAxes: [{
        ticks: {
          max : 6,
          min : 0,
        }
      }],
    },
  };

  ngOnInit()
  {

  }

}


