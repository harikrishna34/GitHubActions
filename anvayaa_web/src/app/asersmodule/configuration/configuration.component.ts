import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, UntypedFormArray, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent {
  [x: string]: any;
  //ng-auto complete declaration 
  Name = '';
  public placeholder: string = 'Select Sponsor';
  public keyword = 'Name';
  public historyHeading: string = 'Recently selected';
  ThresholdLimits: any = []
  // Declerations////
  thersholdform: UntypedFormGroup
  CustomersList: any = []
  CustRecID: any
  benficiaryarray: any = []
  configurationForm!: UntypedFormGroup
  SponsorID: any
  mapGroupForm: UntypedFormGroup
  constructor(private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService, private userservice: UsersService, private formBuilder: UntypedFormBuilder, private route: Router) {
  }
  CustomerID: any
  InComingCustRecID: any
  DeviceID: any
  ngOnInit(): void {
    this.allcustomers()
    this.configbuilder()

    this.InComingCustRecID = this.activatedRoute.snapshot.queryParamMap.get("CustRecID");
    this.CustomerID = this.activatedRoute.snapshot.queryParamMap.get("CustomerID");
    this.DeviceID = this.activatedRoute.snapshot.queryParamMap.get("DeviceID");



    if (this.DeviceID != undefined && this.InComingCustRecID != undefined && this.CustomerID != undefined) {
      // this.selectedDevice(this.DeviceID)

      this.onloadCustomerList()

      this.configurationForm.patchValue({ 'Name': this.InComingCustRecID })
      this.CustRecID = this.InComingCustRecID
      this.benficieraydata()
      // this.selectedCustomer(this.CustRecID)
      this.configurationForm.patchValue({ 'CustomerID': this.CustomerID })
      // this.allcustomers()
      this.devices()
      this.configurationForm.patchValue({ 'DeviceID': this.DeviceID })
      this.selectedDevice(this.DeviceID)
      this.SelectedCustomer = this.benficiaryarray.filter((customer: any) => {
        if (this.CustomerID == customer.CustID) {
          return customer
        }
      })

    }
    //  this.configurationForm.patchValue({ 'DeviceID': this.DeviceID })
    this.thersholdform = this.formBuilder.group({
      isThresholdAllChecked: '',
      ThresholdLimits: this.formBuilder.array([])
    });



    //  this.thresholdfunctionality()
    this.devices()

  this.mapForm()
  }

     mapForm(){
       
      this.mapGroupForm = this.formBuilder.group({
        "IsGeofence" : 'false',
        "GeofenceLatitude" : "",
        "GeofenceLongitude" : "",
        "GeofenceRadius" : "",
      })
     }
  onloadCustomerList() {
    var List = []
    this.userservice.customerlist().subscribe((userlist) => {
      if (userlist.code == "S001") {
        List = userlist.data.filter((customers: any) => {
          if (customers.EmergencyPlan == "Active") {
            return customers
          }
        });
        this.spinner.hide();
        for (let details of List) {

          if (details.CustRecID == this.InComingCustRecID) {
            this.configurationForm.patchValue({ 'Name': details.Name })
          }
        }
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

  onChangeSearch(event: any) {
    this.CustRecID = event.CustRecID
    this.benficieraydata()
  }

  thresholdfunctionality() {
    for (let i = 0; i < this.ThresholdLimits.length; i++) {
      this.ThresholdLimit().push(this.newThershold());
      this.thersholdform.controls['ThresholdLimits'].patchValue(this.ThresholdLimits);
    }
  }

  onlyNumber(event: any) {
    let click: any = event.charCode
    return (click == 8 || click == 0) ? null : click >= 48 && click <= 57
  }

  onlyAlphabets(event: any) {
    let click: any = event.charCode
    return (click == 8 || click == 0) ? null : (click >= 65 && click <= 90 || click >= 97 && click <= 122)
  }

  emptyObj(): UntypedFormGroup {
    return this.formBuilder.group({
    });
  }

  newThershold(): UntypedFormGroup {
    return this.formBuilder.group({
      IsThreshold: '',
      Feature: '',
      ThresholdMin: "",
      ThresholdMax: "",
      GoalType: '',
      GoalTimeframe: '',
      GoalValue: '',
      IsGoal: ''
    });
  }

  ThresholdLimit(): UntypedFormArray {
    return this.thersholdform.get("ThresholdLimits") as UntypedFormArray;
  }

  configbuilder() {
    this.configurationForm = this.formBuilder.group({
      'Name': '',
      'DeviceID': [''],
      'Model': [''],
      'IMEINumber': ['', [Validators.required, Validators.minLength(10)]],
      'SIMNumber': ['', [Validators.minLength(10), Validators.maxLength(10)]],
      'CustomerID': ['', [Validators.required]],
      'SponsorID': [''],
      'IsNotificationRequired': false,
      'ThresholdLimits': [''],
      'Goals': [''],
      'IsGeofence': [''],
      "GeofenceLatitude": [''],
      "GeofenceLongitude": [''],
      "GeofenceRadius": [''],
    })
  }

  //***All Customers calling API */
  allcustomers() {
    // this.spinner.show();
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

  /**on select Sponser Benficiary data is calling form this api  */
  sponserObj: any = {}  // to add this object in select Customer Dropdown 
  benficieraydata() {
    // this.spinner.show();
    this.userservice.viewUserDetails({ "CustRecID": this.CustRecID }).subscribe((userlist) => {
      if (userlist.code == "S001") {
        this.sponserObj.Name = userlist.data.customer.Name
        this.sponserObj.Age = userlist.data.customer.Age
        this.sponserObj.Gender = userlist.data.customer.Gender
        this.sponserObj.MobileNumber = userlist.data.customer.MobileNumber
        this.sponserObj.CustID = userlist.data.customer.CustRecID
        this.SponsorID = userlist.data.customer.CustRecID
        userlist.data.customer.Beneficiaries.push(this.sponserObj)
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


  Configurationsubmit: boolean = false
  confirmedData: any = {}
  GoalsArray: any = []
  FinalConfiguredData: any = {}
  FinalThresholdTable: boolean = true
  noDataTitle: boolean = false
  submitConfiguration() {
    let thresholds = this.thersholdform.value.ThresholdLimits
    // thresholds = thresholds.filter((data: any) => data.IsThreshold == true)
    this.GoalsArray = []
    let goals = thresholds.map((obj: { GoalTimeframe: any; GoalValue: any; GoalType: any; }) => ({
      GoalTimeframe: obj.GoalTimeframe,
      GoalValue: obj.GoalValue,
      GoalType: obj.GoalType
    }));
    this.GoalsArray = goals.filter((data: any) => {
      if (data.GoalTimeframe != '' && data.GoalValue != '' && data.GoalType != '') {
        return data
      }
    })
    thresholds = thresholds.map((obj: any) => {
      const { GoalTimeframe, GoalValue, GoalType, IsGoal, ...rest } = obj;
      return rest;
    });
    // const [Deviceid,Model] = this.configurationForm.value.DeviceID.split('/')
    thresholds = thresholds.map((obj: any) => {
      const { Feature, ThresholdMin, ThresholdMax, ...rest } = obj;
      return { VitalType: Feature, MinValue: ThresholdMin, MaxValue: ThresholdMax, ...rest };
    });
    // Loop through the array
    for (let i = 0; i < thresholds.length; i++) {
      // Check if IsThreshold is an empty string, then update it to false
      if (thresholds[i].IsThreshold === '') {
        thresholds[i].IsThreshold = false;
      }
    }
    this.Configurationsubmit = true
    this.configurationForm.value.SponsorID = this.SponsorID
    this.configurationForm.value.ThresholdLimits = thresholds
    this.configurationForm.value.Model == this.selectedDeviceType
    // IncommingModelNumber
    this.configurationForm.value.Model = this.selectedDeviceType
    // this.configurationForm.value.DeviceID = 
    this.configurationForm.value.Goals = this.GoalsArray
    if (this.configurationForm.value.IsNotificationRequired == '' && this.configurationForm.value.IsNotificationRequired == null) {
      this.confirmedData.IsNotificationRequired = false
    }
    if (this.configurationForm.value.IsGeofence == '' && this.configurationForm.value.IsGeofence == null) {
      this.configurationForm.value.IsGeofence = false
    }
    console.log("kdkdkdk",this.configurationForm.value)
    // this.confirmedData = this.configurationForm.value
    this.confirmedData = {
      'DeviceID': this.configurationForm.value.DeviceID,
      'Model': this.configurationForm.value.Model,
      'IMEINumber': this.configurationForm.value.IMEINumber,
      'SIMNumber': this.configurationForm.value.SIMNumber,
      'CustomerID': this.SelectedCustomer[0]?.CustID,
      'SponsorID': this.configurationForm.value.SponsorID,
      'IsNotificationRequired': this.configurationForm.value.IsNotificationRequired,
      'ThresholdLimits': this.configurationForm.value.ThresholdLimits,
      'Goals': this.configurationForm.value.Goals,
      'IsGeofence': this.configurationForm.value.IsGeofence,
      "GeofenceLatitude" :this.mapGroupForm.value.GeofenceLatitude ,
      "GeofenceLongitude" :this.mapGroupForm.value.GeofenceLongitude ,
      "GeofenceRadius" :this.mapGroupForm.value.GeofenceRadius ,
    }
    // this.confirmedData.IMEINumber = this.configurationForm.value.IMEINumber
    //   this.confirmedData.SIMNumber = this.configurationForm.value.SIMNumber
    if (this.confirmedData.Model == undefined || this.confirmedData.IsGeofence == null) {
      this.confirmedData.Model = this.IncommingModelNumber
      this.confirmedData.IsGeofence = false
    }
    if (this.confirmedData.IsNotificationRequired == null) {
      this.confirmedData.IsNotificationRequired = false
    }
    if (this.confirmedData.IMEINumber == undefined || this.confirmedData.SIMNumber == undefined) {
      // this.confirmedData.IMEINumber = this.configurationForm.value.IMEINumber
      // this.confirmedData.SIMNumber = this.configurationForm.value.SIMNumber
      this.confirmedData.IMEINumber = this.imeiNumber
      this.confirmedData.SIMNumber = this.SimNumber
    }
    if (this.ConfigSequence != '') {
      this.confirmedData.ConfigSequence = this.ConfigSequence
      // this.confirmedData.IMEINumber = this.imeiNumber
      // this.confirmedData.SIMNumber = this.SimNumber
    }
    const allFalse = this.confirmedData.ThresholdLimits.every((vital: any) => !vital.IsThreshold);
    if (allFalse) {
      this.FinalThresholdTable = false
      this.noDataTitle = true
    } else {
      this.FinalThresholdTable = true
      this.noDataTitle = false
    }
    for (let isThreshold of this.confirmedData.ThresholdLimits) {
      // if(isThreshold.IsThreshold==true)
    }


    console.log("connfirmFunction",this.confirmedData)
    this.FinalConfiguredData = this.confirmedData
  }

  // selected customer calling and assigning to selected customer Object
  SelectedCustomer: any = []
  selectedCustomer(event: any) {
    let selectedCustId = event.target.value

    // if(selectedCustId == undefined){
    //   selectedCustId = event
    // }
    // if(this.configurationForm.value.IMEINumber!=''&&this.configurationForm.value.SIMNumber!=''&&this.configurationForm.value.DevviceID!=''){
    this.configurationForm.get('IMEINumber')?.reset();
    this.configurationForm.get('SIMNumber')?.reset();
    this.configurationForm.get('DeviceID')?.reset();
    this.ThresholdLimit().controls = []
    this.SelectedCustomer = this.benficiaryarray.filter((customer: any) => {
      if (selectedCustId == customer.CustID) {
        return customer
      }
    })

  }

  isThresholdAllChecked: any
  toggleAllThresholds() {
    const isChecked = this.thersholdform.controls['isThresholdAllChecked'].value;
    const formArray = this.thersholdform.get('ThresholdLimits') as FormArray;
    formArray.controls.forEach((control: any) => {
      control.get('IsThreshold').setValue(isChecked);
    });
  }

  Devices: any = []
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

  selectedDeviceType: any
  DeviceChecked: boolean = true
  thresholdsFeatures: any
  devicename: any
  Did: any
  devicetype: any
  hiddenInputByDevice: boolean = true
  selectedDevice(event: any) {

    let SelectedDeviceId = event?.target?.value
    if (SelectedDeviceId == undefined) {
      SelectedDeviceId = event
    }
    this.selectedDeviceType = this.Devices.filter((model: any) => model.DeviceID === SelectedDeviceId)
    this.selectedDeviceType = this.selectedDeviceType[0]?.Model
    if (this.selectedDeviceType == '6IN1') {
      this.hiddenInputByDevice = false
    } else {
      this.hiddenInputByDevice = true
    }
    this.devicename = "6IN1"
    // this.selectedDeviceType = devicetype 
    this.Did = SelectedDeviceId

    if(this.CustomerID == null|| this.CustomerID == undefined){
    this.getCustomerConfiguration(this.SelectedCustomer[0]?.CustID, SelectedDeviceId)
    }else{
    this.getCustomerConfiguration(this.CustomerID, SelectedDeviceId)

    }
    // this.getCustomerConfiguration(this.configurationForm.value.CustomerID, SelectedDeviceId)
    if (this.configurationForm.value.CustomerID == '' || this.configurationForm.value.CustomerID == null) {
      alert("Please Select Customer ")
      this.configurationForm.reset()
      this.benficiaryarray = []
      return
    }
    if (this.InCommingConfiguredData == 'NoData') {
      if (this.selectedDeviceType === '6IN1') {
        this.DeviceChecked = false
        this.hiddenInputByDevice = true
        this.configurationForm.patchValue({ 'SIMNumber': '9999999999' })
        // for (let device of this.Devices) {
        //   if (device.DeviceID == SelectedDeviceId) {
        //     if (device.Model == '6IN1') {
        //       this.configurationForm.patchValue({ 'IMEINumber': this.devicename + this.SelectedCustomer[0].CustID })
        //     }
        //   }
        // }
      } else {
        this.DeviceChecked = false
      }
    }
  }

  onFocused(event: any) {
    this.benficiaryarray = []
    this.configurationForm.reset()
    this.ThresholdLimit().controls = []
    this.EditBtn = false
    this.DeviceChecked = true
    this.configurationForm.get('DeviceID')?.enable()
    this.configurationForm.get("IMEINumber")?.enable()
    this.configurationForm.get("SIMNumber")?.enable()
    this.configurationForm.get("IsNotificationRequired")?.enable()
    this.thersholdform?.enable()
    window.location.reload()
  }

  isDisableFunction() {
    return this.selectedDeviceType == '6IN1' ? this.selected6in1() : this.selectedOtherDevice()
  }

  selected6in1() {
    return this.configurationForm.status == 'INVALID'
  }

  selectedOtherDevice() {
    return this.configurationForm.status == 'INVALID' || this.thersholdform.invalid
  }

  resetForm() {
    // this.configurationForm.reset()
    // this.ThresholdLimit().controls = []
    this.EditBtn = false
    this.DeviceChecked = true
    // this.configurationForm.get('DeviceID')?.enable()
    // this.configurationForm.get("IMEINumber")?.enable()
    // this.configurationForm.get("SIMNumber")?.enable()
    // this.configurationForm.get("IsNotificationRequired")?.enable()
    // this.thersholdform?.enable()

    this.getCustomerConfiguration(this.configurationForm.value.CustomerID, this.selectedDeviceType)
  }

  submitConfiguredData() {
    this.spinner.show()

    if (this.FinalConfiguredData.Model == '6IN1') {

      this.FinalConfiguredData.ThresholdLimits = []
      delete this.FinalConfiguredData.IMEINumber
      delete this.FinalConfiguredData.SIMNumber

    }

      if(this.FinalConfiguredData.CustomerID == ''||this.FinalConfiguredData.CustomerID == null){
        this.FinalConfiguredData.CustomerID = this.CustomerID
      }

      if(this.FinalConfiguredData.IsGeofence==''){
        this.FinalConfiguredData.IsGeofence = false
      }
      console.log('kkdjdjdjd',this.FinalConfiguredData )
    
    this.userservice.watchConfiguration(this.FinalConfiguredData).subscribe((data) => {
      if (data.code == "S001") {
        alert("Watch Configured successfully")
        this.thersholdform.value.ThresholdLimits = []
        // window.location.reload();
        this.route.navigate(["/Dashboard/Customerslist"]);

        this.spinner.hide();
      }
      if (data.code == "S002") {
        alert(data.data)
        this.spinner.hide();
      }
      if (data.code == 'AE01') {
        alert(data.data)
        this.spinner.hide();
      }
    }, (error) => {
      alert(error.error.data)
      this.spinner.hide();
    })
  }

  ConfigSequence: any
  IncommingModelNumber: any
  InCommingConfiguredData: any
  hideInputs: boolean
  EditBtn: boolean = false
  imeiNumber: any
  SimNumber: any
  getCustomerConfiguration(CustomerID: any, modelId: any) {
    this.spinner.show()
    this.userservice.configrationDetails(CustomerID, modelId).subscribe((userlist) => {
      if (userlist.code == "S001") {
        this.spinner.hide();
        this.disableFormControls()
        this.DeviceChecked = false
        this.EditBtn = true
        var deviceDetails = userlist.data
        this.InCommingConfiguredData = deviceDetails
        if (deviceDetails.DeviceDetails.Model == '6IN1') {
          this.DeviceChecked = true
        } else {
          this.DeviceChecked = false
        }
        this.configurationForm.patchValue({ 'DeviceID': deviceDetails.DeviceDetails.DeviceID })
        this.configurationForm.patchValue({ 'IMEINumber': deviceDetails.DeviceDetails.IMEINumber })
        this.configurationForm.patchValue({ 'SponsorID': deviceDetails.SponsorID })
        this.configurationForm.patchValue({ 'SIMNumber': deviceDetails.DeviceDetails.SIMNumber })
        this.configurationForm.patchValue({ 'Model': deviceDetails.DeviceDetails.Model })
        this.mapGroupForm.patchValue({'GeofenceLatitude':deviceDetails.UserDetails.GeofenceLatitude})
        this.mapGroupForm.patchValue({'GeofenceLongitude':deviceDetails.UserDetails.GeofenceLongitude})
        this.mapGroupForm.patchValue({'GeofenceRadius':deviceDetails.UserDetails.GeofenceRadius})
        this.configurationForm.patchValue({'IsGeofence':deviceDetails.UserDetails.IsGeofence})
        this.IncommingModelNumber = deviceDetails.DeviceDetails.Model
        this.ConfigSequence = deviceDetails.ConfigSequence
        this.imeiNumber = deviceDetails.DeviceDetails.IMEINumber
        this.SimNumber = deviceDetails.DeviceDetails.SIMNumber
        this.configurationForm.patchValue({ 'IsNotificationRequired': deviceDetails.IsNotificationRequired })
        if (this.ThresholdLimit().controls.length > 0) {
          this.ThresholdLimit().controls = []
        }
        const vitalLimits = deviceDetails.ThresholdLimits.map((obj: any) => {
          const { VitalType, MinValue, MaxValue, ...rest } = obj;
          return { Feature: VitalType, ThresholdMin: MinValue, ThresholdMax: MaxValue, ...rest };
        });
        this.thresholdsFeatures = this.Devices.filter((device: any) => {
          if (device.DeviceID == deviceDetails.DeviceDetails.DeviceID) {
            return device?.Features
          }
        })
        this.thresholdsFeatures = this.thresholdsFeatures[0]?.Features
        for (let i = 0; i < this.thresholdsFeatures?.length; i++) {
          let featureToUpdate = this.thresholdsFeatures[i].Feature;
          // Find the corresponding object in array a
          let correspondingObject = vitalLimits.find((obj: any) => obj.Feature === featureToUpdate);
          // Update the values in array b with the values from array a
          if (correspondingObject) {
            this.thresholdsFeatures[i].ThresholdMin = correspondingObject.ThresholdMin;
            this.thresholdsFeatures[i].ThresholdMax = correspondingObject.ThresholdMax;
            this.thresholdsFeatures[i].IsThreshold = correspondingObject.IsThreshold;
            // Update other properties as needed IsThreshold
          }
        }
        this.ThresholdLimits = this.thresholdsFeatures.filter((feature: any) => feature.Type === 'Device')
        this.ThresholdLimits = this.ThresholdLimits.filter((feature: any) => {
          if (feature) {
            feature.GoalType = feature.Feature,
              feature.GoalTimeframe = '',
              feature.GoalValue = '',
              feature.IsThreshold = ''
            return feature
          }
        })
        for (let i = 0; i < this.ThresholdLimits.length; i++) {
          let featureToUpdate = this.ThresholdLimits[i].Feature;
          // Find the corresponding object in array a
          let correspondingObject = vitalLimits.find((obj: any) => obj.Feature === featureToUpdate);
          // Update the values in array b with the values from array a
          if (correspondingObject) {
            this.ThresholdLimits[i].IsThreshold = correspondingObject.IsThreshold;
            // Update other properties as needed IsThreshold
          }
        }
        for (let i = 0; i < this.ThresholdLimits.length; i++) {
          let featureToUpdate = this.ThresholdLimits[i].Feature;
          // Find the corresponding object in array a
          let correspondingObject = deviceDetails.Goals.find((obj: any) => obj.GoalType === featureToUpdate);
          // Update the values in array b with the values from array a
          if (correspondingObject) {
            this.ThresholdLimits[i].GoalType = correspondingObject.GoalType;
            this.ThresholdLimits[i].GoalTimeframe = correspondingObject.GoalTimeframe;
            this.ThresholdLimits[i].GoalValue = correspondingObject.GoalValue;
            // this.ThresholdLimits[i].IsThreshold = correspondingObject.IsThreshold;
            // Update other properties as needed
          }
        }
        this.thresholdfunctionality()
        this.thersholdform?.disable()


      } else if (userlist.code == "PD01") {
        alert(userlist.data)
        this.spinner.hide();
      } else if (userlist.code == "ND01") {
        this.spinner.hide()
        this.ThresholdLimit().controls = []
        this.EditBtn = false
        if (this.ConfigSequence != '') {
          this.configurationForm.patchValue({ 'IMEINumber': this.imeiNumber })
          this.configurationForm.patchValue({ 'SIMNumber': this.SimNumber })
        }
        this.configurationForm.get('DeviceID')?.enable()
        this.configurationForm.get("IMEINumber")?.enable()
        this.configurationForm.get("SIMNumber")?.enable()
        this.thersholdform?.enable()
        this.configurationForm.get("IsNotificationRequired")?.enable()
        this.configurationForm.patchValue({ 'IMEINumber': '' })
        this.configurationForm.patchValue({ 'SIMNumber': '' })
        if (this.selectedDeviceType === '6IN1') {
          this.DeviceChecked = true
          this.EditBtn = true
          this.configurationForm.patchValue({ 'SIMNumber': '9999999999' })
          for (let device of this.Devices) {
            if (device.DeviceID == this.Did) {
              if (device.Model == '6IN1') {
                this.configurationForm.patchValue({ 'IMEINumber': this.devicename + this.SelectedCustomer[0].CustID })
                this.hideInputs = true
              }
            }
          }
        } else {
          this.DeviceChecked = false
          if (this.ThresholdLimit().controls.length > 0) {
            this.ThresholdLimit().controls = []
          }
          this.thresholdsFeatures = this.Devices.filter((device: any) => {
            if (device.DeviceID == this.Did) {
              return device.Features
            }
          })
          this.ThresholdLimits = this.thresholdsFeatures[0].Features.filter((feature: any) => feature.Type === 'Device')
          this.ThresholdLimits = this.ThresholdLimits.filter((feature: any) => {
            if (feature) {
              feature.GoalType = feature.Feature,
                feature.GoalTimeframe = '',
                feature.GoalValue = '',
                feature.IsThreshold = true
              return feature
            }
          })
          this.thresholdfunctionality()
        }
        this.InCommingConfiguredData = 'NoData'
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

  disableFormControls() {
    // this.configurationForm.get('DeviceID')?.disable()
    this.configurationForm.get("IMEINumber")?.disable()
    this.configurationForm.get("SIMNumber")?.disable()
    this.configurationForm.get("IsNotificationRequired")?.disable()
    this.thersholdform?.disable()
    // this.disableFormArrayControls()
  }

  enableFormControls() {
    // this.configurationForm.get('DeviceID')?.enable()
    // this.configurationForm.get("IMEINumber")?.enable()
    // this.configurationForm.get("SIMNumber")?.enable()
    this.configurationForm.get("IsNotificationRequired")?.enable()
    this.thersholdform?.enable()
  }

  Cancel() {
    this.configurationForm.reset()
    this.ThresholdLimit().controls = []
    this.EditBtn = false
    this.DeviceChecked = true
    this.configurationForm.get('DeviceID')?.enable()
    this.configurationForm.get("IMEINumber")?.enable()
    this.configurationForm.get("SIMNumber")?.enable()
    this.configurationForm.get("IsNotificationRequired")?.enable()
    this.thersholdform?.enable()
    this.route.navigate(["/Dashboard/Customerslist"]);
  }

  masterNavigation() {
    this.route.navigate(["/Dashboard/asers/AsersMasters"]);
  }

  display:any;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] =[];
  
  circleCenter: google.maps.LatLngLiteral;
  radius = 200 ;
  
  mapOptions: google.maps.MapOptions = {
    center: { lat: 17.4350854, lng: 78.4026378 },
    zoom: 17,
    
    // 17.4350854,78.4026378
  };
  addMarker(event: google.maps.MapMouseEvent) {
    if(this.markerPositions.length <1){
    this.markerPositions.push(event.latLng?.toJSON()!);
    if(this.markerPositions.length>0){
    this.circleCenter = {lat:this.markerPositions[0].lat,lng:this.markerPositions[0].lng}
     
    }
    this.mapGroupForm.patchValue({GeofenceLatitude:this.markerPositions[0].lat})
    this.mapGroupForm.patchValue({GeofenceLongitude :this.markerPositions[0].lng})
    this.mapGroupForm.patchValue({GeofenceRadius :this.radius })
    }
  
  }
  resetMarker(){
    this.markerPositions = []
  }
  moveMap(event: google.maps.MapMouseEvent) {
    this.mapOptions.center = (event.latLng?.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng?.toJSON();
    
    
  }
} 
