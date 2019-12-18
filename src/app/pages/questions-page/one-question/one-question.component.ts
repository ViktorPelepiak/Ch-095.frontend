import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './one-question.component.html',
  styleUrls: ['./one-question.component.css', './bootstrap.min.css']
})
export class OneQuestionComponent implements OnInit {

  @Input() oneQuestion;

  constructor() { }

  ngOnInit() {
  }

}
