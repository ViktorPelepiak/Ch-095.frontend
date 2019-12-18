import {Component, OnInit} from '@angular/core';
import {EmailService} from "../../services/send-email.service";
import {Email} from "../../models/email";

@Component({
  selector: 'app-sendForm',
  templateUrl: './sendForm.component.html',
  styleUrls: ['./sendForm.component.css']
})
export class SendFormComponent implements OnInit {

  isShown: boolean = true;
  isShown2: boolean = false;
  toggleShow() {
    this.isShown = ! this.isShown;
    this.isShown2 = ! this.isShown2;
  }


  public emails: any[] = [''];

  addEmail() {
    this.emails.push('');
  }

  removeEmail(i: number) {
    this.emails.splice(i, 1);
  }

  hideForm(){
  }

  constructor(private emailService: EmailService) {
  }

  ngOnInit() {
  }

  sendEmails(formData) {
    const email = new Email(formData.email, '2', '1');
      console.log(formData.email);
      this.emailService
        .postEmailArray(email)
        .subscribe(e => console.log(e));
    }


}

