import {InjectionToken} from '@angular/core';

export let APP_CONFIG = new InjectionToken<IAppConfig>('app.config');

export interface IAppConfig {
  backBaseUrl: string;
  frontBaseUrl: string;
  surveyGeneralStatisticUrl: string;
  surveyEachStatisticUrl: string;
}

export const AppConfig: IAppConfig = {
  backBaseUrl: 'http://localhost:8081',
  frontBaseUrl: 'http://localhost:4200',
  surveyGeneralStatisticUrl: '/statistic/general?surveyId=',
  surveyEachStatisticUrl: '/statistic/separately?surveyId='
};
