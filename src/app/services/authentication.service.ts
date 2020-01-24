import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {AppConfig} from '../app.config';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public email: String;
  public password: String;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.get<any>(`${AppConfig.backBaseUrl}/login`,
      { headers: { authorization : this.createBasicAuthToken(email, password) } }).pipe(map((res) => {
      this.email = email;
      this.password = password;
      this.registerSuccessfulLogin(email);
    }));
  }

  createBasicAuthToken(email: string, password: string) {
    return 'Basic ' + btoa(email + ':' + password);
  }

  registerSuccessfulLogin(email) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, email);
  }

  logout() {
   this.http.post(`${AppConfig.backBaseUrl}/logout`,{}).subscribe();
    sessionStorage.clear();
    this.email = null;
    this.password = null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    return user !== null;
  }
}
