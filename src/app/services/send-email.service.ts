import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {APP_CONFIG, IAppConfig} from '../app.config';
import {Email} from "../models/email";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

  public postEmailArray(email : Email){
    return this.http.post<Email>(this.config.baseUrl + '/sendEmails', email);
  }

}
