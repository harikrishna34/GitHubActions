import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-update-configration-from',
  templateUrl: './update-configration-from.component.html',
  styleUrls: ['./update-configration-from.component.css']
})
export class UpdateConfigrationFromComponent implements OnInit {
  // public control: FormArray|undefined ;
  RegistrationForm: boolean = true
  thresholdformtab: boolean = false
  whiteListFormTab: boolean = false
  OthersFormTab: boolean = false
  CustomersList: any
  keyword: any = "Name"
  CustRecID: any
  benficiaryarray: any = []
  benficiaryinput: boolean = false
  ContactsForm: UntypedFormGroup
  submitContact: boolean = false
  contactsArray: any = []
  Devices: any = []
  configurationForm: UntypedFormGroup
  SponserID: any
  Model: any = []
  Submit: boolean = false
  thresholdarray: any = []
  thresholdForm: UntypedFormGroup
  VitalType: any = []
  addVitals: boolean = false
  ThresholdFormData: UntypedFormGroup
  CustomerID: any
  ConfigSequence: any
  DeviceID: any
  WhiteListFormData: UntypedFormGroup
  othersForm: UntypedFormGroup
  ModelName: any
  incomingConfiguration: boolean = false
  RegisterDevice: boolean = false
  ThresholdLimits: boolean = false
  WhitelistContacts: boolean = false
  Others: boolean = false
  submitOthers: boolean = false
  maxdate = new Date()
  minIsGreaterThanMax: boolean
  tMinvalue: any
  tMaxvalue: any
  SpID: any
  minInputValue: any
  maxInputValue: any
  geoKey: boolean
  geoInputFieldsTab: boolean
  geoKeysChecked: any
  goals: any = []
  updateGoalBtn: boolean = false
  addGoalsBtn: boolean = true
  OthersObject: any = {}
  NotificationRequired: UntypedFormGroup

  DeviceModelId: any

  constructor(private spinner: NgxSpinnerService, private userservice: UsersService, private activatedRoute: ActivatedRoute, private route: Router, private formBuilder: UntypedFormBuilder) {
  }
  ngOnInit(): void {
    this.allcustomers()
    this.contactsForm()
    this.devices()
    this.configurationform()
    this.vitalsForm()
    this.thresholdValues()
    this.whitelistFunction()
    this.othersFunction()
    this.NotificationRequired = this.formBuilder.group({
      'IsNotificationRequried': ['']
    })
  }
  configurationform() {
    this.configurationForm = this.formBuilder.group({
      "DeviceID": [''],
      "Model": [''],
      "IMEINumber": ['', [Validators.minLength(15)]],
      "SponsorID": [''],
      "CustomerID": [''],
      "SIMNumber": ['', [Validators.minLength(10)]],
      "DOB": [''],
      "EmergencyPointOfContactNumber": ['', [Validators.minLength(10)]],
      "IsDementia": [''],
      "ConfigSequence": [''],
      "GeofenceLatitude": [''],
      "GeofenceLongitude": [''],
      "GeofenceRadius": ['']
    })
  }
  vitalsForm() {
    this.thresholdForm = this.formBuilder.group({
      VitalType: [''],
      MinValue: [''],
      MaxValue: ['']
    })
  }
  validateThreshold() {
    let maxInputValue = this.thresholdForm.get('MaxValue')?.value;
    let minInputValue = this.thresholdForm.get('MinValue')?.value;
    maxInputValue = parseInt(maxInputValue)
    minInputValue = parseInt(minInputValue)
    if (maxInputValue > minInputValue) {
      // Clear the error if the condition is satisfied
      this.thresholdForm.get('MaxValue')?.setErrors(null);
    } else {
      // Set the error if the condition is not satisfied
      this.thresholdForm.get('MaxValue')?.setErrors({ minIsGreaterThanMax: true });
    }
  }
  thresholdValues() {
    this.ThresholdFormData = this.formBuilder.group({
      ThresholdLimits: ['']
    })
  }
  whitelistFunction() {
    this.WhiteListFormData = this.formBuilder.group({
      WhitelistContacts: []
    })
  }
  regitationTab() {
    this.RegistrationForm = true
    this.thresholdformtab = false
    this.whiteListFormTab = false
    this.OthersFormTab = false
  }
  thresholdTab() {
    this.RegistrationForm = false
    this.thresholdformtab = true
    this.whiteListFormTab = false
    this.OthersFormTab = false
  }
  OtherTab() {
    this.RegistrationForm = false
    this.thresholdformtab = false
    this.whiteListFormTab = false
    this.OthersFormTab = true
  }
  whitlistTab() {
    this.RegistrationForm = false
    this.thresholdformtab = false
    this.whiteListFormTab = true
    this.OthersFormTab = false
  }
  asersdashboard() {
    this.route.navigate(['Dashboard/asers/asersdashboard'])
  }
  selectEvent(event: any) {
    // this.customerDetails(event.CustRecID,'sponser')
    console.log("changesDone")
    this.CustRecID = event.CustRecID
    if (this.CustRecID.length > 0) {
      this.benficiaryinput = true
    } else {
      this.configurationForm.patchValue({ CustomerID: '' })
    }
    this.benficieraydata()
  }
  onChangeSearch(event: any) {

  }
  onFocused(event: any) {
    // this.benficiaryarray = ''
    // this.configurationForm.patchValue({CustomerID:''})
    console.log("onfocuse Input cleard")
    this.configurationForm.reset()
    this.CustRecID = event?.CustRecID
    this.benficiaryinput = false
  }
  devices() {
    this.userservice.allElectronicDevices().subscribe((devicelist) => {
      
      // this.VitalType = this.Devices[0].Features
      if (devicelist.code == "S001") {

        this.Devices = devicelist.data 

        this.spinner.hide();
      } else if (devicelist.code == "PD01") {
        alert(devicelist.data)
        this.spinner.hide();
      } else {
        this.spinner.hide();
        alert(devicelist.message)
      }
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })
  }
  allcustomers() {
    this.userservice.customerlist().subscribe((userlist) => {
      if (userlist.code == "S001") {
        this.CustomersList = userlist.data.filter((customers: any) => {
          if (customers.EmergencyPlan == "Active") {
            return customers
          }
        });
        this.spinner.hide();
      } else if (userlist.code == "PD01") {
        alert(userlist.data)
        this.spinner.hide();
      } else {
        this.spinner.hide();
        alert(userlist.message)
      }
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })
  }
  benficieraydata() {
    this.userservice.viewUserDetails({ "CustRecID": this.CustRecID }).subscribe((userlist) => {
      if (userlist.code == "S001") {
        this.benficiaryarray = userlist.data.customer.Beneficiaries
        this.spinner.hide();
      } else if (userlist.code == "PD01") {
        alert(userlist.data)
        this.spinner.hide();
      } else {
        this.spinner.hide();
        alert(userlist.message)
      }
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })
  }
  customerDetails(event: any, type: any) {
    // if(type == 'benficiary'){
    let CustomerID = event.target.value
    this.CustomerID = event.target.value
    // this.getCustomerConfiguration(CustomerID)
    // }else{
    //   let ID  = event
    //   this.CustomerID = event
    //   // this.getCustomerConfiguration(ID)
    // }

  }
  getCustomerConfiguration(CustomerID: any, modelId: any) {

    this.userservice.configrationDetails(CustomerID, modelId).subscribe((userlist) => {
      if (userlist.code == "S001") {
        this.incomingConfiguration = true
        var deviceDetails = userlist.data
        if (deviceDetails.UserDetails.IsDementia) {
          this.geoInputFieldsTab = true
        } else {
          this.geoInputFieldsTab = false
        }
        this.configurationForm.patchValue({ 'DeviceID': deviceDetails.DeviceDetails.DeviceID })
        this.configurationForm.patchValue({ 'Model': deviceDetails.DeviceDetails.Model })
        this.configurationForm.patchValue({ 'IMEINumber': deviceDetails.DeviceDetails.IMEINumber })
        this.configurationForm.patchValue({ 'SponsorID': deviceDetails.SponsorID })
        this.configurationForm.patchValue({ 'SIMNumber': deviceDetails.DeviceDetails.SIMNumber })
        this.configurationForm.patchValue({ 'DOB': deviceDetails.UserDetails.DOB })
        this.configurationForm.patchValue({ 'EmergencyPointOfContactNumber': deviceDetails.UserDetails.EmergencyPointOfContactNumber })
        this.configurationForm.patchValue({ 'IsDementia': deviceDetails.UserDetails.IsDementia })
        this.configurationForm.patchValue({ 'GeofenceLatitude': deviceDetails.UserDetails.GeofenceLatitude })
        this.configurationForm.patchValue({ 'GeofenceLongitude': deviceDetails.UserDetails.GeofenceLongitude })
        this.configurationForm.patchValue({ 'GeofenceRadius': deviceDetails.UserDetails.GeofenceRadius })
        this.ModelName = deviceDetails.DeviceDetails.Model
        this.SpID = deviceDetails.UserDetails.SponsorID
        this.ConfigSequence = deviceDetails.ConfigSequence
        this.goals = deviceDetails.Goals
        this.thresholdarray = deviceDetails.ThresholdLimits
        this.contactsArray = deviceDetails.Whitelisted_Contacts
        this.goals = deviceDetails.Goals
        this.NotificationRequired.patchValue({ 'IsNotificationRequried': deviceDetails.IsNotificationRequried })
        this.spinner.hide();
      } else if (userlist.code == "PD01") {
        // alert(userlist.data)
        this.spinner.hide();
      } else if (userlist.code == "ND01") {
        // alert(userlist.data)
        this.spinner.hide();
        // this.configurationForm.patchValue({ IMEINumber: '' })
        this.configurationForm.patchValue({ SIMNumber: '' })
        this.configurationForm.patchValue({ DOB: '' })
        this.configurationForm.patchValue({ EmergencyPointOfContactNumber: '' })
        this.configurationForm.patchValue({ IsDementia: '' })
        // if (this.configurationForm.value != '') {
        // this.configurationForm.get('IMEINumber').value = ''
        //   this.configurationForm.get('DeviceID')?.reset()
        //   this.configurationForm.get('SIMNumber')?.reset()
        //   this.configurationForm.get('DOB')?.reset()
        //   this.configurationForm.get('EmergencyPointOfContactNumber')?.reset()
        //   this.configurationForm.get('IsDementia')?.reset()
        this.othersForm.reset()
        this.ModelName = ''
        this.CustomerID = ''
        this.ConfigSequence = ''
        this.thresholdarray = ''
        this.contactsArray = ''
        // }
      } else {
        this.spinner.hide();
        alert(userlist.message)
      }
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })
  }
  contactsForm() {
    this.ContactsForm = this.formBuilder.group({
      Name: [''],
      ContactNumber: ['', [Validators.minLength(10)]]
    })
  }
  othersFunction() {
    this.othersForm = this.formBuilder.group({
      "GoalType": [''],
      "GoalTimeframe": [''],
      'GoalValue': [''],
    })
  }
  checkNumberFieldLength(elem: any) {
    if (elem.target.value.length > 9) {
      elem.target.value = elem.target.value.slice(0, 1);
    }
  }
  addContact() {
    this.submitContact = true
    if (this.ContactsForm.status == 'INVALID') {
    } else {
      this.contactsArray.push(this.ContactsForm.value)
      this.ContactsForm.reset()
    }
  }
  deleteContact(contact: any) {
    this.contactsArray.splice(contact, 1)
  }
  selectedModel(event: any) {
    this.DeviceModelId = event.target.value
    let id = event.target.value


      for(let deviceid of this.Devices){
                if(id == deviceid.DeviceID && deviceid.Model=="6-in-1" ){
                   console.log("perfomance")
                   const devicename = "6IN1"
                   if (this.CustomerID == '' || this.CustomerID == undefined) {
                         this.configurationForm.patchValue({'IMEINumber':devicename+this.CustRecID})
                   }else{
                         this.configurationForm.patchValue({'IMEINumber':devicename+this.CustRecID})
                   }
                }
      }
    


    
    if (this.CustomerID == '' || this.CustomerID == undefined) {
      this.getCustomerConfiguration(this.CustRecID, this.DeviceModelId)
    } else {
      this.getCustomerConfiguration(this.CustomerID, this.DeviceModelId)

    }

    this.Model = this.Devices.filter((data: any) => {
      if (data.DeviceID == id) {
        return data
      }
    })
   const extraVital:any = ['Hypertension','Hypotension']
   let  DeviceVitals:any = []
     DeviceVitals = this.Devices.filter((feature:any)=> { 
      if (feature.DeviceID == id) {
        for(let extraFeature of extraVital){
            feature.Features.push({'Feature':extraFeature, 'Type': 'Device'})
          }
          return feature
      }
     });
    
     this.VitalType = DeviceVitals[0].Features.filter((feature:any) =>{
       if(feature.Type === "Device"&&feature.Feature!="BloodPressure"){
           return feature
       }
     });
  }

  selectedVitalValidation(event:any){

    const selectedvital = event.target.value
    const MinInput:any = this.thresholdForm.get('MinValue');
    const MaxInput:any = this.thresholdForm.get('MaxValue');
        console.log("error",this.thresholdForm.get('MaxValue')?.hasError)
        console.log("validation of vital",event.target.value)
        if (selectedvital == 'Temperature') {
          // Add or update validation rules for 'Screen' type
          MinInput.setValidators([
            Validators.required,
            Validators.pattern('^[0-9]+$'),
          ]);
        }
  }
  thresholdDataAdd() {
    this.addVitals = true
    // if (this.thresholdForm.status == 'INVALID') {
    // } else {
    //   if (this.thresholdarray.some((limit: any) => limit.VitalType === this.thresholdForm.value.VitalType)) {
    //     alert('already exists ...');
    //   } else {
        this.thresholdarray.push(this.thresholdForm.value);
        this.thresholdForm.reset()
    //   }
    // }
  }




  AsersConfiguration(type: any) {

    this.Submit = true
    if (this.configurationForm.status == 'INVALID') {
    } else {
      if (type == 'RegisterDevice') {
        this.RegisterDevice = true
        this.configurationForm.value.Type = type
        // this.configurationForm.value.Model = this.ModelName
        // this.configurationForm.value.SponsorID = this.SponsorID
        if (this.incomingConfiguration) {
          this.configurationForm.value.SponsorID = this.SpID
        } else {
          this.configurationForm.value.SponsorID = this.CustRecID
        }
        if (this.incomingConfiguration) {
          this.configurationForm.value.Model = this.ModelName
        } else {
          this.configurationForm.value.Model = this.Model[0]?.Model
        }
        if (this.configurationForm.value.IsDementia == null) {
          this.configurationForm.value.IsDementia = false
        }

        if (this.configurationForm.value.IsDementia == '') {
          delete this.configurationForm.value.GeofenceLatitude
          delete this.configurationForm.value.GeofenceLongitude
          delete this.configurationForm.value.GeofenceRadius
        }

        if (this.configurationForm.value.CustomerID == '') {

          this.configurationForm.value.CustomerID = this.CustRecID
        }

        this.configurationForm.value.ConfigSequence = this.ConfigSequence
        this.newWatchConfiguration(this.configurationForm.value)
        this.RegistrationForm = false
        this.thresholdformtab = true
      }
    }
  }
  SubmitThresholdValues(type: any) {
    if (type == 'ThresholdLimits') {

      this.ThresholdLimits = true
      this.ThresholdFormData.value.Type = type
      if (this.CustomerID == '' || this.CustomerID == undefined) {
        this.ThresholdFormData.value.CustomerID = this.CustRecID
      } else {
        this.ThresholdFormData.value.CustomerID = this.CustomerID
      }

      this.ThresholdFormData.value.ConfigSequence = this.ConfigSequence
      this.ThresholdFormData.value.ThresholdLimits = this.thresholdarray
      this.ThresholdFormData.value.DeviceID = this.DeviceID


      this.newWatchConfiguration(this.ThresholdFormData.value)
    }
  }
  WhiteListedConfiguration(type: any) {
    if (type == 'WhitelistContacts') {
      this.WhitelistContacts = true
      this.WhiteListFormData.value.Type = type
      if (this.CustomerID == '' || this.CustomerID == undefined) {
        this.WhiteListFormData.value.CustomerID = this.CustRecID
      } else {
        this.WhiteListFormData.value.CustomerID = this.CustomerID
      }

      this.WhiteListFormData.value.ConfigSequence = this.ConfigSequence
      this.WhiteListFormData.value.WhitelistContacts = this.contactsArray
      this.WhiteListFormData.value.DeviceID = this.DeviceID
      this.newWatchConfiguration(this.WhiteListFormData.value)
    }
  }
  SubmitOthers(type: any) {
    this.submitOthers = true

    if (type == 'Others') {
      this.Others = true
      this.OthersObject.Type = type
      if (this.CustomerID == '' || this.CustomerID == undefined) {
        this.OthersObject.CustomerID = this.CustRecID
      } else {
        this.OthersObject.CustomerID = this.CustomerID
      }
      this.OthersObject.ConfigSequence = this.ConfigSequence
      this.OthersObject.DeviceID = this.DeviceID
      this.OthersObject.Goals = this.goals

      if (this.NotificationRequired.value.IsNotificationRequried == '') {
        this.OthersObject.IsNotificationRequried = false
      } else {
        this.OthersObject.IsNotificationRequried = true

      }

      // this.othersForm.value.Type = type
      // this.othersForm.value.CustomerID = this.CustomerID
      // this.othersForm.value.ConfigSequence = this.ConfigSequence
      // this.othersForm.value.DeviceID = this.DeviceID
      this.newWatchConfiguration(this.OthersObject)
    }

  }



  geoFields(event: any) {

    this.geoKeysChecked = event
    if (event) {
      this.geoInputFieldsTab = true
    } else {
      this.geoInputFieldsTab = false
    }
  }
  GoalArray:any = []
  AddGoals() {
    this.submitOthers = true
    //  if (this.goals?.some((limit: any) => limit.GoalType === this.othersForm.value.GoalType)) {
    //    alert('already exists ...');
    //  } else {
    // if(this.othersForm.value.Hypotension == null ||this.othersForm.value.Hypotension == ' '){
    //   delete this.othersForm.value.Hypotension
    //   console.log("othersForm",this.othersForm.value)
     this. GoalArray.push(this.othersForm.value)
      this.goals = this.GoalArray
    // }else{
      
    //   console.log("othersForm else",this.othersForm.value)
    //   let Hypertention = this.othersForm.value.GoalValue
    //   let Hypotension = this.othersForm.value.Hypotension
    //   let Bp = Hypertention+'/'+Hypotension
    //   console.log("BP",Bp)
    //   this.othersForm.value.GoalValue = Bp
    //   this.GoalArray.push(this.othersForm.value)
    //   this.goals = this.GoalArray

    // }
    
     this.othersForm.reset()
    //  }
  }

  goalIndex: any
  editGoals(goal: any, index: any) {
    this.addGoalsBtn = false
    this.updateGoalBtn = true
    this.goalIndex = index
    this.othersForm.patchValue({ GoalType: goal.GoalType })
    this.othersForm.patchValue({ GoalTimeframe: goal.GoalTimeframe })
    this.othersForm.patchValue({ GoalValue: goal.GoalValue })

  }


  updateGoalsData() {

    this.addGoalsBtn = true
    this.updateGoalBtn = false
    this.goals[this.goalIndex] = this.othersForm.value
    this.othersForm.reset()
  }

  bpSelected:boolean = false
  selectedGoal(event:any){
    
       console.log("selected Goal",event.target.value)
       const VitalName = event.target.value
       if(VitalName == 'BloodPressure'){
             this.bpSelected = true
            //  const otherformkey = this.othersForm.get('Hypotension')
            //  otherformkey?.setValidators([Validators.required]);
       }else{
        this.bpSelected = false
       }
  }
  newWatchConfiguration(input: any) {
    this.spinner.show()
    this.userservice.watchConfiguration(input).subscribe((data) => {
      if (data.code == "S001") {
        alert("Watch Configured successfully")
        this.spinner.hide();
        // this.CustomerID = data.data.UserDetails?.CustomerID
        // this.ConfigSequence = data.data?.ConfigSequence
        // this.DeviceID = data.data.DeviceDetails?.DeviceID
        // this.configurationForm.reset()
        if (this.RegisterDevice) {
          this.RegistrationForm = false
          this.thresholdformtab = true
          this.whiteListFormTab = false
          this.OthersFormTab = false
        }
        if (this.ThresholdLimits) {
          this.thresholdformtab = false
          this.whiteListFormTab = true
          this.RegistrationForm = false
          this.OthersFormTab = false
        }
        if (this.WhitelistContacts) {
          this.thresholdformtab = false
          this.whiteListFormTab = false
          this.RegistrationForm = false
          this.OthersFormTab = true
        }
        if (this.Others) {
          this.route.navigate(["/Dashboard/asers/asersdashboard"]);
        }
      }
      if (data.code == "AE01") {
        alert(data.data);
        this.spinner.hide();
        if (this.RegisterDevice) {
          this.RegistrationForm = false
          this.thresholdformtab = true
          this.whiteListFormTab = false
          this.OthersFormTab = false
        }
        if (this.ThresholdLimits) {
          this.thresholdformtab = true
          this.whiteListFormTab = false
          this.RegistrationForm = false
          this.OthersFormTab = false
        }
      }
      if (data.code == "ND01") {
        alert(data.data);
        this.spinner.hide();
        if (this.RegisterDevice) {
          this.RegistrationForm = true
          this.thresholdformtab = false
          this.whiteListFormTab = false
          this.OthersFormTab = false
        }
        if (this.ThresholdLimits) {
          this.thresholdformtab = true
          this.whiteListFormTab = false
          this.RegistrationForm = false
          this.OthersFormTab = false
        }
      }
      if (data.code == "S002") {
        alert(data.data);
        this.spinner.hide();
        if (this.RegisterDevice) {
          this.RegistrationForm = true
          this.thresholdformtab = false
          this.whiteListFormTab = false
          this.OthersFormTab = false
        }
        if (this.ThresholdLimits) {
          this.thresholdformtab = true
          this.whiteListFormTab = false
          this.RegistrationForm = false
          this.OthersFormTab = false
        }
      }
    }, (error) => {
      alert(error.error.data)
      this.spinner.hide();
    })
  }
}
