import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EmailService} from "../../services/send-email.service";
import {Email} from "../../models/email";
import {ActivatedRoute} from "@angular/router";
import {faPlus, faPlusCircle} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-sendForm',
  templateUrl: './sendForm.component.html',
  styleUrls: ['./sendForm.component.css']
})
export class SendFormComponent implements OnInit {


  disabled = false;
  ShowFilter = false;
  emailsSelect: any = [];
  contacts: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};

  isShownInputType: boolean = true;
  isShownTextarea: boolean = false;
  isShownSelectContact: boolean = false;
  isShownRemoveSign: boolean = true;
  public surveyId = this.route.snapshot.queryParams["surveyId"];
  public title = this.route.snapshot.queryParams["title"];
  wrongEmailsForInputField: string = null;
  errorWrongEmailsForInputField: string = null;
  successfulMessageForInputField: string = null;
  wrongEmailsForTextarea: string = null;
  errorWrongEmailsForTextarea: string = null;
  successfulMessageForTextarea: string = null;
  dynamicForm: FormGroup;
  submitted = false;
  icons = {faPlus, faPlusCircle};

  constructor(private emailService: EmailService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {
  }

  changeForm() {
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
        selectEmail: new FormControl([this.selectedItems])
      });
      this.emailsSelect = [
        {contact_id: 1, contact: 'New Delhi'},
        {contact_id: 2, contact: 'Newv Delhi'},
        {contact_id: 3, contact: 'New Dvelhi'},

      ];
      this.contacts = this.emailService.getContacts();
      console.log("contacts " + this.contacts.value);
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'contact_id',
        textField: 'contact',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 20,
        allowSearchFilter: this.ShowFilter
      };
    }
  }

  ngOnInit() {
    this.changeForm();
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }

  onSelectAll(items: any) {
    console.log('onSelectAll', items);
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
    console.log(this.dynamicForm);
    if (this.isShownInputType) {
      const email = new Email(this.dynamicForm.value.emailsArray.map(e => e.email), this.surveyId);
      console.log(email);
      this.emailService.postEmailArray(email).toPromise().then(data => {
        console.error("data", data);
        this.wrongEmailsForInputField = null;
        this.successfulMessageForInputField = "these emails were successfully sent";
      }).catch(e => {
          console.error("error" + e.error);
          this.wrongEmailsForInputField = e.error;
          this.errorWrongEmailsForInputField = "these emails are wrong : " + this.wrongEmailsForInputField;
        }
      );
    } else if (this.isShownTextarea) {
      const email = new Email(this.dynamicForm.value.emails1.replace(" ", "").split(","), this.surveyId);
      this.emailService.postEmailArray(email).toPromise().then(data => {
        console.error("emails", data);
        this.wrongEmailsForTextarea = null;
        this.successfulMessageForTextarea = "these emails were successfully sent";
      }).catch(e => {
          console.error("error" + e.error);
          this.wrongEmailsForTextarea = e.error;
          this.errorWrongEmailsForTextarea = "these emails are wrong : " + this.wrongEmailsForTextarea;
        }
      );
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.isShownInputType) {
      if (this.dynamicForm.invalid) {
        return;
      }
    } else if (this.isShownTextarea) {
      if (this.dynamicForm.invalid) {
        return;
      }
    }
    this.sendEmails();
  }

  onReset() {
    this.submitted = false;
    this.errorWrongEmailsForInputField = "";
    this.successfulMessageForInputField = "";
    this.dynamicForm.reset();
    this.t.clear();
  }

  onClear() {
    this.submitted = false;
    this.errorWrongEmailsForInputField = "";
    this.errorWrongEmailsForTextarea = "";
    this.successfulMessageForInputField = "";
    this.successfulMessageForTextarea = "";
    this.t.reset();
  }

}
