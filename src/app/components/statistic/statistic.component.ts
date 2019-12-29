import {Component, ComponentFactoryResolver, ViewContainerRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuestionStatisticComponent} from "./question-component/question-statistic.component";
import {StatisticService} from "../../services/statistic.service";
import {StatisticModel} from "../../models/StatisticModel";
import {EachQuestionComponent} from "./each-question/each-question.component";
import {QuestionforContactDTO} from "../../models/QuestionforContactDTO";
import {QuestionContactDTO} from "../../models/QuestionContactDTO";


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
  entryComponents: [QuestionStatisticComponent, EachQuestionComponent]
})
export class StatisticComponent implements OnInit {

  @ViewChild("questionStatistic", {static: true, read: ViewContainerRef})
  questionStatisticViewRef: ViewContainerRef;

  @ViewChild("eachQuestion", {static: true, read: ViewContainerRef})
  questionViewRef: ViewContainerRef;

  private title: string;

  private questionStatisticShow = "questionStatistic";
  private eachQuestionShow = "eachQuestion";
  private whichShow: string = this.questionStatisticShow;


  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private statisticService: StatisticService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    let surveyId = this.route.snapshot.queryParams["surveyId"];

    this.statisticService.getGeneralStatisticDTO(surveyId,
      (data) => this.initializeforGeneralStatistic(data));

    this.statisticService.getEachStatisticDTO(surveyId,
      (data) => this.initializeforEachStatistic(data));
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


  getDataChart(answers: string[][], choiceAnswers: string[]): number[] {
    let answer = [].concat(...answers);
    let map = new Map();
    choiceAnswers.forEach(value => map.set(value, 0));
    answer.forEach(value => map.set(value, 1 + map.get(value)));
    console.log(answer)
    console.log([...map.values()])
    return [...map.values()];
  }

  initializeforGeneralStatistic(data: StatisticModel) {
    this.title = data.title;
    let questionStatistic = this.componentFactoryResolver.resolveComponentFactory(QuestionStatisticComponent);
    data.questionDTOS.sort((a, b) => a.index - b.index);
    data.questionDTOS.forEach(question => {
      if (question.type == "RADIOBUTTON" ||
        question.type == "CHECKBOX") {
        let barChartComponentRef = this.questionStatisticViewRef.createComponent(questionStatistic);
        this.initializeNewQuestion(barChartComponentRef, question.answers.length
          , question.question, question.type);
        (<QuestionStatisticComponent>barChartComponentRef.instance).barChartData = [
          {data: this.getDataChart(question.answers, question.choiceAnswers), label: ''}
        ];

        (<QuestionStatisticComponent>barChartComponentRef.instance)
          .barChartLabels = question.choiceAnswers;

      } else if (question.type == "TEXTAREA") {
        let barChartComponentRef = this.questionStatisticViewRef.createComponent(questionStatistic);
        this.initializeNewQuestion(barChartComponentRef, question.answers.length
          , question.question, question.type);
        (<QuestionStatisticComponent>barChartComponentRef.instance)
          .answers = question.answers;
      }

    });
  }

  private initializeforEachStatistic(questionsContacts: QuestionContactDTO[]) {

    let questionStatistic = this.componentFactoryResolver.resolveComponentFactory(EachQuestionComponent);
    questionsContacts.forEach(value => {
      let eachQuestionComponentRef = this.questionViewRef.createComponent(questionStatistic);
      (<EachQuestionComponent>eachQuestionComponentRef.instance)
        .email = value.email;
      (<EachQuestionComponent>eachQuestionComponentRef.instance)
        .models = value.questionDTOS;
    })
  }

  onClickStatisticButton(){
    this.whichShow = this.questionStatisticShow;
  }

  onClickEachButton(){
    this.whichShow = this.eachQuestionShow;
  }

}
