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

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient, private route: ActivatedRoute) {
  }

  public postEmailArray(email: Email): Observable<string> {
    console.log(email.emailsArray);
    return this.http.post<string>(this.config.backBaseUrl + '/sendEmails', email);
  }

  public getContacts(surveyId: number): Observable<string[]> {
    return this.http.get<string[]>(this.config.backBaseUrl + '/availableContacts?surveyId=' + surveyId);
  }
}
