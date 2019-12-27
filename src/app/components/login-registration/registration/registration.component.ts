import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../../services/authentication.service';
import { UserService} from '../../../services/user.service';
import { AlertService} from '../../../services/alert.service';

@Component({
  selector: 'app-registration',
  templateUrl: 'registration.component.html' })
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigate(['survey']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          //this.alertService.success('Please confirm registration.We send message to your email', true);
          alert('Thank you for registration.We send message to your email');
          this.router.navigate(['/login']);
        },
        error => {
          //this.alertService.error(error);
          alert(error);
          this.loading = false;
          this.router.navigate(['/']);

        });
  }
}
