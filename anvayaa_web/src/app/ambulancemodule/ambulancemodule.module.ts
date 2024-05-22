import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CreateAmbulanceComponent } from './create-ambulance/create-ambulance.component';
//import { AgmCoreModule } from '@agm/core'; // Import AGM module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { AgmDirectionModule} from 'agm-direction';
import { ViewEmergencyRequestDetailsComponent } from './view-emergency-request-details/view-emergency-request-details.component';
import { CustomPipeModule } from "../CustomPipes/CustomPipes.module";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
    declarations: [
        // CreateAmbulanceComponent,
        ViewEmergencyRequestDetailsComponent
    ],
    imports: [
        CommonModule,
        //  AgmCoreModule,
         FormsModule, ReactiveFormsModule,
        // AgmDirectionModule,
        CustomPipeModule,
        NgMultiSelectDropDownModule,
        NgxSpinnerModule
    ]
})
export class AmbulancemoduleModule { }
