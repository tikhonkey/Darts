import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { AuthGuard } from "./auth-guard.service";
import { LoginComponent } from "./login/login.component";
import { SettingsComponent } from "./settings/settings.component";
import { ScoreTableComponent } from "./scoretable/scoretable.component";
import { ScoreService } from "./scoretable/score.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SettingsComponent,
    ScoreTableComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ AuthGuard, ScoreService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
