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
import {SurveyService} from './services/survey.service';

import {SurveysComponent} from './pages/surveys/surveys.component';
import {NgxSkltnModule} from 'ngx-skltn';
import {SurveySkltnComponent} from './components/survey-skltn/survey-skltn.component';
import {SurveyTopButtonsComponent} from './components/survey-top-buttons/survey-top-buttons.component';
import {SurveyComponent} from './components/survey/survey.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    AuthorizationComponent,
    SurveysComponent,
    SurveySkltnComponent,
    SurveyTopButtonsComponent,
    SurveyComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxSkltnModule.forRoot(),
  ],
  providers: [UserService, SurveyService, {provide: APP_CONFIG, useValue: AppConfig}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
