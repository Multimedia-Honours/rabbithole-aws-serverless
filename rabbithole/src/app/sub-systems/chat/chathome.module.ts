import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

 
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChathomeRoutingModule } from './chathome-routing.module';
import { ChathomeComponent } from './chathome.component';
import { ChatLandingComponent } from './components/chat-landing/chat-landing.component';
import { HttpClientModule } from '@angular/common/http';
import { PreferencesPopupComponent } from './components/preferences-popup/preferences-popup.component';

import { MessageBoxComponent } from './components/message-box/message-box/message-box.component';

@NgModule({
  declarations: [
    ChathomeComponent,
    ChatLandingComponent,
    PreferencesPopupComponent,
    MessageBoxComponent,
    
   
  ],
  imports: [
    CommonModule,
    ChathomeRoutingModule,
    HttpClientModule,
    MatButtonToggleModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class ChathomeModule { }