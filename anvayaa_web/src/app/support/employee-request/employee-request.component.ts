import { Component, OnInit, Pipe } from '@angular/core';

import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from '../../users.service';
import { NgxSpinnerService } from 'ngx-spinner';
// import { NgxPaginationModule } from 'ngx-pagination';
import { FormlyTemplate } from '@ngx-formly/core/lib/components/formly.template';
import {
  UntypedFormGroup,
  FormControl,
  UntypedFormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { ResponseConstants } from '@cometchat/chat-sdk-javascript';

@Component({
  selector: 'app-employee-request',
  templateUrl: './employee-request.component.html',
  styleUrls: ['./employee-request.component.css'],
})
export class EmployeeRequestComponent implements OnInit {
  profileData: any = [];
  // createdDate:any
  // RequestedDate:any
  employeeDatanew: any = [];
  name: string;
  NodataTable: boolean = false;
  emplist: any = [];
  filteredsupportName: any;
  filesdata: any = [];
  proData: any = [];
  // Type: any = ""
  StartDate: any = '';
  EndDate: any = '';
  public SearchForm: UntypedFormGroup;
  cityData: any;
  countsData: any;
  viewCustomersActive: any;
  pageSize: number = 10;
  activeCustomercurrentPage: number = 1;
  emergencyPlanCurrentPage: number = 1;
  pendingCallsCurrentPage: number = 1;
  pendingRequestsCurrentPage: number = 1;
  totalCount: number = 0;
  filterConditionForm: UntypedFormGroup;
  viewPendingRequests: any;
  viewEmegenyPlan: any;
  activeCustomersVisible: boolean = true;
  emergencyPlanVisible: boolean = false;
  touchPointcallsVisible: boolean = false;
  pendingRequestVisible: boolean = false;
  paginationdata: any;
  constructor(
    private UsersService: UsersService,
    private Router: Router,
    private spinner: NgxSpinnerService,
    private FormBuilder: UntypedFormBuilder,
    private DatePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    // this.Type = "Active"
    //  this.StartDate="01-05-2023"
    //  this.EndDate="01-06-2023"
    this.getListOfSubmittedProfilesData();
    this.getSupportDashboardCount();
    this.cityDetails();
    this.filterConditionFormInitialLoad();
    this.viewActiveCustomers({
      pageNumber: 1,
      pageLimit: this.pageSize,
    });
    this.SearchForm = this.FormBuilder.group({
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      CityID: ['', Validators.required],
    });
  }
  filterConditionFormInitialLoad() {
    this.filterConditionForm = this.FormBuilder.group({});
  }
  cleardata() {
    this.profileData = [];
  }

  FormObj: any = {};
  Requests() {
    console.log('city1', this.SearchForm.value.CityID);
    // this.Type = Type;
    this.NodataTable = false;

    this.spinner.show();
    this.profileData = [];
    if (
      this.SearchForm.status == 'VALID' &&
      this.SearchForm.value.StartDate &&
      this.SearchForm.value.EndDate
    ) {
      if (
        !moment(this.SearchForm.value.StartDate, 'DD-MM-YYYY', true).isValid()
      ) {
        this.StartDate = this.DatePipe.transform(
          this.SearchForm.value.StartDate,
          'dd-MM-YYYY',
        );
      }
      if (
        !moment(this.SearchForm.value.EndDate, 'DD-MM-YYYY', true).isValid()
      ) {
        this.EndDate = this.DatePipe.transform(
          this.SearchForm.value.EndDate,
          'dd-MM-YYYY',
        );
        console.log(this.EndDate, 'Inside');
      }
    }

    // if(this.SearchForm.value.StartDate == null && this.SearchForm.value.EndDate == null){
    //   this.EndDate = new Date()
    //   this.StartDate = new Date()
    //   this.StartDate= this.DatePipe.transform(this.StartDate,'dd-MM-YYYY')
    //   this.EndDate= this.DatePipe.transform(this.EndDate,'dd-MM-YYYY')
    //   console.log("endate when this.Sd,ed" , this.EndDate)
    // }

    // console.log("ENDDATE",this.DatePipe.transform(this.SearchForm.value.EndDate,'dd-MM-YYYY'))

    this.FormObj = {
      StartDate: this.StartDate,
      EndDate: this.EndDate,
      CityID: this.SearchForm.value.CityID,
    };
    console.log(this.FormObj, 'ssssss');
    // if(this.SearchForm.value.StartDate == null && this.SearchForm.value.EndDate == null){
    //    delete this.FormObj.StartDate
    //    delete this.FormObj.EndDate

    // }else{
    //   this.FormObj.StartDate =  this.StartDate
    //    this.FormObj.EndDate =  this.EndDate
    // }

    this.UsersService.getactiverequestdetails(this.FormObj).subscribe(
      (response) => {
        this.spinner.hide();
        if (response.code == 'S001') {
          this.profileData = response.data;
          this.proData = response.data;
          this.SearchForm.value.reset();
          this.StartDate = '';
          this.EndDate = '';
          this.spinner.hide();
          // this.employeesdetails()
        } else {
          this.NodataTable = true;
          this.SearchForm.value.reset();
          this.StartDate = '';
          this.EndDate = '';
          this.spinner.hide();
          alert(response.data);
        }
      },
      (error) => {
        this.spinner.hide();
        this.NodataTable = true;
        alert(error.error.data);
        this.SearchForm.value.reset();
        this.StartDate = '';
        this.EndDate = '';
      },
    );
  }
  getListOfSubmittedProfilesData() {}
  requestDetails(RequestID: any, CustRecID: any, Status: any) {
    const allRequestDetails = this.Router.serializeUrl(
      this.Router.createUrlTree(['Dashboard/support/allRequestDetails'], {
        queryParams: {
          RequestID: RequestID,
          CustRecID: CustRecID,
          Status: Status,
        },
      }),
    );

    window.open(allRequestDetails, '_blank');
  }
  employeesdetails() {
    //  this.spinner.show()
    this.UsersService.employeesdetails().subscribe(
      (employeeData) => {
        if (employeeData.code == 'S001') {
          this.emplist = employeeData.data;

          for (let i = 0; i < this.profileData.length; i++) {
            for (let j = 0; j < this.emplist.length; j++) {
              if (
                this.emplist[j].EmployeeID == this.profileData[i].EmployeeID
              ) {
                this.profileData[i].empName = this.emplist[j].FirstName;
                this.profileData[i].empLastName = this.emplist[j].LastName;
              }
            }
          }

          this.spinner.hide();
        } else {
          this.spinner.hide();
          alert(employeeData.data);
        }
      },
      (error) => {
        this.spinner.hide();
        this.NodataTable = true;
        alert(error.error.data);
      },
    );
  }

  excutivefillter(event: any) {
    this.filteredsupportName = event.target.value;
    if (this.filteredsupportName == 'all') {
      this.getListOfSubmittedProfilesData();
    } else {
      this.profileData = this.proData.filter((obj: any) => {
        return obj.EmployeeID == this.filteredsupportName;
      });
    }
  }

  cityDetails() {
    this.UsersService.cityApi().subscribe(
      (response) => {
        if (response.code == 'S001') {
          console.log('city', response.data);
          this.cityData = response.data;
        } else {
          alert(response.data);
        }
      },
      (error) => {
        alert(error.error.data);
      },
    );
  }
  getSupportDashboardCount() {
    this.UsersService.supportdashboardcount().subscribe(
      (response) => {
        this.countsData = response.data;
        console.log('123567890-', this.countsData);
      },
      (error) => {
        alert(error.error.data);
      },
    );
  }
  // onActiveCustomerDataChange(event: any) {
  //   this.spinner.show();
  //   this.viewActiveCustomers({
  //     pageNumber: event,
  //     pageLimit: this.pageSize,
  //   });
  //   this.spinner.hide();
  // }
  viewActiveCustomers(Obj: any) {
    console.log('eeeeee');
    this.spinner.show();
    this.activeCustomersVisible = true;
    this.emergencyPlanVisible = false;
    this.pendingRequestVisible = false;
    this.touchPointcallsVisible = false;
    this.UsersService.viewActiveCustomer(Obj).subscribe(
      (response) => {
        this.viewCustomersActive = response.data.data;
        this.paginationdata = response.data;
        console.log('11111111111111', response.data);
        this.totalCount = response.totalCount;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        alert(error.error.data);
      },
    );
  }
  naviagateToEmergencyPlanTable(Obj: any) {
    this.spinner.show();
    this.activeCustomersVisible = false;
    this.emergencyPlanVisible = true;
    this.pendingRequestVisible = false;
    this.touchPointcallsVisible = false;
    const payload = {
      pageNumber: 1,
      pageLimit: this.pageSize,
      ...Obj,
    };
    this.UsersService.viewPendingMemberOnboarding(payload).subscribe(
      (response) => {
        this.viewEmegenyPlan = response.data.data;
        this.totalCount = response.totalCount;
        this.paginationdata = response.data
        this.spinner.hide();
        console.log('123567890-', this.viewEmegenyPlan);
      },
      (error) => {
        this.spinner.hide();
        alert(error.error.data);
      },
    );
  }

  viewPendingCalls: any;
  naviagateToPendingCallsTable(Obj: any) {
    this.spinner.show();
    this.activeCustomersVisible = false;
    this.emergencyPlanVisible = false;
    this.pendingRequestVisible = false;
    this.touchPointcallsVisible = true;
    const Object = {
      pageNumber: 1,
      pageLimit: this.pageSize,
      ...Obj,
    };
    this.UsersService.viewPendingCalls(Object).subscribe(
      (response) => {
        this.viewPendingCalls = response.data.data;
        this.paginationdata = response.data
        this.spinner.hide();
        console.log('123567890-', this.viewPendingCalls);
      },
      (error) => {
        alert(error.error.data);
      },
    );
  }
  naviagateToPendingRequestsTable(Obj: any) {
    this.spinner.show();
    this.activeCustomersVisible = false;
    this.emergencyPlanVisible = false;
    this.pendingRequestVisible = true;
    this.touchPointcallsVisible = false;
    const Object = {
      pageNumber: 1,
      pageLimit: this.pageSize,
      ...Obj,
    };
    this.UsersService.viewPendingRequests(Object).subscribe(
      (response) => {
        this.viewPendingRequests = response.data.data;
        this.paginationdata = response.data
        this.spinner.hide();
        console.log('123567890-', this.viewPendingRequests);
      },
      (error) => {
        alert(error.error.data);
      },
    );
  }
  naviagateToActiveCustomers(Obj: any) {
    this.spinner.show();
    this.activeCustomersVisible = true;
    this.emergencyPlanVisible = false;
    this.pendingRequestVisible = false;
    this.touchPointcallsVisible = false;
    const Object = {
      pageNumber: 1,
      pageLimit: this.pageSize,
      ...Obj,
    };
    this.UsersService.viewActiveCustomer(Object).subscribe(
      (response) => {
        this.viewCustomersActive = response.data.data;
        this.spinner.hide();
        console.log('123567890-', this.viewCustomersActive);
      },
      (error) => {
        alert(error.error.data);
      },
    );
  }
  onActiveCustomerDataChange(event: any) {
    console.log('ddddddd');
    // this.activeCustomercurrentPage = event;
    this.viewActiveCustomers({
      pageNumber: event,
      pageLimit: this.pageSize,
    });
  }
  onEmergencyPlanPageChange(event: any) {
    this.naviagateToEmergencyPlanTable({
      pageNumber: event,
      pageLimit: this.pageSize,
    });
  }

  // Method to handle pagination change for viewPendingCalls table
  onPendingCallsPageChange(event: any) {
    // this.pendingCallsCurrentPage = pageNumber;
    this.naviagateToPendingCallsTable({
      pageNumber: event,
      pageLimit: this.pageSize,
    });
  }

  // Method to handle pagination change for viewPendingRequests table
  onPendingRequestsPageChange(event: any) {
    // this.pendingRequestsCurrentPage = pageNumber;
    this.naviagateToPendingRequestsTable({
      pageNumber: event,
      pageLimit: this.pageSize,
    });
  }
}
