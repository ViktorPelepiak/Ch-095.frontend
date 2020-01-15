import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG, IAppConfig} from "../app.config";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../models/page";
import {Contact} from "../models/contactTableCol";
import {Item} from "../models/item";

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

  public createContact(name: string, email: string): Observable<Item<number>> {
    return this.http.post<Item<number>>(this.config.backBaseUrl + this.endPoint, {id:null,name,email});
  }
  public updateContact(id:number, name: string, email: string): Observable<Object> {
    return this.http.put<Object>(this.config.backBaseUrl + this.endPoint, {id,name,email});
  }

  public deleteContact(id:number): Observable<Object> {
    return this.http.delete<Object>(this.config.backBaseUrl + this.endPoint, {params: new HttpParams().append("id",id + '')});
  }

}
