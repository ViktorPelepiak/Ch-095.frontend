import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {StatisticComponent} from './components/statistic/statistic.component';
import {CheckPossibilityComponent} from './pages/check-possibility/check-possibility.component';
import {SurveysComponent} from './pages/surveys/surveys.component';
import {AuthGuardService} from './services/auth-guard.service';
import {SendFormComponent} from './pages/sendForm/sendForm.component';
import {QuestionsPageComponent} from './pages/questions-page/questions-page.component';
import {FormConstructorComponent} from './pages/form-constructor/form-constructor.component';
import {LoginComponent} from './components/login-registration/login';
import {RegisterComponent} from './components/login-registration/registration';
import {ConfirmComponent} from './components/login-registration/confirm-account/confirm.component';

const routes: Routes = [
  {path: '', component: DashboardComponent },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'logout', component: DashboardComponent},
  {path: 'confirm', component: ConfirmComponent},
  {path: 'surveys', component: SurveysComponent, canActivate: [AuthGuardService]},
  {path: 'sendForm', component: SendFormComponent, canActivate: [AuthGuardService]},
  {path: 'questions', component: QuestionsPageComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'statistic', component: StatisticComponent, canActivate: [AuthGuardService]},
  {path: 'surveys/add', component: FormConstructorComponent, canActivate: [AuthGuardService]},
  {path: 'test/:token', component: CheckPossibilityComponent},
  {path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
