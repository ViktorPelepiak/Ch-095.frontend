import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AuthorizationComponent} from './pages/authorization/authorization.component';
import {CheckOpportunityComponent} from './pages/check-opportunity/check-opportunity.component';

import {AppRoutingModule} from './app-routing.module';

import {APP_CONFIG, AppConfig} from './app.config';

import {UserService} from './services/user.service';
import {SurveyService} from './services/survey.service';

import {SurveysComponent} from './pages/surveys/surveys.component';
import {NgxSkltnModule} from 'ngx-skltn';
import {SurveySkltnComponent} from './components/survey-skltn/survey-skltn.component';
import {SurveyTopButtonsComponent} from './components/survey-top-buttons/survey-top-buttons.component';
import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from "@angular/forms";
import {SurveySkltnComponent} from './components/survey-skltn/survey-skltn.component';
import {QuestionsPageComponent} from './pages/questions-page/questions-page.component';
import {QuestionsFormService} from './services/questions-form.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { OneQuestionComponent } from './pages/questions-page/one-question/one-question.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    AuthorizationComponent,
    CheckOpportunityComponent,
    SurveysComponent,
    SurveySkltnComponent,
    SurveyTopButtonsComponent,
    CheckOpportunityComponent,
    QuestionsPageComponent,
    OneQuestionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgxSkltnModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService, {provide: APP_CONFIG, useValue: AppConfig},
              QuestionsFormService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
