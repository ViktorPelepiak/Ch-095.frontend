import {InjectionToken} from '@angular/core';

export let APP_CONFIG = new InjectionToken<IAppConfig>('app.config');

export interface IAppConfig {
  backBaseUrl: string;
  frontBaseUrl: string;
  surveyGeneralStatisticUrl: string;
  surveyEachStatisticUrl: string;
}

export const AppConfig: IAppConfig = {
  backBaseUrl: 'http://localhost:8080/Gradle___softserve_academy___EventTable_1_0_SNAPSHOT_war',
  frontBaseUrl: 'http://localhost:4200',
  surveyGeneralStatisticUrl: '/statistic/general?surveyId=',
  surveyEachStatisticUrl: '/statistic/separately?surveyId='
};
