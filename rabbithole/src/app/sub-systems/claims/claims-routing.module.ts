import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateClaimComponent } from './screens/create-claim/create-claim.component';
import { ViewClaimsComponent } from './screens/view-claims/view-claims.component';

const routes: Routes = [
  { path: '', component: ViewClaimsComponent },
  { path: 'create-claim', component: CreateClaimComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimsRoutingModule { }
