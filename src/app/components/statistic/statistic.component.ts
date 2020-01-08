import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GeneralStatisticComponent} from "./general-statistic/general-statistic.component";
import {StatisticService} from "../../services/statistic.service";
import {QuestionsGeneralStatistic} from "../../models/QuestionsGeneralStatistic";
import {SeparatelyStatisticComponent} from "./separately-statistic/separately-statistic.component";
import {QuestionsSeparatelyStatistic} from "../../models/QuestionsSeparatelyStatistic";


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
  entryComponents: [GeneralStatisticComponent, SeparatelyStatisticComponent]
})
export class StatisticComponent implements OnInit {


  questionsSeparately: SeparatelyStatisticComponent[] = [];
  questionsGeneral: GeneralStatisticComponent[] = [];

  private title: string;

  private generalStatisticShow = "generalStatistic";
  private separatelyStatisticShow = "separatelyStatistic";
  private whichShow: string = this.generalStatisticShow;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private statisticService: StatisticService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    let surveyId = this.route.snapshot.queryParams["surveyId"];

    this.statisticService.getEachStatisticDTO(surveyId,
      (data) => {
        this.initializeSeparatelyStatistic(data)
      });


    this.statisticService.getGeneralStatisticDTO(surveyId,
      (data) => {
        this.initializeGeneralStatistic(data)
      });

  }

  initializeSeparatelyStatistic(data: QuestionsSeparatelyStatistic[]) {
    data.forEach((value, index) => {
      this.questionsSeparately[index] = new SeparatelyStatisticComponent();
      this.questionsSeparately[index].email = value.email;
      value.questionDTOS.sort(
        (a, b) => a.index - b.index);
      this.questionsSeparately[index].models = value.questionDTOS;
    })
  }

  initializeGeneralStatistic(data: QuestionsGeneralStatistic) {
    this.title = data.title;
    data.questionDTOS.sort((a, b) => a.index - b.index);
    data.questionDTOS.forEach((value, index) => {
      this.questionsGeneral[index] = new GeneralStatisticComponent();
      this.questionsGeneral[index].answers = value.answers;
      this.questionsGeneral[index].numberVoters = value.answers.length;
      this.questionsGeneral[index].question = value.question;
      this.questionsGeneral[index].typeQuestions = value.type;
      this.questionsGeneral[index].barChartData = [{
        data: this.getDataChart(value.answers, value.choiceAnswers),
        label: ""
      }];
      if (value.type == "CHECKBOX_PICTURE" || value.type == "RADIO_PICTURE") {
        let labels = [];
        value.choiceAnswers.forEach((value1, index1) => {
          labels[index1] = "Image #"+(index1+1);
        });
        this.questionsGeneral[index].barChartLabels = labels;
        this.questionsGeneral[index].images = value.choiceAnswers;
      } else {
        this.questionsGeneral[index].barChartLabels = value.choiceAnswers;
      }

    });
  }

  getDataChart(answers: string[][], choiceAnswers: string[]): number[] {
    let answer = [].concat(...answers);
    let map = new Map();
    choiceAnswers.forEach(value => map.set(value, 0));
    answer.forEach(value => map.set(value, 1 + map.get(value)));
    return [...map.values()];
  }

  onClickGeneralStatistic() {
    this.whichShow = this.generalStatisticShow;
  }

  onClickSeparatelyStatistic() {
    this.whichShow = this.separatelyStatisticShow;
  }

}
