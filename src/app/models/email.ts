export class Email {
  constructor(emailsArray: string[], surveyId: string) {
    this.emailsArray = emailsArray;
    this.surveyId = surveyId;
  }

  emailsArray: string[];
  surveyId: string;
}

export class Contact {
  contact_id:number;
  contact: string;
}
