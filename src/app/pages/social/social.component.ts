import {Component, Inject, OnInit} from '@angular/core';
import {APP_CONFIG, IAppConfig} from "../../app.config";
import {ActivatedRoute} from "@angular/router";
import {CheckOpportunityService} from "../../services/check-opportunity.service";
import {SocialService} from "../../services/social.service";

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  links: string;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private route: ActivatedRoute, private socialService: SocialService) { }

  ngOnInit() {
    this.socialService.get()
      .toPromise()
      .then(data => {
        console.log(data);
        this.links = data;
      })
      .catch(
        data => {
          console.log(data);
        });
  }
}
