import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimsRoutingModule } from './claims-routing.module';
import { ClaimsComponent } from './claims.component';
import { ViewClaimsComponent } from './screens/view-claims/view-claims.component';
import { ClaimsTableComponent } from './components/claims-table/claims-table.component';

import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    ClaimsComponent,
    ViewClaimsComponent,
    ClaimsTableComponent
  ],
  imports: [
    CommonModule,
    ClaimsRoutingModule,
    MatTabsModule,
    MatBadgeModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class ClaimsModule { }