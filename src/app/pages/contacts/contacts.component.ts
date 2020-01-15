import {Component, OnInit} from '@angular/core';
import {faArrowDown, faArrowUp, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Pageable} from "../../models/pageable";
import {Contact, ContactTableCol, Direction} from "../../models/contactTableCol";
import {ContactsService} from "../../services/contacts.service";
import {HttpParams} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {RedirectUtil} from "../../util/redirect-util";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  icons = {faArrowUp, faArrowDown, faEdit, faTrash};

  tableHead: ContactTableCol[];
  items: Contact[];
  tempItemId: number = -1;
  private redirects: RedirectUtil;
  nameForm = new FormControl('');
  emailForm = new FormControl('');
  filterForm = new FormControl('');

  pageable: Pageable;

  constructor(private service: ContactsService, private router: Router, private route: ActivatedRoute) {
    this.redirects = new RedirectUtil(router, route);
    if (this.route.snapshot.queryParamMap.has("filter")){
      this.filterForm.setValue(this.route.snapshot.queryParamMap.get("filter"))
    }
  }

  ngOnInit() {
    this.tableHead = [
      {title: "#", field: undefined},
      {title: "Name", field: "name", selected: false, direction: Direction.ASC},
      {title: "Email", field: "email", selected: false, direction: Direction.ASC},
      {title: "Actions", field: undefined},
    ];
    this.getContacts();
  }

  getContacts() {
    this.service.getContacts(this.buildRequestParams())
      .toPromise()
      .then(e => {
        this.items = e.items;
        this.pageable = e.pageable;
        let selected = this.tableHead[this.tableHead.findIndex(e => e.field === this.pageable.sort)];
        selected.direction = this.pageable.direction;
        selected.field = this.pageable.sort;
        selected.selected = true;
      }).catch(console.log)
  }

  createContact() {
    this.service.createContact(this.nameForm.value, this.emailForm.value)
      .toPromise()
      .then(e => {
        this.items.push({email: this.emailForm.value, id: e.item, name: this.nameForm.value});
        this.nameForm = new FormControl('');
        this.emailForm = new FormControl('');
      })
  }

  filter(){
    this.redirects.setParam("filter", this.filterForm.value, ['contacts']);
  }

  clearFilter(){
    this.redirects.deleteParam("filter",['contacts']);
  }

  /*todo change logic to pageable*/
  sort(contact: ContactTableCol) {
    if (!contact.field) {
      return;
    }
    if (!contact.selected) {
      this.tableHead.forEach(e => e.selected = false);
      contact.selected = true;
    } else {
      if (this.isDirectionAsc(contact)) {
        contact.direction = Direction.DESC;
      } else {
        contact.selected = false;
        contact.direction = Direction.ASC;
        this.redirects.deleteParam2("sort", "direction", ['contacts']);
        this.getContacts();
        return;
      }
    }
    this.redirects.setParam2("sort", contact.field, "direction", contact.direction, ['contacts']);
    this.getContacts()
  }

  update() {
    let name = this.nameForm.value;
    let email = this.emailForm.value;
    this.service.updateContact(this.tempItemId,name,email)
      .toPromise()
      .then(e => {
        let item = this.items[this.items.findIndex(e => e.id === this.tempItemId)];
        item.name = name;
        item.email = email;
      })
      .catch(console.log)
  }

  delete(){
    this.service.deleteContact(this.tempItemId)
      .toPromise()
      .then(e => {
        this.items.splice(this.items.findIndex(e => e.id === this.tempItemId),1);
      })
  }

  isDirectionAsc(contact: ContactTableCol): boolean {
    return contact.direction === Direction.ASC;
  }

  previousPage(): void {
    if (this.pageable.currentPage > 1) {
      this.refreshPageWithParam('page', --this.pageable.currentPage);
    }
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.pageable.lastPage) {
      this.refreshPageWithParam('page', page);
    }
  }

  nextPage(): void {
    if (this.pageable.currentPage < this.pageable.lastPage) {
      this.refreshPageWithParam('page', ++this.pageable.currentPage);
    }
  }

  refreshPageWithParam(key: string, value: any): void {
    this.redirects.setParam(key, value, ['contacts']);
  }

  private buildPages(): number[] {
    let pages = [];
    for (let i = 1; i <= this.pageable.lastPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  private openEdit(item: Contact) {
    this.nameForm = new FormControl(item.name);
    this.emailForm = new FormControl(item.email);
    this.changeTempItemId(item);
  }

  private getContact() {
    return this.getTempItem().name === null ?
      this.getTempItem().email.toUpperCase() :
      this.getTempItem().name.toUpperCase()
  }

  private changeTempItemId(item: Contact) {
    this.tempItemId = item.id;
  }

  private getTempItem():Contact {
    if (!this.items) return {email: "empty", id: -1, name:'empty'};
    let index = this.items.findIndex(e => e.id === this.tempItemId);
    if (index === -1) return {email: "empty", id: -1, name:'empty'};
    return this.items[this.items.findIndex(e => e.id === this.tempItemId)];
  }

  private itemNumber(index: number) {
    return index + 1 + (this.pageable.currentPage - 1) * this.pageable.size;
  }

  private buildRequestParams(): HttpParams {
    let params = new HttpParams();
    let currentPage = Number(this.route.snapshot.queryParamMap.get('page'));
    let size = +this.route.snapshot.queryParamMap.get('size');
    let direction = this.route.snapshot.queryParamMap.get('direction');
    let sort = this.route.snapshot.queryParamMap.get('sort');
    let filter = this.route.snapshot.queryParamMap.get('filter');
    if (currentPage !== null && currentPage > 0) {
      params = params.append('currentPage', String(currentPage - 1));
    } else {
      params = params.append('currentPage', '0');
    }
    if (size > 0) {
      params = params.append('size', String(size));
    } else {
      params = params.append('size', '12');
    }
    if (direction !== null) {
      params = params.append('direction', direction);
    } else {
      params = params.append('direction', 'DESC');
    }
    if (sort !== null) {
      params = params.append('sort', sort);
    } else {
      params = params.append('sort', "id");
    }
    if (filter !== null) {
      params = params.append('filter', filter);
    }
    return params;
  }

}
