import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsScreenComponent } from './settings-screen/settings-screen.component';
import { ViewScreenComponent } from './view-screen/view-screen.component';
import { NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    SettingsScreenComponent,
    ViewScreenComponent
  ],
  imports: [
    CommonModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule   ,
    
  ],
  exports:[
    SettingsScreenComponent,
    ViewScreenComponent
  ]
  
})
export class GenralSettingsModule { }
