import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG, IAppConfig} from '../app.config';
import {HttpClient, HttpParams} from '@angular/common/http';
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
    return this.http.get<Page<Survey>>(this.config.backBaseUrl + '/survey', {params});
  }

  public surveyUpdateTitle(id: number, title: string) {
    return this.http.put<string>(this.config.backBaseUrl + this.endPoint, {}, {
      params: new HttpParams()
        .append('id', id + '')
        .append('title', title)
    });
  }

  public surveyStatusDone(id: number) {
    return this.http.put<string>(this.config.backBaseUrl + this.endPoint + '/status/done', {}, {
      params: new HttpParams()
        .append('id', id + '')
    });
  }

  public saveEditedSurvey(editSurvey:EditSurvey): Observable<SaveSurvey>{
    console.log(JSON.stringify(editSurvey));
    console.log("edit", editSurvey);
    return  this.http.post<EditSurvey>(this.config.backBaseUrl + '/survey/update/'+editSurvey.surveyId,editSurvey);
  }

  public editSurvey(id:string){
   return this.http.get<EditSurvey>(this.config.backBaseUrl + '/survey/edit/' + id);
  }


  public cloneSurvey(id: number, isClearContacts: boolean): Observable<Survey> {
    return this.http.post<Survey>(this.config.backBaseUrl + this.endPoint, {id, isClearContacts});
  }

  public deleteSurvey(id: number): Observable<string> {
    return this.http.delete<string>(this.config.backBaseUrl + this.endPoint, {
      params: new HttpParams().append('id', id + '')
    });
  }

}
