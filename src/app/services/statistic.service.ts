import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient){

  }

  private  baseUrl : string ='http://localhost:8080/' +
    'Gradle___softserve_academy___EventTable_1_0_SNAPSHOT_war';
  private questionUrl : string = '/statistic/questions?surveyId=';
  private answerUrl : string = '/statistic/answers?questionId=';
  private surveyTitleUrl : string = '/statistic/surveyTitle?surveyId=';

  getQuestions(surveyId: bigint){
    return this.http.get(this.baseUrl + this.questionUrl + surveyId);
  }

  getAnswers(answerId: bigint) {
    return this.http.get(this.baseUrl + this.answerUrl + answerId);
  }

  getTitleSurvey(surveyId: bigint){
    return this.http.get(this.baseUrl + this.surveyTitleUrl + surveyId);
  }

}
