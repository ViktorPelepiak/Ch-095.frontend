export class Question {
  index: number;
  question: string;
  type: string;
  choiceAnswers: String[];
  uploadingFiles:File[];
  required: boolean;


  constructor() {
    this.uploadingFiles = [];
  }
}

