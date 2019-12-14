import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG, IAppConfig} from '../app.config';
import {HttpClient} from '@angular/common/http';
import {Observable, pipe} from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import {Answer} from '../models/answer';

@Injectable({
  providedIn: 'root'
})
export class AnswersFormService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

  getQuestions() {
    return this.http.get(this.config.baseUrl + '/answer')
      .pipe(map((response: any) => response.json))
      .pipe(map((response: any) => {
        return survey: surveyId
      }));
  }

  //
  // constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  // }
  //
  //
  //
  // public json = [{
  //   surveyId: 10,
  //   contactId: 125,
  //   questions: [
  //     {
  //       required: true,
  //       type: 'checkbox',
  //       value: 'textQueation_1',
  //       answers: [
  //         'text11',
  //         'text12'
  //       ]
  //     },
  //     {
  //       required: true,
  //       type: 'checkbox',
  //       value: 'textQueation_2',
  //       answers: [
  //         'text21',
  //         'text22'
  //       ]
  //     },
  //     {
  //       required: true,
  //       type: 'checkbox',
  //       value: 'textQueation_3',
  //       answers: [
  //         'text31',
  //         'text32'
  //       ]
  //     }
  //   ]
  // }
  // ];
  //
  // public getFirst(): Observable<Answer> {
  //   return this.http.get<Answer>(this.config.baseUrl + '/answer');
  // }
  //
  // public postAnswer(answer: Answer): Observable<Answer> {
  //   return this.http.post<Answer>(this.config.baseUrl + '/answer', answer);
  // }
  //
  // public getQuestions(): {
  //   return this.http.get(this.config.baseUrl + '/answer')
  //     .map(response => response.json)
  //     .map();
  // }
}
