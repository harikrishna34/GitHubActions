import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EscalationdashboardComponent } from './escalationdashboard/escalationdashboard.component';
import { CreatecategoryComponent } from './createcategory/createcategory.component';



@NgModule({
  declarations: [
    EscalationdashboardComponent,
    CreatecategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EscalationsmoduleModule { }
