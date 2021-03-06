import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimsRoutingModule } from './claims-routing.module';
import { ViewClaimsComponent } from './screens/view-claims/view-claims.component';
import { CreateClaimComponent } from './screens/create-claim/create-claim.component';

import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { ClaimsBackgroundComponent } from './components/claims-background/claims-background.component';
import { ClaimsLoadingComponent } from './components/claims-loading/claims-loading.component';
import { SuccessErrorPopupComponent } from './components/success-error-popup/success-error-popup.component';
import { AcceptedTableComponent } from './components/tables/accepted-table/accepted-table.component';
import { PendingTableComponent } from './components/tables/pending-table/pending-table.component';
import { DeclinedTableComponent } from './components/tables/declined-table/declined-table.component';

@NgModule({
  declarations: [
    ViewClaimsComponent,
    CreateClaimComponent,
    ClaimsBackgroundComponent,
    ClaimsLoadingComponent,
    SuccessErrorPopupComponent,
    AcceptedTableComponent,
    PendingTableComponent,
    DeclinedTableComponent
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
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class ClaimsModule { }
