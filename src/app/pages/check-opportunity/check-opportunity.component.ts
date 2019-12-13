import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CheckOpportunityService} from "../../services/check-opportunity.service";

@Component({
  selector: 'app-check-opportunity',
  templateUrl: './check-opportunity.component.html',
  styleUrls: ['./check-opportunity.component.css']
})
export class CheckOpportunityComponent implements OnInit {

  constructor(private route: ActivatedRoute, private checkOpportunityService: CheckOpportunityService) { }

  ngOnInit() {
    var token = this.route.snapshot.paramMap.get("token");

    if (token !== null) {
      this.checkOpportunityService.test(token)
        .subscribe(data => {
          // this.company = data;
          //
          // if (this.app.currentUserValue.userId != this.company.user.userId) {
          //   this.router.navigate(['accessDenied']);
          // }
          // else {
          //   this.companyService.approve(this.company, companyToken)
          //     .subscribe(data => {
          //       if (data.status == 'APPROVED')
          //         this.router.navigate(['updateCompany/' + companyName]);
          //       else
          //         this.router.navigate(['login']);
          //     });
          // }
          console.log(data)
        });
    }
  }

}
