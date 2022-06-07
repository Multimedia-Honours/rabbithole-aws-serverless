import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimsRoutingModule } from './claims-routing.module';
import { ViewClaimsComponent } from './screens/view-claims/view-claims.component';
import { ClaimsTableComponent } from './components/claims-table/claims-table.component';
import { CreateClaimComponent } from './screens/create-claim/create-claim.component';


import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {  MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    ViewClaimsComponent,
    ClaimsTableComponent,
    CreateClaimComponent
  ],
  imports: [
    CommonModule,
    ClaimsRoutingModule,
    NgxDropzoneModule,
    MatTabsModule,
    MatBadgeModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class ClaimsModule { }
