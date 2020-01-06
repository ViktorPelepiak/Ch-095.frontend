import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {APP_CONFIG, IAppConfig} from "../app.config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient/*, private cookieService: CookieService*/) { }

  public get(): Observable<any> {
    return this.http.get(this.config.backBaseUrl + '/oauth_login');
  }

  public test(): Observable<string>{
    // let headers: HttpHeaders = new HttpHeaders();

    // headers = headers.append('userToken', localStorage.getItem("userToken"));
    // headers = headers.append('JSESSIONID', '34E9FFEF2EBEC41627F6DECDE53FF7A7');
    // headers = headers.append('test', 'test');
    // headers = headers.append('Cookie', 'JSESSIONID=34E9FFEF2EBEC41627F6DECDE53FF7A7;');
    // headers = headers.append("cookie", this.cookieService.get("JSESSIONID"));
    // this.cookieService.set("JSESSIONID",'34E9FFEF2EBEC41627F6DECDE53FF7A7')

    return this.http.get(this.config.backBaseUrl + '/test', {responseType: 'text'});
  }
}
