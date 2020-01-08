export class Email {
  constructor(emailsArray: string[], surveyId: string) {
    this.emailsArray = emailsArray;
    this.surveyId = surveyId;
  }

  emailsArray: string[];
  surveyId: string;
}
