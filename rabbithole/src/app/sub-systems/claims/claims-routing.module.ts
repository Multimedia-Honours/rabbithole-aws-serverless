import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewClaimsComponent } from './screens/view-claims/view-claims.component';

const routes: Routes = [
  { path: '', component: ViewClaimsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimsRoutingModule { }
