import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { ChathomeRoutingModule } from './chathome-routing.module';
import { ChathomeComponent } from './chathome.component';
import { ChatLandingComponent } from './components/chat-landing/chat-landing.component';
import { MessageBoxComponent } from './components/message-box/message-box/message-box.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    ChathomeComponent,
    ChatLandingComponent,
    MessageBoxComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    ChathomeRoutingModule,
    MatButtonToggleModule,
    FormsModule
    
  ]
})
export class ChathomeModule { }
