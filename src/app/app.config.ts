import {InjectionToken} from '@angular/core';

export let APP_CONFIG = new InjectionToken<IAppConfig>('app.config');

export interface IAppConfig {
  backBaseUrl: string;
  frontBaseUrl: string;
}

export const AppConfig: IAppConfig = {
  backBaseUrl: 'http://localhost:8080',
  frontBaseUrl: 'http://localhost:4200'
};
