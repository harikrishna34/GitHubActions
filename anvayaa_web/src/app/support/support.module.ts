import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupportRoutingModule } from './support-routing.module';
import { RequestDashboardComponent } from './support-request-dashboard/request-dashboard.component';
import { AllRequestScreenComponent } from './all-request-screen/all-request-screen.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { EmployeeRequestComponent } from './employee-request/employee-request.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { PartnerRevenueComponent } from './partner-revenue/partner-revenue.component';
import { UpdatePartnerRevenueComponent } from './update-partner-revenue/update-partner-revenue.component'
import { ReplacePipe } from '../replace-pipe';
import { CustomPipeModule } from '../CustomPipes/CustomPipes.module';
import { NgxPaginationModule } from 'ngx-pagination';

// import { DatePipe } from '@angular/common';
// import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    RequestDashboardComponent,
    AllRequestScreenComponent,
    EmployeeRequestComponent,
    PartnerRevenueComponent,
    UpdatePartnerRevenueComponent,
    // ReplacePipe
    
  ],
  imports: [
    CommonModule,
    SupportRoutingModule,
    AutocompleteLibModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgMultiSelectDropDownModule,
    CustomPipeModule,
    NgxPaginationModule
 
    
  ],
  // exports:[ReplaceUnderscorePipe]
})
export class SupportModule { 


}
