import {Component, ComponentFactoryResolver, ViewContainerRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuestionStatisticComponent} from "./question-component/question-statistic.component";
import {StatisticService} from "../../services/statistic.service";
import {StatisticModel} from "../../models/StatisticModel";


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
  entryComponents: [QuestionStatisticComponent]
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
    let surveyId = this.route.snapshot.queryParams["surveyId"];

    this.statisticService.createMap(surveyId,
      (data)=> this.initializeStatisticComponent(data));
  }

  initializeNewQuestion(barChartComponentRef, numberVoters: number,
                        question: string, typeQuestion: string) {
    (<QuestionStatisticComponent>barChartComponentRef.instance)
      .question = question;

    (<QuestionStatisticComponent>barChartComponentRef.instance)
      .typeQuestions = typeQuestion;


    (<QuestionStatisticComponent>barChartComponentRef.instance)
      .numberVoters = numberVoters;
  }

  getDataChart(answers: string[], choiceAnswers: string[]):number[] {
    let map = new Map();
    choiceAnswers.forEach(value => map.set(value, 0));
    answers.forEach(value => map.set(value,1 + map.get(value)));
    return [...map.values()];
  }

  initializeStatisticComponent(data: StatisticModel) {
    this.title = data.title;
    let barChart = this.componentFactoryResolver.resolveComponentFactory(QuestionStatisticComponent);
    data.questionDTOS.sort((a, b) => a.index - b.index);
    data.questionDTOS.forEach(question => {
      if(question.type == "RADIOBUTTON" ||
            question.type == "CHECKBOX") {
        let barChartComponentRef = this.questionViewRef.createComponent(barChart);
        this.initializeNewQuestion(barChartComponentRef,question.answers.length
          , question.question,question.type);
        (<QuestionStatisticComponent>barChartComponentRef.instance).barChartData = [
          {data: this.getDataChart(question.answers,question.choiceAnswers),label: ''}
        ];

        (<QuestionStatisticComponent>barChartComponentRef.instance)
          .barChartLabels = question.choiceAnswers;

      }
      else if(question.type == "TEXTAREA"){
        let barChartComponentRef = this.questionViewRef.createComponent(barChart);
        this.initializeNewQuestion(barChartComponentRef,question.answers.length
          , question.question,question.type);
        (<QuestionStatisticComponent>barChartComponentRef.instance)
          .answers = question.answers;
      }
    });
  }


}
