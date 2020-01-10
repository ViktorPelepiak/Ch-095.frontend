import {Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserService} from '../../../services/user.service';
import {ToastrService} from "ngx-toastr";
import {APP_CONFIG, IAppConfig} from "../../../app.config";
import {SocialService} from "../../../services/social.service";

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }
    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}


@Component({
  selector: 'app-registration',
  templateUrl: 'registration.component.html' })
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  facebookLink: string = "";
  googleLink: string = "";

  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private toast: ToastrService,
    private socialService: SocialService) {
    // redirect to home if already logged in
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigate(['survey']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
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
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.toast.success("Please check your email and confrim registration");
          this.router.navigate(['/']);
        },
        error => {
          this.loading = false;
          this.router.navigate(['/']);

        });
  }
}
