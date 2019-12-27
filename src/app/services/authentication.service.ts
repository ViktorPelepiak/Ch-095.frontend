import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AppConfig} from "../app.config";

//import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public email: String;
  public password: String;
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.get<any>(`${AppConfig.backBaseUrl}/Gradle___softserve_academy___EventTable_1_0_SNAPSHOT_war/login`,
      { headers: { authorization : this.createBasicAuthToken(email, password) } }).pipe(map((res) => {
      this.email = email;
      this.password = password;
      this.registerSuccessfulLogin(email, password);
    }));
  }

  createBasicAuthToken(email: String, password: String) {

    return 'Basic ' + btoa(email + ":" + password)
  }

  registerSuccessfulLogin(email, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, email)
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.email = null;
    this.password = null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  // getLoggedInUserName() {
  //   let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
  //   if (user === null) return ''
  //   return user
  // }
}
