import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EmergencyListComponent } from './emergency-list/emergency-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

// import { SidenavbarComponent } from './sidenavbar/sidenavbar.component';
// import { TopnavbarComponent } from './topnavbar/topnavbar.component';
// import { ConfigformComponent } from './configform/configform.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
// import { AserseComponent } from './asers/aserse.component';
// import { CustomerconfigurationdetailsComponent } from './customerconfigurationdetails/customerconfigurationdetails.component';

import { EmergecyCustomerDataComponent } from './emergecy-customer-data/emergecy-customer-data.component';
import { SupportDashboardComponent } from './support-dashboard/support-dashboard.component';
// import { AnchorsDashboardComponent } from './anchors-dashboard/anchors-dashboard.component';
import { AnchorModelModule } from './anchor-model/anchor-model.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DementiaModule } from './dementia_model/dementia.module';
import { DatePipe } from '@angular/common';
import { OneTimeUserModule } from './one-time-user/one-time-user.module';
import { PartnersComponent } from './partner/partners/partners.component';
// import { FilterPipeModule } from 'ngx-filter-pipe';
import { RequestDetailsComponent } from './partner/request-details/request-details.component';
import { PartnerModule } from './partner/partner.module';
import { AppliationDashboardComponent } from './application-dashboard/application-dashboard.component';
import { CoustomerslistComponent } from './coustomerslist/coustomerslist.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { PartnerDashboardComponent } from './partner/partner-dashboard/partner-dashboard.component';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SupportModule } from './support/support.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MyTasksModuleModule } from './my-tasks-module/my-tasks-module.module';
import { GenralSettingsModule } from './genral-settings/genral-settings.module';
import { CreateRequestComponent } from './create-request/create-request.component';
import { UpdateConfigrationFromComponent } from './update-configration-from/update-configration-from.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { RequestconfigurationsComponent } from './requestconfigurations/requestconfigurations.component';
import { CustomerOperationModule } from './customer-operation/customer-operation.module';
import { RemaindersModule } from './remainders/remainders.module';
import { OngoingrequestsComponent } from './ongoingrequests/ongoingrequests.component';
import { CustomPipeModule } from './CustomPipes/CustomPipes.module';
import { CustomerWatchDetailsComponent } from './customer-watch-details/customer-watch-details.component';
import { StatesComponent } from './states/states.component';
import { EmergencyplanComponent } from './emergencyplan/emergencyplan.component';
import { ChatmoduleModule } from './chatmodule/chatmodule.module';
import { EscalationsmoduleModule } from './escalationsmodule/escalationsmodule.module';
import { AsersmoduleModule } from './asersmodule/asersmodule.module';
import { DementiadashboardComponent } from './dementiadashboard/dementiadashboard.component';
import { ViewdementiadashboardComponent } from './viewdementiadashboard/viewdementiadashboard.component';
import { DementiacompleteandopenrequestComponent } from './dementiacompleteandopenrequest/dementiacompleteandopenrequest.component';
import { DementiapendinginitialassesmentComponent } from './dementiapendinginitialassesment/dementiapendinginitialassesment.component';
import { DementiafeedbackandopenfbComponent } from './dementiafeedbackandopenfb/dementiafeedbackandopenfb.component';
import { MyRequestsModuleComponent } from './my-requests-module/my-requests-module.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SixinonemoduleModule } from '../app/sixinonemodule/sixinonemodule.module';
import { AmbulancemoduleModule } from './ambulancemodule/ambulancemodule.module';
// import { AgmDirectionModule} from 'agm-direction';
// import { PdfViewerModule } from 'ng2-pdf-viewer'; // <- import PdfViewerModule
//import { AgmCoreModule } from '@agm/core';
import { HhcmoduleModule } from './hhcmodule/hhcmodule.module';
import { CsatComponent } from './csat/csat.component';
import { ViewactivecustomersComponent } from './viewactivecustomers/viewactivecustomers.component';
import { CometChatConversationsWithMessages } from '@cometchat/chat-uikit-angular';
import { CometChatGroupsWithMessages } from '@cometchat/chat-uikit-angular';
import { CometChatComponent } from './comet-chat/comet-chat/comet-chat.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { EscalationComponent } from './escalation/escalation.component';
import { CreateescalationComponent } from './escalation/createescalation/createescalation.component';
import { EscalationinteractionComponent } from './escalation/escalationinteraction/escalationinteraction.component';
import { CustomercomprehensiveComponent } from './CustomerComprehensiveDB/customercomprehensive/customercomprehensive.component';
import { ComprehensivepmsComponent } from './comprehensivepms/comprehensivepms.component';
import { TouchPointsComponent } from './touch-points/touch-points.component';
import { OngoingcaremanagerdetailsComponent } from './ongoingcaremanagerdetails/ongoingcaremanagerdetails.component';
import { EmrreportsdetailsComponent } from './emrreportsdetails/emrreportsdetails.component';
import { OngoinghhcdetailsComponent } from './ongoinghhcdetails/ongoinghhcdetails.component';
import { TransactiondetailsviewComponent } from './transactiondetailsview/transactiondetailsview.component';
import { AssigncaremanagerComponent } from './assigncaremanager/assigncaremanager.component';
import { PlanetailsviewComponent } from './planetailsview/planetailsview.component';
import { VisitsUlitilizedComponent } from './visits-ulitilized/visits-ulitilized.component';
import { OpenTicketsComponent } from './open-tickets/open-tickets.component';
import { CloseTicketsComponent } from './close-tickets/close-tickets.component';
import { TouchpointsscreenComponent } from './touchpointsscreen/touchpointsscreen.component';
import { UpdateTouchPointComponent } from './update-touch-point/update-touch-point.component';
import { GetlatlongComponent } from './getlatlong/getlatlong.component';
import { ClipboardModule } from 'ngx-clipboard'; 
import { HorizontalTimelineComponent } from './horizontal-timeline/horizontal-timeline';
import { EmergencyClosedListComponent } from './emergency-closed-list/emergency-closed-list.component';
import { HexaordersComponent } from './hexaorders/hexaorders.component';
import { HexadevicesComponent } from './hexadevices/hexadevices.component';
import { HexadevicesdetailsComponent } from './hexadevicesdetails/hexadevicesdetails.component';
import { HexadeviceBuynowComponent } from './hexadevice-buynow/hexadevice-buynow.component';
import { HhcPartnerInvoicesComponent } from './hhc-partner-invoices/hhc-partner-invoices.component';
import { NewrequestComponent } from './newrequest/newrequest.component';
import { ShortlistprofileComponent } from './shortlistprofile/shortlistprofile.component';
import { RequestManagementModuleModule } from './request-management-module/request-management-module.module';
import { NewHHCModule } from './new-hhc/new-hhc.module';
import { FeedbackComponent } from './feedback/feedback.component';
import { SafePipe } from './urlSanitize-pipe';


// import { NesttableComponent } from './nesttable/nesttable.component';

// var moment = require('moment/moment');
@NgModule({
  declarations: [
    AppComponent,
    EmergencyListComponent,
    LoginComponent,
    CoustomerslistComponent,
    // SidenavbarComponent,
    EmergecyCustomerDataComponent,
    SupportDashboardComponent,
    AppliationDashboardComponent,
    RequestDetailsComponent,
    PartnerDashboardComponent,
    RequestDetailsComponent,
    PartnersComponent,
    RequestDetailsComponent,
    CreateRequestComponent,
    UpdateConfigrationFromComponent,
    PermissionsComponent,
    RequestconfigurationsComponent,
    OngoingrequestsComponent,
    CustomerWatchDetailsComponent,
    StatesComponent,
    EmergencyplanComponent,
    DementiadashboardComponent,
    ViewdementiadashboardComponent,
    DementiacompleteandopenrequestComponent,
    DementiapendinginitialassesmentComponent,
    DementiafeedbackandopenfbComponent,
    MyRequestsModuleComponent,
    CsatComponent,
    ViewactivecustomersComponent,
    CometChatComponent,
    EscalationComponent,
    CreateescalationComponent,
    EscalationinteractionComponent,
    CustomercomprehensiveComponent,
    ComprehensivepmsComponent,
    TouchPointsComponent,
    OngoingcaremanagerdetailsComponent,
    EmrreportsdetailsComponent,
    OngoinghhcdetailsComponent,
    TransactiondetailsviewComponent,
    AssigncaremanagerComponent,
    PlanetailsviewComponent,
    VisitsUlitilizedComponent,
    OpenTicketsComponent,
    CloseTicketsComponent,
    TouchpointsscreenComponent,
    UpdateTouchPointComponent,
    GetlatlongComponent,
    HorizontalTimelineComponent,
    EmergencyClosedListComponent,
    HexaordersComponent,
    HexadevicesComponent,
    HexadeviceBuynowComponent,
    HhcPartnerInvoicesComponent,
    HexadevicesdetailsComponent,
    NewrequestComponent,
    FeedbackComponent,

    

  ],
  imports: [
    
    BrowserModule,
    OneTimeUserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AnchorModelModule,
    NgxSpinnerModule,
    AutocompleteLibModule,
    RequestManagementModuleModule,
    // Ng2SearchPipeModule,
    SupportModule,
    NgMultiSelectDropDownModule,
    AmbulancemoduleModule,
    // PdfViewerModule,
    // DpDatePickerModule,
    AnchorModelModule,
    BrowserAnimationsModule,
    DementiaModule,
    // moment
    GenralSettingsModule,
    MyTasksModuleModule,
    CustomerOperationModule,
    RemaindersModule,
    CustomPipeModule,
    ChatmoduleModule,
    EscalationsmoduleModule,
    AsersmoduleModule,
    // SixinonemoduleModule,
    // AgmCoreModule.forRoot({
    //   apiKey:"AIzaSyDXPAPzNI60GsR8IKB5lwPj-6FR43IPkMc",
    //   libraries: ['places']
    // }),
    // AgmDirectionModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true,
      registrationStrategy: 'registerWhenStable:30000',
    }),
    NgxPaginationModule,
    CometChatConversationsWithMessages,
    CometChatGroupsWithMessages,
    NgxIntlTelInputModule,
    ClipboardModule,
    NewHHCModule
   
  ],
  exports: [EmergecyCustomerDataComponent],
  // exports: [ ReplaceUnderscorePipe ]
  bootstrap: [AppComponent],
})
export class AppModule {}
export class DemoDatepickerModule {}
