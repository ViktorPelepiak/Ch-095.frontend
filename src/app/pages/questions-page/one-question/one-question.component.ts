import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-one-question',
  templateUrl: './one-question.component.html',
  styleUrls: ['./one-question.component.css']
})
export class OneQuestionComponent implements OnInit {

  @Input() oneQuestion;

  constructor() { }

  ngOnInit() {
  }

}
