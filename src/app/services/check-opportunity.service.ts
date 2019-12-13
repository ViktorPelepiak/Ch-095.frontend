import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CheckOpportunityService {

  constructor(private http: HttpClient) { }

  private companyURL = 'http://localhost:8080' + '/testAccess';

  public test(token: string) {
    return this.http.get<Object>(this.companyURL + '/' + token);
  }
}
