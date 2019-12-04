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
    return this.http.get<User>(this.config.baseUrl + '/user');
  }

  public postUser(user: User): Observable<User> {
    return this.http.post<User>(this.config.baseUrl + '/user', user);
  }

}
