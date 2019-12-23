export class Question {
  index: number;
  question: string;
  type: string;
  answers: String[];
  uploadingFiles:[{ prototype: File; new(fileBits: BlobPart[], fileName: string, options?: FilePropertyBag): File }];
  required: boolean;

  constructor() {
    this.uploadingFiles = [File];
  }
}

