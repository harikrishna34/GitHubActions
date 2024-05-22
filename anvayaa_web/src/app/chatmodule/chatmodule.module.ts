import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewrolesComponent } from './viewroles/viewroles.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewallusersComponent } from './viewallusers/viewallusers.component';
import { CreatechatgroupComponent } from './createchatgroup/createchatgroup.component';
import { NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown'


@NgModule({
  declarations: [
    ViewrolesComponent,
    ViewallusersComponent,
    CreatechatgroupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule
  ],
  exports:[
    ViewrolesComponent,
    ViewallusersComponent,
    CreatechatgroupComponent

  ]
})
export class ChatmoduleModule { }
