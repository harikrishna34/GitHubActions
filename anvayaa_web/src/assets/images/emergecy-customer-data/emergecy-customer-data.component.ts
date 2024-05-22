import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
// import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { filter } from 'rxjs';
import { Validators, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-emergecy-customer-data',
  templateUrl: './emergecy-customer-data.component.html',
  styleUrls: ['./emergecy-customer-data.component.css']
})
export class EmergecyCustomerDataComponent implements OnInit {
  public requestdetailsform!: UntypedFormGroup


  emergencyCustomerData: any
  List: any = []
  list1: any = []
  RequestID: any
  CustRecID: any
  CustID: any
  CategoryID: any
  SubCategoryID: any
  ContactedNearestHospital: any
  customerEmergencyData: any = []
  NearestAmbulanceServices: any = []
  NearestHospitalSuperSpacality: any = []
  PreferdEmergencyHospital: any = []
  EmergencyLocalContactDetails: any = []
  SponsorContactDetails: any = []
  PoliceStations: any = []
  StatusTrack: any = []
  SupportCenterExecutive: any
  Executive: any = {}
  Name: any
  EmergencyData: any = [];
  data: any = []
  element: any = []
  RequestData: any = []
  details: any
  updatedcontactlist: any
  emergencydetails: any
  IncommingStatusTrack :any = []
  lastStatus:any

  showInput:boolean = false;
  inputValue = '';
    //Demo purpose only, Data might come from Api calls/service
    public counts = [
      "Recieved",
      "In Progress",
      "Ready for Billing",
      "Billed",
      "Order Closed"
    ];
  commentForm:UntypedFormGroup
  constructor(private userservice: UsersService, private route: Router, private snap: ActivatedRoute, private FormBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.RequestID = this.snap.snapshot.queryParamMap.get("RequestID")
    this.CustRecID = this.snap.snapshot.queryParamMap.get("CustRecID")
    this.CustID = this.snap.snapshot.queryParamMap.get("CustID")
    this.Executive.Name = this.SupportCenterExecutive
    this.emergencyList()
    this.customerDetails()
    this.nearbyhelpcentersdetails()
    this.viewemergencydetailsformbuilder()
    this.EmergencyStatusTrack()
    this.commentForm = this.FormBuilder.group({
       comment:''
    })
  }

  emergencyList() {
    this.userservice.emergencyList().subscribe(emergencys => {
      this.EmergencyData = emergencys.data;
      for (let i = 0; i < this.EmergencyData.length; i++) {
        this.RequestData = this.EmergencyData.filter((data: any) => {
          if (this.RequestID == data.RequestID) {
            return data
          }
        })
      }

    })
  }

  viewemergencydetailsformbuilder() {
    this.requestdetailsform = this.FormBuilder.group({
      ContactedNearestHospital: ['', [Validators.required]],
      ContactedPoliceStation: ['', [Validators.required]],
      ContactedAmbulance: ['', [Validators.required]],
      ContactedFireStation: ['', [Validators.required]],
      ContactedSponsor: ['', [Validators.required]],
      ContactedNeighbours: ['', [Validators.required]],
      ContactedEmergencyPointofContacts: ['', [Validators.required]],
      ContactedPreferredHospital: ['', [Validators.required]],
      CareManagerAccepted: ['', [Validators.required]],
      FireEngineReached: ['', [Validators.required]],
      PoliceReached: ['', [Validators.required]],
      HospittalizationCompleted : ['', [Validators.required]],
      ReachedHospital : ['', [Validators.required]],
      EmergencyClosed : ['', [Validators.required]],

    })
  }

 
  customerDetails() {
    this.userservice.cutomerDetails(this.RequestID).subscribe(emergencyList => {
      this.List.push(emergencyList.data)
      console.log("dddddd",this.List)
      this.customerEmergencyData = emergencyList.data.CustomersHealthPlanDetails;
      this.NearestAmbulanceServices = this.customerEmergencyData.NearestAmbulanceServices
      this.NearestHospitalSuperSpacality = this.customerEmergencyData.NearestSuperSpecialityHospitals
      this.PreferdEmergencyHospital = this.customerEmergencyData.PreferredEmergencyHospitals
      this.StatusTrack = emergencyList.data.StatusTrack
      this.SponsorContactDetails = this.customerEmergencyData.SponsorContactDetails
      this.EmergencyLocalContactDetails = emergencyList.data.CustomersHealthPlanDetails.EmergencyLocalContactDetails

    })
  }

  callNumber(event:any){
    console.log("eeee",event)
    // this.callingNumber = event
    let Obj:any = {
      'RequestID':this.RequestID,
      'toPhoneNumber': event,
      "CustRecID":this.CustRecID,
      "RequestName":this.List[0]?.AliasName      ,
      'Type':"Request"
     } 
    this.userservice.EmergencyCalling(Obj).subscribe(callingResponse => {
      if (callingResponse.code == 'S001') {
         
      }
      if (callingResponse.code == 'ND01') {

      }
    })
}
StatusFor:any
ModelBoxTitel:any
changedStatus(status:any){
this.StatusFor = status.target.value
this.ModelBoxTitel = this.StatusFor.replace(/([A-Z])/g, ' $1');
}


  dashboarddetails() {

    // this.userservice.customerdashboarddetails(this.CustomerID).subscribe((response) => {
    //   if (response.code == "S001") {
    //     console.log("dashboardresponse data ", response.data)
    //     this.dashboarddata = response.data
    //   } else {

    //     alert(response.data)
    //   }
    // }, ((error) => {
    // }))

  }

  contactStatusChange() {
    let updatedcontactlist = {
      "CustID": this.CustID,
      "CategoryID": this.CategoryID,
      "RequestID": this.RequestID,
      "Status": this.StatusFor,
      "SubCategoryID": this.SubCategoryID,
      "Flag": "Active",
      "Note": this.commentForm.value.comment
    }
    this.userservice.cocntactedlistupdate(updatedcontactlist).subscribe((response) => {
      // this.spinner.hide()

      if (response.code == 'S001') {
        alert(response.data)
      } else {
        alert(response.data)
      }
    }, (error) => {

      // this.spinner.hide()

      alert(error.error.data)
    })
  }
  nearbyhelpcentersdetails() {
    let details = {
      "CustRecID": this.CustRecID,
      "CustID": this.CustID,
      "PlanType": "Emergency"
    }
    this.userservice.viewemergencyplan(details).subscribe((response) => {
      // this.spinner.hide()
       
      if (response.code == 'S001') {
        // alert(response.data)
        this.emergencydetails = response.data[0]

        // this.requestdetailsform.patchValue({ "ContactedNearestHospital": this.emergencydetails.ContactedNearestHospital })

      } else {
        // alert(response.data)

      }
    }, (error) => {

      // this.spinner.hide()
  
      // alert(error.error.data)

      // this.route.navigate(['Dashboard/emergencyList'])
    })
  }
  


  lastElement:any = []
  EmergencyStatusTrack() {
    let details:any = {
      "CustRecID": this.CustID,
      "RequestID": this.RequestID
    }
    this.userservice.EmergencyStatusTrack(details).subscribe((response) => {
      // this.spinner.hide() 
      if (response.code == 'S001') {
        this.IncommingStatusTrack  = response.data.StatusTrack

        this.lastElement = this.IncommingStatusTrack.slice(-1);
        console.log("kkkk",this.lastElement )
      } else {
        // alert(response.data)
      }
    }, (error) => {
      // this.spinner.hide()
      alert(error.error.data)
    })
  }
}
