import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth-guard.service';
import { LoginComponent } from "./login/login.component";
import { SettingsComponent } from "./settings/settings.component";
import { ScoreTableComponent } from "./scoretable/scoretable.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'manage', canActivate: [AuthGuard], component: SettingsComponent },
  { path: 'main', canActivate: [AuthGuard], component: ScoreTableComponent },
  { path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
