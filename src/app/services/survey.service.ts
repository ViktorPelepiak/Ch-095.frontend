import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG, IAppConfig} from "../app.config";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Survey} from "../models/survey";
import {Page} from "../models/page";
import {Pageable} from "../models/pageable";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

  public getSurveys(pageable: Pageable): Observable<Page<Survey>> {
    let params = new HttpParams();
    params = params.append("size", String(pageable.size));
    params = params.append("page", String(pageable.currentPage));
    params = params.append("direction", pageable.sort.direction);
    params = params.append("fields", pageable.sort.fields.join(","));
    return this.http.get<Page<Survey>>(this.config.baseUrl + "/survey", {params});
  }

  public cloneSurvey(id: number, isClearContacts: boolean): Observable<Survey> {
    return this.http.post<Survey>(this.config.baseUrl + "/survey", {id, isClearContacts});
  }

}
