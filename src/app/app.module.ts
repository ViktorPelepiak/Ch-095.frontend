import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AuthorizationComponent} from './pages/authorization/authorization.component';
import {CheckOpportunityComponent} from './pages/check-opportunity/check-opportunity.component';
import {AppRoutingModule} from './app-routing.module';
import {APP_CONFIG, AppConfig} from './app.config';
import {UserService} from './services/user.service';
import {FormConstructorComponent} from './pages/form-constructor/form-constructor.component';
import {QuestionComponent} from './components/question/question.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './components/login-registration/login';
import {ConfirmComponent} from './components/login-registration/confirm-account/confirm.component';
import {BasicInterceptorService} from './services/basicInterceptor.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {SurveysComponent} from './pages/surveys/surveys.component';
import {NgxSkltnModule} from 'ngx-skltn';
import {SendFormComponent} from './pages/sendForm/sendForm.component';
import {QuestionGeneralStatisticComponent} from './components/statistic/question-component/question-general-statistic.component';
import {CookieService} from "ngx-cookie-service";
import {ChartsModule} from 'ng2-charts';
import {StatisticComponent} from './components/statistic/statistic.component';
import {SurveySkltnComponent} from './components/survey-skltn/survey-skltn.component';
import {SurveyTopButtonsComponent} from './components/survey-top-buttons/survey-top-buttons.component';
import {QuestionsPageComponent} from './pages/questions-page/questions-page.component';
import {QuestionsFormService} from './services/questions-form.service';
import {OneQuestionComponent} from './pages/questions-page/one-question/one-question.component';
import {RegisterComponent} from "./components/login-registration/registration/registration.component";
import {HttpErrorInterceptor} from "./services/http-error.interceptor";
import {AuthInterceptor} from "./interceptor/auth-interceptor.interceptor";
import {QuestionSeparatelyStatisticComponent} from './components/statistic/each-question/question-separately.component';
import {FooterComponent} from './components/footer/footer.component';
import {SocialComponent} from './pages/social/social.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    AuthorizationComponent,
    FormConstructorComponent,
    QuestionGeneralStatisticComponent,
    QuestionComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmComponent,
    CheckOpportunityComponent,
    SurveysComponent,
    SurveySkltnComponent,
    SendFormComponent,
    QuestionGeneralStatisticComponent,
    StatisticComponent,
    SurveyTopButtonsComponent,
    CheckOpportunityComponent,
    QuestionsPageComponent,
    AuthorizationComponent,
    OneQuestionComponent,
    QuestionSeparatelyStatisticComponent,
    FooterComponent,
    SocialComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-center',
      enableHtml: true
    }),
    NgxSkltnModule.forRoot(),
    ChartsModule,
  ],
  exports: [
    ChartsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService,
    ToastrService,
    {provide: APP_CONFIG, useValue: AppConfig},
    {provide: HTTP_INTERCEPTORS, useClass: BasicInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    QuestionsFormService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
