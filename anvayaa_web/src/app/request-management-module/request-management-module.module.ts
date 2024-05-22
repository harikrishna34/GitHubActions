import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsDashboardComponent } from './requests-dashboard/requests-dashboard.component';
import { ViewRequestComponent } from './view-request/view-request.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NesttableComponent } from '../nesttable/nesttable.component';
import { ShortlistprofileComponent } from '../shortlistprofile/shortlistprofile.component';
import { CustomPipeModule } from "../CustomPipes/CustomPipes.module";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {SafePipe} from '../urlSanitize-pipe'; 
@NgModule({
    declarations: [
        RequestsDashboardComponent,
        ViewRequestComponent,
        NesttableComponent,
        ShortlistprofileComponent,
        SafePipe
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        NgxSpinnerModule,
        CustomPipeModule,
        NgMultiSelectDropDownModule
    ],
    exports:[
        SafePipe
    ]
})
export class RequestManagementModuleModule { }
