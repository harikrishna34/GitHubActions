import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../users.service'
import { Router, Routes, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-planetailsview',
  templateUrl: './planetailsview.component.html',
  styleUrls: ['./planetailsview.component.css']
})
export class PlanetailsviewComponent implements OnInit{
  notify: any;
  data: any = []
  PackageAuditDetails: any = []
  LowerLevelPlans: any = []
  public FreezePackageDetails: UntypedFormGroup
  @ViewChild('close') close: any
  constructor(private formBuilder: UntypedFormBuilder, private userservice: UsersService, private route: Router, private spinner: NgxSpinnerService, private Router: Router, private activatedRoute: ActivatedRoute, private UsersService: UsersService, private datePipe: DatePipe) { }

  CustRecID: any
  CustomerPlanDetails: any
  FreezDate: any
  freezbtn: boolean = false
  name: String
  UnFreezDate: any
  freezbtnval: boolean = false
  downplanList: boolean = false

  cityId: any
  packageid: any
  noLowplans:any

  selectionMonths:boolean=false
  Months: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  caliculationDetails:boolean =false
  public downGradePeriod: UntypedFormGroup

  ExistingPlanDetails:any
  Services:any=[]
  NewPlanDetails:any
  UnFreeze_FreezDate:any
  freezDetails:any
  UnfreezTab:boolean = false
  freezeandunfreezeDetails:any=[]
  ngOnInit(): void {

    this.CustRecID = this.activatedRoute.snapshot.queryParamMap.get("CustRecID");
    this.CustomerPlan()
  }
  CustomerPlan(){
    this.spinner.show()
    this.userservice.viewCustomerPlan({ "CustRecID": this.CustRecID }).subscribe((packageData: any) => {
      if (packageData.code == 'S001') {
        this.spinner.hide()
        this.CustomerPlanDetails = packageData.data;
        console.log("%%%%%%%%%%%%%%%$$$$$$$$$$$$$$$",this.CustomerPlanDetails)
        this.PackageAuditDetails = this.CustomerPlanDetails.PackagesAudit
        console.log("@@@@@@@@@@@@@&&&&&&&&",this.PackageAuditDetails)
      } else {
        this.spinner.hide()
        alert(packageData.data  )
      }
    }
    , (error) => {
      this.spinner.hide()
      alert(error.error.data)
    }
    )
  }
}
