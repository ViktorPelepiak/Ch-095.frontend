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
    // return this.http.post<SaveSurvey>(this.config.backBaseUrl +'/testAccess/check', saveSurvey)
    console.log(JSON.stringify(saveSurvey));
    return this.http.post<SaveSurvey>('http://localhost:8081/survey/createNewSurvey', saveSurvey)

  }


  // public checkEmail(dto: ): Observable<> {
  //   return this.http.post<ContactSurveyDto>(this.config.backBaseUrl +'/testAccess/check', dto)
  // }
}
