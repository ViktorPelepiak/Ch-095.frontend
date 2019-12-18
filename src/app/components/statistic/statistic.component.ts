import {Component, ComponentFactoryResolver, ViewContainerRef, OnInit, ViewChild} from '@angular/core';
// import {BarChartComponent} from "./bar-chart-component/bar-chart-component.component";
// import {StatisticService} from "../../services/statistic.service";
// import {Question} from "../../entities/question";
import {ActivatedRoute} from "@angular/router";
import {BarChartComponent} from "./bar-chart-component/bar-chart-component.component";
import {StatisticService} from "../../services/statistic.service";
import {Question} from "../../models/question";


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
  entryComponents: [BarChartComponent]
})
export class StatisticComponent implements OnInit {

  @ViewChild("question", {static: true, read: ViewContainerRef})
  questionViewRef: ViewContainerRef;

  private title: string;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private statisticService: StatisticService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.initializeStatisticComponent()
  }

  initializeNewChart(barChartComponentRef, data: number[], labels: string[],
                     question: string){
    (<BarChartComponent>barChartComponentRef.instance).barChartData = [
      {data: data}
    ];

    (<BarChartComponent>barChartComponentRef.instance)
      .barChartLabels = labels;

    (<BarChartComponent>barChartComponentRef.instance)
      .question = question;

    (<BarChartComponent>barChartComponentRef.instance)
      .barChartType = 'pie';

    let numberVoters = 0;
    data.forEach(value => {numberVoters += value});
    (<BarChartComponent>barChartComponentRef.instance)
      .numberVoters = numberVoters;


  }

  createBarChartComponents(dataQuestions: Question[]){
    let barChart = this.componentFactoryResolver.resolveComponentFactory(BarChartComponent);
    dataQuestions.sort((a, b) => a.index - b.index)
    dataQuestions.forEach(question => {

      let barChartComponentRef = this.questionViewRef.createComponent(barChart);
      this.statisticService.getAnswers(question.id)
        .toPromise().then(dataAnswers => {
        this.initializeNewChart(barChartComponentRef,
          dataAnswers["data"],dataAnswers["labels"]
          ,question.question);
      });
    });
  }

  initializeStatisticComponent() {
      let surveyId = this.route.snapshot.queryParams["surveyId"]
      this.statisticService.getTitleSurvey(surveyId)
        .toPromise().then(value => this.title = value["title"]);
      this.statisticService.getQuestions(surveyId).toPromise().then((
        dataQuestions: Question[]) => {
        this.createBarChartComponents(dataQuestions);
      })
  }
  
}
