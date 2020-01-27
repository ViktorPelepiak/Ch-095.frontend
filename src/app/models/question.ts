export class Question {
  index: number;
  question: string;
  type: string;
  choiceAnswers: String[];
  uploadingPhotos:File[];
  required: boolean;


  constructor() {
    this.uploadingPhotos = [];
    this.choiceAnswers = [];
  }
}

