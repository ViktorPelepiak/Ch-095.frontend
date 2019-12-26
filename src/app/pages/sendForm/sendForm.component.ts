import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmailService} from "../../services/send-email.service";
import {Email} from "../../models/email";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-sendForm',
  templateUrl: './sendForm.component.html',
  styleUrls: ['./sendForm.component.css']
})
export class SendFormComponent implements OnInit {

  isShown: boolean = true;
  isShownRemoveSign: boolean = true;
  isShown2: boolean = false;
  public emails: any[] = [''];

  dynamicForm: FormGroup;
  submitted = false;

  constructor(private emailService: EmailService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      numberOfTickets: ['', Validators.required],
      tickets: new FormArray([])
    });
  }

  // convenience getters for easy access to form fields
  get f() {
    return this.dynamicForm.controls;
  }

  get t() {
    return this.f.tickets as FormArray;
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

  onChangeTickets(e) {
    const numberOfTickets = e.target.value || 0;
    if (this.t.length < numberOfTickets) {
      for (let i = this.t.length; i < numberOfTickets; i++) {
        this.t.push(this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]]
        }));
      }
    } else {
      for (let i = this.t.length; i >= numberOfTickets; i--) {
        this.t.removeAt(i);
      }
    }
  }

  sendEmails() {
    const email = new Email(this.dynamicForm.value, '1', '1');
    console.log(this.dynamicForm.value);
    console.log(this.emailService.postEmailArray(email));
    this.emailService
      .postEmailArray(email)
      .subscribe(e => console.log(e));
  }

  onSubmit() {
    this.submitted = true;

    if (this.dynamicForm.invalid) {
      return;
    }
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
