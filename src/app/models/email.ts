export class Email {
  constructor(emailsArray: string[], surveyId: number) {
    this.emailsArray = emailsArray;
    this.surveyId = surveyId;
  }

  emailsArray: string[];
  surveyId: number;
}

export class Contact {
  contact_id: number;
  contact: string;
}
