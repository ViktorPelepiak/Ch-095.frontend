import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {APP_CONFIG, IAppConfig} from '../app.config';
import {Email} from "../models/email";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  surveyId;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.surveyId = params.surveyId;
    });
  }

  public postEmailArray(email: Email): Observable<string> {
    console.log(email.emailsArray);
    return this.http.post<string>(this.config.backBaseUrl + '/sendEmails', email);
  }

  public postSelectedEmail(email: Email): Observable<string> {
    console.log(email.emailsArray);
    return this.http.post<string>(this.config.backBaseUrl + '/sendSelectedEmails', email);
  }

  public getContacts(): Observable<string[]> {
    return this.http.get<string[]>(this.config.backBaseUrl + '/contacts?surveyId=' + this.surveyId);
  }
}
