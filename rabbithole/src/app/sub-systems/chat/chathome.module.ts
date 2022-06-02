import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChathomeRoutingModule } from './chathome-routing.module';
import { ChathomeComponent } from './chathome.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ChatLandingComponent } from './components/chat-landing/chat-landing.component';
import { TestComponent } from './components/test/test.component';

@NgModule({
  declarations: [
    ChathomeComponent,
    ChatLandingComponent,
    TestComponent,
  ],
  imports: [
    CommonModule,
    ChathomeRoutingModule
  ]
})
export class ChathomeModule { }
