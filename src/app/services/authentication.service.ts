import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {AppConfig} from "../app.config";


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  USER_ROLE = 'userRole';

  public email: String;
  public password: String;


  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.get<any>(`${AppConfig.backBaseUrl}/login`,
      { headers: { authorization : this.createBasicAuthToken(email, password) } }).pipe(map((res) => {
      this.email = email;
      this.registerSuccessfulLogin(email, res.principal.authorities[0].authority );
    }));
  }

  createBasicAuthToken(email: String, password: String) {
    return 'Basic ' + btoa(email + ':' + password);
  }

  registerSuccessfulLogin(email, role) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, email);
    sessionStorage.setItem(this.USER_ROLE, role);
  }

  logout() {
    this.http.post(`${AppConfig.backBaseUrl}/logout`,{}).subscribe();
    sessionStorage.clear()
    this.email = null;
    this.password = null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    return user !== null;
  }

  isManager() {
    let user = sessionStorage.getItem(this.USER_ROLE);
    return user ==='MANAGER';
  }
}
