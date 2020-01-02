import {InjectionToken} from '@angular/core';

export let APP_CONFIG = new InjectionToken<IAppConfig>('app.config');

export interface IAppConfig {
  backBaseUrl: string;
  frontBaseUrl: string;
  questionUrl: string;
  answerUrl: string
  surveyTitleUrl: string;

}

export const AppConfig: IAppConfig = {
  backBaseUrl: 'http://localhost:8081',
  frontBaseUrl: 'http://localhost:4200',
  questionUrl: '/statistic/questions?surveyId=',
  answerUrl : '/statistic/answers?questionId=',
  surveyTitleUrl : '/statistic/surveyTitle?surveyId='
};
