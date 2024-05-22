import { Component, OnInit } from '@angular/core';

// import { Router } from '@angular/router';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Route } from '@angular/router';

import { UsersService } from '../../users.service';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-request-dashboard',
  templateUrl: './request-dashboard.component.html',
  styleUrls: ['./request-dashboard.component.css']
})

export class RequestDashboardComponent implements OnInit {
  keyword: any

  data: any = []
  CustRecID: any
  userDetails: any = []
  ServiceAreaID: any
  categaryDetails: any = []
  keyword1: any
  categoryID: any
  SubCategoryID: any
  serviceData: any
  serviceHistory: any
  CategoryID: any
  customerCity: String = ''
  ServiceID: string;
  Covered: string;
  NotCovered: string;
  serviceType: String
  public createRequestData: UntypedFormGroup;
  public Recuring: UntypedFormGroup;
  dropdownSettings: Object = {}
  selectedItems: Array<String> = []
  notCoveredInPlan: boolean = false
  TotalPrice: number
  CoverdPlan: boolean = false
  paymentmode: String
  Beneficiaries: any = []
  CategoryTypeID: String
  pmsVerify: boolean = false
  formDetails: boolean = false
  Days: Array<string> = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]
  constructor(private Router: Router, private UsersService: UsersService, private FormBuilder: UntypedFormBuilder, private DatePipe: DatePipe) { }

  ngOnInit(): void {
    this.customerDetails();

    this.createRequestData = this.FormBuilder.group({
      RequestedStartDate: [''],
      RequestedEndDate: [''],
      Note: [''],
      PaymentMode: [''],
      ServiceType: [''],
      days: [''],
      RequestType: ['']
    })

    //  this.createRequestData.patchValue({RequestType:"InHouse"})
    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      onDeSelect: 'item_text',
      itemsShowLimit: 8,
      allowSearchFilter: true,
    }
  }

  allRequestDashboard() {
    this.Router.navigate(['/support/allRequestDetails'])
  }


  customerDetails() {
    this.keyword = 'Name'
    this.UsersService.CustomerDetailsData().subscribe((customerDetails) => {
      if (customerDetails.code == "S001") {
    
        this.data = customerDetails.data
      } else {
        alert(customerDetails.data)
      }



    }, function (error) {
      alert(error.error.data)
    })

  }
  selectEvent(data: any) {
    this.CustRecID = data.CustRecID
  
    this.viewUserData()
  }
  onChangeSearch(data: any) {
    this.userDetails = []
  }
  onFocused(data: any) {
    this.userDetails = []
    this.serviceData = ''
    this.serviceHistory = ''
  }

  viewUserData() {
    this.UsersService.viewUser(this.CustRecID).subscribe((userData) => {

      if (userData.code == "S001") {
        this.userDetails.push(userData.data)
        this.Beneficiaries = userData.data.Beneficiaries
        this.ServiceAreaID = userData.data.CustomerPackageObj.ServiceAreaID
        this.customerCity = userData.data.City
        this.viewAllCategaryDetailsData()

      } else {
        alert(userData.data)
      }

    }, function (error) {
      alert(error.error.data)
    })
  }
  onChangePlan(data: any) {
    this.serviceData = ''
    this.serviceHistory = ''

  }
  onFocuse(data: any) {
    this.serviceData = ''
    this.NotCovered = ''
    this.Covered = ''
    this.TotalPrice = 0

  }
  viewAllCategaryDetailsData() {
    this.keyword1 = "AliasName"
    this.UsersService.viewAllCategaryDetails(this.CustRecID, this.ServiceAreaID).subscribe((viewAllCategaryDetailsData) => {

      if (viewAllCategaryDetailsData.code == 'S001') {

        for (let a in viewAllCategaryDetailsData.data.subcategories) {
          if (viewAllCategaryDetailsData.data.subcategories[a].Status === "Active") {
            // this.CategoryTypeID=viewAllCategaryDetailsData.data.CategoryTypeID
            // console.log("cccccccccccccc",viewAllCategaryDetailsData.data)

            this.categaryDetails.push(viewAllCategaryDetailsData.data.subcategories[a])

          } else {
            console.log("--")
          }
        }
      } else {
        alert(viewAllCategaryDetailsData.data)
      }
    }, function (error) {
      alert(error.error.data)
    })
  }
  selectCategory(data: any) {

    this.SubCategoryID = data.SubCategoryID
    this.categoryID = data.CategoryID
    this.CategoryTypeID = data.CategoryTypeID
    console.log("data", this.CategoryTypeID)
    this.formDetails = true


    this.subscriptionDetails()




  }
  subscriptionDetails() {
    this.UsersService.packageSubscription(this.CustRecID, this.SubCategoryID).subscribe((subscriptionData) => {

      if (subscriptionData.code == "SR01") {
        this.Covered = subscriptionData.data
        this.CoverdPlan = true
        console.log(subscriptionData.data)
        this.CoverdPlan = false
        this.viewServiceDetailsData()
      } else {

        this.NotCovered = subscriptionData.data
        this.notCoveredInPlan = true



        this.viewServiceDetailsData()
      }
    }, function (error) {
      // alert(error.error.data)
    })
  }
  viewServiceDetailsData() {

    this.UsersService.viewServiceDetails(this.CustRecID, this.SubCategoryID, "").subscribe((serviceDetails) => {
      this.serviceData = ''
      if (serviceDetails.code == "S001") {

        console.log("inHouse", serviceDetails.data.servicesdetails.InHouseRequest)
        console.log("Thir---dParty", serviceDetails.data.servicesdetails.ServiceType)

        if (serviceDetails.data.servicesdetails.ThirdPartyRequest == 'Yes') {
          this.createRequestData.patchValue({ RequestType: 'InHouseRequest' })
        }
        if (serviceDetails.data.servicesdetails.ThirdPartyRequest == 'Yes') {
          this.createRequestData.patchValue({ RequestType: 'ThirdPartyRequest' })
        }
        this.createRequestData.patchValue({ ServiceType: serviceDetails.data.servicesdetails.ServiceType })

        this.serviceType = serviceDetails.data.servicesdetails.ServiceType

        console.log("servieType", serviceDetails.data.servicesdetails.ServiceType)
        this.TotalPrice = serviceDetails.data.servicesdetails.TotalPrice
        this.CategoryID = serviceDetails.data.servicesdetails.CategoryID




        this.pmsVarify()
      } else {
        alert(serviceDetails.data)
      }
    }, function (error) {
      alert(error.error.data)
    })
  }
  createRequest() {



    let ReqDate = this.DatePipe.transform(this.createRequestData.value.RequestedStartDate, 'dd-MM-YYYY hh:mm')

    let ReqEndDate = this.DatePipe.transform(this.createRequestData.value.RequestedEndDate, 'dd-MM-YYYY')


    this.createRequestData.value.CustRecID = this.CustRecID
    this.createRequestData.value.ServiceID = this.SubCategoryID
    this.createRequestData.value.ServiceAreaID = this.ServiceAreaID
    this.createRequestData.value.RequestedStartDate = ReqDate
    this.createRequestData.value.RequestedEndDate = ReqEndDate
    this.createRequestData.value.PaymentMode = this.paymentmode
    console.log(ReqDate, ReqEndDate)
    console.log(this.createRequestData.value)
    
    this.UsersService.creteRequest(this.createRequestData.value).subscribe((Response) => {
      if (Response.code == "S001") {
        alert(Response.message)
        this.Router.navigate(['/Dashboard/support/employeeRequest'])

      } else {
        alert(Response.message)


      }
    }, function (error) {
      alert(error.error.message)
    })

  }

  // viewServiceDetails() {
  //   this.UsersService.viewServiceDetails(this.CustRecID, this.SubCategoryID).subscribe((Response) => {
  //     if (Response.code == "S001") {

  //     } else {
  //       alert(Response.data)
  //     }
  //   }, (error) => {
  //     alert(error.error.data)
  //   })
  // }
  checkbox(values: any) {
    console.log(values.target.defaultValue)
  }



  pmsVarify() {
    this.UsersService.pmsVarification(this.CustRecID, this.TotalPrice).subscribe((Response) => {
      if (Response.code == "S001") {
        this.pmsVerify = true
      } else {
        // alert(Response.data)
        this.pmsVerify = false
      }
    }, (error) => {
      alert(error.error.data)
    })
  }
  paymentMode(type: any) {
    console.log(type.target.defaultValue)
    // this.createRequestData.value.PaymentMode=type.target.defaultValue
    // console.log(this.createRequestData.value.PaymentMode)
    this.paymentmode = type.target.defaultValue
  }
}

