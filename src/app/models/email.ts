export class Email {
  constructor(emailsArray: string[], userId: string, surveyId: string) {
    this.emailsArray = emailsArray;
    this.userId = userId;
    this.surveyId = surveyId;
    console.log("email : " + userId)
  }

  emailsArray: string[];
  userId: string;
  surveyId: string;
  // title: string;
}
