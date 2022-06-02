import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatLandingComponent } from './components/chat-landing/chat-landing.component';

const routes: Routes = [
  { path: '', component: ChatLandingComponent }
];

// .../chat/test

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChathomeRoutingModule { }
