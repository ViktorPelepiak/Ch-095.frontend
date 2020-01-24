import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG, IAppConfig} from '../app.config';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Survey} from '../models/survey';
import {Page} from '../models/page';
import {SaveSurvey} from "../models/SaveSurvey";
import {EditSurvey} from "../models/EditSurvey";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  endPoint = '/survey';

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private http: HttpClient) {
  }

  public getSurveys(params: HttpParams): Observable<Page<Survey>> {
    let headers = new HttpHeaders();
    return this.http.get<Page<Survey>>(this.config.backBaseUrl + '/survey', {params, headers, withCredentials: true});
  }

  public surveyUpdateTitle(id: number, title: string) {
    return this.http.put<string>(this.config.backBaseUrl + this.endPoint, {}, {
      params: new HttpParams()
        .append('id', id + '')
        .append('title', title)
    });
  }

  public surveyStatusDone(id: number) {
    return this.http.put<string>(this.config.backBaseUrl + this.endPoint + '/status/DONE', {}, {
      params: new HttpParams()
        .append('id', id + '')
    });
  }

  public cloneSurvey(id: number, clearContacts: boolean): Observable<number> {
    console.log(clearContacts);
    return this.http.post<number>(this.config.backBaseUrl + this.endPoint, {id, clearContacts:clearContacts});
  }

    public saveEditedSurvey(editSurvey:EditSurvey): Observable<SaveSurvey>{
    return  this.http.post<EditSurvey>(this.config.backBaseUrl + '/survey/update/'+editSurvey.surveyId,editSurvey);
  }

  public editSurvey(id:string){
   return this.http.get<EditSurvey>(this.config.backBaseUrl + '/survey/edit/' + id);
  }

  public deleteSurvey(id: number): Observable<string> {
    return this.http.delete<string>(this.config.backBaseUrl + this.endPoint, {
      params: new HttpParams().append('id', id + '')
    });
  }

}
