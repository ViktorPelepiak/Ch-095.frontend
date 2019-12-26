import {Component, OnInit} from '@angular/core';
import {EmailService} from "../../services/send-email.service";
import {Email} from "../../models/email";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-sendForm',
  templateUrl: './sendForm.component.html',
  styleUrls: ['./sendForm.component.css']
})
export class SendFormComponent implements OnInit {
  sendForm: FormGroup;
  isShown: boolean = true;
  isShownRemoveSign: boolean = false;
  isShown2: boolean = false;

  public emails: any[] = [''];

  constructor(private emailService: EmailService) {
  }

  ngOnInit() {
  }

  // surveyTitle() {
  //   this.emailService.getTitleSurvey('1');
  //   console.log(this.emailService.getTitleSurvey('1'));
  //   // don't works
  // }

  toggleShow() {
    this.isShown = !this.isShown;
    this.isShown2 = !this.isShown2;
  }

  addEmail() {
    this.isShownRemoveSign = true;
    if (this.emails.length < 20) {
      this.emails.push('');
    }
  }

  removeEmail(i: number) {
    if (i == 1) {
      this.isShownRemoveSign = false;
    }
    this.emails.splice(i, 1);
  }

  userEmails = new FormGroup({
    primaryEmail: new FormControl('', [
      Validators.required,
      Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")]),
    primaryEmails: new FormControl('', [
      Validators.required,
      Validators.pattern("^((\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*)\\s*[,]{0,1}\\s*)+$")]),
  });

  get primEmail() {
      return this.userEmails.get('primaryEmail')
  }

  isControlInvalid(controlName: string): boolean {
    if (controlName != null) {
      const control = this.userEmails.controls[controlName];
      return control.invalid && control.touched;
    }
  }

  sendEmails() {
    const email = new Email(this.userEmails.value, '1', '1');
    console.log(this.userEmails.value);
    console.log(this.emailService.postEmailArray(email));
    this.emailService
      .postEmailArray(email)
      .subscribe(e => console.log(e));
  }

  onSubmit() {
    const controls = this.userEmails.controls;
    if (this.userEmails.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }
    this.sendEmails();
    console.log(this.userEmails.value);
  }
}

