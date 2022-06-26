import { ChathomeComponent } from './sub-systems/chat/chathome.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './sub-systems/home/landingpage/landingpage.component';
import { AuthComponent } from './sub-systems/home/auth/auth.component';
import { ProfileComponent } from './sub-systems/profile/profile.component';
import { AdminComponent } from './sub-systems/admin/admin.component';
import { AuthGuardService } from './sub-systems/services/auth-guard.service';


const routes: Routes = [
  {
    path: 'chat', 
    loadChildren: () => import('./sub-systems/chat/chathome.module').then(m => m.ChathomeModule) 
  },
  { 
    path: 'claims', 
    loadChildren: () => import('./sub-systems/claims/claims.module').then(m => m.ClaimsModule) 
  },
  {
    path: 'profile', 
    component: ProfileComponent  
  },
  { 
    path: 'events', 
    loadChildren: () => import('./sub-systems/events/events.module').then(m => m.EventsModule) 
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./sub-systems/admin/admin.module').then(m => m.AdminModule),
    canActivate:[AuthGuardService] 
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
