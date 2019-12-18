import {AfterViewInit, Component, OnInit} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {ChartOptions} from "chart.js";


@Component({
  selector: 'app-bar-chart-component',
  templateUrl: './bar-chart-component.component.html',
  styleUrls: ['./bar-chart-component.component.css'],

})
export class BarChartComponent implements OnInit {

  constructor(){

  }

  public title: string;
  public question : string ;
  public barChartData: any[] = [{data :[]}] ;
  public barChartLabels: string[] = [] ;
  public barChartType = 'pie';
  public numberVoters: number;


  ngOnInit()
  {

  }

}


