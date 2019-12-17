import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css', './bootstrap.min.css']
})
export class QuestionComponent implements OnInit {

  @Input() oneQuestion;

  constructor() { }

  ngOnInit() {
  }

}
