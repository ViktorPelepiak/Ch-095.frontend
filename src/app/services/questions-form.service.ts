import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG, IAppConfig} from '../app.config';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QuestionsFormService {

  surveyId;
  contactEmail;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private httpClient: HttpClient, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.surveyId = params.surveyId;
      this.contactEmail = params.contactEmail;
    });
  }

  getSurvey(): Observable<any> {
    return this.httpClient.get<any>(this.config.backBaseUrl + '/question?surveyId=' + this.surveyId + '&contactEmail=' + this.contactEmail);
  }

  saveAnswers(dataAnswer): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<any>(this.config.backBaseUrl + '/question', JSON.stringify(dataAnswer),  {headers});
  }

}
