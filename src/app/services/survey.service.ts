import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG, IAppConfig} from '../app.config';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Survey} from '../models/survey';
import {Page} from '../models/page';
import {Pageable} from '../models/pageable';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  endPoint = '/survey';

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private http: HttpClient) {
  }

  public getSurveys(pageable: Pageable): Observable<Page<Survey>> {
    let params = new HttpParams();
    params = params.append('page', String(pageable.currentPage));
    if (pageable.size > 0) {
      params = params.append('size', String(pageable.size));
    }
    if (pageable.sort.direction !== null) {
      params = params.append('direction', pageable.sort.direction);
    }
    if (pageable.sort.fields.length > 0) {
      params = params.append('sort', pageable.sort.fields.join(','));
    }
    return this.http.get<Page<Survey>>(this.config.baseUrl + '/survey', {params});
  }

  public surveyUpdateTitle(id: number, title: string) {
    return this.http.put<string>(this.config.baseUrl + this.endPoint, {}, {
      params: new HttpParams()
        .append('id', id + '')
        .append('title', title)
    });
  }

  public surveyStatusDone(id: number) {
    return this.http.put<string>(this.config.baseUrl + this.endPoint + '/status/done', {}, {
      params: new HttpParams()
        .append('id', id + '')
    });
  }

  public cloneSurvey(id: number, isClearContacts: boolean): Observable<Survey> {
    return this.http.post<Survey>(this.config.baseUrl + this.endPoint, {id, isClearContacts});
  }

  public deleteSurvey(id: number): Observable<Survey> {
    return this.http.delete<Survey>(this.config.baseUrl + this.endPoint, {
      params: new HttpParams().append('id', id + '')
    });
  }

}
