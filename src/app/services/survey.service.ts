import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG, IAppConfig} from "../app.config";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Survey} from "../models/survey";
import {Page} from "../models/page";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

  public getSurveys(): Observable<Page<Survey>> {
    return this.http.get<Page<Survey>>(this.config.baseUrl + "/survey");
  }

  public cloneSurvey(id: number, isClearContacts: boolean): Observable<Survey> {
    return this.http.post<Survey>(this.config.baseUrl + "/survey", {id, isClearContacts});
  }

}
