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
import {FormConstructorComponent} from './pages/form-constructor/form-constructor.component';
import {QuestionComponent} from './question/question.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {SurveysComponent} from './pages/surveys/surveys.component';
import {NgxSkltnModule} from 'ngx-skltn';

import {BarChartComponent} from './components/statistic/bar-chart-component/bar-chart-component.component';
import {ChartsModule} from 'ng2-charts';
import {StatisticComponent} from './components/statistic/statistic.component';
import {SurveySkltnComponent} from './components/survey-skltn/survey-skltn.component';
import {SurveyTopButtonsComponent} from './components/survey-top-buttons/survey-top-buttons.component';
import {QuestionsPageComponent} from './pages/questions-page/questions-page.component';
import {QuestionsFormService} from './services/questions-form.service';
import {OneQuestionComponent} from './pages/questions-page/one-question/one-question.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    AuthorizationComponent,
    FormConstructorComponent,
    QuestionComponent,
    CheckOpportunityComponent,
    SurveysComponent,
    SurveySkltnComponent,
    BarChartComponent,
    StatisticComponent,
    SurveyTopButtonsComponent,
    CheckOpportunityComponent,
    QuestionsPageComponent,
    OneQuestionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSkltnModule.forRoot(),
    ChartsModule,
  ],
  exports:[
    ChartsModule,
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
