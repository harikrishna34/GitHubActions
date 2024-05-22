import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaindashboardComponent } from './maindashboard/maindashboard.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CustomPipeModule } from '../CustomPipes/CustomPipes.module'
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    MaindashboardComponent
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule ,
    CustomPipeModule 
  ]
})
export class NewHHCModule { }
