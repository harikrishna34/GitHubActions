import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsersdashboardComponent } from './asersdashboard/asersdashboard.component';
import { InstantsettingsComponent } from './instantsettings/instantsettings.component';
import { CustomerdetailsComponent } from './customerdetails/customerdetails.component';
import { NgApexchartsModule } from "ng-apexcharts";
//import { AgmCoreModule } from "@agm/core";
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown'
import { CustomPipeModule } from '../CustomPipes/CustomPipes.module';
import { AllalarmshistoryComponent } from './allalarmshistory/allalarmshistory.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
// import { AsersalarmhistoryComponent } from './asersalarmhistory/asersalarmhistory.component';
import { AsersmastersComponent } from './asersmasters/asersmasters.component';
import { AsersmonitoringComponent } from './asersmonitoring/asersmonitoring.component';
import { AsersmonitoringstepsComponent } from './asersmonitoringsteps/asersmonitoringsteps.component';
import { CustomersdetailsviewComponent } from './customersdetailsview/customersdetailsview.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AsersdashboardComponent,
    CustomerdetailsComponent,
    InstantsettingsComponent,
    AllalarmshistoryComponent,
    ConfigurationComponent,
    // AsersalarmhistoryComponent,
    AsersmastersComponent,
    AsersmonitoringComponent,
    AsersmonitoringstepsComponent,
    CustomersdetailsviewComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgApexchartsModule,
    NgMultiSelectDropDownModule,
    // AgmCoreModule.forRoot({
    //   apiKey: "AIzaSyDXPAPzNI60GsR8IKB5lwPj-6FR43IPkMc"
    // }),
    CustomPipeModule,
    AutocompleteLibModule,
    GoogleMapsModule
  ]
})
export class AsersmoduleModule { }
