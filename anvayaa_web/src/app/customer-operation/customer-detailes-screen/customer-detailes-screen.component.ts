import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../users.service'
import { Router, Routes, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import * as moment from 'moment';
@Component({
  selector: 'app-customer-detailes-screen',
  templateUrl: './customer-detailes-screen.component.html',
  styleUrls: ['./customer-detailes-screen.component.css']
})
export class CustomerDetailesScreenComponent implements OnInit {
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

    this.FreezePackageDetails = this.formBuilder.group({
      "FreezeDate": [''],
      "ReasonForFreeze":[''],
      "UnFreezeDate":['']
    })
   
    this.downGradePeriod = this.formBuilder.group({
      "TimePeriodInMonths": ['']
    })

   
  }

  CustomerPlan() {
    this.spinner.show()
    this.userservice.viewCustomerPlan({ "CustRecID": this.CustRecID }).subscribe((packageData: any) => {
      if (packageData.code == 'S001') {
        this.spinner.hide()

        this.CustomerPlanDetails = packageData.data;
        console.log("%%%%%%%%%%%%%%%$$$$$$$$$$$$$$$",this.CustomerPlanDetails)
        this.freezeandunfreezeDetails = this.CustomerPlanDetails.FreezeDetails
        
        this.name = "freez"
        this.getLowerLevelPlanListDetails()
        this.UnfreezTab = true
        if (this.CustomerPlanDetails.PackageStatus == 'freez') {
          this.freezbtn = true
          this.name = "unfreez"
          this.UnfreezTab = false
        }
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




  FreezPackage(PackageStatus: any){
   
    this.freezbtnval = true
    if (this.FreezePackageDetails.status == 'INVALID') {
      return;
    }
    if (this.CustomerPlanDetails.PackageStatus != 'freez') {
      if (!moment(this.FreezePackageDetails.value.FreezeDate, "DD-MM-YYYY HH:mm", true).isValid()) {
        this.FreezDate = this.datePipe.transform(this.FreezePackageDetails.value.FreezeDate, 'dd-MM-YYYY hh:mm')
      }
      if (!moment(this.FreezePackageDetails.value.UnFreezeDate, "DD-MM-YYYY HH:mm", true).isValid()) {
        this.UnFreeze_FreezDate = this.datePipe.transform(this.FreezePackageDetails.value.UnFreezeDate, 'dd-MM-YYYY hh:mm')
         console.log("form data",this.UnFreeze_FreezDate)
       }
       this.freezDetails = {
        'CustRecID': this.CustRecID,
        'PackageStatus': PackageStatus,
        "FreezeDate": this.FreezDate,
        "UnFreezeDate": this.UnFreeze_FreezDate,
        "ReasonForFreeze":this.FreezePackageDetails.value.ReasonForFreeze
      }
    }
    if (this.CustomerPlanDetails.PackageStatus == 'freez') {
           
      console.log("wefwefjfw",)

      if (!moment(this.FreezePackageDetails.value.FreezeDate, "DD-MM-YYYY HH:mm", true).isValid()) {
        this.UnFreezDate = this.datePipe.transform(this.FreezePackageDetails.value.FreezeDate, 'dd-MM-YYYY hh:mm')
      }
      if (!moment(this.FreezePackageDetails.value.UnFreezeDate, "DD-MM-YYYY HH:mm", true).isValid()) {
        this.UnFreeze_FreezDate = this.datePipe.transform(this.FreezePackageDetails.value.UnFreezeDate, 'dd-MM-YYYY hh:mm')
         console.log("form data",this.UnFreeze_FreezDate)
       }

      this.freezDetails = {
        'CustRecID': this.CustRecID,
        'PackageStatus': PackageStatus,
        "UnFreezeDate": this.UnFreezDate,
        "ReasonForUnFreeze":this.FreezePackageDetails.value.ReasonForFreeze
      }

    }


        console.log("form data",this.UnFreeze_FreezDate)

   


  console.log("Obj",this.freezDetails)
    this.userservice.FreezPackage(this.freezDetails).subscribe((response) => {
      if (response.code == 'S001') {
        alert(response.msg)
        this.CustomerPlan()
        this.close.nativeElement.click()
      } else {
        alert(response.message)
      }
    }, (error) => {
      alert(error.error.message)
    })
  }



  BackBtn() {
    this.route.navigate(['/Dashboard/customeroperations/CustomerOperations'])
  }



  getLowerLevelPlanListDetails() {
    console.log("WWW")
    var packageData = {
      CustRecID: this.CustRecID,
      ServiceAreaID: this.CustomerPlanDetails.ServiceAreaID
    }


    this.userservice.getLowerLevelPlanList(packageData).subscribe((response) => {

      if (response.code == 'S001') {
        console.log(response.data)
        this.LowerLevelPlans = response.data
      }else{
       if(response.code == 'D001'){
        this.noLowplans = response.data
       }else{
        alert(response.data)
       }
      }
    }, (error) => {
      alert(error.error.data)
    })
  }

  planDetails(plan: any) {
    console.log("data of selected plan", plan)
    this.packageid = plan.PackageID
    this.cityId = plan.ServiceAreaID
    this.downplanList = false
    this.selectionMonths = true
  }


  DownGradePackages() {
    this.downplanList = !this.downplanList
    this.caliculationDetails = false
    this.selectionMonths = false
  }

  
   getDowngradPlansPriceCalculationDetails() {
    this.caliculationDetails = true
    this.selectionMonths = false
    var getdowngradeplanDetails = {
      CustRecID:this.CustRecID,
      ServiceAreaID:this.cityId,
      PackageID:this.packageid ,
      TimePeriodInMonths: this.downGradePeriod.value.TimePeriodInMonths


    }

  
    this.userservice.getDowngradingPlansPriceCalculationDetails(getdowngradeplanDetails).subscribe((response) => {
      if (response.code == 'S001') {
         
        this.Services = response.data.Services;
        this.ExistingPlanDetails = response.data.ExistingPlanDetails
        this.NewPlanDetails = response.data.NewPlanDetails

      } else {
        alert(response.data)
      }
    }, (error) => {
      alert(error.error.data)
    })

  }


  downgradeplan() {
  
    var getdowngradeplanDetails = {
      CustRecID:this.CustRecID,
      ServiceAreaID:this.cityId,
      PackageID:this.packageid ,
      TimePeriodInMonths: this.downGradePeriod.value.TimePeriodInMonths


    }
   
  

    
    this.userservice.downgradePlan(getdowngradeplanDetails).subscribe((response) => {
      if (response.code == 'S001') {

        alert(response.data)

        this.route.navigate(['/Dashboard/customeroperations/CustomerOperations'])

      } else {
        alert(response.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }
}

