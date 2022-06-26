import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FilterPipe } from './pipes/filter.pipe';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonToggleModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class AdminModule { }
