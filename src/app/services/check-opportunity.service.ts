import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CheckPossibilityDto} from "../pages/check-possibility/check-possibility.component";
import {Observable} from "rxjs";
import {APP_CONFIG, IAppConfig} from "../app.config";
// @ts-ignore
import {ContactSurveyDto} from '../entities/contact-survey-dto';

@Injectable({
  providedIn: 'root'
})
export class CheckOpportunityService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {}

  public test(token: string): Observable<string> {
    return this.http.get(this.config.backBaseUrl  + token, {responseType: 'text'});
  }

  public checkEmail(dto: CheckPossibilityDto): Observable<ContactSurveyDto> {
    return this.http.post<ContactSurveyDto>(this.config.backBaseUrl + '/testAccess/check', dto);
  }
}
