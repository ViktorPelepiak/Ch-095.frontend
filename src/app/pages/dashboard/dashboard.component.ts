import {Component, Inject, OnInit} from '@angular/core';
import {APP_CONFIG, IAppConfig} from "../../app.config";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {SocialService} from "../../services/social.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

test: string = "start";

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient, private socialService: SocialService, private cookieService: CookieService) { }

  ngOnInit() {
    localStorage.setItem("userToken", this.cookieService.get("userToken"));

    console.log(localStorage.getItem("userToken"));

    this.socialService.test()
      .toPromise()
      .then(data => {
        console.log(data);
        this.test = data;
      })
      .catch(
        data => {
          console.log(data);
          this.test = "false";
        });
  }

}
