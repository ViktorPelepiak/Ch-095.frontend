import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {APP_CONFIG, IAppConfig} from "../app.config";
import {Observable} from "rxjs";
import {SaveSurvey} from "../entities/SaveSurvey";

@Injectable({
  providedIn: 'root'
})
export class SaveSurveyService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

  public saveSurvey(saveSurvey): Observable<SaveSurvey>{
    return this.http.post<SaveSurvey>(this.config.backBaseUrl +'/survey/createNewSurvey', saveSurvey);
  }
}
