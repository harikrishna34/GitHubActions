import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnchorDashboardComponent } from './anchor-dashboard/anchor-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { CompanyprofileComponent } from './companyprofile/companyprofile.component';
import { RevenueComponent } from './revenue/revenue.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { AgreementDetailsComponent } from './agreement-details/agreement-details.component';
import { AgreementdetailsComponent } from './agreementdetails/agreementdetails.component';
// import { DatepickerModule } from 'ng2-datepicker';
import { LocationDetailsComponent } from './location-details/location-details.component';
import {AnchorManagerComponent} from './anchor-manager/anchor-manager.component'




@NgModule({
  declarations: [
    AnchorDashboardComponent,
    ProfileComponent,
    CompanyprofileComponent,
    RevenueComponent,
    ContactDetailsComponent,
    BankDetailsComponent,
    AgreementDetailsComponent,
    AgreementdetailsComponent,
    LocationDetailsComponent,
    AnchorManagerComponent
  ],
  imports: [
    CommonModule,
    // DatepickerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    AnchorDashboardComponent,
    ProfileComponent,
    CompanyprofileComponent,
    RevenueComponent,
    ContactDetailsComponent,
    BankDetailsComponent,
    AgreementDetailsComponent,
    LocationDetailsComponent,
    AnchorManagerComponent
  ]
})
export class AnchorModelModule { }
