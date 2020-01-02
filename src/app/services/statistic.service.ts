import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {APP_CONFIG, IAppConfig} from "../app.config";
import {QuestionsGeneralStatistic} from "../models/QuestionsGeneralStatistic";
import {QuestionsSeparatelyStatistic} from "../models/QuestionsSeparatelyStatistic";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient,
              @Inject(APP_CONFIG) private config: IAppConfig) {

  }


  getGeneralStatisticDTO(surveyId: bigint, func: (data: QuestionsGeneralStatistic) => void) {
    this.http.get(this.config.backBaseUrl + this.config.surveyGeneralStatisticUrl + surveyId)
      .toPromise().then((data: QuestionsGeneralStatistic) => {
      func(data)
    });
  }

  getEachStatisticDTO(surveyId: bigint, func: (data: QuestionsSeparatelyStatistic[]) => void) {
    this.http.get(this.config.backBaseUrl + this.config.surveyEachStatisticUrl + surveyId)
      .toPromise().then((data: QuestionsSeparatelyStatistic[]) => {
      func(data)
    })

  }
}
