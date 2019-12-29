import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {APP_CONFIG, IAppConfig} from "../app.config";
import {StatisticModel} from "../models/StatisticModel";
import {QuestionContactDTO} from "../models/QuestionContactDTO";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient,
              @Inject(APP_CONFIG) private config: IAppConfig) {

  }


  getGeneralStatisticDTO(surveyId: bigint, func: (data: StatisticModel) => void) {
    this.http.get(this.config.backBaseUrl + this.config.surveyGeneralStatisticUrl + surveyId)
      .toPromise().then((data: StatisticModel) => {
      func(data)
    });
  }

  getEachStatisticDTO(surveyId: bigint, func: (data: QuestionContactDTO[]) => void) {
    this.http.get(this.config.backBaseUrl + this.config.surveyEachStatisticUrl + surveyId)
      .toPromise().then((data: QuestionContactDTO[]) => {
      func(data)
    })

  }
}
