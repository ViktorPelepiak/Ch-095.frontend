import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EmailService} from "../../services/send-email.service";
import {Email} from "../../models/email";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sendForm',
  templateUrl: './sendForm.component.html',
  styleUrls: ['./sendForm.component.css']
})
export class SendFormComponent implements OnInit {

  isShown: boolean = true;
  public surveyId = this.route.snapshot.queryParams["surveyId"];
  public title = this.route.snapshot.queryParams["title"];
  wrongEmails: string = null;
  errorWrongEmails: string = null;
  successfulMessage: string = null;
  wrongEmails2: string = null;
  errorWrongEmails2: string = null;
  successfulMessage2: string = null;
  dynamicForm: FormGroup;
  submitted = false;

  constructor(private emailService: EmailService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {
  }

  changeForm() {
    if (this.isShown) {
      this.dynamicForm = this.formBuilder.group({
        numberOfEmails: ['', Validators.required],
        emailsArray: new FormArray([]),
      });
    } else {
      this.dynamicForm = this.formBuilder.group({
        emails1: new FormControl('', [
          Validators.required,
          Validators.pattern("^((\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*)\\s*[,]{0,1}\\s*)+$")])
      });
    }
  }

  ngOnInit() {
    this.changeForm();
  }

  get f() {
    return this.dynamicForm.controls;
  }

  get t() {
    return this.f.emailsArray as FormArray;
  }

  toggleShow() {
    this.isShown = !this.isShown;
    this.changeForm();
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.dynamicForm.controls[controlName];
    return control.invalid && control.touched;
  }

  onChangeEmails(e) {
    const numberOfEmails = e.target.value || 0;
    if (this.t.length < numberOfEmails) {
      for (let i = this.t.length; i < numberOfEmails; i++) {
        this.t.push(this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]]
        }));
      }
    } else {
      for (let i = this.t.length; i >= numberOfEmails; i--) {
        this.t.removeAt(i);
      }
    }
  }

  sendEmails() {
    console.log(this.dynamicForm);
    if (this.isShown) {
      const email = new Email(this.dynamicForm.value.emailsArray.map(e => e.email), this.surveyId);
      console.log(email);
      this.emailService.postEmailArray(email).toPromise().then(data => {
        console.error("data", data);
        this.wrongEmails = null;
        this.successfulMessage = "these emails were successfully sent";
        // this.dynamicForm.reset(100);
      }).catch(e => {
          console.error("error" + e.error);
          this.wrongEmails = e.error;
          this.errorWrongEmails = "these emails are wrong : " + this.wrongEmails;
        }
      );

    } else {
      const email = new Email(this.dynamicForm.value.emails1.split(","), this.surveyId);
      this.emailService.postEmailArray(email).toPromise().then(data => {
        console.error("emails", data);
        this.wrongEmails2 = null;
        this.successfulMessage2 = "these emails were successfully sent";
      }).catch(e => {
          console.error("error" + e.error);
        this.wrongEmails2 = e.error;
        this.errorWrongEmails2 = "these emails are wrong : " + this.wrongEmails2;
        }
      );
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.isShown) {
      if (this.dynamicForm.invalid) {
        return;
      }
      this.sendEmails();
    } else {
      if (this.dynamicForm.invalid) {
        return;
      }
      this.sendEmails();
    }
  }

  onReset() {
    this.submitted = false;
    this.errorWrongEmails = "";
    this.dynamicForm.reset();
    this.t.clear();
  }

  onClear() {
    this.submitted = false;
    this.errorWrongEmails = "";
    this.t.reset();
  }
}
