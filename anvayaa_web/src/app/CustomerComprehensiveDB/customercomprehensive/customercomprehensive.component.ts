import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { UsersService } from '../../users.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
  Form,
} from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SwPush } from '@angular/service-worker';

import { SafePipe } from '../../urlSanitize-pipe';
@Component({
  selector: 'app-customercomprehensive',
  templateUrl: './customercomprehensive.component.html',
  styleUrls: ['./customercomprehensive.component.css'],
})
export class CustomercomprehensiveComponent implements OnInit {
  ViewCCdbArray: any;
  ViewCCdbArrayone: any = [];
  CustRecID: any;
  task: any;
  offcanvasfortouchpoints: boolean = false;

  getStatusColor(status: string): string {
    switch (status) {
      case 'Active':
        return 'active';
      case 'Inactive':
        return 'inactive';
      default:
        return 'dead';
    }
  }
  constructor(
    private _swPush: SwPush,
    private userservice: UsersService,
    private datePipe: DatePipe,
    private route: Router,
    private snap: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
  ) {
    if (this.task == 'Touch_Points') {
      this.offcanvasfortouchpoints = true;
    }
  }

  ngOnInit(): void {
    this.CustRecID = this.snap.snapshot.queryParamMap.get('CustRecID');
    console.log(
      'which task is this',
      this.snap.snapshot.queryParamMap.get('Task'),
    );
    this.task = this.snap.snapshot.queryParamMap.get('Task');
    console.log('logging into which task', this.task);

    this.CustomerComprhensiveDB();
  }
  navigatetoComprehensivpms(data: any) {
    let CID = data.customerDoc?.CustRecID;
    this.route.navigate(['Dashboard/CustomerDashboard/Comprehensivepms'], {
      queryParams: { CustRecID: CID },
    });
  }
  navigateToTouchPoints(data: any) {
    let CID = data.customerDoc?.CustRecID;
    this.route.navigate(
      ['Dashboard/CustomerDashboard/viewTouchPointsSettings'],
      { queryParams: { CustRecID: CID } },
    );
  }
  navigatetoCaremangerDetails(data: any) {
    let CID = data.customerDoc?.CustRecID;
    this.route.navigate(
      ['Dashboard/CustomerDashboard/viewOngoingCareMangerDetails'],
      { queryParams: { CustRecID: CID } },
    );
  }
  // navigatetoEmRreports(data:any){
  //   let CID = data.customerDoc?.CustRecID;
  //   this.route.navigate(['Dashboard/CustomerDashboard/viewEMRreportsdetails'],{ queryParams:{CustRecID:CID} })
  // }
  navigatetoHHCdetails(data: any) {
    let CID = data.customerDoc?.CustRecID;
    this.route.navigate(['Dashboard/CustomerDashboard/viewOngoinghhcdetails'], {
      queryParams: { CustRecID: CID },
    });
  }
  navigatetoPlandetails(data: any) {
    let CID = data.customerDoc?.CustRecID;
    this.route.navigate(['Dashboard/CustomerDashboard/viewPlanDetails'], {
      queryParams: { CustRecID: CID },
    });
  }
  navigateToVisitsUtilized(data: any, type: string) {
    let CID = data.customerDoc?.CustRecID;
    this.route.navigate(['Dashboard/CustomerDashboard/viewVisitsUtilized'], {
      queryParams: { CustRecID: CID, type: type },
    });
  }
  navigatetoOpenTickets(data: any) {
    let CID = data.customerDoc?.CustRecID;
    this.route.navigate(['Dashboard/CustomerDashboard/viewOpenTickets'], {
      queryParams: { CustRecID: CID },
    });
  }
  navigatetoCloseTickets(data: any) {
    let CID = data.customerDoc?.CustRecID;
    this.route.navigate(['Dashboard/CustomerDashboard/viewCloseTickets'], {
      queryParams: { CustRecID: CID },
    });
  }
  viewDoctorVisists(data: any, type: string) {
    let CID = data.customerDoc?.CustRecID;
    this.route.navigate(['Dashboard/CustomerDashboard/viewVisitsUtilized'], {
      queryParams: { CustRecID: CID, type: type },
    });
  }
  viewCareManagerDetails(data: any, type: string) {
    let CID = data.customerDoc?.CustRecID;
    this.route.navigate(['Dashboard/CustomerDashboard/viewVisitsUtilized'], {
      queryParams: { CustRecID: CID, type: type },
    });
  }
  navigateToHexaDevices(data: any) {
    // let CID = data.customerDoc?.CustRecID;
    this.route.navigate(['Dashboard/HexaDevices/viewHexaDevices'], {
      queryParams: { CustRecID: this.CustRecID },
    });
  }

  CustomerComprhensiveDB() {
    // this.spinner.show();
    this.userservice.ViewCustomerComprehensiveData(this.CustRecID).subscribe(
      (response) => {
        console.log('ViewCCdbArray', response.data);
        if (response.code == 'S001') {
          this.ViewCCdbArray = response.data;
          console.log('which task', this.task);
          if (this.task == 'Touch_Points') {
            this.toOpen();
          }
        } else if (response.code == 'S002') {
          alert(response.data);
        } else {
          alert(response.data);
        }
      },
      (error) => {
        alert(error.error.data);
      },
    );
  }
  benonedetails: any;
  viewprofilebenone(beneficiaryonedrdtails: any) {
    console.log('benenenenene11111', beneficiaryonedrdtails);
    this.benonedetails = beneficiaryonedrdtails;
  }
  bentwodetails: any;
  viewprofilebentwo(beneficiarytwodrdtails: any) {
    console.log('benenenenene22222', beneficiarytwodrdtails);
    this.bentwodetails = beneficiarytwodrdtails;
  }
  emrdetailsarray: any;
  emrtypedata: any = false;
  emrdetails(data: any) {
    console.log('emrrrrrrrrrr', data);
    console.log('emrrrrrrrrrrid', this.CustRecID);

    console.log('ddd', this.emrtypedata);
    this.emrtypedata = this.emrtypedata == false ? true : false;
    console.log('ddd', this.emrtypedata);

    this.userservice.ComprehensivecustomersData(this.CustRecID, data).subscribe(
      (response) => {
        console.log('emrArray', response.data);
        if (response.code == 'S001') {
          this.emrdetailsarray = response.data;
        } else if (response.code == 'S002') {
          alert(response.data);
        } else {
          alert(response.data);
        }
      },
      (error) => {
        alert(error.error.data);
      },
    );
  }
  Emrfiles: any;
  viewemrfiles(emrfilesdata: any) {
    console.log('ssssseeeeeeeeeeddddddddddd', emrfilesdata);
    this.Emrfiles = emrfilesdata;
  }

  click(type: any) {
    // this.selectedService = type;
    console.log('eddddd', type);
    if (type == 'Accompany Doctor Appointment') {
      this.route.navigate(['Dashboard/CustomerDashboard/viewVisitsUtilized'], {
        queryParams: { CustRecID: this.CustRecID, type: 'ACDVisits' },
      });
    } else if (type == 'Care Manager Visits') {
      this.route.navigate(['Dashboard/CustomerDashboard/viewVisitsUtilized'], {
        queryParams: { CustRecID: this.CustRecID, type: 'CMVisits' },
      });
    } else if (type == 'Hexa service visits') {
      this.route.navigate(['Dashboard/CustomerDashboard/viewVisitsUtilized'], {
        queryParams: { CustRecID: this.CustRecID, type: 'HexaVisits' },
      });
    }
  }

  selectedService: string | null = null;

  hoverService(serviceName: string | null) {
    this.selectedService = serviceName;
  }
  toOpen() {
    this.offcanvasfortouchpoints = this.offcanvasfortouchpoints ? true : true;
    console.log(
      this.offcanvasfortouchpoints,
      'this.offcanvasfortouchpoints11111111',
    );
  }
}
