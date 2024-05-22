import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
// import { BrowserModule } from '@angular/platform-browser'
import { UsersService } from '../../users.service'
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, Form, AbstractControl, ValidatorFn } from '@angular/forms';
import { formatDate } from '@angular/common';
// import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';



import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(90deg)' })),
      state('default1', style({ transform: 'rotate(0)' })),
      state('rotated1', style({ transform: 'rotate(90deg)' })),
      state('default2', style({ transform: 'rotate(0)' })),
      state('rotated2', style({ transform: 'rotate(90deg)' })),
      state('default3', style({ transform: 'rotate(0)' })),
      state('rotated3', style({ transform: 'rotate(90deg)' })),
      state('default4', style({ transform: 'rotate(0)' })),
      state('rotated4', style({ transform: 'rotate(90deg)' })),
      state('default5', style({ transform: 'rotate(0)' })),
      state('rotated5', style({ transform: 'rotate(90deg)' })),
      state('default6', style({ transform: 'rotate(0)' })),
      state('rotated6', style({ transform: 'rotate(90deg)' })),
      state('default7', style({ transform: 'rotate(0)' })),
      state('rotated7', style({ transform: 'rotate(90deg)' })),
      state('default8', style({ transform: 'rotate(0)' })),
      state('rotated9', style({ transform: 'rotate(90deg)' })),
      state('default9', style({ transform: 'rotate(0)' })),
      state('rotated10', style({ transform: 'rotate(90deg)' })),
      state('default10', style({ transform: 'rotate(0)' })),
      state('rotated8', style({ transform: 'rotate(90deg)' })),
      state('rotated14', style({ transform: 'rotate(90deg)' })),
      state('default14', style({ transform: 'rotate(0)' })),
      state('rotated15', style({ transform: 'rotate(90deg)' })),
      state('default15', style({ transform: 'rotate(0)' })),
      state('rotated16', style({ transform: 'rotate(90deg)' })),
      state('default16', style({ transform: 'rotate(0)' })),
      state('rotated17', style({ transform: 'rotate(90deg)' })),
      state('default17', style({ transform: 'rotate(0)' })),
      state('rotated18', style({ transform: 'rotate(90deg)' })),
      state('default18', style({ transform: 'rotate(0)' })),
      state('rotated19', style({ transform: 'rotate(90deg)' })),
      state('default19', style({ transform: 'rotate(0)' })),
      state('rotated20', style({ transform: 'rotate(90deg)' })),
      state('default20', style({ transform: 'rotate(0)' })),
      state('rotated21', style({ transform: 'rotate(90deg)' })),
      state('default21', style({ transform: 'rotate(0)' })),
      state('rotated22', style({ transform: 'rotate(90deg)' })),
      state('default22', style({ transform: 'rotate(0)' })),
      state('rotated23', style({ transform: 'rotate(90deg)' })),
      state('default23', style({ transform: 'rotate(0)' })),
      state('rotated24', style({ transform: 'rotate(90deg)' })),
      state('default24', style({ transform: 'rotate(0)' })),
      state('default26', style({ transform: 'rotate(0)' })),
      state('rotated26', style({ transform: 'rotate(90deg)' })),
      state('default27', style({ transform: 'rotate(0)' })),
      state('rotated27', style({ transform: 'rotate(90deg)' })),
      state('default28', style({ transform: 'rotate(0)' })),
      state('rotated28', style({ transform: 'rotate(90deg)' })),
      state('default30', style({ transform: 'rotate(0)' })),
      state('rotated30', style({ transform: 'rotate(90deg)' })),
      state('default29', style({ transform: 'rotate(0)' })),
      state('rotated29', style({ transform: 'rotate(90deg)' })),
      state('default31', style({ transform: 'rotate(0)' })),
      state('rotated31', style({ transform: 'rotate(90deg)' })),
      state('default32', style({ transform: 'rotate(0)' })),
      state('rotated32', style({ transform: 'rotate(90deg)' })),
      state('rotated33', style({ transform: 'rotate(90deg)' })),

      state('default34', style({ transform: 'rotate(0)' })),
      state('rotated34', style({ transform: 'rotate(90deg)' })),
      state('default35', style({ transform: 'rotate(0)' })),
      state('rotated35', style({ transform: 'rotate(90deg)' })),
      state('default39', style({ transform: 'rotate(0)' })),
      state('rotated39', style({ transform: 'rotate(90deg)' })),
      state('default37', style({ transform: 'rotate(0)' })),
      state('rotated37', style({ transform: 'rotate(90deg)' })),
      state('default40', style({ transform: 'rotate(0)' })),
      state('rotated40', style({ transform: 'rotate(90deg)' })),
      state('rotated43', style({ transform: 'rotate(90deg)' })),

      state('default44', style({ transform: 'rotate(0)' })),
      state('rotated44', style({ transform: 'rotate(90deg)' })),

      state('default45', style({ transform: 'rotate(0)' })),
      state('rotated45', style({ transform: 'rotate(90deg)' })),

      
      state('default46', style({ transform: 'rotate(0)' })),
      state('rotated46', style({ transform: 'rotate(90deg)' })),

      state('default47', style({ transform: 'rotate(0)' })),
      state('rotated47', style({ transform: 'rotate(90deg)' })),


      state('default48', style({ transform: 'rotate(0)' })),
      state('rotated48', style({ transform: 'rotate(90deg)' })),


      transition('rotated => default', animate('500ms ease-out')),
      transition('default => rotated', animate('500ms ease-in')),
      transition('rotated1 => default1', animate('500ms ease-out')),
      transition('default1 => rotated1', animate('500ms ease-in')),
      transition('rotated2 => default2', animate('500ms ease-out')),
      transition('default2 => rotated2', animate('500ms ease-in')),
      transition('rotated3 => default3', animate('500ms ease-out')),
      transition('default3 => rotated3', animate('500ms ease-in')),
      transition('rotated4 => default4', animate('500ms ease-out')),
      transition('default4 => rotated4', animate('500ms ease-in')),
      transition('rotated5 => default4', animate('500ms ease-out')),
      transition('default5 => rotated4', animate('500ms ease-in')),
      transition('rotated6 => default4', animate('500ms ease-out')),
      transition('default6 => rotated4', animate('500ms ease-in')),
      transition('rotated7 => default4', animate('500ms ease-out')),
      transition('default7 => rotated4', animate('500ms ease-in')),
      transition('rotated8 => default4', animate('500ms ease-out')),
      transition('default8 => rotated4', animate('500ms ease-in')),
      transition('rotated9 => default4', animate('500ms ease-out')),
      transition('default9 => rotated4', animate('500ms ease-in')),
      transition('rotated10 => default4', animate('500ms ease-out')),
      transition('default10 => rotated4', animate('500ms ease-in')),
      transition('rotated14 => default14', animate('500ms ease-out')),
      transition('default14 => rotated14', animate('500ms ease-in')),
      transition('rotated15 => default15', animate('500ms ease-out')),
      transition('default15 => rotated15', animate('500ms ease-in')),
      transition('rotated16 => default16', animate('500ms ease-out')),
      transition('default16 => rotated16', animate('500ms ease-in')),
      transition('rotated17 => default17', animate('500ms ease-out')),
      transition('default17 => rotated17', animate('500ms ease-in')),
      transition('rotated18 => default18', animate('500ms ease-out')),
      transition('default18 => rotated18', animate('500ms ease-in')),
      transition('rotated19 => default19', animate('500ms ease-out')),
      transition('default19 => rotated19', animate('500ms ease-in')),
      transition('rotated20 => default20', animate('500ms ease-out')),
      transition('default20 => rotated20', animate('500ms ease-in')),
      transition('rotated21 => default21', animate('500ms ease-out')),
      transition('default21 => rotated21', animate('500ms ease-in')),
      transition('rotated22 => default22', animate('500ms ease-out')),
      transition('default22 => rotated22', animate('500ms ease-in')),
      transition('rotated23 => default23', animate('500ms ease-out')),
      transition('default23 => rotated23', animate('500ms ease-in')),
      transition('rotated24 => default24', animate('500ms ease-out')),
      transition('default24 => rotated24', animate('500ms ease-in')),
      transition('rotated25 => default25', animate('500ms ease-out')),
      transition('default25 => rotated25', animate('500ms ease-in')),
      transition('rotated26 => default26', animate('500ms ease-out')),
      transition('default26 => rotated26', animate('500ms ease-in')),
      transition('rotated27 => default27', animate('500ms ease-out')),
      transition('default27 => rotated27', animate('500ms ease-in')),
      transition('rotated28 => default28', animate('500ms ease-out')),
      transition('default28 => rotated28', animate('500ms ease-in')),
      transition('rotated29 => default29', animate('500ms ease-out')),
      transition('default29 => rotated29', animate('500ms ease-in')),
      transition('rotated30 => default30', animate('500ms ease-out')),
      transition('default30 => rotated30', animate('500ms ease-in')),
      transition('rotated31 => default31', animate('500ms ease-out')),
      transition('default31 => rotated31', animate('500ms ease-in')),
      transition('rotated32 => default32', animate('500ms ease-out')),
      transition('default32 => rotated32', animate('500ms ease-in')),
      transition('rotated33 => default33', animate('500ms ease-out')),
      transition('default33 => rotated33', animate('500ms ease-in')),
      transition('rotated34 => default34', animate('500ms ease-out')),
      transition('default34 => rotated34', animate('500ms ease-in')),
      transition('default35 => rotated35', animate('500ms ease-in')),
      transition('default39 => rotated39', animate('500ms ease-in')),
      transition('default37 => rotated37', animate('500ms ease-in')),
      transition('default40 => rotated40', animate('500ms ease-in')),
      transition('default41 => deafult41', animate('500ms ease-out')),
      transition('rotated41 => rotated41', animate('500ms ease-in')),
      transition('rotated43 => rotated43', animate('500ms ease-in')),


      transition('rotated44 => default44', animate('500ms ease-out')),
      transition('default44 => rotated44', animate('500ms ease-in')),

      transition('rotated45 => default45', animate('500ms ease-out')),
      transition('default45 => rotated45', animate('500ms ease-in')),

      
      transition('rotated46 => default46', animate('500ms ease-out')),
      transition('default46 => rotated46', animate('500ms ease-in')),

       
      transition('rotated47 => default47', animate('500ms ease-out')),
      transition('default47 => rotated47', animate('500ms ease-in')),


      transition('rotated48 => default48', animate('500ms ease-out')),
      transition('default48 => rotated48', animate('500ms ease-in')),


    ])
  ]




})
export class MyTaskComponent implements OnInit {
  state: string = 'default';
  state1: string = 'default1';
  state2: string = 'default2'
  state3: string = 'default3'
  state4: string = 'default4'
  state5: string = 'default5'
  state6: string = 'default6'
  state7: string = 'default7'
  state8: string = 'default8'
  state9: string = 'default9'
  state10: string = 'default10'
  state11: string = 'default11'
  state12: string = 'default12'
  state13: string = 'default13'
  state14: string = 'default14'
  state15: string = 'default15'
  state16: string = 'default16'
  state17: string = 'default17'
  state18: string = 'default18'
  state19: string = 'default19'
  state20: string = 'default20'
  state21: string = 'default21'
  state22: string = 'default22'
  state23: string = 'default23'
  state24: string = 'default24'
  state25: string = 'default25'
  state26: string = 'default26'
  state27: string = 'default27'
  state28: string = 'default28'
  state29: string = 'default29'
  state30: string = 'default30'
  state31: string = 'default31'
  state32: string = 'default32'
  state33: string = 'default33'
  state34: string = 'default34'
  state35: string = 'default35'
  state36: string = 'default36'
  state39: string = 'default39'
  state37: string = 'default37'
  state40: string = 'default40'
  state41: string = 'default41'
  state43: string = 'default43'
  state44: string = 'default44'
  state45: string = 'default45'
  state46: string = 'default46'
  state47: string = 'default47'
  state48: string = 'default48'
  Assign_Care_Manager_For_Placement: any;

  rotate() { this.state = (this.state === 'default' ? 'rotated' : 'default'); }
  rotate1() { this.state1 = (this.state1 === 'default1' ? 'rotated1' : 'default1'); }
  rotate2() { this.state2 = (this.state2 === 'default2' ? 'rotated2' : 'default2'); }
  rotate3() { this.state3 = (this.state3 === 'default3' ? 'rotated3' : 'default3'); }
  rotate4() { this.state4 = (this.state4 === 'default4' ? 'rotated4' : 'default4'); }
  rotate5() { this.state5 = (this.state5 === 'default5' ? 'rotated5' : 'default5'); }
  rotate6() { this.state6 = (this.state6 === 'default6' ? 'rotated6' : 'default6'); }
  rotate7() { this.state7 = (this.state7 === 'default7' ? 'rotated7' : 'default7'); }
  rotate8() { this.state8 = (this.state8 === 'default8' ? 'rotated8' : 'default8'); }
  rotate9() { this.state9 = (this.state9 === 'default9' ? 'rotated9' : 'default9'); }
  rotate10() { this.state10 = (this.state10 === 'default10' ? 'rotated10' : 'default10'); }
  rotate11() { this.state11 = (this.state11 === 'default11' ? 'rotated11' : 'default11'); }
  rotate12() { this.state12 = (this.state12 === 'default12' ? 'rotated12' : 'default12'); }
  rotate13() { this.state13 = (this.state13 === 'default13' ? 'rotate13' : 'default13'); }
  rotate14() { this.state14 = (this.state14 === 'default14' ? 'rotate14' : 'default14'); }
  rotate15() { this.state15 = (this.state15 === 'default15' ? 'rotate15' : 'default15'); }
  rotate16() { this.state16 = (this.state16 === 'default16' ? 'rotate16' : 'default16'); }
  rotate17() { this.state17 = (this.state17 === 'default17' ? 'rotate17' : 'default17'); }
  rotate18() { this.state18 = (this.state18 === 'default18' ? 'rotate18' : 'default18'); }
  rotate19() { this.state19 = (this.state19 === 'default19' ? 'rotate19' : 'default19'); }
  rotate20() { this.state20 = (this.state20 === 'default20' ? 'rotate20' : 'default20'); }
  rotate21() { this.state21 = (this.state21 === 'default21' ? 'rotate21' : 'default21'); }
  rotate22() { this.state22 = (this.state22 === 'default22' ? 'rotate22' : 'default22'); }
  rotate23() { this.state23 = (this.state23 === 'default23' ? 'rotate23' : 'default23'); }
  rotate24() { this.state24 = (this.state24 === 'default24' ? 'rotate24' : 'default24'); }
  rotate25() { this.state24 = (this.state24 === 'default25' ? 'rotate25' : 'default25'); }
  rotate26() { this.state26 = (this.state26 === 'default26' ? 'rotated26' : 'default26'); }
  rotate27() { this.state27 = (this.state27 === 'default27' ? 'rotated27' : 'default27'); }
  rotate28() { this.state28 = (this.state28 === 'default28' ? 'rotated28' : 'default28'); }
  rotate29() { this.state29 = (this.state29 === 'default29' ? 'rotated29' : 'default29'); }
  rotate30() { this.state30 = (this.state30 === 'default30' ? 'rotated30' : 'default30'); }
  rotate31() { this.state31 = (this.state31 === 'default31' ? 'rotated31' : 'default31'); }
  rotate32() { this.state31 = (this.state32 === 'default32' ? 'rotated32' : 'default32'); }
  rotate33() { this.state33 = (this.state33 === 'default33' ? 'rotated33' : 'default33'); }
  rotate34() { this.state34 = (this.state34 === 'default34' ? 'rotated34' : 'default34'); }
  rotate35() { this.state35 = (this.state35 === 'default35' ? 'rotated35' : 'default35')}
  rotate36() { this.state36 = (this.state36 === 'default36' ? 'rotated36' : 'default36')}
  rotate39() { this.state36 = (this.state36 === 'default39' ? 'rotated39' : 'default39')}
  rotate37() { this.state37 = (this.state37 === 'default37' ? 'rotated37' : 'default37')}
  rotate40() { this.state40 = (this.state40 === 'default40' ? 'rotated40' : 'default40')}
  rotate41() { this.state41 = (this.state41 === 'default41' ? 'rotated41' : 'default41')}
  rotate43() { this.state43 = (this.state43 === 'default43' ? 'rotated43' : 'default43')}
  rotate44() { this.state44 = (this.state44 === 'default44' ? 'rotated44' : 'default44')}
  rotate45() { this.state45 = (this.state45 === 'default45' ? 'rotated45' : 'default45')}
  rotate46() { this.state46 = (this.state46 === 'default46' ? 'rotated46' : 'default46')}
  rotate47() { this.state47 = (this.state47 === 'default47' ? 'rotated47' : 'default47')}
  rotate48() { this.state48 = (this.state48 === 'default48' ? 'rotated48' : 'default48')}



  AssignSupportExecutive: any = []
  completeRequestDetails: any = []
  infomVendorNewJob: any = []
  currentDate: any
  resultStartDate: any
  StartDate: any
  today: any
  diff: any
  utcSeconds: any
  allTasksdata: any
  emptyAllTasksData: any = false
  VedorNewJobDays: any
  resultStartDates:any
  addVendorSpecialist: any = []
  addVendorSpecialistCreatedDate: any
  AssignVendorExecutive: any
  AssignVendorExecutiveCreatedDate: any
  confirmIfJobStart: any = []
  confirmIfJobStartCreatedDate: any
  informVendorScheduleJob: any = []
  scheduleJobCreatedDate: any
  completedJob: any = []
  completedJobCreatedDate: any
  uploadBills: any = []
  uploadBillsCreatedDate: any
  scheduleNewJob: any = []
  AddJobDetails: any = []
  VerifyBill: any = []
  VerifyJobDetailswithCustomer: any = []
  Create_Emergency_Plan: any = []
  Add_Care_Manager: any = []
  Add_BackUp_Care_Manager: any = []
  Add_Care_Coordinator: any = []
  Add_Beneficiary: any = []
  Add_Customer_Requirements: any = []
  Schedule_Member_On_Boarding: any = []
  Cancelled_Requests: any = []
  OTMCancelled_Requests: any = [];
  Verify_Refund: any = []
  Approve_Refund: any = []
  Process_Refund: any = []
  Approve_Bill_Date: any = [];
  createChatGroup: any = [];
  addSEChatGroup: any = [];
  addCMChatGroup: any = [];
  addbackupcmtochat: any = [];
  hhcinvoice: any = [];
  asersRequests: any = [];
  searchProfiles: any = [];
  scheduleNewJobCreatedDate: any
  asersRequestCreatedDate: any
  jobdate: any
  Backdated_Requests: any = []
  Comprehensive_Customers: any= []
  Customer_Escalations: any = []
  Assign_Care_Manager:any=[]
  RequestID: any
  CustRecID: any
  requestDetailsObj: any = {}
  complaintLength:any = []
  assignVendorExecutive: any
  EmpCustomerExperiance:any = []
  UpdateHealthPlanDetails:any=[]
  HexaOrders:any=[]
  PartnerApprovedInvoices : any =[]
  DisputedPayments: any =[]
  SubmitedProfilesList: any = []
  Accepeted_Profiles: any = []
  Leads: any = []

  discountedPriceRequests:any=[]
  constructor(private userservice: UsersService, private datePipe: DatePipe, private route: Router, private snap: ActivatedRoute, private spinner: NgxSpinnerService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.spinner.show()
    this.RequestID = this.activatedRoute.snapshot.queryParamMap.get("RequestID");
    this.CustRecID = this.activatedRoute.snapshot.queryParamMap.get("CustRecID");
    this.userservice.UserTaskAssigned().pipe(
      catchError(this.handleError)
    ).subscribe((requestData) => {
      if (requestData.code == "S001") {
        this.spinner.hide();
        this.allTasksdata = requestData.data
        this.AssignSupportExecutive = this.allTasksdata.Assign_Support_Executive;
        this.completeRequestDetails = this.allTasksdata.Complete_Requests_Details;
        this.infomVendorNewJob = this.allTasksdata.Inform_Vendor_Of_New_Job;
        this.addVendorSpecialist = this.allTasksdata.Assign_Vendor_Add_Specialist;
        this.AssignVendorExecutive = this.allTasksdata.Assign_Vendor_Executive;
        this.confirmIfJobStart = this.allTasksdata.Confirm_If_Job_Started;
        this.informVendorScheduleJob = this.allTasksdata.Inform_Vendor_Of_Scheduled_Job;
        this.completedJob = this.allTasksdata.Check_On_CompletedJobs;
        this.uploadBills = this.allTasksdata.Upload_Vendor_Bill;
        this.scheduleNewJob = this.allTasksdata.Schedule_A_New_Job;
        this.AddJobDetails = this.allTasksdata.Add_Job_Details;
        this.VerifyBill = this.allTasksdata.Verify_Bill;
        this.VerifyJobDetailswithCustomer = this.allTasksdata.Verify_Job_Details_with_Customer;
        this.Create_Emergency_Plan = this.allTasksdata.Create_Emergency_Plan;
        this.Add_Care_Manager = this.allTasksdata.Add_Care_Manager
        this.Add_BackUp_Care_Manager = this.allTasksdata.Add_BackUp_Care_Manager
        this.Add_Care_Coordinator = this.allTasksdata.Add_Care_Coordinator
        this.Add_Beneficiary = this.allTasksdata.Add_Beneficiary
        this.Add_Customer_Requirements = this.allTasksdata.Add_Customer_Requirements
        this.Schedule_Member_On_Boarding = this.allTasksdata.Schedule_Member_On_Boarding
        this.Cancelled_Requests = this.allTasksdata.Cancelled_Requests;
        this.OTMCancelled_Requests = this.allTasksdata.OTMCancelled_Requests;
        this.Verify_Refund = this.allTasksdata.Verify_Refund;
        this.Approve_Refund = this.allTasksdata.Approve_Refund;
        this.Process_Refund = this.allTasksdata.Process_Refund;
        this.Approve_Bill_Date = this.allTasksdata.Approve_Bill_Date;
        this.createChatGroup = this.allTasksdata.Create_Chat_Group;
        this.addSEChatGroup = this.allTasksdata.Add_SE_Chat_Group;
        this.addCMChatGroup = this.allTasksdata.Add_CM_Chat_Group;
        this.hhcinvoice = this.allTasksdata.HHC_Invoices;
        this.asersRequests = this.allTasksdata.Assign_ASERS_Requests;
        this.addbackupcmtochat = this.allTasksdata.Add_BCM_Chat_Group;
        this.searchProfiles = this.allTasksdata.Search_Profile;
        this.Backdated_Requests = this.allTasksdata.Backdated_Requests;
        this.Customer_Escalations = this.allTasksdata.Customer_Escalations;
        this.Comprehensive_Customers = this.allTasksdata.Comprehensive_Customers;
        this.EmpCustomerExperiance = this.allTasksdata.Employee_Customer_Experience;
        this.Assign_Care_Manager = this.allTasksdata.Assign_Care_Manager;
        this.UpdateHealthPlanDetails=this.allTasksdata.UpdateHealthPlanDetails
        this.HexaOrders = this.allTasksdata.HexaOrders
        this.PartnerApprovedInvoices = this.allTasksdata.PartnerApprovedInvoices
        this.DisputedPayments = this.allTasksdata.DisputedPayments
        this.SubmitedProfilesList = this.allTasksdata.SubmitedProfilesList
        this.Accepeted_Profiles=this.allTasksdata.Accepeted_Profiles;
        this.discountedPriceRequests=this.allTasksdata.DiscountPrice;
        this.Assign_Care_Manager_For_Placement = this.allTasksdata.Assign_Care_Manager_For_Placement



        this.Leads=this.allTasksdata.Leads;

        let openstatusarray:any = []
              for(let complaint of this.allTasksdata.Customer_Escalations){ 
                    if(complaint.Status == 'Open'){
                    console.log("kkdonwenwccwdc",complaint.Status)
                        openstatusarray.push(complaint)
                    }   
              }
              this.complaintLength = openstatusarray
             
        //('sdbc',this.AddJobDetails)
        const ONE_DAY = 1000 * 60 * 60 * 24;
        this.today = new Date()

        for (let i = 0; i < this.completeRequestDetails.length; i++) {
          this.StartDate = new Date(0)
          this.StartDate.setUTCSeconds(this.completeRequestDetails[i].CreatedDate)
          this.completeRequestDetails[i]['days'] = Math.round((this.today - this.StartDate) / ONE_DAY)

        }

        for (let i = 0; i < this.AddJobDetails.length; i++) {
          this.jobdate = new Date(0)
          this.jobdate.setUTCSeconds(this.AddJobDetails[i].CreatedDate)
          this.AddJobDetails[i]['jobDate'] = Math.round((this.today - this.jobdate) / ONE_DAY)

        }



        for (let i = 0; i < this.AssignSupportExecutive.length; i++) {
          this.resultStartDate = new Date(0)
          this.resultStartDate.setUTCSeconds(this.AssignSupportExecutive[i].CreatedDate)
          this.AssignSupportExecutive[i]['daysdiff'] = Math.round((this.today - this.resultStartDate) / ONE_DAY)
        }



        for (let i = 0; i < this.Assign_Care_Manager.length; i++) {
          this.resultStartDates = new Date(0)
          this.resultStartDates.setUTCSeconds(this.Assign_Care_Manager[i].CreatedDate)
          this.Assign_Care_Manager[i]['daysdiff'] = Math.round((this.today - this.resultStartDate) / ONE_DAY)
        }



        for (let i = 0; i < this.infomVendorNewJob.length; i++) {
          this.VedorNewJobDays = new Date(0)
          this.VedorNewJobDays.setUTCSeconds(this.infomVendorNewJob[i].CreatedDate)
          this.infomVendorNewJob[i]['newJobDate'] = Math.round((this.today - this.VedorNewJobDays) / ONE_DAY)
        }



        for (let i = 0; i < this.addVendorSpecialist.length; i++) {
          this.addVendorSpecialistCreatedDate = new Date(0)
          this.addVendorSpecialistCreatedDate.setUTCSeconds(this.addVendorSpecialist[i].CreatedDate)
          this.addVendorSpecialist[i]['starteddate'] = Math.round((this.today - this.addVendorSpecialistCreatedDate) / ONE_DAY)
        }

        for (let i = 0; i < this.AssignVendorExecutive.length; i++) {
          this.AssignVendorExecutiveCreatedDate = new Date(0)
          this.AssignVendorExecutiveCreatedDate.setUTCSeconds(this.AssignVendorExecutive[i].CreatedDate)
          this.AssignVendorExecutive[i]['Executivedate'] = Math.round((this.today - this.AssignVendorExecutiveCreatedDate) / ONE_DAY)
        }


        for (let i = 0; i < this.confirmIfJobStart.length; i++) {
          this.confirmIfJobStartCreatedDate = new Date(0)
          this.confirmIfJobStartCreatedDate.setUTCSeconds(this.confirmIfJobStart[i].CreatedDate)
          this.confirmIfJobStart[i]['confirmJobdate'] = Math.round((this.today - this.confirmIfJobStartCreatedDate) / ONE_DAY)
        }

        for (let i = 0; i < this.informVendorScheduleJob.length; i++) {
          this.scheduleJobCreatedDate = new Date(0)
          this.scheduleJobCreatedDate.setUTCSeconds(this.informVendorScheduleJob[i].CreatedDate)
          this.informVendorScheduleJob[i]['scheduleJobdate'] = Math.round((this.today - this.scheduleJobCreatedDate) / ONE_DAY)
        }

        for (let i = 0; i < this.completedJob.length; i++) {
          this.completedJobCreatedDate = new Date(0)
          this.completedJobCreatedDate.setUTCSeconds(this.completedJob[i].CreatedDate)
          this.completedJob[i]['completetdJobdate'] = Math.round((this.today - this.completedJobCreatedDate) / ONE_DAY)
        }

        //   console.log(typeof this.uploadBills)
        // for (let i = 0; i < this.uploadBills.length; i++) {
        //   this.uploadBillsCreatedDate = new Date(0)
        //   this.uploadBillsCreatedDate.setUTCSeconds(this.uploadBills[i].CreatedDate)
        //   this.uploadBills[i]['billdate'] = Math.round((this.today - this.uploadBillsCreatedDate) / ONE_DAY)
        // }

        for (let i = 0; i < this.scheduleNewJob.length; i++) {
          this.scheduleNewJobCreatedDate = new Date(0)
          this.scheduleNewJobCreatedDate.setUTCSeconds(this.scheduleNewJob[i].CreatedDate)
          this.scheduleNewJob[i]['newJobdate'] = Math.round((this.today - this.scheduleNewJobCreatedDate) / ONE_DAY)
        }

        for (let i = 0; i < this.asersRequests.length; i++) {
          this.asersRequestCreatedDate = new Date(0)
          this.asersRequestCreatedDate.setUTCSeconds(this.asersRequests[i].CreatedDate)
          this.asersRequests[i]['newJobdate'] = Math.round((this.today - this.asersRequestCreatedDate) / ONE_DAY)
        }

        // for (let i = 0; i < this.VerifyBill.length; i++) {
        //   this.scheduleNewJobCreatedDate = new Date(0)
        //   this.scheduleNewJobCreatedDate.setUTCSeconds(this.VerifyBill[i].CreatedDate)
        // }




        if (this.allTasksdata.Complete_Requests_Details == '' && this.allTasksdata.Assign_Vendor_Add_Specialist == '' && this.allTasksdata.Upload_Vendor_Bill == '' && this.allTasksdata.Check_On_CompletedJobs == '' &&
          this.allTasksdata.Confirm_If_Job_Started == '' && this.allTasksdata.Inform_Vendor_Of_Scheduled_Job == '' && this.allTasksdata.Inform_Vendor_Of_New_Job == '' &&
          this.allTasksdata.Assign_Vendor_Executive == '' && this.allTasksdata.Assign_Support_Executive == '' && this.allTasksdata.Add_Job_Details == '' && this.allTasksdata.Verify_Bill == '') {
          this.emptyAllTasksData = true
        }



        this.spinner.hide();

      } else {
        alert(requestData.data)
        this.spinner.hide()

      }
    }), (error: any) => {
      console.log(error)
      alert(error.error.data);
      this.spinner.hide()
    };

  }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      // Handle the 400 Bad Request error here
      alert(error.error.data);

      //  this.spinner.hide()
      // You can also show a user-friendly error message
      // or perform other actions as needed.
    } else {
      // Handle other errors
      console.error('An error occurred:', error.error);
    }

    // Return an observable with a user-friendly error message
    return throwError('Something went wrong. Please try again later.');
  }

  tasksAssigned() {
    this.userservice.UserTaskAssigned().subscribe((requestData) => {

      console.log("Response", requestData.code)
      if (requestData.code == "S001") {
        this.allTasksdata = requestData.data
        this.AssignSupportExecutive = this.allTasksdata.Assign_Support_Executive;
        this.completeRequestDetails = this.allTasksdata.Complete_Requests_Details;
        this.infomVendorNewJob = this.allTasksdata.Inform_Vendor_Of_New_Job;
        this.addVendorSpecialist = this.allTasksdata.Assign_Vendor_Add_Specialist;
        this.AssignVendorExecutive = this.allTasksdata.Assign_Vendor_Executive;
        this.confirmIfJobStart = this.allTasksdata.Confirm_If_Job_Started;
        this.informVendorScheduleJob = this.allTasksdata.Inform_Vendor_Of_Scheduled_Job;
        this.completedJob = this.allTasksdata.Check_On_CompletedJobs;
        this.uploadBills = this.allTasksdata.Upload_Vendor_Bill;
        this.scheduleNewJob = this.allTasksdata.Schedule_A_New_Job;
        this.AddJobDetails = this.allTasksdata.Add_Job_Details;
        this.VerifyBill = this.allTasksdata.Verify_Bill;
        this.VerifyJobDetailswithCustomer = this.allTasksdata.Verify_Job_Details_with_Customer;
        this.Create_Emergency_Plan = this.allTasksdata.Create_Emergency_Plan;
        this.Add_Care_Manager = this.allTasksdata.Add_Care_Manager
        this.Add_BackUp_Care_Manager = this.allTasksdata.Add_BackUp_Care_Manager
        this.Add_Care_Coordinator = this.allTasksdata.Add_Care_Coordinator
        this.Add_Beneficiary = this.allTasksdata.Add_Beneficiary
        this.Add_Customer_Requirements = this.allTasksdata.Add_Customer_Requirements
        this.Schedule_Member_On_Boarding = this.allTasksdata.Schedule_Member_On_Boarding
        this.Cancelled_Requests = this.allTasksdata.Cancelled_Requests;
        this.OTMCancelled_Requests = this.allTasksdata.OTMCancelled_Requests;
        this.Verify_Refund = this.allTasksdata.Verify_Refund;
        this.Approve_Refund = this.allTasksdata.Approve_Refund;
        this.Process_Refund = this.allTasksdata.Process_Refund;
        this.Approve_Bill_Date = this.allTasksdata.Approve_Bill_Date;
        this.createChatGroup = this.allTasksdata.Create_Chat_Group;
        this.addSEChatGroup = this.allTasksdata.Add_SE_Chat_Group;
        this.addCMChatGroup = this.allTasksdata.Add_CM_Chat_Group;
        this.HexaOrders = this.allTasksdata.HexaOrders
        

        //('sdbc',this.AddJobDetails)
        const ONE_DAY = 1000 * 60 * 60 * 24;
        this.today = new Date()

        for (let i = 0; i < this.completeRequestDetails.length; i++) {
          this.StartDate = new Date(0)
          this.StartDate.setUTCSeconds(this.completeRequestDetails[i].CreatedDate)
          this.completeRequestDetails[i]['days'] = Math.round((this.today - this.StartDate) / ONE_DAY)

        }

        for (let i = 0; i < this.AddJobDetails.length; i++) {
          this.jobdate = new Date(0)
          this.jobdate.setUTCSeconds(this.AddJobDetails[i].CreatedDate)
          this.AddJobDetails[i]['jobDate'] = Math.round((this.today - this.jobdate) / ONE_DAY)

        }



        for (let i = 0; i < this.AssignSupportExecutive.length; i++) {
          this.resultStartDate = new Date(0)
          this.resultStartDate.setUTCSeconds(this.AssignSupportExecutive[i].CreatedDate)
          this.AssignSupportExecutive[i]['daysdiff'] = Math.round((this.today - this.resultStartDate) / ONE_DAY)
        }



        for (let i = 0; i < this.infomVendorNewJob.length; i++) {
          this.VedorNewJobDays = new Date(0)
          this.VedorNewJobDays.setUTCSeconds(this.infomVendorNewJob[i].CreatedDate)
          this.infomVendorNewJob[i]['newJobDate'] = Math.round((this.today - this.VedorNewJobDays) / ONE_DAY)
        }



        for (let i = 0; i < this.addVendorSpecialist.length; i++) {
          this.addVendorSpecialistCreatedDate = new Date(0)
          this.addVendorSpecialistCreatedDate.setUTCSeconds(this.addVendorSpecialist[i].CreatedDate)
          this.addVendorSpecialist[i]['starteddate'] = Math.round((this.today - this.addVendorSpecialistCreatedDate) / ONE_DAY)
        }

        for (let i = 0; i < this.AssignVendorExecutive.length; i++) {
          this.AssignVendorExecutiveCreatedDate = new Date(0)
          this.AssignVendorExecutiveCreatedDate.setUTCSeconds(this.AssignVendorExecutive[i].CreatedDate)
          this.AssignVendorExecutive[i]['Executivedate'] = Math.round((this.today - this.AssignVendorExecutiveCreatedDate) / ONE_DAY)
        }


        for (let i = 0; i < this.confirmIfJobStart.length; i++) {
          this.confirmIfJobStartCreatedDate = new Date(0)
          this.confirmIfJobStartCreatedDate.setUTCSeconds(this.confirmIfJobStart[i].CreatedDate)
          this.confirmIfJobStart[i]['confirmJobdate'] = Math.round((this.today - this.confirmIfJobStartCreatedDate) / ONE_DAY)
        }

        for (let i = 0; i < this.informVendorScheduleJob.length; i++) {
          this.scheduleJobCreatedDate = new Date(0)
          this.scheduleJobCreatedDate.setUTCSeconds(this.informVendorScheduleJob[i].CreatedDate)
          this.informVendorScheduleJob[i]['scheduleJobdate'] = Math.round((this.today - this.scheduleJobCreatedDate) / ONE_DAY)
        }

        for (let i = 0; i < this.completedJob.length; i++) {
          this.completedJobCreatedDate = new Date(0)
          this.completedJobCreatedDate.setUTCSeconds(this.completedJob[i].CreatedDate)
          this.completedJob[i]['completetdJobdate'] = Math.round((this.today - this.completedJobCreatedDate) / ONE_DAY)
        }

        //   console.log(typeof this.uploadBills)
        // for (let i = 0; i < this.uploadBills.length; i++) {
        //   this.uploadBillsCreatedDate = new Date(0)
        //   this.uploadBillsCreatedDate.setUTCSeconds(this.uploadBills[i].CreatedDate)
        //   this.uploadBills[i]['billdate'] = Math.round((this.today - this.uploadBillsCreatedDate) / ONE_DAY)
        // }

        for (let i = 0; i < this.scheduleNewJob.length; i++) {
          this.scheduleNewJobCreatedDate = new Date(0)
          this.scheduleNewJobCreatedDate.setUTCSeconds(this.scheduleNewJob[i].CreatedDate)
          this.scheduleNewJob[i]['newJobdate'] = Math.round((this.today - this.scheduleNewJobCreatedDate) / ONE_DAY)
        }

        // for (let i = 0; i < this.VerifyBill.length; i++) {
        //   this.scheduleNewJobCreatedDate = new Date(0)
        //   this.scheduleNewJobCreatedDate.setUTCSeconds(this.VerifyBill[i].CreatedDate)
        // }
        if (this.allTasksdata.Complete_Requests_Details == '' && this.allTasksdata.Assign_Vendor_Add_Specialist == '' && this.allTasksdata.Upload_Vendor_Bill == '' && this.allTasksdata.Check_On_CompletedJobs == '' &&
          this.allTasksdata.Confirm_If_Job_Started == '' && this.allTasksdata.Inform_Vendor_Of_Scheduled_Job == '' && this.allTasksdata.Inform_Vendor_Of_New_Job == '' &&
          this.allTasksdata.Assign_Vendor_Executive == '' && this.allTasksdata.Assign_Support_Executive == '' && this.allTasksdata.Add_Job_Details == '' && this.allTasksdata.Verify_Bill == '') {
          this.emptyAllTasksData = true
        }
        this.spinner.hide();

      } else {
        alert(requestData.data)
        this.spinner.hide()
        console.log("else", requestData)
      }
    }), (error: any) => {
      console.log("erorr")

      alert(error.error.data);
      this.spinner.hide()
    };
  }







  complitionScreen(data: any, type: any) {
    if(type == "VerifyBill"){
      this.route.navigate(["Dashboard/viewrequest"], { queryParams: { RequestID: data.PaymentForDetails.HomeHelathServices.RequestID, AnvayaaPaymentID: data.Payment.AnvayaaPaymentID,Task:'Verify_bill'} })

    }else if(type == "VerifyJobDetails" || type == "uploadVendorBills" || type == "Verifyrefund" || type == "Approverefund" || type == "Processrefund" || type == "Approvebilladjustment"){
      this.route.navigate(["Dashboard/viewrequest"], { queryParams: { RequestID: data.PaymentForDetails.HomeHelathServices.RequestID, AnvayaaPaymentID: data.Payment.AnvayaaPaymentID,Task:type} })

    }
    if (type == "VerifyBill" || type == "VerifyJobDetails" || type == "uploadVendorBills" || type == "Verifyrefund" || type == "Approverefund" || type == "Processrefund" || type == "Approvebilladjustment") {
      // this.route.navigate(["Dashboard/Task/taskComplition"], { queryParams: { RequestID: data.PaymentForDetails.HomeHelathServices.RequestID, CustRecID: data.CustomerData.CustRecID, type } })
    } else if (type == "completeemergencyplan") {
      this.route.navigate(["Dashboard/Emergencyplan"], { queryParams: { CustID: data.BeneficiaryDetails.CustID, CustRecID: data.CustRecID, type } })
    } else if (type === 'cancelRequests') {
      this.route.navigate(["Dashboard/Task/taskComplition"], { queryParams: { RequestID: data.RequestID, CustRecID: data.CustRecID, type } })

    }
    else if (type === 'Backdated_Request') {
      this.route.navigate(["Dashboard/Task/taskComplition"], { queryParams: { RequestID: data.RequestID, CustRecID: data.CustomerDetails.CustRecID, type } })

    }else if(type=='discountprice'){
      this.route.navigate(["Dashboard/Task/taskComplition"], { queryParams: { RequestID: data.RequestID, CustRecID: data.CustRecID, type } })

    }
    else {
      this.route.navigate(["/Dashboard/viewrequest"], { queryParams: { RequestID: data.RequestID, Task: 'Staff_Details' } })
    }

    //("routingdataParams",data,"type",type)adddetialstochat


  }
  viewcustomer(data: any, type: any) {
    this.route.navigate(["Dashboard/Task/customerdetails"], { queryParams: { CustRecID: data.CustRecID, type } })
  }
  addmissingDetails(data: any, type: string) {
    this.route.navigate(["Dashboard/Task/adddetialstochat"], { queryParams: { CustRecID: data.CustRecID, type: type } })
  }
  backupcaremanagerDetails(data: any, type: string) {
    this.route.navigate(["Dashboard/Task/adddetialstochat"], { queryParams: { CustRecID: data.CustRecID, type: type } })
  }
  handleSearchProfileClick(data: any) {
    this.route.navigate(['Dashboard/viewrequest'], { queryParams: { RequestID: data.RequestID, Task:data.Status } })
  }


  rollbackcomponent(data: any) {

    console.log("dataaaa", data)
    this.route.navigate(["Dashboard/Task/rollBack"], { queryParams: { CustRecID: data.CustomerData.CustRecID } })

  }

  ViewInvoice(data: any) {
    this.route.navigate(['Dashboard/Task/HHCInvoice'], { queryParams: { PartnerID: data._id.VendorID } })
  }

  ViewAserRequest(data: any) {
    this.userservice.viewRequestData(data.RequestID, data.CustRecID).subscribe((Response) => {

      if (Response.code == "S001") {
        //this.spinner.hide()
        this.route.navigate(['Dashboard/Task/AsersRequest'], { queryParams: { RequestID: data.RequestID, CustRecID: data.CustRecID } })
        console.log("cxxcxxcxcxcxcxcxcxcxcxcxcxcxcxc",this.requestDetailsObj  )
        this.requestDetailsObj = Response.data;
      }
    })

  }


  customerEscalation(RequestID: any, CustRecID: String) {


    this.route.navigate(['Dashboard/Escalation/EscalationInteraction'], { queryParams: { RequestID: RequestID, CustRecID: CustRecID } }) 

    console.log("#############", RequestID, CustRecID)


  }
  ToEscalation() {
    this.route.navigate(['/Dashboard/Escalation/ViewAllEscalations'])
  }


  feedbacknavigation(feedback:any){
    this.route.navigate(['Dashboard/viewrequest'],{ queryParams: {RequestID: feedback.RequestID, Task: 'Staff_Details'}})
  }
  Comprihensive_CustRecID:any
  Comprihensivedata(data:any){

     console.log('uquqwdqdj',data)
     this.Comprihensive_CustRecID = data.CustRecID
                
  }
  navigateToTouchPointsScreen(){
    console.log('1234567890',this.CustRecID)
    this.userservice.updateTouchPointData({CustRecID:this.Comprihensive_CustRecID,Status:'completed'}).subscribe((response:any)=>{
      if (response.code == 'S001') {
      alert(response.data)
      this.route.navigate(['/Dashboard/Task/MyTask'])
      } else {
        alert(response.data)
      }
    }, (error) => {
      // this.spinner.hide()
      alert(error.error.data)
    })
  }


  ViewTouchPointsdata(data:any){

    console.log("fjfjfjj",data)
    // this.route.navigate(['Dashboard/UpdateTouchPoints'],{queryParams:{CustRecID:data.CustRecID}})
    this.route.navigate(['Dashboard/CustomerDashboard/customerComprehensiveDB'],{queryParams:{CustRecID:data.CustRecID,Task: 'Touch_Points'}})
    // Dashboard/CustomerDashboard/customerComprehensiveDB
  }
  assigncaremanager(data: any){
    this.userservice.viewRequestData(data.RequestID, data.CustRecID).subscribe((Response) => {

      if (Response.code == "S001") {
        //this.spinner.hide()
        this.route.navigate(['Dashboard/Task/AssignCareManager'], { queryParams: { RequestID: data.RequestID, CustRecID: data.CustRecID } })
        this.requestDetailsObj = Response.data;
        console.log("cxxcxxcxcxcxcxcxcxcxcxcxcxcxcxc",this.requestDetailsObj)

      }
    })
  }
  updateHealthPlanDetails(data: any, type: any){
    console.log('1234567890')
    if(type=='completeemergencyplan'){
      this.route.navigate(["Dashboard/Emergencyplan"], { queryParams: { CustID: data.BeneficiaryDetails?.CustID, CustRecID: data.CustRecID, type } })
    }
  }
  viewHexaOrderDetails(data:any){
    let OID = data?.RequestID
    let OrderStatus = data?.Status
    this.route.navigate(['Dashboard/HexaDevices/viewHexaOrderDetails'],{queryParams:{OrderId : OID , Status: OrderStatus}})
  }
  viewHHcPartnerInvoices(data:any){
    let PId = data?._id.PartnerID
    this.route.navigate(['Dashboard/viewHHCPartnerInvoices'],{queryParams:{PartnerID: PId}} )
  }
  submittedprofiles(profiles:any){
    console.log(profiles,"xssss")
    let RequestID = profiles?._id.RequestID
    this.route.navigate(['Dashboard/viewrequest'], { queryParams: { RequestID: RequestID, Task:"Shortlist_Profile" } })

  }

  AcceptedProfiles(Acceptedprofiles:any){
    let RequestID = Acceptedprofiles?.RequestID
    this.route.navigate(['Dashboard/viewrequest'], { queryParams: { RequestID: RequestID, Task:"Accepted_Profile" } })

  }

  PlacementRequests(Acceptedprofiles:any){
    let RequestID = Acceptedprofiles?.RequestID
    let Status = Acceptedprofiles?.Status
    this.route.navigate(['Dashboard/viewrequest'], { queryParams: { RequestID: RequestID, Task:Status } })

  }
  partnerPriceChange(feedback:any){
    this.route.navigate(['Dashboard/viewrequest'],{queryParams:{ RequestID: feedback.RequestID , Task: "Partner_Price_Change"}})
  }

}
