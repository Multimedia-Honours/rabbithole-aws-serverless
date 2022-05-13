import { ChathomeComponent } from './components/chat/chathome/chathome.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './components/home/landingpage/landingpage.component';
import { GroupsComponent } from './components/groups/groups.component';
import { AuthComponent } from './components/home/auth/auth.component';

const routes: Routes = [
  {
    path: 'chat',
    component: ChathomeComponent
  },
  {
    path: 'groups',
    component: GroupsComponent
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
