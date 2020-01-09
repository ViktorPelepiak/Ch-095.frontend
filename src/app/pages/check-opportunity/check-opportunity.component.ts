import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CheckOpportunityService} from '../../services/check-opportunity.service';
import {APP_CONFIG, IAppConfig} from '../../app.config';

export interface CheckOpportunityDto {
  token: string;
  email: string;
}

@Component({
  selector: 'app-check-opportunity',
  templateUrl: './check-opportunity.component.html',
  styleUrls: ['./check-opportunity.component.css']
})
export class CheckOpportunityComponent implements OnInit {
  token: string;
  email: string;
  isExist: boolean;
  wrongEmail: boolean = false;
  errorMessage: string;
  isAuthenticated: boolean = false;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private route: ActivatedRoute, private checkOpportunityService: CheckOpportunityService) {
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    if (this.token !== null) {
      this.checkOpportunityService.test(this.token)
        .toPromise()
        .then(data => {
          this.isExist = true;
          console.log(data);

          const auth_email: string = sessionStorage.getItem('authenticatedUser');
          if (auth_email !== null){
            const dto: CheckOpportunityDto = {
              token: this.token,
              email: auth_email
            };
            this.checkOpportunityService.checkEmail(dto)
              .toPromise()
              .then(data => {
                this.isAuthenticated = true;
                this.wrongEmail = false;
                window.location.href = this.config.frontBaseUrl + '/questions?surveyId=' + data.surveyId + '&contactEmail=' + data.email;
              })
              .catch(data => {
                this.isAuthenticated = false;
              })
          }
        })
        .catch(
          data => {
            this.errorMessage = data.error;
            this.isExist = false;
          });
    }
  }

  checkEmail() {
    const dto: CheckOpportunityDto = {
      token: this.token,
      email: this.email
    };

    this.checkOpportunityService.checkEmail(dto)
      .toPromise()
      .then(data => {
        this.wrongEmail = false;
        window.location.href = this.config.frontBaseUrl + '/questions?surveyId=' + data.surveyId + '&contactEmail=' + data.email;
      })
      .catch(data => {
        this.wrongEmail = true;
      });

  }

}
