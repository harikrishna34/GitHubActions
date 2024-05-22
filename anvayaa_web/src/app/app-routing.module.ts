import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoustomerslistComponent } from './coustomerslist/coustomerslist.component';
import { EmergencyListComponent } from "./emergency-list/emergency-list.component"
import { LoginComponent } from './login/login.component';
// import { SidenavbarComponent } from './sidenavbar/sidenavbar.component';
// import { TopnavbarComponent } from './topnavbar/topnavbar.component';
// import { ConfigformComponent } from './configform/configform.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
// import { AserseComponent } from './asers/aserse.component';
// import { CustomerconfigurationdetailsComponent } from './customerconfigurationdetails/customerconfigurationdetails.component';
import { EmergecyCustomerDataComponent } from './emergecy-customer-data/emergecy-customer-data.component'
import { SupportDashboardComponent } from './support-dashboard/support-dashboard.component';
// import { AnchorsDashboardComponent } from './anchors-dashboard/anchors-dashboard.component';
import { AnchorDashboardComponent } from './anchor-model/anchor-dashboard/anchor-dashboard.component';
import { ProfileComponent } from './anchor-model/profile/profile.component';
import { CompanyprofileComponent } from './anchor-model/companyprofile/companyprofile.component';
import { RevenueComponent } from './anchor-model/revenue/revenue.component';
import { PartnerRevenueComponent } from './support/partner-revenue/partner-revenue.component'
import { UpdatePartnerRevenueComponent } from './support/update-partner-revenue/update-partner-revenue.component'
import { ContactDetailsComponent } from './anchor-model/contact-details/contact-details.component'
import { BankDetailsComponent } from './anchor-model/bank-details/bank-details.component'
import { AgreementDetailsComponent } from './anchor-model/agreement-details/agreement-details.component'
import { AgreementdetailsComponent } from './anchor-model/agreementdetails/agreementdetails.component'
import { LocationDetailsComponent } from './anchor-model/location-details/location-details.component'
import { DementiaScheduleModelComponent } from './dementia_model/dementia-schedule-model/dementia-schedule-model.component';
import { DementiaCustomersComponent } from './dementia_model/dementia-customers/dementia-customers.component';
import { DementiaCreateScheduleComponent } from './dementia_model/dementia-create-schedule/dementia-create-schedule.component';
import { DementiaInitialAssessmentFormComponent } from './dementia_model/dementia-initial-assessment-form/dementia-initial-assessment-form.component';
import { AnchorManagerComponent } from './anchor-model/anchor-manager/anchor-manager.component'

import { OTMDashboardComponent } from './one-time-user/otm-dashboard/otm-dashboard.component';
import { PartnersComponent } from './partner/partners/partners.component';
import { PartnerDashboardComponent } from './partner/partner-dashboard/partner-dashboard.component';
import { RequestDetailsComponent } from './partner/request-details/request-details.component';
import { AppliationDashboardComponent } from './application-dashboard/application-dashboard.component';
// import { RequestDetailsComponent } from './partner/request-details/request-details.component';
import { RequestDashboardComponent } from './support/support-request-dashboard/request-dashboard.component';
import { AllRequestScreenComponent } from './support/all-request-screen/all-request-screen.component';
import { EmployeeRequestComponent } from './support/employee-request/employee-request.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { RequestConfigurationComponent } from './partner/request-configuration/request-configuration.component';
import { MyTaskComponent } from './my-tasks-module/my-task/my-task.component';
import { SettingsScreenComponent } from './genral-settings/settings-screen/settings-screen.component';
import { ViewScreenComponent } from './genral-settings/view-screen/view-screen.component';
import { CreateRequestComponent } from './create-request/create-request.component';
import { CompilitionScreenComponent } from './my-tasks-module/compilition-screen/compilition-screen.component';
import { UpdateConfigrationFromComponent } from './update-configration-from/update-configration-from.component';
import { RequestconfigurationsComponent } from './requestconfigurations/requestconfigurations.component';
// import { CustomerDetailesScreenComponent } from './customer-operation/customer-detailes-screen';
import { CustomerDetailesScreenComponent } from './customer-operation/customer-detailes-screen/customer-detailes-screen.component';
import { CustomerOperationsComponent } from './customer-operation/customer-operations/customer-operations.component';
import { PlandetailsComponent } from './customer-operation/plandetails/plandetails.component';
import { RemaindersModule } from './remainders/remainders.module';
import { TemplatesComponent } from './remainders/templates/templates.component';
import { OngoingrequestsComponent } from './ongoingrequests/ongoingrequests.component';
import { TemplateslistComponent } from './remainders/templateslist/templateslist.component';
import { CreateRemaindersComponent } from './remainders/create-remainders/create-remainders.component';
import { ViewRemindersComponent } from './remainders/view-reminders/view-reminders.component';
import { CustomerWatchDetailsComponent } from './customer-watch-details/customer-watch-details.component';
import { StatesComponent } from './states/states.component';
import { EmergencyplanComponent } from './emergencyplan/emergencyplan.component';
import { ViewrolesComponent } from './chatmodule/viewroles/viewroles.component';
import { ViewallusersComponent } from './chatmodule/viewallusers/viewallusers.component';
import { CreatechatgroupComponent } from './chatmodule/createchatgroup/createchatgroup.component';
import { PWDAttachmentsComponent } from './dementia_model/pwd-attachments/pwd-attachments.component';
import { DetailsComponent } from './dementia_model/details/details.component';
import { DementiaRequestComponent } from './dementia_model/dementia-request/dementia-request.component';
import { MyRequestsModuleComponent } from './my-requests-module/my-requests-module.component';
import { ViewcustomerdetailsComponent } from './my-tasks-module/viewcustomerdetails/viewcustomerdetails.component';
import { EscalationdashboardComponent } from './escalationsmodule/escalationdashboard/escalationdashboard.component';
import { CreatecategoryComponent } from './escalationsmodule/createcategory/createcategory.component';
import { AsersdashboardComponent } from './asersmodule/asersdashboard/asersdashboard.component';
import { InstantsettingsComponent } from './asersmodule/instantsettings/instantsettings.component';
import { CustomerdetailsComponent } from './asersmodule/customerdetails/customerdetails.component';
import { DementiadashboardComponent } from './dementiadashboard/dementiadashboard.component';
import { ViewdementiadashboardComponent } from './viewdementiadashboard/viewdementiadashboard.component';
import { DementiacompleteandopenrequestComponent } from './dementiacompleteandopenrequest/dementiacompleteandopenrequest.component';
import { DementiapendinginitialassesmentComponent } from './dementiapendinginitialassesment/dementiapendinginitialassesment.component';
import { DementiafeedbackandopenfbComponent } from './dementiafeedbackandopenfb/dementiafeedbackandopenfb.component';
import { CustomerdashboardComponent } from './sixinonemodule/customerdashboard/customerdashboard.component';
import { AmbulancemoduleModule } from './ambulancemodule/ambulancemodule.module';
import { CreateAmbulanceComponent } from './ambulancemodule/create-ambulance/create-ambulance.component';
import { ViewEmergencyRequestDetailsComponent } from './ambulancemodule/view-emergency-request-details/view-emergency-request-details.component';
import { AddDetailsToChatComponent } from './my-tasks-module/add-details-to-chat/add-details-to-chat.component';
import { RollbackComponent } from './my-tasks-module/rollback/rollback.component';
import { DashboardComponent } from './hhcmodule/dashboard/dashboard.component';
import { CsatComponent } from './csat/csat.component';
import { SearchProfileComponent } from './my-tasks-module/search-profile/search-profile.component';
import { HHCInvoiceComponent } from './my-tasks-module/hhcinvoice/hhcinvoice.component'

import { ViewactivecustomersComponent } from './viewactivecustomers/viewactivecustomers.component';
// import { AllalarmshistoryComponent } from './asersmodule/allalarmshistory/allalarmshistory.component';
import { ConfigurationComponent } from './asersmodule/configuration/configuration.component';
import { CometChatConversationsWithMessages } from '@cometchat/chat-uikit-angular';
import { CometChatComponent } from './comet-chat/comet-chat/comet-chat.component';
import { AsersmastersComponent } from './asersmodule/asersmasters/asersmasters.component';
import { AsersmonitoringComponent } from './asersmodule/asersmonitoring/asersmonitoring.component';
import { AsersmonitoringstepsComponent } from './asersmodule/asersmonitoringsteps/asersmonitoringsteps.component';
import { CustomersdetailsviewComponent } from './asersmodule/customersdetailsview/customersdetailsview.component';
import { AsersRequestComponent } from './my-tasks-module/asers-request/asers-request.component';
import { AllalarmshistoryComponent } from './asersmodule/allalarmshistory/allalarmshistory.component';
import { EscalationComponent } from './escalation/escalation.component';
import { CustomercomprehensiveComponent } from './CustomerComprehensiveDB/customercomprehensive/customercomprehensive.component';
import { CreateescalationComponent } from './escalation/createescalation/createescalation.component';
import { EscalationinteractionComponent } from './escalation/escalationinteraction/escalationinteraction.component';
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
import { EmergencyClosedListComponent } from './emergency-closed-list/emergency-closed-list.component';
import { GetlatlongComponent } from './getlatlong/getlatlong.component';
import { HexaordersComponent } from './hexaorders/hexaorders.component';
import { HexadevicesComponent } from './hexadevices/hexadevices.component';
import { HexadevicesdetailsComponent } from './hexadevicesdetails/hexadevicesdetails.component';
import { HexadeviceBuynowComponent } from './hexadevice-buynow/hexadevice-buynow.component';
import { HhcPartnerInvoicesComponent } from './hhc-partner-invoices/hhc-partner-invoices.component';
import { NewrequestComponent } from './newrequest/newrequest.component';
import { RequestsDashboardComponent } from './request-management-module/requests-dashboard/requests-dashboard.component';
import { ViewRequestComponent } from './request-management-module/view-request/view-request.component';
import { NesttableComponent } from './nesttable/nesttable.component';
import { ShortlistprofileComponent } from './shortlistprofile/shortlistprofile.component';
import { MaindashboardComponent } from './new-hhc/maindashboard/maindashboard.component';
import { FeedbackComponent } from './feedback/feedback.component';


const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: 'full' },

  {
    path: "Dashboard", component: AppliationDashboardComponent,
    children: [
      {path:'viewrequest',component:ViewRequestComponent},
      {path:'requestsmanagementdashboard',component:RequestsDashboardComponent},
      { path: "Emergencyplan", component: EmergencyplanComponent },
      { path: "viewemergencyrequestdetails", component: ViewEmergencyRequestDetailsComponent },
      // { path: "feedback", component: FeedbackComponent },
      {
        path: "Escalation", children: [
          { path: 'ViewAllEscalations', component: EscalationComponent },
          { path: 'CreateEscalation', component: CreateescalationComponent },
          { path: 'EscalationInteraction', component: EscalationinteractionComponent }
        ]
      },
      {
        path: "newhhc", children: [
          { path: 'maindashboard', component: MaindashboardComponent },

        ]
      },
      {
        path: "getlatlong", children: [
          { path: 'viewlatlongs', component: GetlatlongComponent },


        ]
      },

      {
        path: "ambulance", children: [
          { path: 'createambulance', component: CreateAmbulanceComponent }
        ]
      },
      { path: "ongoingrequests", component: OngoingrequestsComponent },
      {
        path: "Customerslist", component: CoustomerslistComponent,
        children: [
        ]
      },
      { path: "emergencyclosedlist", component: EmergencyClosedListComponent },
      { path: "emergencyList", component: EmergencyListComponent },
      { path: "Permission", component: PermissionsComponent },
      {
        path: "remainders",
        children: [
          { path: 'createRemainders', component: CreateRemaindersComponent },
          { path: 'viewRemainders', component: ViewRemindersComponent },
        ]
      },
      {
        path: "HHC",
        children: [
          { path: 'HHCdashboard', component: DashboardComponent },
        ]
      },
      {
        path: "revenue",
        children: [
          { path: 'revenueList', component: PartnerRevenueComponent },
          { path: 'updateRevenue', component: UpdatePartnerRevenueComponent }
        ]
      },
      {
        path: "support",
        children: [
          { path: 'requestDashboard', component: RequestDashboardComponent },
          { path: 'allRequestDetails', component: AllRequestScreenComponent },
          { path: 'employeeRequest', component: EmployeeRequestComponent }
        ]
      },
      {
        path: "partner",
        children: [
          { path: 'partnersTask', component: PartnersComponent },
          { path: 'partnersDashBoard', component: PartnerDashboardComponent },
          { path: 'requestDetails', component: RequestDetailsComponent },
          { path: 'RequestConfiguration', component: RequestConfigurationComponent },
        ]
      },
      { path: 'myrequests', component: MyRequestsModuleComponent },
      {
        path: "revenue",
        children: [
          { path: 'revenueList', component: PartnerRevenueComponent },
          { path: 'updateRevenue', component: UpdatePartnerRevenueComponent }
        ]
      },
      {
        path: "dementia", children: [
          { path: "dementiaSchedule", component: DementiaScheduleModelComponent },
          { path: "assesmentform", component: DementiaInitialAssessmentFormComponent },
          { path: "dementiaCreateSchedule", component: DementiaCreateScheduleComponent },
          { path: "dementiaAllCustomers", component: DementiaCustomersComponent },
          { path: "pwdattachments", component: PWDAttachmentsComponent },
          { path: "details", component: DetailsComponent },
          { path: "DementiaRequest", component: DementiaRequestComponent },
          { path: "demnetiadashboards", component: DementiadashboardComponent },
          { path: "viewdetailsdementia", component: ViewdementiadashboardComponent },
          { path: "Complete&OpenRequests", component: DementiacompleteandopenrequestComponent },
          { path: "Pendingintialassesment", component: DementiapendinginitialassesmentComponent },
          { path: "Feedback&Openfb", component: DementiafeedbackandopenfbComponent },
        ]
      },
      {
        path: "Task",
        children: [
          { path: 'MyTask', component: MyTaskComponent },
          { path: 'taskComplition', component: CompilitionScreenComponent },
          { path: "Emergencyplan", component: EmergencyplanComponent },
          { path: "customerdetails", component: ViewcustomerdetailsComponent },
          { path: "adddetialstochat", component: AddDetailsToChatComponent },
          { path: "rollBack", component: RollbackComponent },
          { path: "searchprofile", component: SearchProfileComponent },
          { path: "HHCInvoice", component: HHCInvoiceComponent },
          { path: 'AsersRequest', component: AsersRequestComponent },
          { path: 'AssignCareManager', component: AssigncaremanagerComponent },
          { path: 'nest', component: NesttableComponent },
          { path: 'ShortlistPartner', component: ShortlistprofileComponent },
        ]
      },
      {
        path: "settings",
        children: [
          { path: 'settings', component: SettingsScreenComponent },
          { path: 'view', component: ViewScreenComponent },
          { path: 'viewrequest', component: RequestconfigurationsComponent },
          { path: 'viewtemplates', component: TemplateslistComponent },
          { path: 'templatecreation', component: TemplatesComponent },
          { path: 'viewstates', component: StatesComponent },
          { path: 'csat', component: CsatComponent },
          { path: 'viewactivecustomers', component: ViewactivecustomersComponent },
          // { path: 'customerComprehensiveDB', component:CustomercomprehensiveComponent},
          // { path: 'Comprehensivepms', component:ComprehensivepmsComponent},
          // { path: 'viewTouchPoints', component: TouchPointsComponent}


        ]
      },
      {
        path: "customeroperations",
        children: [
          { path: "customerDetailsScreen", component: CustomerDetailesScreenComponent },
          { path: "CustomerOperations", component: CustomerOperationsComponent },
          { path: "plandetails", component: PlandetailsComponent }
        ]
      },
      {
        path: "watchDetails",
        children: [
          { path: "customerwatchdetails", component: CustomerWatchDetailsComponent },
        ]
      },
      {
        path: "chat",
        children: [
          { path: "Viewroleschat", component: ViewrolesComponent },
          { path: "chatUsers", component: ViewallusersComponent },
          { path: "creatchatgroup", component: CreatechatgroupComponent },
        ]
      },
      {
        path: "escalation",
        children: [
          { path: "dashboard", component: EscalationdashboardComponent },
          { path: "catrgory", component: CreatecategoryComponent },
        ]
      },
      {
        path: "asers",
        children: [
          { path: "asersdashboard", component: AsersdashboardComponent },
          { path: "Instantsettings", component: InstantsettingsComponent },
          { path: "customerdetails", component: CustomerdetailsComponent },
          { path: "emergencyList", component: EmergencyListComponent },
          { path: "AlaramHistory", component: AllalarmshistoryComponent },
          { path: "configuration", component: ConfigurationComponent },
          { path: "AsersMasters", component: AsersmastersComponent },
          { path: "AsersMonitoring", component: AsersmonitoringComponent },
          { path: "AsersMonitoringSteps", component: AsersmonitoringstepsComponent },
          { path: "customerdetailsview", component: CustomersdetailsviewComponent }



        ]
      },
      {
        path: "Emergency",
        children: [
          { path: "emergencyList", component: EmergencyListComponent },
          { path: "emergencyCustomerData", component: EmergecyCustomerDataComponent },
        ]
      },
      {
        path: "sixinoneModule",
        children: [
          { path: "sixinonecustomerdashboard", component: CustomerdashboardComponent },
        ]
      },
      {
        path: 'cometchat', component: CometChatComponent
      },
      {
        path: "CustomerDashboard",
        children:[
          { path: 'customerComprehensiveDB', component:CustomercomprehensiveComponent},
          { path: 'Comprehensivepms', component:ComprehensivepmsComponent},
          { path: 'viewTouchPointsSettings', component: TouchPointsComponent},
          { path: 'viewOngoingCareMangerDetails' , component: OngoingcaremanagerdetailsComponent},
          { path: 'viewEMRreportsdetails', component: EmrreportsdetailsComponent },
          { path: 'viewOngoinghhcdetails', component: OngoinghhcdetailsComponent},
          { path: 'viewTransactiondetails', component: TransactiondetailsviewComponent},
          { path: 'viewPlanDetails', component: PlanetailsviewComponent},
          { path: 'viewVisitsUtilized', component: VisitsUlitilizedComponent},
          { path: 'viewOpenTickets', component: OpenTicketsComponent},
          { path: 'viewCloseTickets', component: CloseTicketsComponent},
          
          
        ]  
      },
      {
        path:'touchpoints', component:TouchpointsscreenComponent
      },{
        path:'UpdateTouchPoints', component:UpdateTouchPointComponent
      },{
        path: 'HexaDevices',
        children:[
          {path: 'viewHexaOrderDetails' , component: HexaordersComponent},
          {path: 'viewHexaServiceDetails', component: HexadevicesdetailsComponent},
          { path: 'viewHexaDevices' , component: HexadevicesComponent},
          { path: 'buynow', component: HexadeviceBuynowComponent }
        ]
        
      },
      { path: 'viewHHCPartnerInvoices', component:HhcPartnerInvoicesComponent}

    ],
  
  },
  { path: "newrequest", component: NewrequestComponent },
  { path: "UpdateConfigration", component: UpdateConfigrationFromComponent },
  { path: "CreateRequest", component: CreateRequestComponent },
  { path: "login", component: LoginComponent },
  // { path: "sidenavbar", component: SidenavbarComponent },
  // {path:"configform", component: ConfigformComponent},
  { path: "ppformyself", component: CustomerDetailsComponent },
  // {path:"Aserse", component:AserseComponent},
  // {path:"customerconfigurationdetails", component:CustomerconfigurationdetailsComponent},
  { path: "supportDashBoard", component: SupportDashboardComponent },
  // {path:"anchorsdashboard",component:AnchorsDashboardComponent},
  { path: "anchorboard", component: AnchorDashboardComponent },
  { path: "anchorprofiel", component: ProfileComponent },
  { path: "companyprofile", component: CompanyprofileComponent },
  { path: "contactdetails", component: ContactDetailsComponent },
  { path: "bankdetails", component: BankDetailsComponent },
  { path: "Agreementdetails", component: AgreementDetailsComponent },
  { path: "AgreementDetails", component: AgreementdetailsComponent },
  { path: "LocationDetails", component: LocationDetailsComponent },
  // {path:"Agreementdetls",component:AgreementdetailsComponent},
  { path: "Revenue", component: RevenueComponent },
  { path: "OneTimeUser", component: OTMDashboardComponent },
  { path: "AnchorManager", component: AnchorManagerComponent },
  { path: "Emergencyplan", component: EmergencyplanComponent },
  {
    path: "partner",
    children: [
      { path: 'partnersTask', component: PartnersComponent },
      { path: 'partnersDashBoard', component: PartnerDashboardComponent },
      { path: 'requestDetails', component: RequestDetailsComponent },
    ]
  },
  { path: "CometChat", component: CometChatConversationsWithMessages },  


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
