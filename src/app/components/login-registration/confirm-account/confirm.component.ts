import { Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute, Router} from '@angular/router';
import {UserService} from "../../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {first} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'confirm',
  templateUrl: 'confirm.component.html'
})
export class ConfirmComponent implements OnInit{
  routeParams: Params;
  queryParams: Params;
  pageVisible: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private toast: ToastrService,
              private router: Router,
              private userService: UserService){
    this.getRouteParams();
  }
  ngOnInit() {
    this.userService.confirmRegistration(this.queryParams.token)
      .pipe(first())
      .subscribe(data => {
        this.pageVisible = true;
    },
        (error: HttpErrorResponse) => {
          if (error.status=== 400) {
            this.userService.resendConfirmationToken(this.queryParams.token)
              .subscribe(()=>{});
            this.toast.info("Please check your email and confirm registration");
            this.router.navigate(['/']);
          }
        });
  }

  getRouteParams() {
    this.activatedRoute.params.subscribe(params=> {
      this.routeParams = params;
    });
    this.activatedRoute.queryParams.subscribe(params=> {
      this.queryParams = params;
    });
  }

}
