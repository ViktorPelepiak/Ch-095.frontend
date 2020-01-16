import {Question} from "./question";

export class EditSurvey {
  surveyId:string;
  title: string;
  surveyPhotoName:string;
  questions:Question[];
}

export class Contact {
  contact_id:number;
  contact: string;
}
