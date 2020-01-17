import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EmailService} from "../../services/send-email.service";
import {Email} from "../../models/email";
import {ActivatedRoute} from "@angular/router";
import {faPlus, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {Observable} from "rxjs";
import {Question} from "../../models/question";
import {Contact} from "../../models/EditSurvey";


@Component({
  selector: 'app-sendForm',
  templateUrl: './sendForm.component.html',
  styleUrls: ['./sendForm.component.css']
})
export class SendFormComponent implements OnInit {


  disabled = false;
  ShowFilter = false;
  emailsSelect: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  allContacts: string[];
  // allContact2 : Contact[] = [];
  // sendedContact : Contact[] = [];

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
  wrongEmailsForSelected: string = null;
  errorWrongEmailsForSelected: string = null;
  successfulMessageForSelected: string = null;
  dynamicForm: FormGroup;
  submitted = false;
  icons = {faPlus, faPlusCircle};


  constructor(private emailService: EmailService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {
  }


  changeForm() {
    let contactsForDropdown: Contact [] = [];
    if (this.allContacts != undefined) {
      for (let i = 0; i < this.allContacts.length; i++) {
        let obj = new Contact();
        obj.contact_id = i;
        obj.contact = this.allContacts[i];
        contactsForDropdown.push(obj);
      }
      console.log(contactsForDropdown);
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
        selectEmail: new FormControl([this.selectedItems])
      });
      this.emailsSelect = contactsForDropdown;
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

  getContacts() {
    this.emailService
      .getContacts().subscribe(data => {
      //console.log("data", data);
      this.allContacts = data;
      return this.allContacts;
    })
  }

  ngOnInit() {
    this.getContacts();
    //console.log("onInit", this.allContacts);
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
    if (this.isShownInputType) {
      const email = new Email(this.dynamicForm.value.emailsArray.map(e => e.email), this.surveyId);
      console.log(email);
      this.emailService.postEmailArray(email).toPromise().then(data => {
        console.error("data ", data);
        this.wrongEmailsForInputField = null;
        this.successfulMessageForInputField = "these emails were successfully sent";
      }).catch(e => {
          console.error("error " + e.error);
          this.wrongEmailsForInputField = e.error;
          this.errorWrongEmailsForInputField = "" + this.wrongEmailsForInputField;
        }
      );
    } else if (this.isShownTextarea) {
      const email = new Email(this.dynamicForm.value.emails1.replace(" ", "").split(","), this.surveyId);
      this.emailService.postEmailArray(email).toPromise().then(data => {
        console.error("emails ", data);
        this.wrongEmailsForTextarea = null;
        this.successfulMessageForTextarea = "these emails were successfully sent";
      }).catch(e => {
          console.error("error " + e.error);
          this.wrongEmailsForTextarea = e.error;
          this.errorWrongEmailsForTextarea = "" + this.wrongEmailsForTextarea;
        }
      );
    } else {
      const email = new Email(this.dynamicForm.value.selectEmail.map(e => e.contact), this.surveyId);
      console.log(email);
      this.emailService.postSelectedEmail(email).toPromise().then(data => {
        console.error("emailsSelect ", data);
        this.wrongEmailsForSelected = null;
        this.successfulMessageForSelected = "these emails were successfully sent";
      }).catch(e => {
          console.error("error " + e.error);
        this.wrongEmailsForSelected = e.error;
        this.errorWrongEmailsForSelected = "" + this.wrongEmailsForSelected;
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
