import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatLandingComponent } from './components/chat-landing/chat-landing.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  { path: '', component: ChatLandingComponent },
  { path: 'test', component: TestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChathomeRoutingModule { }
