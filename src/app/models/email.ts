export class Email {
  constructor(emails: string, userId: string, surveyId: string) {
    this.emails = emails;
    this.userId = userId;
    this.surveyId = surveyId;
  }

  emails: string;
  userId: string;
  surveyId: string;
  title: string;
}
