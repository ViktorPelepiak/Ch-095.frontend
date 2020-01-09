import {Component, Inject, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../services/authentication.service';
import {ToastrService} from "ngx-toastr";
import {SocialService} from "../../../services/social.service";
import {APP_CONFIG, IAppConfig} from "../../../app.config";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['../social-button.css']})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: 'surveys';
  error = '';
  facebookLink: string = "";
  googleLink: string = "";

  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService,
    private authenticationService: AuthenticationService,
    private socialService: SocialService) {}

  ngOnInit() {
    this.socialService.getAuthenticatedEmail()
      .toPromise()
      .then( email =>{
        console.log(email);
        if (email != "" && email != null){
          this.authenticationService.registerSuccessfulLogin(email);
          this.router.navigate([this.returnUrl]);
        }
      })
      .catch(email => {
        console.log(email);
      });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(4) ]]
    });

    this.socialService.get()
      .toPromise()
      .then(data => {
        this.facebookLink = data['Facebook'];
        this.googleLink = data['Google'];
      })
      .catch(data => {
        console.log(data);
      });

    // reset login status
    // this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.toast.success("You successful Log in.");
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.loading = false;
          this.toast.error("Email or password wrong.")
          this.router.navigate(['login']);
        });
  }
}
