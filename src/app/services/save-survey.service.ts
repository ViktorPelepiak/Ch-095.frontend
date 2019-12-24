import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {APP_CONFIG, IAppConfig} from "../app.config";
import {Observable} from "rxjs";
import {SaveSurvey} from "../models/SaveSurvey";
import {Headers} from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class SaveSurveyService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

  public saveSurvey(saveSurvey): Observable<SaveSurvey>{
    return this.http.post<SaveSurvey>(this.config.backBaseUrl +'/survey/createNewSurvey', saveSurvey);
  }

  public savePicture(uploadingPhoto:File[]){
    const formdata:FormData = new FormData();
    formdata.append('file',uploadingPhoto[0]);
    return this.http.post<File[]>(this.config.backBaseUrl + '/fileupload',formdata);
  }
}
