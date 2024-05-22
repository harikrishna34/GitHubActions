import { Component, Input, OnInit,ChangeDetectorRef, ElementRef, ViewChild  } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
// import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { filter } from 'rxjs';
import { Validators, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { SwPush } from "@angular/service-worker";
@Component({
  selector: 'app-emergecy-customer-data',
  templateUrl: './emergecy-customer-data.component.html',
  styleUrls: ['./emergecy-customer-data.component.css']
})
export class EmergecyCustomerDataComponent implements OnInit {

  enableIncidentKeys = true
  showInput: boolean = false ;
  inputValue = '';
  emergencyHealthMainOBject: any = {}
  emergencyPersonDetails: any = {}
  CutomerObject: any
  otherBenficiary: any
  sponserObj: any = {}
  CustomerHealthPlanDetails: any = []
  OtherAmbulanceForm: UntypedFormGroup
  ambulanceDriverDetails: UntypedFormGroup
  incidentLocationAddress: UntypedFormGroup
  OtherHospitalForm: UntypedFormGroup
  incidentLocationForm: UntypedFormGroup
  fireForm:UntypedFormGroup
  policeForm:UntypedFormGroup
  EmergencyTeam: any = []
  driverDetails: any
  ambulanceList: any = []
  CareManagersList: any = []
  ServiceAreaID: any
  changeOfServiceAreaId: any
  StatusTrack:any = [];
  ambulancType: any
  OtherSelectedAmbulance: any
  DefinedStatusTrack:any
  OtherCareManagerObject:any
  //coment box 
  EmergencyCloseComment:any
  comments: any = {
    box1: '',
    box2: '',
    box3: '',
    box4: '',
    box5: '',
    box6: '',
    box7: '',
    box8: '',

  }




  // status binding at ng model 

  CareManagerAccepted: boolean = false
  CareManagerReachedLocation: boolean = false
  CareManagerReachedHospital: boolean = false

  CustomerContactedCareManager: boolean = false
  AmbulanceAccepted: boolean = false
  AmbulanceReachedLocation: boolean = false
  AmbulanceReachedHospital: boolean = false
  OtherAmbulanceAccepted: boolean = false
  IsParamedicRequired: any
  ContactedHospital: boolean = false
  ReachedHospital: boolean = false
  InformedPolice: boolean = false
  PoliceReachedLocation: boolean = false
  FiledFir: boolean = false
  InformedFireStation: boolean = false
  FireEngineReachedLocation: boolean = false

  CustomerAccepted: boolean = false
  SponsorAccepted: boolean = false
  benficiaryAccepted: boolean = false
  NeighbourAccepted: boolean = false
  EmergencyContactAccepted: boolean = false
  // HospitalAcceptd:boolean = false
  PreferredHospitalAccepted: boolean = false
  PreferredSpecialityHospitalAccepted: boolean = false
  OtherHospitalAccepted: boolean = false


  SponsorAtLocation: boolean = false
  benficiaryAtLocation: boolean = false
  NeighbourAtLocation: boolean = false
  EmergencyContactAtLocation: boolean = false
  AdmitedHospital: boolean = false




  // color condition 
  carmangerAccepted: boolean = false
  cmAtLocation: boolean = false
  cmAtHospital: boolean = false

  ambAccepted: boolean = false
  ambReachedLocation: boolean = false
  ambReachedHospital: boolean = false

  hospitalAcceptClr: boolean = false
  hospitalReachedClr: boolean = false
  hospitalAdmitCompleteClr: boolean = false

  policeInformedClr: boolean = false
  policeReachedLocationClr: boolean = false

  fireInformedClr: boolean = false
  fireEngienReachedLocationClr: boolean = false

  cityData: any

  /////////Updated Lists of Model Lists Array 


  CustomerRelatedDetails:any=[]
  AmbulanceDetails:any = []
  CareManager:any = []
  OtherHospitalDetails:any = []
  PoliceStationDetails:any = []
  FireStationDetails:any = []

  NotificationDetails:any
  constructor(private cdRef: ChangeDetectorRef,private _swPush: SwPush, private userservice: UsersService, private activatedRoute: ActivatedRoute, private route: Router, private snap: ActivatedRoute, private FormBuilder: UntypedFormBuilder) { }
  EmpId: any
  FromCall: any
  RequestID: any
  callStatus1:any
  callStatus2:any
  callingSvg:boolean = true
  @ViewChild('checkboxes') checkboxes: ElementRef<HTMLInputElement>;
  ngOnInit(): void {

    this.RequestID = this.activatedRoute.snapshot.queryParamMap.get("RequestID");
    this.EmpId = localStorage.getItem('LoginEmployeeIDNew')
    this.employeeData()
    this.customerEmergencyHealthData()
    this.cityDetails()
    this.GetEmployee()
    this.otherAmbulanceFormFunction()
    this.policeFormFunction()
    this.FireFormFunction()
    this.ambulanceDriverFormFunction()
    this.OtherHospitalFormFunction()
    this.incidentLocationFormFunction()
    this.getAmbulanceTypes()
    this._swPush.messages.subscribe((message: any) => {
      this.NotificationDetails = message
      this.customerEmergencyHealthData()
      if(this.NotificationDetails.notification.customData.Details?.callResponse.Status2 == 'CANCEL'||this.NotificationDetails.notification.customData.Details?.callResponse.Status2 == 'ANSWER'||this.NotificationDetails.notification.customData.Details?.callResponse.Status2 == 'BUSY'){
        // this.CallingBox = false

        this.callStatus1 = this.NotificationDetails.notification.customData.Details?.callResponse.Status1
        this.callStatus2 = this.NotificationDetails.notification.customData.Details?.callResponse.Status2
        this.callingSvg = false

      }
    }
    )
  }

  // customer health paln details  all customer data is collecting from this api 

  customerEmergencyHealthData() {

    this.userservice.emrgencyHealthData(this.RequestID).subscribe((Response: any) => {
      if (Response.code == 'S001') {
        this.emergencyHealthMainOBject = Response.data
        this.CutomerObject = this.emergencyHealthMainOBject.CustomerDetails[0]
         if(Response.data.Status == 'EmergencyClosed'){
          this.route.navigate(['Dashboard/emergencyList']);
         }

         this.showInput = false
        this.OtherHospitalDetails = this.emergencyHealthMainOBject.OtherHospitalDetails
        this.AmbulanceDetails = this.emergencyHealthMainOBject.AmbulanceDetails
        this.CareManager = this.emergencyHealthMainOBject.CareManager
        this.PoliceStationDetails = this.emergencyHealthMainOBject.PoliceStation
        this.FireStationDetails = this.emergencyHealthMainOBject.FireStation
        this.FireStationDetails = this.emergencyHealthMainOBject.FireStation
        this.CustomerRelatedDetails = this.emergencyHealthMainOBject.CustomerRelatedDetails

        this.CustomerHealthPlanDetails = this.emergencyHealthMainOBject.CustomerHealthPlanDetails[0]
        const sponsorData = Object.assign({}, this.CutomerObject); // Create a copy of the entire object
        delete sponsorData.Beneficiaries; // Remove unnecessary key for cleaner structure
        sponsorData.CustomerType = 'Sponsor'
        sponsorData.CustID = sponsorData.CustRecID
        this.ServiceAreaID = this.emergencyHealthMainOBject.ServiceAreaID
        this.CutomerObject.Beneficiaries.push(sponsorData);
        // finding emergency person details from Customer Object 
        this.CutomerObject.Beneficiaries.filter((data: any) => {
          if (this.emergencyHealthMainOBject.CustID == data.CustID) {
            this.emergencyPersonDetails = data  // filter emergency person details
          }
          if (this.emergencyHealthMainOBject.CustID != data.CustID && data?.CustomerType != 'Sponsor') {
            this.otherBenficiary = data // filtered other Benficiary Details 
          }
          if (this.emergencyHealthMainOBject.CustID != data.CustID && data?.CustomerType == 'Sponsor') {
            this.sponserObj = data //  filter for Sponsore Details 

          }
        })
        this.OtherSelectedAmbulance = Response.data.StatusTrack.filter((IncommingStatus: any) => {
          if (IncommingStatus.Type == 'Ambulance' && IncommingStatus.Status == 'Other Ambulance Accepted') {
            return IncommingStatus.AcceptedBy
          }
        })

          this.isCheckedOfStatus()

        this.IncomingStatusMainObject = Response.data
        this.OtherCareManagerObject = this.emergencyHealthMainOBject?.CareManager
        this.EmergencyTeam = Response.data.EmergencyTeam
        this.StatusTrack = Response.data.StatusTrack
        this.ambulancType = Response.data?.AmbulanceType
        this.AmbulanceType = Response.data.AmbulanceType?.AmbulanceType
        this.IsParamedicRequired = Response.data.AmbulanceType?.IsParamedicRequired
        if (this.IsParamedicRequired) {
          this.ambulanceType = true
        }
         if(Response.data.hasOwnProperty("IncidentLocationDetails")){
         }
        this.IncomingIncidentLocationDetails = this.IncomingStatusMainObject.IncidentLocationDetails
         

 


        let IncomingStatusArray: any = []

        Response.data.StatusTrack.filter((IncommingStatus: any) => {
          const noSpacesString1: string = IncommingStatus.Status.replace(/\s/g, "");
          IncomingStatusArray.push(noSpacesString1)
        })
        IncomingStatusArray = [...new Set(IncomingStatusArray)];
        this.SwitchFunctionToBindIncomingStatus(IncomingStatusArray)
        this.driverDetails = Response.data.DriverDetails
        this.UpdateOtherHospitalDetails = this.IncomingStatusMainObject.OtherHospitalDetails
        this.OtherAmbulanceprovider = this.IncomingStatusMainObject.AmbulanceDetails
        this.findingAcceptedDetailsfromStatusTrack(Response.data.StatusTrack)
      }
      if (Response.code == 'ND01') {

      }
    })
  }


  // patchind data to forms

  incidentValuePatchToform() {
    this.incidentLocationForm.patchValue({ "HouseNumber": this.IncomingIncidentLocationDetails?.HouseNumber })
    this.incidentLocationForm.patchValue({ "Street": this.IncomingIncidentLocationDetails?.Street })
    this.incidentLocationForm.patchValue({ "Landmark": this.IncomingIncidentLocationDetails?.Landmark })
    this.incidentLocationForm.patchValue({ "City": this.IncomingIncidentLocationDetails?.City })
  }





  //Form Builders 

  otherAmbulanceFormFunction() {
    this.OtherAmbulanceForm = this.FormBuilder.group({
      "ProviderName": ['', Validators.required],
      "ContactName": ['', Validators.required],
      "ContactNumber": ['', Validators.required]
    })
  }

  ambulanceDriverFormFunction() {
    this.ambulanceDriverDetails = this.FormBuilder.group({
      "DriverName": ['', Validators.required],
      "ContactNumber": ['', Validators.required],
      "VehicalNumber": ['']
    })
  }

  OtherHospitalFormFunction() {
    this.OtherHospitalForm = this.FormBuilder.group({
      "OtherHospitalName": ['', Validators.required],
      "ContactNumber": ['', Validators.required],
      "HouseNumber": ['', Validators.required],
      "Street": ['', Validators.required],
      "Landmark": ['', Validators.required],
      "City": ['', Validators.required],
    })
  }

  incidentLocationFormFunction() {
    this.incidentLocationForm = this.FormBuilder.group({
      "HouseNumber": ['', Validators.required],
      "Street": ['', Validators.required],
      "Landmark": ['', Validators.required],
      "City": ['', Validators.required],
    
    })
  }

  policeFormFunction(){
    
    this.policeForm = this.FormBuilder.group({
      "PoliceStationName": ['', Validators.required],
      "ContactNumber": ['', Validators.required],
      "Latitude": [''],
      "Longitude": [''],
      "IsAccepted": [''],
      "HouseNumber": ['', Validators.required],
      "Street": ['', Validators.required],
      "Landmark": ['', Validators.required],
      "City": ['', Validators.required],
    })
  }


  FireFormFunction(){
    this.fireForm = this.FormBuilder.group({
      "FireStationName": ['', Validators.required],
      "ContactNumber": ['', Validators.required],
      "Latitude": [''],
      "Longitude": [''],
      "IsAccepted": [''],
      "HouseNumber": ['', Validators.required],
      "Street": ['', Validators.required],
      "Landmark": ['', Validators.required],
      "City": ['', Validators.required],
    })
  }

  // validation Functions

  onlyNumber(event: any) {
    let click: any = event.charCode
    return (click == 8 || click == 0) ? null : click >= 48 && click <= 57
  }

  onlyAlphabets(event: any) {
    let click: any = event.charCode
    return (click == 8 || click == 0) ? null : (click >= 65 && click <= 90 || click >= 97 && click <= 122)
  }

  //
  notRequiredserviceName: string
  notRequiredService(service: any) {

    this.notRequiredserviceName = service

  }
  AmbulanceType: any
  ambulanceType: boolean = false

  SelectedAmbulanceType(ambType: any) {

    let IncomingStatus
    let paramedic


    if (this.isEvent(ambType)) {
      // Handle event object (specific actions based on your logic)
      IncomingStatus = ambType.target.value
    } else {
      IncomingStatus = this.AmbulanceType
    }

    if (ambType == "IsParamedicRequired") {
      paramedic = true
    } else {

      paramedic = false
    }
    this.ambulanceType = true
    const ambDetails: any = {
      "RequestID": this.RequestID,
      "Comments": "Other Ambulance Details Updated",
      "Status": "Ambulance Type Updated",
      "Type": "AmbulanceType",
      "AmbulanceType": IncomingStatus,
      "IsParamedicRequired": paramedic
    }

    if (ambDetails.AmbulanceType == '') {
      ambDetails.AmbulanceType = this.AmbulanceType
    }
    this.updateEmergrncyStatus(ambDetails)
  }


  // unchecked Ambulance Contacted Model
  bootstrap: any // Declare Bootstrap variable
  showModal: boolean = false;

  toggleModal() {
    if (this.showModal == false) {
      // Get a reference to the modal
      let modal: any = document.getElementById('resonetoUncheck');
      // Add the 'show' class to open the modal
      modal.classList.add('show');
      modal.style.display = 'block';
    } else {
      let modal: any = document.getElementById('resonetoUncheck');
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

  closeModel() {
    let modal: any = document.getElementById('resonetoUncheck');
    modal.classList.remove('show');
    modal.style.display = 'none';
  }

  isClicked: boolean = false;
  disableHospital: boolean = false;
  disableFire: boolean = false;
  disablePolice: boolean = false
  cancellationstatus:any
  toggleButton(){
    // Toggle the state of isClicked
    if(this.notRequiredserviceName == 'Ambulance'){
      this.cancellationstatus="Ambulance_Not_Required"
      this.isClicked = !this.isClicked;
    }else if(this.notRequiredserviceName == 'Hospital'){
      this.cancellationstatus="Hospital_Not_Required"
      this.disableHospital = ! this.disableHospital
    }else if(this.notRequiredserviceName == 'FireStation'){
      this.cancellationstatus="FireStation_Not_Required"
         this.disableFire = !this.disableFire
    } else if(this.notRequiredserviceName == 'Police'){
      this.cancellationstatus="Police_Not_Required"
      this.disablePolice = !this.disablePolice
}
 
const cancellation:any = {
  "RequestID":this.RequestID,
  "Comments": this.comments.box7,
  "Status":this.cancellationstatus,
  "Type":this.notRequiredserviceName      
}
 
 
this.updateEmergrncyStatus(cancellation)
  }
  

  //location on map
  openInNewTab(url: string) {
    window.open(url, '_blank');
  }

  // address location to check 

  locationTracking(url: string) {
    window.open(url, '_blank');
  }


  newAmbulanceAdded(){

    let newAmbulance = {
    "AmbulanceType":'Other Ambulance',
    "ProviderName":this.OtherAmbulanceForm.value.ProviderName,
    "ContactName":this.OtherAmbulanceForm.value.ContactName,
    "ContactNumber":this.OtherAmbulanceForm.value.ContactNumber,
    "IsAccepted":false
    }


     this.AmbulanceDetails.push(newAmbulance)
    
     const ambDetails: any = {
      "RequestID": this.RequestID,
      "Comments": "Other Ambulance Details Updated",
      "Status": "Other Ambulance Added",
      "Type": "AmbulanceDetails",
      "AmbulanceDetails":this.AmbulanceDetails
    }

    this.updateEmergrncyStatus(ambDetails)
  }


// disable functionality 

  checkFireStationDisabled(): boolean {
    return this.FireStationDetails.every((fs:any) => !fs.IsAccepted);
  }

  checkPoliceStationDisabled(): boolean {
    return this.PoliceStationDetails.every((fs:any) => !fs.IsAccepted);
  }

  checkHospitalDisabled(): boolean {
    return this.OtherHospitalDetails.every((fs:any) => !fs.IsAccepted);
  }

  checkAmbulanceDisabled(): boolean {
    return this.AmbulanceDetails.every((fs:any) => !fs.IsAccepted);
  }

 policeAcceptedCall(){
  if(this.PoliceAcceptedObj!= undefined){
    this.callinInitiating(this.PoliceAcceptedObj?.ContactNumber,this.PoliceAcceptedObj?.PoliceStationName)
  }
 }

 fireAcceptedCall(){
  if(this.FireObj!= undefined){
    this.callinInitiating(this.FireObj?.ContactNumber,this.FireObj?.FireStationName)
  }
 }

 HospitalAcceptedCall(){
  if(this.AcceptedPreferredEmergencyHospitalsObj!= undefined){
    this.callinInitiating(this.AcceptedPreferredEmergencyHospitalsObj?.ContactNumber,this.AcceptedPreferredEmergencyHospitalsObj?.OtherHospitalName)
  }
 }

 AmbulanceAcceptedCall(){
  if(this.AcceptedAmbulance!= undefined){
    this.callinInitiating(this.AcceptedAmbulance?.ContactNumber,this.AcceptedAmbulance?.ProviderName)
  }
 }

  // functions for update Other Ambulance , Driver details,and hospital and Incident locations  
  addAmbulanceDetails() {
    const ambDetails: any = {
      "RequestID": this.RequestID,
      "Comments": "Other Ambulance Details Updated",
      "Status": "Other Ambulance Details Updated",
      "Type": "AmbulanceDetails"
    }
    const combinedObj = { ...ambDetails, ...this.OtherAmbulanceForm.value, }
    this.updateEmergrncyStatus(combinedObj)

  }


  addPolice(){

    let PsObj = {
      "PoliceStationName": this.policeForm.value.PoliceStationName,
      "ContactNumber":this.policeForm.value.ContactNumber,
      "Address": this.policeForm.value.HouseNumber+','+this.policeForm.value.Street+','+this.policeForm.value.Landmark+','+this.policeForm.value.City,
      "Latitude": '',
      "Longitude": '',
      "IsAccepted":false
    }

    this.PoliceStationDetails.push(PsObj)


    const PoliceDetailsOBj: any = {
      "RequestID": this.RequestID,
      "Comments": "Other PoliceStation Added",
      "Status": "Other PoliceStation Added",
      "Type": "PoliceStationDetails",
      "PoliceStationDetails":this.PoliceStationDetails
    }


    this.updateEmergrncyStatus(PoliceDetailsOBj)


  }


  addFireStation(){


    let FireSatationObj  = {
      "FireStationName": this.fireForm.value.FireStationName,
      "ContactNumber":this.fireForm.value.ContactNumber,
      "Address": this.fireForm.value.HouseNumber+','+this.fireForm.value.Street+','+this.fireForm.value.Landmark+','+this.fireForm.value.City,
      "Latitude": '',
      "Longitude": '',
      "IsAccepted":false
    }
    this.FireStationDetails.push(FireSatationObj)
    
    const fire: any = {
      "RequestID": this.RequestID,
      "Comments": "Other FireStation Added",
      "Status": "Other FireStation Added",
      "Type": "FireStationDetails",
      "FireStationDetails":this.FireStationDetails
    }

    this.updateEmergrncyStatus(fire) 
  }



  updateComments() {
    let Comment = ''
    for (const key in this.comments) {
      if (this.comments.hasOwnProperty(key) && this.comments[key] != '') {

        if(key == 'box6'){

          this.FireStationDetails.forEach((fs:any) => {
            fs.disabled = false; // Enable all checkboxes
          });
        }
        Comment = this.comments[key]
      }
    }
    const ambDetails: any = {
      "RequestID": this.RequestID,
      "Comments": Comment,
      "Status": "Update",
      "Type": "Comment"
    }
    this.updateEmergrncyStatus(ambDetails)

  }

  updateDriverDetails() {
    const ambDriverObj: any = {
      "RequestID": this.RequestID,
      "Comments": "Ambulance Driver DetailsUpdated",
      "Status": "Ambulance Driver Details Updated",
      "Type": "DriverDetails"
    }
    const combinedObj: any = { ...ambDriverObj, ...this.ambulanceDriverDetails.value, };

    this.updateEmergrncyStatus(combinedObj)
  }

  addHospital(){

   let newHospitalObj = {
    "HospitalType":"Other Hospital",
    "OtherHospitalName":this.OtherHospitalForm.value.OtherHospitalName,
    "ContactNumber":this.OtherHospitalForm.value.ContactNumber,
    "Address": this.OtherHospitalForm.value.HouseNumber + this.OtherHospitalForm.value.Street +this.OtherHospitalForm.value.Landmark+this.OtherHospitalForm.value.City ,
    "IsAccepted":false,
    "Latitude":"", 
    "Longitude":""
   }

   this.OtherHospitalDetails.push(newHospitalObj)


   const hospitalDetails: any = {
    "RequestID": this.RequestID,
    "Comments": "Other Hospital Details Updated",
    "Status": "Other Hospital Added",
    "Type": "OtherHospitalDetails",
    "OtherHospitalDetails":this.OtherHospitalDetails
  }
   this.updateEmergrncyStatus(hospitalDetails)
  }

  // need to change update hospital details
  addOtherHospital() {

    const ambDriverObj: any = {
      "RequestID": this.RequestID,
      "Comments": "Other Hospital Details Updated",
      "Status": "Other Hospital Details Updated",
      "Type": "OtherHospitalDetails"
    }
    const combinedObj: any = { ...ambDriverObj, ...this.OtherHospitalForm.value, };
    this.updateEmergrncyStatus(combinedObj)
  }


  atLocationUpdate(AtLocation:any,checked: boolean, index: number){
 
   this.CustomerRelatedDetails[index].AtLocation = true;

  const atlocation: any = {
    "RequestID": this.RequestID,
    "Comments": "",
    "Status":AtLocation.Relation +' '+'At Location' ,
    "Type": "CustomerRelatedDetails",
    "AcceptedBy":AtLocation.Name,
    "CustomerRelatedDetails": this.CustomerRelatedDetails
  }

  this.updateEmergrncyStatus(atlocation)
       
  }

  filterByLocation(data: any[], location: boolean): any[] {
    return data.filter(item => item.AtLocation === location);
  }
  


  UpdateCareCordinatersStatus(careManager:any,i:any){

    this.CareManager[i].Contacted = true;
    const contact: any = {
      "RequestID": this.RequestID,
      "Comments": "",
      "Status": careManager.PersonType + ' ' + 'Contacted',
      "Type": "CareManagerDetails",
      "AcceptedBy": careManager.EmployeeName,
      "CareManagerDetails": this.CareManager
    }
   
  this.updateEmergrncyStatus(contact)
  }




  updateCustomerContacted(deatils:any,index:number){

    this.CustomerRelatedDetails[index].Contacted = true;

       const contact: any = {
        "RequestID": this.RequestID,
        "Comments": "",
        "Status":deatils.Relation +' '+'Contacted' ,
        "Type": "CustomerRelatedDetails",
        "AcceptedBy":deatils.Name,
        "CustomerRelatedDetails": this.CustomerRelatedDetails
      }
      this.updateEmergrncyStatus(contact)
     


  }
  addIncidentLocation() {
    const ambDriverObj: any = {
      "RequestID": this.RequestID,
      "Comments": "Incident location Added",
      "Status": "Added Incident Location",
      "Type": "IncidentLocation",
      "Address":this.incidentLocationForm.value.HouseNumber+','+
                this.incidentLocationForm.value.Street+','+
                this.incidentLocationForm.value.Landmark+','+
                this.incidentLocationForm.value.City,
     "Latitude":"",
     "Longitude":""
    }
    // const combinedObj: any = { ...ambDriverObj, ...this.incidentLocationForm.value, };
    this.updateEmergrncyStatus(ambDriverObj)
  }

  isEvent(value: any) {
    return typeof value === 'object' && value !== null && 'type' in value;
  }

reasonForUncheckHospital:boolean = false
hideHospitalCommentBox:boolean = true
  unCheckHospital(){
     this.PreferdNearestHospital

     for(let key in this.PreferdNearestHospital){
        if(this.PreferdNearestHospital[key]){
          this.hideHospitalCommentBox = true
          this.reasonForUncheckHospital = false
          }else{
           
            this.hideHospitalCommentBox = false
            this.reasonForUncheckHospital = true

          }
     }
     
  }

 handoverToClose:boolean = false

sponcerInformedToClose(Type:string){

    if(Type=='HANDOVER'){
      this.IsFault = false
      this.ISSponsorContacted = false;
    }else{
      this.IsFault = false
      this.handoverToClose = false;
    }
  const allIsAcceptedFalse = this.PoliceStationDetails.every((station:any) => station.IsAccepted === false);
  const allFireIsAcceptedFalse = this.FireStationDetails.every((station:any) => station.IsAccepted === false);
  const allIshospitalAcceptedFalse = this.OtherHospitalDetails.every((station:any) => station.IsAccepted === false);
  const allIsAcceptedAmbulanceFalse = this.AmbulanceDetails.every((station:any) => station.IsAccepted === false);
      if(!allIsAcceptedFalse){
        if(!this.PoliceReachedLocation){
          alert("Police  Need to Reach Location")
          if(Type == 'SPONSOR'){
            setTimeout(() => {
              this.ISSponsorContacted = false;
            }, 0);
          }

          if(Type=='HANDOVER'){
            setTimeout(() => {
              this.handoverToClose = false;
            }, 0);
          }
        
        }
            
      }
      if(!allFireIsAcceptedFalse){
        if(!this.FireEngineReachedLocation){
          alert("Fire Engine Need to Reach Location")
          if(Type == 'SPONSOR'){
          setTimeout(() => {
            this.handoverToClose = false;
          }, 0);
        }

        if(Type=='HANDOVER'){
          setTimeout(() => {
            this.handoverToClose = false;
          }, 0);
        }
        }
      }
      if(!allIshospitalAcceptedFalse){
        if(!this.AdmitedHospital){
          alert("Hospital Admition Need To Complete")
          if(Type == 'SPONSOR'){
          setTimeout(() => {
            this.ISSponsorContacted = false;
          }, 0);
        }

        if(Type=='HANDOVER'){
          setTimeout(() => {
            this.handoverToClose = false;
          }, 0);
        }
        
        }
      }

      if(!allIsAcceptedAmbulanceFalse){
        if(!this.AmbulanceReachedHospital){
          alert("Ambulance Must Reach Location")
          if(Type == 'SPONSOR'){
          setTimeout(() => {
            this.ISSponsorContacted = false;
          }, 0);
        }

        if(Type=='HANDOVER'){
          setTimeout(() => {
            this.handoverToClose = false;
          }, 0);
        }
        }


      }
    
}
  falseEmergency(event:any){
    this.ISSponsorContacted = false;
    this.handoverToClose = false;
      const allIsAcceptedFalse = this.PoliceStationDetails.every((station:any) => station.IsAccepted === false);
      const allFireIsAcceptedFalse = this.FireStationDetails.every((station:any) => station.IsAccepted === false);
      const allIshospitalAcceptedFalse = this.OtherHospitalDetails.every((station:any) => station.IsAccepted === false);
      const allIsAcceptedAmbulanceFalse = this.AmbulanceDetails.every((station:any) => station.IsAccepted === false);
      
      if(allIsAcceptedFalse&&allFireIsAcceptedFalse&&allIshospitalAcceptedFalse&&allIsAcceptedAmbulanceFalse){
        
      }else{
        alert('Please Check If Any Service is Active , Uncheck And Proceed')
        // this.IsFault = false
        setTimeout(() => {
          this.IsFault = false;
        }, 0);
      }

  }



  closeEmergency(){


    

     if(this.handoverToClose){
      
         if(!this.hadoverPersonName||!this.hadoverPersonName){
          alert("Please Provide Handover Person Details")
          setTimeout(() => {
            this.handoverToClose = false;
          }, 0);
         }
     }
 

     let closeObject =  {
    "IsFault": this.IsFault,
    "HandedOverTo":{"Name":this.hadoverPersonName,
                    "ContactNumber":this.handoverPersonNumber
                  },
    "ISSponsorContacted":this.ISSponsorContacted
  }


let reasonKey:any
let SendObject:any = {}
    if(closeObject.IsFault == 'option2'){
      SendObject.IsFault = true
      reasonKey = 'IsFault'
    }

    if(closeObject.ISSponsorContacted == 'opt'){
      SendObject.ISSponsorContacted = true
      reasonKey = 'ISSponsorContacted'

    }

    if(this.handoverToClose){
      SendObject.HandedOverTo =closeObject.HandedOverTo
      reasonKey = 'HandedOverTo'

    }


    const close: any = {
      "RequestID": this.RequestID,
      "Comments":this.EmergencyCloseComment,
      "Status": "EmergencyClosed",
      "Type": "EmergencyClosed",  
      "EmergencyClosureReason":reasonKey
    }

    let finalObject = { ...close, ...SendObject, };


    this.updateEmergrncyStatus(finalObject)
  }
  changeOfOperator(){
    this.selectedHospital = null;
    this.hideHospitalCommentBox = true
    this.reasonForUncheckHospital = false
  }

  contactedEmergecnyPerson:{ [person: string]: boolean } = {};
  neighbourContacted:{ [person: string]: boolean } = {};
  otherCareManagerAccepted:boolean = true;
  otherHospitalAcceptedMap: { [hospitalName: string]: boolean } = {};
  otherAmbulanceMap: { [AmbulanceName: string]: boolean } = {};
  fireStationInformed: { [firestation: string]: boolean } = {};
  EmergencyContactContacted:{ [contact: string]: boolean } = {};
  PoliceInformedMap:{ [contact: string]: boolean } = {};
  PreferdNearestHospital:{ [contact: string]: boolean } = {};
  PreferdSuperSpecialityHospital:{ [contact: string]: boolean } = {};
  NeighbourAtLocationChecked:{[contact: string]:boolean} = {}

  selectedHospital:any
  updateStatusForCheck(status: any, Type: any, AcceptedBy: any) {

    let IncomingStatus: any
    if (this.isEvent(status)) {
      // Handle event object (specific actions based on your logic)
      IncomingStatus = status.target.value
    } else {
      // Handle string status
      IncomingStatus = status
    }
   
   

    const UpdateObj: any = {
      "RequestID": this.RequestID,
      "Comments": IncomingStatus,
      "Status": IncomingStatus,
      "Type": Type,
      "AcceptedBy": AcceptedBy
    }

    // if(Type == 'CareManagerDetails'){

    //   const allIsAcceptedFalse = this.CareManager.every((station:any) => station.IsAccepted === false);
    //   if(allIsAcceptedFalse){
    //     UpdateObj['Status']  = "Police Station Changed" 
    //   }
    //   UpdateObj['PoliceStationDetails'] = this.PoliceStationDetails
    // }
    if(Type == 'PoliceStationDetails'){

      const allIsAcceptedFalse = this.PoliceStationDetails.every((station:any) => station.IsAccepted === false);
      if(allIsAcceptedFalse){
        UpdateObj['Status']  = "Police Station Rejected" 
      }
      UpdateObj['PoliceStationDetails'] = this.PoliceStationDetails
    }

    if(Type == 'FireStationDetails'){
      const allFireIsAcceptedFalse = this.FireStationDetails.every((station:any) => station.IsAccepted === false);
      if(allFireIsAcceptedFalse){
        UpdateObj['Status']  = "Fire Station Rejected" 
      }
      UpdateObj['FireStationDetails'] = this.FireStationDetails
    }
    if(Type == 'OtherHospitalDetails'){
      const allIshospitalAcceptedFalse = this.OtherHospitalDetails.every((station:any) => station.IsAccepted === false);
      if(allIshospitalAcceptedFalse){
        UpdateObj['Status']  = "Hospital Rejected" 
      }
      UpdateObj['OtherHospitalDetails'] = this.OtherHospitalDetails
    }
    if(Type == 'AmbulanceDetails'){
      const allIsAcceptedAmbulanceFalse = this.AmbulanceDetails.every((station:any) => station.IsAccepted === false);
      if(allIsAcceptedAmbulanceFalse){
        UpdateObj['Status']  = "Ambulance Rejected" 
      }
      UpdateObj['AmbulanceDetails'] = this.AmbulanceDetails
    }


    

    this.updateEmergrncyStatus(UpdateObj) // passing above object to Api by this 

  }

  ToNumber: any
  callinInitiating(toPhoneNumber: number, contactPerson: string) {
   
    this.callStatus1 = ''
    this.callStatus2 = ''

    this.ToNumber = toPhoneNumber
    const ContactDetailObject = {
      "RequestID": this.RequestID,
      "fromPhoneNumber": this.FromCall,
      "toPhoneNumber": toPhoneNumber,
      "contactPerson": contactPerson,
      "CallType": "Emergency"
    }

    this.callingFunction(ContactDetailObject)

  }
 
  handoverBox:boolean = false 
  hadoverPersonName:any
  handoverPersonNumber:any
  IsFault:any
  ISSponsorContacted:any

  toggleInputs(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.handoverBox = checkbox.checked;
  }

  acceptedDedicatedCareManager(details:any){
  
    let Selected:any = {
      "AcceptedPersonID":details.EmployeeID,
      "AcceptedPersonName": details.FirstName+''+details.LastName ,
      "MobileNumber":details.ContactNumber,
      "RequestID":this.RequestID,
      "Status": "CareManager Accepted",
      "Comments": "care manager accepted",
      "Type": "SPOCDetails",
      "Role": "CareManager"
    } 
    this.updateEmergrncyStatus(Selected)  
  }


  copyAddressToClipboard(hospital: any) {
    const address = hospital?.Address;
    if (address) {
      navigator.clipboard.writeText(address).then(() => {
      }, (err) => {
      });
    }
  }


  SelectedServiceArea(ServiceAreaID: any) {
    this.changeOfServiceAreaId = ServiceAreaID.target.value
  }

  callRecordID:any
  CallingBox:boolean = false
  callingFunction(obj:any) {

    this.userservice.EmergencyCalling(obj).subscribe((statusUpdate: any) => {
      if (statusUpdate.code == "S001") {
        
        this.CallingBox = true
        this.callRecordID = statusUpdate.data.CallID
     
        if(this.callRecordID != undefined || this.callRecordID != null){
          this.callResponses()
        }

      } else if (statusUpdate.code == "PD01") {
        alert(statusUpdate.data)
      } else {
        alert(statusUpdate.message)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }


  // test() {
    //   setInterval(() => {
    //    this.callResponses()
    //   }, 3000)
    // }


  callResponses(){

    this.userservice.kaleraCallId(this.callRecordID).subscribe((statusUpdate: any) => {
      if (statusUpdate.code == "S001") {
      } else if (statusUpdate.code == "PD01") {
        alert(statusUpdate.data)
      } else {
        alert(statusUpdate.message)
      }
    }, (error) => {
      alert(error.error.data)
    }) 


  }
  cityDetails() {
    this.userservice.cityApi().subscribe((response) => {

      if (response.code == 'S001') {
        this.cityData = response.data
      } else {
        alert(response.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }

  // this is for careManager details 
  GetEmployee() {
    let EmpParmas: any = {}

    EmpParmas.Type = "FieldEmployee";
    if (this.changeOfServiceAreaId != '') {
      EmpParmas.ServiceAreaID = this.changeOfServiceAreaId
    } else {
      EmpParmas.ServiceAreaID = this.ServiceAreaID;
    }


    this.userservice.GetEmployees(EmpParmas).subscribe((Response) => {

      if (Response.code == "S001") {
        this.CareManagersList = Response.data

      } else {
        alert(Response.message)
      }
    }, (error) => {
      alert(error.error.message)
    })
  }

  getAmbulanceTypes() {
    this.userservice.ambulanceType().subscribe((response: any) => {
      if (response.code == "S001") {
        this.ambulanceList = response.data
      } else if (response.code == "PD01") {
        alert(response.data)
      } else {
        alert(response.message)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }

  // this is for login person details 
  employeeData() {
    this.userservice.individualEmployeeDetails(this.EmpId).subscribe((response: any) => {
      if (response.code == "S001") {

        this.FromCall = response.data[0].ContactNumber

      } else if (response.code == "PD01") {
        alert(response.data)
      } else {
        alert(response.message)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }



  addOtherCareManager(EmpolyeDetails:any){

    const empId = EmpolyeDetails.target.value
    let selectedManager = this.CareManagersList.filter((data: any) => {
      if (data.EmployeeID == empId) {
        return data
      }
    })
    selectedManager = selectedManager[0]
    let careManager = {
      "PersonType": 'Other Care Manager',
      "EmployeeID": selectedManager.EmployeeID,
      "EmployeeName": selectedManager.FirstName + ' ' + selectedManager.LastName,
      "MobileNumber": selectedManager.ContactNumber,
      "Contacted": false
    }

    this.CareManager.push(careManager)

     let CmUpdate = {
      "RequestID": this.RequestID,
      "Type": "CareManagerDetails",
      "Status": "Other CareManager Assigned",
      "EmployeeID": selectedManager.EmployeeID,
      "CareManagerDetails":this.CareManager
     }

     this.updateEmergrncyStatus(CmUpdate)


  }

  AssignCareManager(EmpId: any) {

    const empId = EmpId.target.value
    let selectedManager = this.CareManagersList.filter((data: any) => {
      if (data.EmployeeID == empId) {
        return data
      }
    })
    selectedManager = selectedManager[0]
   

    let CaremanagerDetails = {
      // "RequestID": this.RequestID,
      // "Type": "CareManagerDetails",
      // "EmployeeID": selectedManager.EmployeeID,
      // "EmployeeName": selectedManager.FirstName + '' + selectedManager.LastName,
      // "MobileNumber": selectedManager.ContactNumber,
      // "Status": "Other CareManager Assigned"
      "AcceptedPersonID":selectedManager.EmployeeID,
      "AcceptedPersonName": selectedManager.FirstName+' '+selectedManager.LastName ,
      "MobileNumber":selectedManager.ContactNumber,
      "RequestID":this.RequestID,
      "Status": "CareManager Accepted",
      "Comments": "care manager accepted",
      "Type": "SPOCDetails",
      "Role": "CareManager",
      "AcceptedBy":selectedManager.FirstName+' '+selectedManager.LastName



    }





    this.updateEmergrncyStatus(CaremanagerDetails)

  }

  CustomerHealthPlanDetailsPage() {

    // this.route.navigate(["Dashboard/Emergencyplan"], { queryParams: { CustID: this.emergencyHealthMainOBject.CustID, CustRecID: this.emergencyHealthMainOBject.CustRecID, type:"completeemergencyplan" } })
    let url = `/Dashboard/Emergencyplan?CustID=${this.emergencyHealthMainOBject.CustID}&CustRecID=${this.emergencyHealthMainOBject.CustRecID}&type="completeemergencyplan"`;
    window.open(url, '_blank');
  }

  // UpdateStatusAPI 
  IncomingStatusMainObject: any
  AcceptedCustomerDetails: any
  AcceptedSponsorDetails: any
  AcceptedotherBenficiaryDetails: any
  AcceptedNeighbour: any
  AcceptedEmergencyPerson: any
  AcceptedCareManager: any
  AcceptedPreferredEmergencyHospitalsObj: any
  AcceptedNearestSuperSpecialityHospitalsObj: any
  AcceptedEmergencyLocalContact: any
  IncomingIncidentLocationDetails: any
  PoliceAcceptedObj: any
  FireObj: any
  UpdateOtherHospitalDetails: any
  OtherAmbulanceprovider: any
  AcceptedAmbulance: any
  updateEmergrncyStatus(Update: any) {

    this.userservice.emergencyStatusUpdate(Update).subscribe((statusUpdate: any) => {
      if (statusUpdate.code == "S001") {

        this.customerEmergencyHealthData()
        //reseting the forms
        this.OtherAmbulanceForm?.reset()
        this.ambulanceDriverDetails?.reset()
        this.incidentLocationAddress?.reset()
        this.OtherHospitalForm?.reset()
        this.incidentLocationForm?.reset()
        this.policeForm?.reset()
        this.fireForm?.reset()
             for(let note in this.comments){
                      this.comments[note] = ''
             }

      
      } else if (statusUpdate.code == "PD01") {
        alert(statusUpdate.data)
      }else if(statusUpdate.code == "S002"){
           
          alert(statusUpdate.data)
        
      } else {
        alert(statusUpdate.message)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }


isCheckedOfStatus(){

    for(let police of this.emergencyHealthMainOBject.PoliceStation){
           if(police.IsAccepted == true){
            this.PoliceAcceptedObj = police
           }
    }

    for(let fire of this.emergencyHealthMainOBject.FireStation){
      if(fire.IsAccepted == true){
        this.FireObj = fire
      }
    }

    for(let hospital of this.emergencyHealthMainOBject.OtherHospitalDetails){
      if(hospital.IsAccepted == true){
        this.AcceptedPreferredEmergencyHospitalsObj = hospital
      }
    }

    for(let ambulance of this.emergencyHealthMainOBject.AmbulanceDetails){
      if(ambulance.IsAccepted == true){
        this.AcceptedAmbulance = ambulance
      }
    }


}


  SwitchFunctionToBindIncomingStatus(array: any) {
    array.forEach((str: any) => {
      switch (str) {
        // case 'PoliceStationRejected':
        //   this.policeInformedClr = false
        //   this.policeReachedLocationClr = false
        //   break;
        case 'CareManagerAccepted':
          this.CareManagerAccepted = true;
          this.carmangerAccepted = true
          this.cmAtLocation = false
          this.cmAtHospital = false
          break;
        case 'CareManagerReachedLocation':
          this.CareManagerReachedLocation = true
          this.carmangerAccepted = false
          this.cmAtLocation = true
          this.cmAtHospital = false
          break;
        case 'CareManagerReachedHospital':
          this.CareManagerReachedHospital = true
          this.carmangerAccepted = false
          this.cmAtLocation = false
          this.cmAtHospital = true
          break;
        case 'CustomerContactedCareManager':
          this.CustomerContactedCareManager = true
          break;
        case 'AmbulanceAccepted':
          this.AmbulanceAccepted = true
          this.ambAccepted = true
          this.ambReachedLocation = false
          this.ambReachedHospital = false
          break;
        case 'AmbulanceReachedLocation':
          this.AmbulanceReachedLocation = true
          this.ambAccepted = false
          this.ambReachedLocation = true
          this.ambReachedHospital = false
          break;
        case 'AmbulanceReachedHospital':
          this.AmbulanceReachedHospital = true
          this.ambAccepted = false
          this.ambReachedLocation = false
          this.ambReachedHospital = true
          break;
        case 'ContactedHospital':
          this.ContactedHospital = true
          break;
        case 'ReachedHospital':
          this.ReachedHospital = true
          this.hospitalAcceptClr = false
          this.hospitalReachedClr = true
          this.hospitalAdmitCompleteClr = false
          break;
        case 'ContactedHospital':
          this.ContactedHospital = true
          break;
        case 'InformedPolice':
          this.InformedPolice = true
          this.policeInformedClr = true
          this.policeReachedLocationClr = false
          break;
        case 'PoliceReachedLocation':
          this.PoliceReachedLocation = true
          this.policeInformedClr = false
          this.policeReachedLocationClr = true
          break;
        case 'FiledFir':
          this.FiledFir = true
          break;
        case 'InformedFireStation':
          this.InformedFireStation = true
          this.fireInformedClr = true
          this.fireEngienReachedLocationClr = false
          break;
        case 'FireEngineReachedLocation':
          this.FireEngineReachedLocation = true
          this.fireInformedClr = false
          this.fireEngienReachedLocationClr = true
          break;
        case 'CustomerContacted':
          this.CustomerAccepted = true
          break;
        case 'SponsorContacted':
          this.SponsorAccepted = true
          break;
        case 'BeneficiaryContacted':
          this.benficiaryAccepted = true
          break;
        case 'NeighbourContacted':
          this.NeighbourAccepted = true
          break;
        case 'EmergencyContactContacted':
          this.EmergencyContactAccepted = true
          break;
        case 'PreferredHospitalAccepted':
          this.PreferredHospitalAccepted = true
          this.hospitalAcceptClr = true
          this.hospitalReachedClr = false
          this.hospitalAdmitCompleteClr = false
          break;
        case 'PreferredSpecialityHospitalAccepted':
          this.PreferredHospitalAccepted = true
          this.PreferredSpecialityHospitalAccepted = true
          this.hospitalAcceptClr = true
          this.hospitalReachedClr = false
          this.hospitalAdmitCompleteClr = false
          break;
        case 'SponsorAtLocation':
          this.SponsorAtLocation = true
          break;
        case 'BeneficiaryAtLocation ':
          this.benficiaryAtLocation = true
          break;
        case 'NeighbourAtLocation':
          this.NeighbourAtLocation = true
          break;
        case 'EmergencyContactAtLocation':
          this.EmergencyContactAtLocation = true
          break;
        case 'HospitalAccepted':
          this.OtherHospitalAccepted = true
          this.hospitalAcceptClr = true
          this.hospitalReachedClr = false
          this.hospitalAdmitCompleteClr = false
          break;
        case 'AmbulanceAccepted':
          this.OtherAmbulanceAccepted = true
          this.ambAccepted = true
          this.ambReachedLocation = false
          this.ambReachedHospital = false
          break;
        case 'AdmitedHospital':
          this.AdmitedHospital = true
          this.hospitalAcceptClr = false
          this.hospitalReachedClr = false
          this.hospitalAdmitCompleteClr = true
          break;
        case 'OtherCareManagerAssigned':
          
        this.carmangerAccepted = true
        this.cmAtLocation = false
        this.cmAtHospital = false
         break ;
    

      }
    });
  }

 

  findingAcceptedDetailsfromStatusTrack(details:any){
    details.filter((data:any)=>{
      if(data.Type =='CustomerRelated'){
       if(data.AcceptedBy == this.emergencyPersonDetails?.Name){
           this.AcceptedCustomerDetails = this.emergencyPersonDetails
        }
        if(data.AcceptedBy == this.sponserObj?.Name){
         this.AcceptedSponsorDetails = this.sponserObj
        }
        if(data.AcceptedBy == this.otherBenficiary?.Name){
         this.AcceptedotherBenficiaryDetails = this.otherBenficiary
        }

        if(data.Status == "EmergencyContact Contacted"){

          for(let key of this.CustomerHealthPlanDetails?.EmergencyLocalContactDetails){

              if(data.AcceptedBy == key.Name){
                this.EmergencyContactContacted[key.Name] = true
                
              }
         }  
     }
     

         if(data.Status == "EmergencyContact At Location"){
           for(let key of this.CustomerHealthPlanDetails?.EmergencyLocalContactDetails){
             if(data.AcceptedBy == key.Name){
                 this.AcceptedEmergencyLocalContact = key
                 this.contactedEmergecnyPerson[key.Name] = true
             }
        } 
       }
      }


       if(data.Type == 'Customer'){

        if(data.Status == "Neighbour Accepted"){
          for(let key of this.CustomerHealthPlanDetails?.Neighbours){
              if(data.AcceptedBy == key.Name){
                  // this.AcceptedNeighbour = key
                  this.neighbourContacted[key.Name]= true
              }
         }  
     }
    
     if(data.Status == "Neighbour Contacted"){
    
      for(let key of this.CustomerHealthPlanDetails?.Neighbours){
          if(data.AcceptedBy == key.Name){
              // this.AcceptedNeighbour = key
              this.neighbourContacted[key.Name]= true
          }
     }  
    }
    
             if(data.Status == "Neighbour At Location"){
                  for(let key of this.CustomerHealthPlanDetails?.Neighbours){
                      if(data.AcceptedBy == key.Name){
                          this.AcceptedNeighbour = key
                          this.NeighbourAtLocationChecked[key.Name]=true
                      }
                 }  
             }


       }




      if(data.Type =='CareManager'){

       if(data.Status == "CareManager Accepted"){
          for(let details of this.emergencyHealthMainOBject?.CareManagerDetails){
              if(data.AcceptedBy == details.FirstName){
                  this.AcceptedCareManager = details
              }    
          }
       }

       if(data.Status == "Other CareManager Assigned"){

        this.AcceptedCareManager = this.emergencyHealthMainOBject?.CareManager
                this.otherCareManagerAccepted = true
        // for(let details of this.emergencyHealthMainOBject?.CareManager){
        //     if(data.AcceptedBy == details.EmployeeName){
                

        //     }    
        // }
     }


      }
      if(data.Type =='Ambulance'){
        if(data.Status =="Ambulance_Not_Required"){
          this.isClicked=true;
        }

        if(data.Status == "Other Ambulance Accepted"){

          for(let keys of this.emergencyHealthMainOBject?.AmbulanceDetails){
            if(data.AcceptedBy == keys.ContactName){

                 this.AcceptedAmbulance = keys
                 this.otherAmbulanceMap[keys.ContactName]= true
            }
          }
         }
      }
      if(data.Type =='Police'){
        if(data.Status =="Police_Not_Required"){
          this.disablePolice=true;
        }
       if(data.Status == 'InformedPolice'){
            for(let keys of this.CustomerHealthPlanDetails?.PoliceStations){
             if(data.AcceptedBy == keys.Name){
               this.PoliceAcceptedObj = keys
               this.PoliceInformedMap[keys?.Name] = true
           }  
            }
        }
        if(data.Status == 'Police Reached Location'){
         this.policeInformedClr = false 
         this.policeReachedLocationClr = true
        }
      }
      if(data.Type =='FireStation'){
        if(data.Status =="FireStation_Not_Required"){
          this.disableFire=true;
        }
           for(let keys of this.CustomerHealthPlanDetails?.FireStations){
             if(data.AcceptedBy == keys.Name){
               this.FireObj = keys
               this.fireStationInformed[keys?.Name] = true
           }
           }
      }
      if(data.Type =='Hospital'){
        if(data.Status =="Hospital_Not_Required"){
          this.disableHospital=true;
        }

       if(data.Status == "Preferred Hospital Accepted"){

             for(let keys of this.CustomerHealthPlanDetails?.PreferredEmergencyHospitals){

               if(data.AcceptedBy == keys.Name){
                    this.AcceptedPreferredEmergencyHospitalsObj = keys
                   this.PreferdNearestHospital[keys.Name]= true
               }
             }
       }

       if(data.Status == "Preferred Speciality Hospital Accepted"){

         for(let keys of this.CustomerHealthPlanDetails?.NearestSuperSpecialityHospitals){

           if(data.AcceptedBy == keys.Name){
                this.AcceptedPreferredEmergencyHospitalsObj = keys
                this.PreferdSuperSpecialityHospital[keys.Name] = true

                // AcceptedNearestSuperSpecialityHospitalsObj    need to remove this declaration 
           }

         }
        }

        if(data.Status == "OtherHospital Accepted"){
          for(let keys of this.emergencyHealthMainOBject?.OtherHospitalDetails){
            if(data.AcceptedBy == keys.OtherHospitalName){
                 this.AcceptedPreferredEmergencyHospitalsObj = keys
                 this.otherHospitalAcceptedMap[keys.OtherHospitalName] = true
                 // AcceptedNearestSuperSpecialityHospitalsObj    need to remove this declaration 
            }
          }
         }

      }      
  })


   }
}
