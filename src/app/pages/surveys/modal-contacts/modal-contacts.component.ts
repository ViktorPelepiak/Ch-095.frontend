import {Component, Input, OnInit} from '@angular/core';

import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-contacts',
  templateUrl: './modal-contacts.component.html',
  styleUrls: ['./modal-contacts.component.css']
})
export class ModalContactsComponent implements OnInit {
  @Input()  contacts: string[];
  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit() {
  }

}
