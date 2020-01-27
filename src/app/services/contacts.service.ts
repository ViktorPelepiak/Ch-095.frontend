import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG, IAppConfig} from "../app.config";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../models/page";
import {Contact} from "../models/contactTableCol";
import {Item} from "../models/item";
import * as FileSaver from "file-saver";

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
    return this.http.post<Item<number>>(this.config.backBaseUrl + this.endPoint, {id: null, name, email});
  }

  public importFromCsv(file: File, importNames: boolean): Observable<Item<Array<String>>> {
    let formData = new FormData();
    formData.set("file", file);
    formData.set("importNames", String(importNames));
    return this.http.post<Item<Array<String>>>(this.config.backBaseUrl + this.endPoint + "/import/scv", formData);
  }

  public exportCsv() {
    this.http.get<Item<string>>(this.config.backBaseUrl + this.endPoint + "/export/scv",{})
      .toPromise()
      .then(response => {
        console.log(response);
        var blob = new Blob([response.item], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "contacts.csv");
      });
  }

  public updateContact(id: number, name: string, email: string): Observable<Object> {
    return this.http.put<Object>(this.config.backBaseUrl + this.endPoint, {id, name, email});
  }

  public deleteContact(id: number): Observable<Object> {
    return this.http.delete<Object>(this.config.backBaseUrl + this.endPoint, {params: new HttpParams().append("id", id + '')});
  }

}
