
 import { BrowserModule } from '@angular/platform-browser';
 import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartnerRoutingModule } from './partner-routing.module';
import { PartnerDashboardComponent } from './partner-dashboard/partner-dashboard.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
// import { FilterPipeModule } from 'ngx-filter-pipe';
import { PartnersComponent } from './partners/partners.component';
// import { DatePipe } from '@angular/common';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RequestConfigurationComponent } from './request-configuration/request-configuration.component';



@NgModule({
  declarations: [
    // PartnerDashboardComponent,
    // RequestDetailsComponent,
    // PartnersComponent
    
  
    RequestConfigurationComponent
  ],
  imports: [
    BrowserModule,
    // CommonModule,
    FormsModule,
    PartnerRoutingModule,
    
    // FilterPipeModule,
    // Ng2SearchPipeModule,
    ReactiveFormsModule,
  

  ],  
  //  providers: [DatePipe],
})
export class PartnerModule { }
