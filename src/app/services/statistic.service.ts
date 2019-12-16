import {AfterViewInit, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Question} from "../models/question";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient){

  }

  questions : Question[];
  labels : string[];
  data : number[];

  getQuestions(surveyId: number){
    return this.http.get('http://localhost:8080/' +
      'Gradle___softserve_academy___EventTable_1_0_SNAPSHOT_war/statistic/questions?surveyId='+ surveyId);
  }

  getAnswers(answerId: bigint) {
    return this.http.get('http://localhost:8080/' +
      'Gradle___softserve_academy___EventTable_1_0_SNAPSHOT_war/statistic/answers?questionId='+ answerId);
  }

}
