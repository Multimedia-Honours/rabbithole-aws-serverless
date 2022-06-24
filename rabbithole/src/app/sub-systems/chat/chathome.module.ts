import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 

import { ChathomeRoutingModule } from './chathome-routing.module';
import { ChathomeComponent } from './chathome.component';
import { ChatLandingComponent } from './components/chat-landing/chat-landing.component';
import { HttpClientModule } from '@angular/common/http';
import { PreferencesPopupComponent } from './components/preferences-popup/preferences-popup.component';


@NgModule({
  declarations: [
    ChathomeComponent,
    ChatLandingComponent,
    PreferencesPopupComponent
  ],
  imports: [
    CommonModule,
    ChathomeRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ChathomeModule { }