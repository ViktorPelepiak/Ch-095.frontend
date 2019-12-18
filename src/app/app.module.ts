import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AuthorizationComponent} from './pages/authorization/authorization.component';

import {AppRoutingModule} from './app-routing.module';

import {APP_CONFIG, AppConfig} from './app.config';

import {UserService} from './services/user.service';
import {SurveysComponent} from './pages/surveys/surveys.component';
import {NgxSkltnModule} from 'ngx-skltn';
import { SurveySkltnComponent } from './components/survey-skltn/survey-skltn.component';
import { BarChartComponent } from './components/statistic/bar-chart-component/bar-chart-component.component';
import { ChartsModule } from 'ng2-charts';
import { StatisticComponent } from './components/statistic/statistic.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    AuthorizationComponent,
    SurveysComponent,
    SurveySkltnComponent,
    BarChartComponent,
    StatisticComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxSkltnModule.forRoot(),
    ChartsModule,
  ],
  exports:[
    ChartsModule
  ],
  providers: [UserService, {provide: APP_CONFIG, useValue: AppConfig}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
