import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-one-question',
  templateUrl: './one-question.component.html',
  styleUrls: ['./one-question.component.css']
})

export class OneQuestionComponent implements OnInit {

  @Input() oneQuestion;
  @Input() parentForm: FormArray;
  previewUrls: any[] = [];
  currentCheckbox = new FormArray([]);
  oneQuestionGroup = this.fb.group({
    questionId: new FormControl(),
    answers: new FormControl([])
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.parentForm.push(this.oneQuestionGroup);
    for(let i = 0; i < this.oneQuestion.uploadingPhotos.length;i++){
      this.previewUrls[i] = 'data:image/png;base64,' + this.oneQuestion.uploadingPhotos[i];
    }
  }

  onCheckChange(event) {
    const formArray: FormArray = this.currentCheckbox;
    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      let i = 0;
      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.oneQuestionGroup.controls.answers.setValue(formArray.getRawValue());
  }
}
