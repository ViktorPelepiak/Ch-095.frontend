import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AuthorizationComponent} from './pages/authorization/authorization.component';
import {SurveysComponent} from './pages/surveys/surveys.component';
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'login', component: AuthorizationComponent, canActivate: [AuthGuardService]},
  {path: 'surveys/:page', component: SurveysComponent},
  {path: 'test1', component: HeaderComponent},
  {path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
