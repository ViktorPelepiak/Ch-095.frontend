import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AuthorizationComponent} from './pages/authorization/authorization.component';
import {CheckOpportunityComponent} from "./pages/check-opportunity/check-opportunity.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'login', component: AuthorizationComponent},
  {path: 'test1', component: HeaderComponent},
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
