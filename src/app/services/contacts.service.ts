import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG, IAppConfig} from "../app.config";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../models/page";
import {Contact} from "../models/contactTableCol";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  endPoint = '/contact';

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private http: HttpClient) {
  }

  public getContacts(params: HttpParams): Observable<Page<Contact>> {
    return this.http.get<Page<Contact>>(this.config.backBaseUrl + this.endPoint, {params});
  }

  public createContact(name: string, email: string): Observable<number> {
    console.log(name,email);
    return this.http.post<number>(this.config.backBaseUrl + this.endPoint, {},{params: new HttpParams().append("name", name).append("email", email), responseType:"text"});
  }

}
