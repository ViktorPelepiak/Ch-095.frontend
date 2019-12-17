import { InjectionToken  } from '@angular/core';

export let APP_CONFIG = new InjectionToken< IAppConfig >( 'app.config' );

export interface IAppConfig {
  backBaseUrl: string;
}

export const AppConfig: IAppConfig = {
  backBaseUrl: 'http://localhost:8080'
};
