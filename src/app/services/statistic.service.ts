import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {APP_CONFIG, IAppConfig} from "../app.config";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient,
              @Inject(APP_CONFIG) private config: IAppConfig){

  }



  getQuestions(surveyId: bigint){
    return this.http.get(this.config.backBaseUrl + this.config.questionUrl + surveyId);
  }

  getAnswers(answerId: bigint) {
    return this.http.get(this.config.backBaseUrl + this.config.answerUrl + answerId);
  }

  getTitleSurvey(surveyId: bigint){
    return this.http.get(this.config.backBaseUrl + this.config.surveyTitleUrl + surveyId);
  }

}
