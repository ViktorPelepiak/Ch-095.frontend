import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {APP_CONFIG, IAppConfig} from "../app.config";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) { }

  public get(): Observable<any> {
    return this.http.get(this.config.backBaseUrl + '/Gradle___softserve_academy___EventTable_1_0_SNAPSHOT_war/oauth_login');
  }

  public test(): Observable<string>{
    return this.http.get(this.config.backBaseUrl + '/Gradle___softserve_academy___EventTable_1_0_SNAPSHOT_war/test', {responseType: 'text'});
  }
}
