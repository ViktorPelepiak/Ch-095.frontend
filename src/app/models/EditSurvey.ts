import {Question} from "./question";

export class EditSurvey {
  surveyId:string;
  title: string;
  surveyType:string;
  surveyPhotoName:string;
  questions:Question[];
}
