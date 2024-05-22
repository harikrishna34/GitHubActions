import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OneTimeUserRoutingModule } from './one-time-user-routing.module';
import { OTMDashboardComponent } from './otm-dashboard/otm-dashboard.component';


@NgModule({
  declarations: [
    OTMDashboardComponent
  ],
  imports: [
    CommonModule,
    OneTimeUserRoutingModule
  ]
})
export class OneTimeUserModule { }
