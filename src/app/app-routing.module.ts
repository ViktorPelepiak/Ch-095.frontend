import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AuthorizationComponent} from './pages/authorization/authorization.component';
import {StatisticComponent} from "./components/statistic/statistic.component";
import {CheckOpportunityComponent} from './pages/check-opportunity/check-opportunity.component';
import {SurveysComponent} from './pages/surveys/surveys.component';
import {AuthGuardService} from './services/auth-guard.service';
import {SendFormComponent} from "./pages/sendForm/sendForm.component";
import {QuestionsPageComponent} from './pages/questions-page/questions-page.component';
import {FormConstructorComponent} from './pages/form-constructor/form-constructor.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'login', component: AuthorizationComponent, canActivate: [AuthGuardService]},
  {path: 'surveys', component: SurveysComponent},
  {path: 'sendForm', component: SendFormComponent},
  {path: 'questions', component: QuestionsPageComponent},
  {path: 'test1', component: HeaderComponent},
  {path: 'statistic', component: StatisticComponent},
  {path: 'surveys/add', component: FormConstructorComponent},
  {path: 'checkOpportunity', component: CheckOpportunityComponent},
  {path: 'test/:token', component: CheckOpportunityComponent},
  {path: '**', redirectTo: '/'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
