import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { LandingpageComponent } from './sub-systems/home/landingpage/landingpage.component';
import { AuthComponent } from './sub-systems/home/auth/auth.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { ChathomeModule } from './sub-systems/chat/chathome.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileComponent } from './sub-systems/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    AuthComponent,
    ProfileComponent
    
  ],
  imports: [
    AppRoutingModule,
    ChathomeModule,
    BrowserModule,
    BrowserAnimationsModule,
    AmplifyAuthenticatorModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatButtonToggleModule,
    HttpClientModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
