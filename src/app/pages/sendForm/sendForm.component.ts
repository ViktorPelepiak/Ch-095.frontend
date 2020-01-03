import {Component, Directive, Input, OnInit} from '@angular/core';
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
  wrongEmails: string = null;
  isShown: boolean = true;
  isShownRemoveSign: boolean = true;
  isShown2: boolean = false;
  public emails: any[] = [''];
  public primaryEmails: string = "";
  public title: string;
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
      primaryEmails: new FormControl('', [
        Validators.required,
        Validators.pattern("^((\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*)\\s*[,]{0,1}\\s*)+$")])
    });
    this.getTitle();
  }

  // convenience getters for easy access to form fields
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

  removeEmail(i: number) {
    // if (i == 1) {
    //   this.isShownRemoveSign = false;
    // }
    this.emails.splice(i, 1);
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

  getTitle() {
    let surveyId = this.route.snapshot.queryParams["surveyId"]
    this.emailService.getTitleSurvey(surveyId)
      .toPromise().then(value => this.title = value["title"]);
  }

  sendEmails() {
    console.log('hello');
    // const email = new Email(this.dynamicForm.value.emails1.split(",").map(e => e.email), '1', '1');
    const email = new Email(this.dynamicForm.value.emailsArray.map(e => e.email), '1', '1');
    console.log(this.dynamicForm.value.emails);
    console.log(this.emailService.postEmailArray(email));
    this.emailService.postEmailArray(email).toPromise().then(data =>
      this.wrongEmails = null).catch(e => this.wrongEmails = e.error
    );

  }

  onSubmit() {
    this.submitted = true;
    //   if (this.dynamicForm.invalid) {
//      return;
    //   }
    this.sendEmails()
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
