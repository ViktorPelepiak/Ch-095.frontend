import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {APP_CONFIG, IAppConfig} from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

  public getFirst(): Observable<User> {
    return this.http.get<User>(this.config.backBaseUrl + '/user');
  }

  public postUser(user: User): Observable<User> {
    return this.http.post<User>(this.config.backBaseUrl + '/user', user);
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(`${this.config.backBaseUrl}/registration`, user);
  }
 public confirmRegistration(token: string): Observable<string> {
    return this.http.get(`${this.config.backBaseUrl}/registrationConfirm?token=` + token, {responseType: 'text'});
 }

  public resendConfirmationToken(token: string): Observable<string> {
    return this.http.get(`${this.config.backBaseUrl}/resendRegistrationToken?token=` + token, {responseType: 'text'});
  }
}
