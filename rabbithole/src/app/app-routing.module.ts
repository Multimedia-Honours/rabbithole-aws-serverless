import { ChathomeComponent } from './sub-systems/chat/chathome.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './sub-systems/home/landingpage/landingpage.component';
import { AuthComponent } from './sub-systems/home/auth/auth.component';

const routes: Routes = [
  {
    path: 'chat', 
    loadChildren: () => import('./sub-systems/chat/chathome.module').then(m => m.ChathomeModule) 
  },
  {
    path: '**',
    redirectTo: 'chat'
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
