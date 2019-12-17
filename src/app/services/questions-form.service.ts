import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG, IAppConfig} from '../app.config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsFormService {

  QUESTION_API = '/question?surveyId=1&&contactEmail=test@gmail.com';

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private httpClient: HttpClient) {
  }

  getSurvey(): Observable<any> {
    return this.httpClient.get<any>(this.config.backBaseUrl + this.QUESTION_API);
  }
}
