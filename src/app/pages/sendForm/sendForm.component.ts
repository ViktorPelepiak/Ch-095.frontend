import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EmailService} from "../../services/send-email.service";
import {Contact, Email} from "../../models/email";
import {faPlus, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {Survey} from "../../models/survey";


@Component({
  selector: 'app-sendForm',
  templateUrl: './sendForm.component.html',
  styleUrls: ['./sendForm.component.css']
})
export class SendFormComponent implements OnInit {

  emailsSelect: any = [];
  dropdownSettings: any = {};
  allContacts: string[];
  isShownInputType: boolean = true;
  isShownTextarea: boolean = false;
  isShownSelectContact: boolean = false;
  isShownRemoveSign: boolean = true;
  surveyId: number;
  title = new FormControl('');
  wrongEmails: string = null;
  successfulMessage: string = null;
  dynamicForm: FormGroup;
  submitted = false;
  icons = {faPlus, faPlusCircle};

  constructor(private emailService: EmailService,
              private formBuilder: FormBuilder) {
  }

  changeForm() {
    this.wrongEmails = "";
    this.successfulMessage = "";
    let contactsForDropdown: Contact [] = [];
    if (this.allContacts != undefined) {
      for (let i = 0; i < this.allContacts.length; i++) {
        let obj = new Contact();
        obj.contact_id = i;
        obj.contact = this.allContacts[i];
        contactsForDropdown.push(obj);
      }
    }
    if (this.isShownInputType) {
      this.dynamicForm = this.formBuilder.group({
        emailsArray: new FormArray([]),
      });
      this.addEmail();
      this.addEmail();
    } else if (this.isShownTextarea) {
      this.dynamicForm = this.formBuilder.group({
        emails1: new FormControl('', [
          Validators.required,
          Validators.pattern("^((\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*)\\s*[,]{0,1}\\s*)+$")])
      });
    } else {
      this.dynamicForm = this.formBuilder.group({
        selectEmail: new FormControl([/*contactsForDropdown[0]*/])
      });
      this.emailsSelect = contactsForDropdown;
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'contact_id',
        textField: 'contact',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 100
      };
    }
  }

  changeSurvey(survey: Survey): void {
    this.surveyId = survey.id;
    this.title.setValue(survey.title);
    this.getContacts();
    //this.changeForm();
  }


  getContacts() {
    this.emailService
      .getContacts(this.surveyId).subscribe(data => {
      this.allContacts = data;
      return this.allContacts;
    })
  }

  ngOnInit() {
    this.changeForm();
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }

  get f() {
    return this.dynamicForm.controls;
  }

  get t() {
    return this.f.emailsArray as FormArray;
  }

  toggleShow() {
    this.isShownInputType = !this.isShownInputType;
    this.isShownTextarea = !this.isShownTextarea;
    this.changeForm();
  }

  toggleShow2() {
    this.isShownInputType = false;
    this.isShownTextarea = false;
    this.isShownSelectContact = true;
    this.changeForm();
  }

  toggleShow3() {
    this.isShownInputType = true;
    this.isShownTextarea = false;
    this.isShownSelectContact = false;
    this.changeForm();
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.dynamicForm.controls[controlName];
    return control.invalid && control.touched;
  }

  addEmail() {
    this.isShownRemoveSign = true;
    if (this.t.length < 50) {
      this.t.push(this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]]
      }));
    }
  }

  removeEmail(i: number) {
    this.t.removeAt(i);
    if (i == 1) {
      this.isShownRemoveSign = false;
    } else {
      this.isShownRemoveSign = true;
      this.t.removeAt(i);
    }
  }

  sendEmails() {
    if (this.isShownInputType) {
      const email = new Email(this.dynamicForm.value.emailsArray.map(e => e.email), this.surveyId);
      this.postEmail(email);
    } else if (this.isShownTextarea) {
      const email = new Email(this.dynamicForm.value.emails1.replace(" ", "").split(","), this.surveyId);
      this.postEmail(email);
    } else {
      const email = new Email(this.dynamicForm.value.selectEmail.map(e => e.contact), this.surveyId);
      this.postEmail(email);
    }
  }

  postEmail(email) {
    this.emailService.postEmailArray(email).toPromise().then(data => {
      console.error("data ", data);
      this.wrongEmails = null;
      this.successfulMessage = "these emails were successfully sent";
    }).catch(e => {
        console.error("error " + e.error);
        this.wrongEmails = e.error;
      }
    );
  }

  onSubmit() {
    this.wrongEmails = "";
    this.successfulMessage = "";
    this.submitted = true;
    if (this.isShownInputType) {
      if (this.dynamicForm.invalid) {
        return;
      }
    } else if (this.isShownTextarea) {
      if (this.dynamicForm.invalid) {
        return;
      }
    } else if (this.isShownSelectContact) {
      if (this.dynamicForm.value.selectEmail.map(e => e.contact) == 0) {
        return;
      }
    }
    this.sendEmails();
  }

  onReset() {
    this.onClear();
    if (this.t.length > 1) {
      this.t.clear();
      this.t.push(this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]]
      }));
      this.isShownRemoveSign = false;
    }
  }

  onClear() {
    this.submitted = false;
    this.wrongEmails = "";
    this.successfulMessage = "";
    this.t.reset();
  }
}
