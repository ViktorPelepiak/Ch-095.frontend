import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {APP_CONFIG, IAppConfig} from "../app.config";
import {StatisticModel} from "../models/StatisticModel";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

     constructor(private http: HttpClient,
              @Inject(APP_CONFIG) private config: IAppConfig){

     }


   getSurvey(surveyId: bigint){
      return this.http.get(this.config.backBaseUrl + this.config.surveyUrl + surveyId);
   }

   createMap(surveyId: bigint,func :(data:StatisticModel) => void){
    this.getSurvey(surveyId).toPromise().then((data: StatisticModel) => {
      func(data)
    })
  }

}
