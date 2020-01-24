import {Component, Inject, OnInit} from '@angular/core';
import {APP_CONFIG, IAppConfig} from "../../../app.config";
import {ActivatedRoute} from "@angular/router";
import {CheckOpportunityService} from "../../../services/check-opportunity.service";

@Component({
  selector: 'app-check-common',
  templateUrl: './check-common.component.html',
  styleUrls: ['./check-common.component.css']
})
export class CheckCommonComponent implements OnInit {
  token: string;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private route: ActivatedRoute, private checkOpportunityService: CheckOpportunityService) { }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    if (this.token !== null) {
      this.checkOpportunityService.commonTest(this.token)
        .toPromise()
        .then(data => {
          window.location.href = this.config.frontBaseUrl + '/questions/' + this.token;
        })
        .catch(data => {
          console.log(data);
        })
    }else {
      localStorage.setItem("error", "token Empty")
    }
  }

}
