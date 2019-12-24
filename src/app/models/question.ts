export class Question {
  index: number;
  question: string;
  type: string;
  answers: String[];
  uploadingFiles:File[];
  required: boolean;

  constructor() {
    this.uploadingFiles = [];
  }
}

