import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {APP_CONFIG, IAppConfig} from '../app.config';
import {Email} from "../models/email";
import {Observable} from "rxjs";
//
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/empty';
// import 'rxjs/add/operator/retry'; // don't forget the imports

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

  public postEmailArray(email: Email): Observable<string> {
    console.error(email.emailsArray)
    // @ts-ignore
    return this.http.post<string>(this.config.backBaseUrl + '/sendEmails', email, {responseType: 'text'});
  }

  getTitleSurvey(surveyId: string){
    return this.http.get(this.config.backBaseUrl + '/surveyTitle' + surveyId);
  }

  // notice the <T>, making the method generic
  // get<T>(url, params): Observable<T> {
  //   return this.httpClient
  //     .get("data-url")
  //     .catch((err: HttpErrorResponse) => {
  //       // simple logging, but you can do a lot more, see below
  //       console.error('An error occurred:', err.error);
  //     });
  // }

}
