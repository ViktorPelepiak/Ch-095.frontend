import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {APP_CONFIG, IAppConfig} from "../app.config";
import {Observable} from "rxjs";
import {SaveSurvey} from "../models/SaveSurvey";

@Injectable({
  providedIn: 'root'
})
export class SaveSurveyService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

  public saveSurvey(saveSurvey): Observable<SaveSurvey> {
    return this.http.post<SaveSurvey>(this.config.backBaseUrl + '/survey/createNewSurvey', saveSurvey);
  }

  public savePhotos(uploadingPhotos: File[]) {
    let formData: FormData = new FormData();
    for (let i = 0; i < uploadingPhotos.length; i++) {
      formData.append('file', uploadingPhotos[i]);
    }
    return this.http.post<File[]>(this.config.backBaseUrl + '/fileupload', formData);
  }
}
