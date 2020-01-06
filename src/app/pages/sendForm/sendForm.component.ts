import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmailService} from "../../services/send-email.service";
import {Email} from "../../models/email";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sendForm',
  templateUrl: './sendForm.component.html',
  styleUrls: ['./sendForm.component.css']
})
export class SendFormComponent implements OnInit {

  userId: string = null;
  successfulMessage: string = "these emails were successfully sent";
  public surveyId = this.route.snapshot.queryParams["surveyId"];
  public title = this.route.snapshot.queryParams["title"];
  wrongEmails: string = null;
  errorWrongEmails: string = null;
  isShown: boolean = true;
  isShownRemoveSign: boolean = true;
  isShown2: boolean = false;
  isShown3: boolean = false;
  dynamicForm: FormGroup;
  submitted = false;

  constructor(private emailService: EmailService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      numberOfEmails: ['', Validators.required],
      emailsArray: new FormArray([]),

      // primaryEmails: new FormControl('', [
      //   Validators.required,
      //   Validators.pattern("^((\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*)\\s*[,]{0,1}\\s*)+$")])
    });
  }

  get f() {
    return this.dynamicForm.controls;
  }

  get t() {
    return this.f.emailsArray as FormArray;
  }

  toggleShow() {
    this.isShown = !this.isShown;
    this.isShown2 = !this.isShown2;
  }

  // removeEmail(i: number) {
  //   // if (i == 1) {
  //   //   this.isShownRemoveSign = false;
  //   // }
  //   this.emails.splice(i, 1);
  // }

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

  // getUserId(): string {
  //   this.emailService
  //     .getUserId()
  //     .toPromise()
  //     .then(data => {
  //       console.log(data);
  //       return data;
  //     })
  //     .catch(e => {
  //       console.error(e)
  //       // this.userId = e.error
  //     });
  //   return null;
  // }

  sendEmails() {
    // this.userId = this.getUserId();
    console.log(this.userId);
    const email = new Email(this.dynamicForm.value.emailsArray.map(e => e.email), null, this.surveyId);
    console.log(email);
    this.emailService.postEmailArray(email).toPromise().then(data => {
      console.error("error", data);
      this.wrongEmails = data;
      this.errorWrongEmails = data ? "these emails are wrong : " + this.wrongEmails : this.successfulMessage;
    }).catch(e => {
        console.error(e);
        this.wrongEmails = e.error
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.dynamicForm.invalid) {
      return;
    }
    this.sendEmails();
    this.isShown3 = !this.isShown3;
  }

  onReset() {
    this.submitted = false;
    this.dynamicForm.reset();
    this.t.clear();
  }

  onClear() {
    this.submitted = false;
    this.t.reset();
  }
}
