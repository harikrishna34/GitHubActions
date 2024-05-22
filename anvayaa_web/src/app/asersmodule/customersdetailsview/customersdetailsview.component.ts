import { Component, ViewChild } from '@angular/core';
import { UsersService } from '../../users.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, UntypedFormArray, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import * as moment from 'moment';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis,
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-customersdetailsview',
  templateUrl: './customersdetailsview.component.html',
  styleUrls: ['./customersdetailsview.component.css']
})
export class CustomersdetailsviewComponent {
  @ViewChild("chart") chart: ChartComponent;
  // public chartOptions: Partial<ChartOptions>;
  public viewaserssettings: FormGroup
  public thersholdform: FormGroup
  public Contactsform: FormGroup
  CustomerID: any
  dashboarddata: any = []
  //readmore variable, its true than read more string will print
  ReadMore: boolean = true
  //hiding info box
  visible: boolean = false
  sos1: any
  sos2: any
  sos3: any
  wlist1: any
  wlist2: any
  wlist3: any
  wmode1: any
  healthdata: any
  SOSNumbers: any = []
  WhiteList: any = []
  Type: any
  index: any
  watchobj: any
  SetHealthData: any
  fall: boolean = false;
  switchwhitelist: boolean = false;
  switchhealthdata: boolean = false;
  settingsview: any
  watobj: any
  watchID: any
  addingwhitelistbtn: boolean = true
  updatewhitelistbtn: boolean = false
  ThresholdLimitsarray: any = []
  thersholdobj: any
  ConfigSequence: any
  DeviceID: any
  conactsarray: any = []
  WhitlistedContacts: any = []
  customizeSettingsTab: boolean = false
  watchIfoBtn: boolean = false
  // progressPercentage:any
  ContactAdded: boolean = false
  ContactindexValue: any
  CustomizeSettinsForm: FormGroup
  maxdate = new Date()
  watchIncomingData: FormGroup
  IncomeWatchData: any = []
  WatchVitalKey: any
  IncomingSeriesArray: any = []
  serisData = []
  tempratureseries = [30, 50, 20]
  tempratureXaxis = [1, 2, 3, 4]
  xaxisdata = [1, 2, 3]
  heartrategraph: boolean = false
  mapstab: boolean = false
  IncomingXaxis: any = []
  bpseries2 = []
  bpseriesarray2: any = []
  lat: number
  lng: number
  zoom: number = 8;
  markers: any = []
  // remainders Declerations
  remainderScreen: boolean = false
  WeekDays: any = [{ Day: "Monday", Value: 1 }, { Day: "Tuesday", Value: 2 }, { Day: "Wednesday", Value: 3 }, { Day: "Thusrday", Value: 4 }, { Day: "Friday", Value: 5 }, { Day: "Saturday", Value: 6 }, { Day: "Sunday", Value: 7 }]
  Setting: any
  dropdownSettings: any
  days: any = []
  // Remainders Functions /////
  RemaindersForm: FormGroup
  alarmObj!: FormGroup
  alarms: any = []
  remainderAddBtn: boolean = true
  remainderUpdBtn: boolean = false
  RemainderIndex: any
  InstantScreen: boolean = false
  LocationMacForm: FormGroup
  SubmitVitalValidation: boolean = false
  watchId: any
  //graph table 
  VitalDataArray: any = []
  tempraturelist: any = []
  spo2list: any = []
  BpList: any = []
  stepsList: any = []
  searchText = '';
  Customizetab: boolean = false
  subscription: Subscription;
  SleepSetting: FormGroup
  // sleep Data Declerations
  sleepGraphContainer: boolean = false
  toDay: any
  Sleep_x_Axis: any = []
  Sleep_Seriase: any = []
  SleepXaxis: any = []
  SleepSeriase: any = []
  activeState = 'Draft';
  customYAxisLabels: any = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'];
  CustomisSleepDates: FormGroup
  //Steps Graph
  StepsGraph: boolean = false
  Did: any
  EcgBtn: boolean = false
  CustID: any;
  settingsPanel: boolean = true
  IncommingModel: any
  settingsTab: boolean = false

  constructor(private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService, private userservice: UsersService, private formBuilder: UntypedFormBuilder, private route: Router, private datePipe: DatePipe) {
  }

  ngOnInit(): void {

    this.CustomerID = this.activatedRoute.snapshot.queryParamMap.get("CustRecID"); // getting value form URL params 

    // form functions are declared below 
    this.thresholdFormFunction()
    this.customizationSettingsFormFunction() 
    this.macLocationForm() 
    this.sleepSettingsFunction()
    this.sleepCustomizationFunction()
    this.viewwatchasersdetailsformbuilder()
    this.viewcontactsformbuilder()
    this.watchDataParams()
    this.remainderform()
    this.alaramDataObj()
    this.ThresholdLimit()
    this.newThershold()
   // end of form declaration 

   this.benficieraydata() // benficiary data api calling 

    this.dropdownSettings = {
      // singleSelection: false,
      idField: 'Value',
      textField: 'Day',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 6,
      allowSearchFilter: true
    };
   
    this.toDay = new Date() // date declaration
    this.toDay = this.datePipe.transform(this.toDay, 'dd-MM-yyyy') // date formatting 
  
    if (this.CustID != null || this.IncommingModel != null || this.watchId != null) {
      this.whatchAlarmData()
      this.dashboarddetails()
      this.selectedWatchVitals('HeartRate', 'Hour')
    }

  }

  selectedIndex:number = -1;; // Initialize selected item
  selectedModelBtn:number = -1; 
  selectItem(item: any) {
    this.selectedIndex = item;// Set the selected item
  }


  // this API function is calling for benficiary and sponsors to display 
  sponserObj: any = {}
  SponsorID: any
  benficiaryarray: any
  benficieraydata() {
    this.spinner.show();
    this.userservice.viewUserDetails({ "CustRecID": this.CustomerID }).subscribe((userlist) => {
      if (userlist.code == "S001") {
        this.spinner.hide();
        const beneficiarySelection = userlist.data.customer?.Beneficiaries.filter((beneficiary: any) => {
          return this.CustID === beneficiary.CustID
        })
        this.activeState = beneficiarySelection[0]?.Name
        this.SelectedCustomerId = this.CustID
        this.sponserObj.Name = userlist.data?.customer?.Name
        this.sponserObj.Age = userlist?.data?.customer?.Age
        this.sponserObj.Gender = userlist.data.customer?.Gender
        this.sponserObj.MobileNumber = userlist.data.customer?.MobileNumber
        this.sponserObj.CustID = userlist.data.customer?.CustRecID
        this.SponsorID = userlist.data.customer?.CustRecID
        userlist.data.customer.Beneficiaries.push(this.sponserObj)
        this.benficiaryarray = userlist.data.customer.Beneficiaries
        console.log("customerArray", this.benficiaryarray)
        this.spinner.hide();
      } else if (userlist.code == "PD01") {
        alert(userlist.data)
        this.spinner.hide();
      } else if (userlist.code == "ND01") {
        alert(userlist.data)
      } else {
        this.spinner.hide();
        alert(userlist.message)
      }
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })
  }


  // function is calling from selected  benficiary 
  SelectedCustomerId: any
  selectedConfiguration(selected: any) {
    if (selected != '') {
      if (this.SelectedCustomerId != selected.CustID) {
        this.configuredDevices = []
        this.dashboarddata = []
        this.heartrategraph = false
        this.StepsGraph = false
        this.sleepGraphContainer = false
        this.settingsPanel = false
        this.settingsTab = false
      }
    } else {
      this.settingsPanel = true
    }
    this.configuredDevices = []
    this.SelectedCustomerId = selected.CustID
    this.configuredDetails()
  }


  setStateAsActive(state: any) {
    this.activeState = state;
  }



  // this function is called to get configured details of customer 
  configuredDevices: any = []
  configuredDetails() {
    this.userservice.GetDeviceConfiguredDetails({ "CustomerID": this.SelectedCustomerId }).subscribe((userlist) => {
      if (userlist.code == "S001") {

        this.configuredDevices = userlist.data.filter((data: any) => { return data.CustomerDetails.CustID == this.SelectedCustomerId })
        console.log("devices", this.configuredDevices)
        this.spinner.hide();
      } else if (userlist.code == "PD01") {
        alert(userlist.data)
        this.spinner.hide();
      } else if (userlist.code == "ND01") {

        alert(userlist.data)

      } else {
        this.spinner.hide();
        alert(userlist.message)
      }
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })
  }



// this function is for selected device model 
  deviceSelected: any
  selectedDeviceModel(device: any) {
    console.log("device selected", device)
    this.settingsTab = true
    if (device.DeviceDetails.IMEINumber == null) {
      this.watchId = device
    }
    this.watchId = device.DeviceDetails.IMEINumber
    this.Did = device.DeviceDetails.DeviceID
    this.dashboarddetails()
    this.devices()
    this.watchviewsettings(this.watchId)
  }

  timeSlot: any
  AlaramRecords: any = []
  whatchAlarmData() {
    let Details = {
      'watchID': this.watchId,
      'StartDate': '',
      'EndDate': ''
    }
    this.userservice.getWatchAlarmRecords(Details).subscribe((response) => {
      if (response.code == 'S001') {
        this.AlaramRecords = response.data
      } else if (response.code == 'S002') {
        alert(response.msg)
      } else {
        alert(response.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }




  Devices: any = []
  devices() {
    this.userservice.allElectronicDevices().subscribe((devicelist) => {
      // this.VitalType = this.Devices[0].Features
      if (devicelist.code == "S001") {

        this.Devices = devicelist.data.filter((model: any) => {
          if (model.DeviceID == this.Did) {
            return model
          }
        })
        console.log("kkkkk", this.Devices)
        this.Devices = this.Devices[0]?.Features.filter((feature: any) => feature.Type == 'Screen')
        console.log("array of device", this.Devices)

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

  hasFeature(featureName: string): boolean {
    if (featureName == '') {
      return this.Devices = false
    }
    return this.Devices.some((feature: any) => feature.Feature === featureName);
  }

  arrayOfArrays: any = []
  getSleepData(date: any) {
    let obj: any = {
      "SleepStartDate": " ",
      "SleepEndDate": "",
      "Type": "SleepTime",
      "ID": this.watchId
    }
    if (date == 'today') {
      obj.SleepStartDate = this.toDay
      obj.SleepEndDate = this.toDay
    }
    if (date == 'custom') {
      obj.SleepStartDate = this.datePipe.transform(this.CustomisSleepDates.value.StartDate, 'dd-MM-yyyy')
      obj.SleepEndDate = this.datePipe.transform(this.CustomisSleepDates.value.EndDate, 'dd-MM-yyyy')
    }
    this.userservice.getAseresSleepData(obj).subscribe((response) => {
      this.spinner.hide();
      if (response.code == "S001") {
        this.nodatafound = false
        this.graphblock = true
        this.sleepGraphContainer = true
        if (this.arrayOfArrays.length > 0) {
          this.arrayOfArrays = []
        }
        if (this.Sleep_x_Axis.length > 0 && this.Sleep_Seriase.length > 0) {
          this.Sleep_x_Axis = []
          this.Sleep_Seriase = []
        }
        response.data.forEach((obj: any) => {
          let xaxis = []
          let series = []
          for (let a of obj.Data.sleep_stages) {
            xaxis.push(a.sleeptime)
            series.push(a.sleep)
          }
          obj.SleepInterval = xaxis
          obj.Sleep = series
          this.arrayOfArrays.push([obj]); // Create a new array containing the object
        });
        for (let array of this.arrayOfArrays) {
          this.Sleep_x_Axis = array[0].SleepInterval
          this.Sleep_Seriase = array[0].Sleep
        }

      } else {
        this.spinner.hide();
        alert(response.data)
      }
    }, ((error) => {
      this.nodatafound = true
      this.graphblock = false
      this.sleepGraphContainer = true
      this.spinner.hide();
    }))
  }
  sleepDynamicGraph(data: any) {
    if (this.Sleep_x_Axis.length > 0 && this.Sleep_Seriase.length > 0) {
      this.Sleep_x_Axis = []
      this.Sleep_Seriase = []
    }
    this.Sleep_x_Axis = data.SleepInterval
    this.Sleep_Seriase = data.Sleep
  }
  SleepDataContainer() {
    this.sleepGraphContainer = true
    this.heartrategraph = false
    this.StepsGraph = false
    this.getSleepData('today')
  }
  watchviewsettings(watchId: any) {
    this.userservice.viewwatchsettings(watchId).subscribe((response) => {
      if (response.code == 'S001') {
        this.settingsview = response.data[0]
        if (this.settingsview.WorkingMode.WorkingMode == '8') {
          this.customizeSettingsTab = true
        }
        this.CustomizeSettinsForm.patchValue({ "IsGpsOn": this.settingsview.WorkingMode.IsGpsOn })
        this.CustomizeSettinsForm.patchValue({ "Time": this.settingsview.WorkingMode.Time })
        this.CustomizeSettinsForm.patchValue({ "WorkingMode": this.settingsview.WorkingMode.WorkingMode })
        this.LocationMacForm.patchValue({ "IsGpsOn": this.settingsview.LocationMac?.IsGpsOn })
        this.LocationMacForm.patchValue({ "Seconds": this.settingsview.LocationMac?.Seconds })
        this.viewaserssettings.patchValue({ "WorkMode": this.settingsview?.WorkingMode?.WorkingMode })
        this.viewaserssettings.patchValue({ "FallAlertSensitivity": this.settingsview?.IsFallAlertSensitivity })
        this.viewaserssettings.patchValue({ "SwitchForWhitelist": this.settingsview?.IsWhiteListOn })
        this.viewaserssettings.patchValue({ "IsAutoMeasurementOn": this.settingsview?.SetHealthData?.IsAutoMeasurementOn })
        this.viewaserssettings.patchValue({ "Minutes": this.settingsview?.SetHealthData?.Time })
        this.viewaserssettings.patchValue({ "FallAlarmSensitivity": this.settingsview?.FallAlarmSensitivity })
      } else if (response.code == 'S002') {
        alert(response.data)
      } else {
        alert(response.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }

  setting() {
    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visible = !this.visible
    this.remainderScreen = false
    this.InstantScreen = false
  }
  instantScreen() {
    this.InstantScreen = !this.InstantScreen
    this.visible = false
    this.remainderScreen = false
  }

  EcgLink: any
  dashboarddetails() {
    this.spinner.show()
    this.userservice.customerdashboarddetails(this.SelectedCustomerId, this.watchId).subscribe((response) => {
      this.spinner.hide();
      if (response.code == "S001") {
        const data = response.data
        if (data) {

        }
        const dataArray = Object.keys(data).map(key => ({ key, value: data[key] }));

        for (let data of dataArray) {
          if (data.key == 'Ecgdata') {
            this.EcgBtn = true

            this.EcgLink = data.value.Data?.PDFFile
          } else {
            this.EcgBtn = false

          }
        }

        this.dashboarddata = dataArray.filter((data: any) => {

          if (data.key != 'Ecgdata' && data.key != 'Location') {
            return data
          }
        })

      } else {
        this.spinner.hide();
        alert(response.data)
      }
    }, ((error) => {
      this.spinner.hide();
    }))
  }


  ecgfunction() {
    window.open(this.EcgLink)
  }
  getDataKeys(dataObject: any): string[] {
    if (dataObject && typeof dataObject === 'object') {
      return Object.keys(dataObject).filter(key => dataObject[key] !== null && dataObject[key] !== undefined && dataObject[key] !== '');
    }
    return [];
  }
  get progressPercentage(): number {
    return this.dashboarddata?.BloodPressure
  }
  sosnumber() {
    if (this.sos1.length > 0 || this.sos2.length > 0 || this.sos3.length > 0) {
      this.SOSNumbers.push(this.sos1)
    }
  }
  whitelist() {
    if (this.wlist1 > 0 || this.wlist2 > 0 || this.wlist3 > 0) {
      this.WhiteList.push(this.wlist1)
    }
  }
  fallalaram(event: any) {
    let fall = event.target.value
  }
  workmode(event: any) {
    let work = event.target.value
  }
  fallsensitive() {
    let fallen
    if (this.fall == true) {
      fallen = 1
    } else {
      fallen = 0
    }
  }
  swhitelist() {
    let switchlist
    if (this.viewaserssettings.value == true) {
      switchlist = 1
    } else {
      switchlist = 0
    }
  }
  datainterval(event: any) {
    let healthtimer = event.target.value
    if (this.healthdata.length > 0) {
      this.SetHealthData.push(this.healthdata)
    }
  }
  shealthlist() {
    let healthsiwtch
    if (this.switchhealthdata == true) {
      healthsiwtch = 1
    } else {
      healthsiwtch = 0
    }
  }
  addwhitelist() {
    this.ContactAdded = true
    if (this.Contactsform.status == 'INVALID') {
    } else {
      this.WhitlistedContacts.push(this.Contactsform.value)
      this.viewcontactsformbuilder()
    }
  }
  patchcontactdetails(index: any) {
    this.ContactindexValue = index
    this.addingwhitelistbtn = false
    this.updatewhitelistbtn = true
    this.Contactsform.patchValue({ "Name": this.WhitlistedContacts[index].Name })
    this.Contactsform.patchValue({ "Number": this.WhitlistedContacts[index].Number })
  }
  deleteContactDetails(index: any) {
    let position = index
    this.WhitlistedContacts.splice(index, 1)
  }
  updatewhitelist() {
    this.WhitlistedContacts[this.ContactindexValue] = this.Contactsform.value
    this.viewcontactsformbuilder()
  }
  saveCustomizedMode(type: any) {
    delete this.viewaserssettings.value.FallAlertSensitivity
    delete this.viewaserssettings.value.SwitchForWhitelist
    delete this.viewaserssettings.value.FallAlarmSensitivity
    delete this.viewaserssettings.value.IsAutoMeasurementOn
    delete this.viewaserssettings.value.Minutes
    this.viewaserssettings.value.Type = type
    this.viewaserssettings.value.watchID = this.watchId
    this.viewaserssettings.value.WorkMode = "8"
    this.viewaserssettings.value.IsGpsOn = this.CustomizeSettinsForm.value.IsGpsOn
    this.viewaserssettings.value.Time = this.CustomizeSettinsForm.value.Time
    this.userservice.assersupdatesettings(this.viewaserssettings.value).subscribe((response) => {
      if (response.code == 'S001') {
        this.watchviewsettings(this.watchId)
        alert(response.data)
        this.customizeSettingsTab = false
        // this.viewaserssettings.reset()
      } else if (response.code == 'S002') {
        alert(response.data)
      } else {
        alert(response.data)
      }
    }, (error) => {
      alert(error.error?.message)
    })
  }
  macLocation(type: any) {
    this.LocationMacForm.value.Type = type
    this.LocationMacForm.value.watchID = this.watchId
    this.userservice.assersupdatesettings(this.LocationMacForm.value).subscribe((response) => {
      if (response.code == 'S001') {
        alert(response.data)
        this.customizeSettingsTab = false
        // this.viewaserssettings.reset()
      } else if (response.code == 'S002') {
        alert(response.data)
      } else {
        alert(response.data)
      }
    }, (error) => {
      alert(error.error?.message)
    })
  }
  SleepSettings() {
    this.SleepSetting.value.watchID = this.watchId
    this.userservice.assersupdatesettings(this.SleepSetting.value).subscribe((response) => {
      if (response.code == 'S001') {
        alert(response.data)
      } else if (response.code == 'S002') {
        alert(response.data)
      } else {
        alert(response.data)
      }
    }, (error) => {
      alert(error.error?.message)
    })
  }
  watchupdate(type: any) {
    this.viewaserssettings.value.Type = type
    this.viewaserssettings.value.watchID = this.watchId
    if (type == "WhiteList") {
      this.viewaserssettings.value.WhiteList = this.WhitlistedContacts
    }
    if (this.viewaserssettings.value.WorkMode == "8") {
      this.customizeSettingsTab = true
    } else {
      this.customizeSettingsTab = false
    }
    this.userservice.assersupdatesettings(this.viewaserssettings.value).subscribe((response) => {
      if (response.code == 'S001') {
        alert(response.data)
        this.watchviewsettings(this.watchId)
      } else if (response.code == 'S002') {
        alert(response.data)
      } else {
        alert(response.data)
      }
    }, (error) => {
      alert(error.error?.message)
    })
  }

  EditConfiguration() {
    const formArray: any = this.thersholdform.get('ThresholdLimits') as FormArray;
    formArray.controls.forEach((control: any) => {
      control.enable();
    });
    // formArray=!formArray
  }



  updateConfiguration() {
    this.SubmitVitalValidation = true
    if (this.thersholdform.status == 'INVALID') {
      return
    } else {
      this.thersholdform.value.CustomerID = this.CustomerID
      this.thersholdform.value.Type = 'ThresholdLimits'
      this.thersholdform.value.DeviceID = this.DeviceID
      this.thersholdform.value.ConfigSequence = this.ConfigSequence
      this.userservice.watchConfiguration(this.thersholdform.value).subscribe((response) => {
        if (response.code == 'S001') {
          alert("Successfully Updated Thershold Values")
        } else {
          alert(response.data)
        }
      }, (error) => {
        alert(error.error.data)
      })
    }
  }

  IntervelType: any
  vitalkey: any
  selectedWatchVitals(vital: any, Intervel: any) {
    const key = vital.key
    this.WatchVitalKey = vital
    this.vitalkey = key
    if (this.WatchVitalKey == 'Stepcount') {
      this.StepsGraph = true
      this.heartrategraph = false

    } else {
      this.StepsGraph = false
      this.heartrategraph = true
    }
    if (Intervel != "Month" && Intervel != "Customize") {
      this.Customizetab = false
      this.IntervelType = Intervel
      this.WatchData()
    }
    if (Intervel === "Month") {
      this.Customizetab = false
    }
    if (Intervel === "Month" || Intervel === "Customize") {
      this.IntervelType = Intervel
      this.MonthlyData()
    }
  }

  nodatafound: boolean = false
  count: any = 0
  graphblock: boolean = false
  WatchData() {
    if (this.watchIncomingData.status == 'INVALID') {
    } else {
      this.watchIncomingData.value.Type = this.WatchVitalKey
      this.watchIncomingData.value.ID = this.watchId
      this.watchIncomingData.value.Interval = this.IntervelType
      this.watchIncomingData.value.CustomerID = this.SelectedCustomerId
      this.userservice.incommingWatchData(this.watchIncomingData.value).subscribe((response) => {
        // this.spinner.hide()
        if (response.code == 'S001') {
          if (this.IncomingSeriesArray.length > 0 && this.IncomingXaxis.length > 0) {
            this.IncomingSeriesArray = []
            this.IncomingXaxis = []
            this.VitalDataArray = []
            this.bpseriesarray2 = []
            this.bpseries2 = []
            this.serisData = []
            this.xaxisdata = []
          }
          if (response.data.length <= 0) {
            this.nodatafound = true
            this.heartrategraph = true
            this.graphblock = false
            this.sleepGraphContainer = false
          } else {
            this.heartrategraph = true
            this.nodatafound = false
            this.graphblock = true
            this.sleepGraphContainer = false
          }
          this.IncomeWatchData = response.data
          this.IncomeWatchData.filter((data: any) => {
            if (this.WatchVitalKey == 'HeartRate') {
              this.heartrategraph = true
              this.IncomingSeriesArray.push(parseInt(data.Data.HeartRate))
              this.IncomingXaxis.push(this.datePipe.transform(data.CreatedDate * 1000, 'dd-MM-yyyy'))
              this.VitalDataArray.push({ "Heartrate": data.Data.HeartRate, "CreatedDate": data.CreatedDate })
              this.serisData = this.IncomingSeriesArray
              this.xaxisdata = this.IncomingXaxis
            }
            if (this.WatchVitalKey == 'Temperature') {
              this.IncomingSeriesArray.push(parseInt(data.Data.Temperature))
              this.IncomingXaxis.push(this.datePipe.transform(data.CreatedDate * 1000, 'dd-MM-yyyy'))
              this.VitalDataArray.push({ "Heartrate": data.Data.Temperature, "CreatedDate": data.CreatedDate })
              this.serisData = this.IncomingSeriesArray
              this.xaxisdata = this.IncomingXaxis

            }
            if (this.WatchVitalKey == 'Oxygen') {
              this.IncomingSeriesArray.push(parseInt(data.Data.Oxygen))
              this.IncomingXaxis.push(this.datePipe.transform(data.CreatedDate * 1000, 'dd-MM-yyyy'))
              this.VitalDataArray.push({ "Heartrate": data.Data.Oxygen, "CreatedDate": data.CreatedDate })
              this.serisData = this.IncomingSeriesArray
              this.xaxisdata = this.IncomingXaxis
            }
            if (this.WatchVitalKey == 'BloodPressure') {
              const [firstNumber, secondNumber] = data.Data.BloodPressure.split('/');
              this.IncomingSeriesArray.push(parseInt(firstNumber))
              this.bpseriesarray2.push(parseInt(secondNumber))
              console.log("kklllkkll", firstNumber, data.CreatedDate)
              this.IncomingXaxis.push(this.datePipe.transform(data.CreatedDate * 1000, 'dd-MM-yyyy'))
              this.VitalDataArray.push({ "Heartrate": data.Data.Hypotension, "Hypertension": data.Data.BloodPressure, "CreatedDate": data.CreatedDate })
              this.serisData = this.IncomingSeriesArray
              this.bpseries2 = this.bpseriesarray2
              this.xaxisdata = this.IncomingXaxis
            }
            if (this.WatchVitalKey == 'Stepcount') {
              this.heartrategraph = false
              this.StepsGraph = true
              this.IncomingSeriesArray.push(parseInt(data.Data.Stepcount))
              this.IncomingXaxis.push(this.datePipe.transform(data.CreatedDate * 1000, 'dd-MM-yyyy'))
              this.VitalDataArray.push({ "Heartrate": data.Data.Stepcount, "Created": data.CreatedDate })
              this.serisData = this.IncomingSeriesArray
              this.xaxisdata = this.IncomingXaxis
            }
            if (this.WatchVitalKey == 'LOCATION') {
              this.heartrategraph = false
              this.mapstab = true
              if (data.DeviceData.Latitude != '' && data.DeviceData.Latitude != 'NaN' && data.DeviceData.Longitude != '' && data.DeviceData.Longitude != 'NaN') {
                this.markers.push({ "Latitude": data.DeviceData.Latitude, "Longitude": data.DeviceData.Longitude })
              }
              // // this.stepsXaxisArray.push(this.datePipe.transform(data.CreatedDate*1000, 'dd-MM-yyyy'))
              // this.stepsSeries = this.stepsSeriesArray
              // this.stepsXaxis = this.stepsXaxisArray
            }
          })
          this.watchIncomingData.reset()
        } else if (response.code == 'S002') {

          alert(response.data)
          this.VitalDataArray = []
          this.IncomingSeriesArray = []
          this.IncomingXaxis = []
          this.bpseriesarray2 = []
          this.bpseries2 = []
          this.serisData = []
          this.xaxisdata = []
        } else {

          this.IncomingSeriesArray = []
          this.IncomingXaxis = []
          this.VitalDataArray = []
          this.bpseriesarray2 = []
          this.bpseries2 = []
          this.serisData = []
          this.xaxisdata = []
          alert(response.data)
        }
      }, (error) => {
        this.VitalDataArray = []
        this.IncomingSeriesArray = []
        this.IncomingXaxis = []
        this.bpseriesarray2 = []
        this.bpseries2 = []
        this.serisData = []
        this.xaxisdata = []
        alert(error.error.data)
      })
    }
  }
  MonthlyData() {
    this.watchIfoBtn = true
    if (this.watchIncomingData.status === 'INVALID') {
      return
    } else {
      this.watchIncomingData.value.Type = this.WatchVitalKey
      this.watchIncomingData.value.ID = this.watchId
      this.watchIncomingData.value.Interval = this.IntervelType
      this.watchIncomingData.value.CustomerID = this.SelectedCustomerId
      this.watchIncomingData.value.StartDate = this.datePipe.transform(this.watchIncomingData.value.StartDate, 'dd-MM-yyyy')
      this.watchIncomingData.value.EndDate = this.datePipe.transform(this.watchIncomingData.value.EndDate, 'dd-MM-yyyy')
      this.userservice.asersMonthlyData(this.watchIncomingData.value).subscribe((response) => {
        // this.spinner.hide()
        if (response.code == 'S001') {
          if (this.IncomingSeriesArray.length > 0 && this.IncomingXaxis.length > 0) {
            this.IncomingSeriesArray = []
            this.IncomingXaxis = []
            this.VitalDataArray = []
            this.bpseriesarray2 = []
            this.bpseries2 = []
          }
          if (response.data.length <= 0) {
            this.nodatafound = true
            this.heartrategraph = true
            this.graphblock = false
            this.sleepGraphContainer = false
          } else {
            this.heartrategraph = true
            this.nodatafound = false
            this.graphblock = true
            this.sleepGraphContainer = false
          }
          this.IncomeWatchData = response.data
          this.IncomeWatchData.filter((data: any) => {
            if (this.WatchVitalKey == 'HeartRate') {
              this.heartrategraph = true
              this.IncomingSeriesArray.push(parseInt(data.HeartRate))
              this.IncomingXaxis.push(data._id)
              this.VitalDataArray.push({ "Heartrate": data.HeartRate, "Date": data._id })
              this.serisData = this.IncomingSeriesArray
              this.xaxisdata = this.IncomingXaxis
            }
            if (this.WatchVitalKey == 'Temperature') {
              this.IncomingSeriesArray.push(parseInt(data.Temperature))
              this.IncomingXaxis.push(data._id)
              this.VitalDataArray.push({ "Heartrate": data.Temperature, "Date": data._id })
              this.serisData = this.IncomingSeriesArray
              this.xaxisdata = this.IncomingXaxis
            }
            if (this.WatchVitalKey == 'Oxygen') {
              this.IncomingSeriesArray.push(parseInt(data.Oxygen))
              this.IncomingXaxis.push(data._id)
              this.VitalDataArray.push({ "Heartrate": data.Oxygen, "Date": data._id })
              this.serisData = this.IncomingSeriesArray
              this.xaxisdata = this.IncomingXaxis
            }
            if (this.WatchVitalKey == 'BloodPressure') {

              // const [firstNumber, secondNumber] = data.Data.BloodPressure.split('/');
              this.IncomingSeriesArray.push(parseInt(data.BloodPressure))
              // this.bpseriesarray2.push(parseInt(secondNumber))
              this.IncomingXaxis.push(this.datePipe.transform(data._id * 1000, 'dd-MM-yyyy'))
              this.VitalDataArray.push({ "Heartrate": data.BloodPressure, "CreatedDate": data._id })
              this.serisData = this.IncomingSeriesArray
              this.bpseries2 = this.bpseriesarray2
              this.xaxisdata = this.IncomingXaxis
            }
            if (this.WatchVitalKey == 'Stepcount') {

              console.log("ccccccc", data)
              this.heartrategraph = false
              this.StepsGraph = true
              this.IncomingSeriesArray.push(parseInt(data.Stepcount))
              this.IncomingXaxis.push(data._id)
              this.VitalDataArray.push({ "Heartrate": data.Stepcount, "Created": data._id })
              this.serisData = this.IncomingSeriesArray
              this.xaxisdata = this.IncomingXaxis
              console.log("after", this.serisData)
            }
            if (this.WatchVitalKey == 'LOCATION') {
              this.heartrategraph = false
              this.mapstab = true
              if (data.DeviceData.Latitude != '' && data.DeviceData.Latitude != 'NaN' && data.DeviceData.Longitude != '' && data.DeviceData.Longitude != 'NaN') {
                this.markers.push({ "Latitude": data.DeviceData.Latitude, "Longitude": data.DeviceData.Longitude })
              }
              // // this.stepsXaxisArray.push(this.datePipe.transform(data.CreatedDate*1000, 'dd-MM-yyyy'))
              // this.stepsSeries = this.stepsSeriesArray
              // this.stepsXaxis = this.stepsXaxisArray
            }
          })
          this.watchIncomingData.reset()
        } else if (response.code == 'S002') {
          this.VitalDataArray = []
          alert(response.message
          )
        } else {
          this.VitalDataArray = []
          alert(response.data)
        }
      }, (error) => {
        this.VitalDataArray = []
        alert(error.error.data)
      })
    }
  }
  CustomizeModeGraph() {
    this.Customizetab = !this.Customizetab
  }
  //Remainders Functions ////////////////
  daysEmptyArray: boolean = false
  alarmObjSubmit: boolean = false
  remaindersTab() {
    this.remainderScreen = !this.remainderScreen
    this.visible = false
    this.InstantScreen = false
  }

  // multiSelect functions
  public onItemSelect(item: any) {
    let allDays = item
    this.days.push(allDays.Value)
  }
  public onDeSelect(item: any) {
    let filtermusic = this.days.filter((obj: any) => {
      return obj != item.Value
    })
    this.days = filtermusic
    // this.days.push(item)
  }
  public onSelectAll(items: any) {
    let allDays = items
    for (let dayValue of allDays) {
      this.days.push(dayValue.Value)
    }
  }
  public onDeSelectAll(items: any) {
    this.days = []
  }
  addAlaramType() {
    this.alarmObjSubmit = true
    if (this.alarmObj.status == 'INVALID') {
      if (this.days.length < 0) {
        this.daysEmptyArray = true
      }
    } else {

      if (this.alarms.some((limit: any) => limit.AlarmType === this.alarmObj.value.AlarmType)) {
        alert('already exists ...');
      } else {
        this.alarmObj.value.Days = this.days
        if (this.alarmObj.value.IsAlarmOn == '' || this.alarmObj.value.IsAlarmOn == null) {
          this.alarmObj.value.IsAlarmOn = false
        }
        this.alarms.push(this.alarmObj.value)
        this.alarmObj.reset()
        this.days = []
      }
    }
  }
  SaveRemainder() {
    this.RemaindersForm.value.AlarmData = this.alarms
    if (this.RemaindersForm.value.AlarmSwitch == null || this.RemaindersForm.value.AlarmSwitch == '') {
      this.RemaindersForm.value.AlarmSwitch = true
    }
    this.userservice.assersupdatesettings(this.RemaindersForm.value).subscribe((response) => {
      if (response.code == 'S001') {
        alert(response.data)
      } else if (response.code == 'S002') {
        alert(response.message)
      } else {
        alert(response.message)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }
  editRemainder(alarms: any, RemainderIndex: any) {
    this.remainderAddBtn = false
    this.remainderUpdBtn = true
    let daysarray: any = []
    this.RemainderIndex = RemainderIndex
    this.alarmObj.patchValue({ 'AlarmType': alarms.AlarmType })
    this.alarmObj.patchValue({ "Time": alarms.Time })
    this.alarmObj.patchValue({ IsAlarmOn: alarms.IsAlarmOn })
    this.WeekDays.filter((data: any) => {
      for (let a of alarms.Days) {
        if (data.Value == a) {
          daysarray.push(data)
        }
      }
    })
    this.alarmObj.patchValue({ Days: daysarray })
    // this.WeekDays= alarms.Days
  }
  UpdateRemainders() {
    for (let dayValue of this.alarmObj.value.Days) {
      this.days.push(dayValue.Value)
    }
    this.alarmObj.value.Days = this.days
    this.alarms[this.RemainderIndex] = this.alarmObj.value
    this.alarmObj.reset()
  }
  //Instant Data get Screen Functions 
  instantUpdateGet(type: any) {
    let InstantObj: any = {
      "Type": type,
      "watchID": this.watchId
    }
    this.userservice.assersupdatesettings(InstantObj).subscribe((response) => {
      if (response.code == 'S001') {
        alert(response.data)
      } else {
        alert(response.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }

// All forms are decleared here 

thresholdFormFunction(){
  this.thersholdform = this.formBuilder.group({
    ThresholdLimits: this.formBuilder.array([])
  });
}

ThresholdLimit(): FormArray {
  return this.thersholdform.get("ThresholdLimits") as FormArray;
}
// custoization form 
customizationSettingsFormFunction(){
  this.CustomizeSettinsForm = this.formBuilder.group({
    IsGpsOn: [''],
    Time: [''],
    WorkingMode: '8'
  })
}

//location mac form function for location settings 
macLocationForm(){
  this.LocationMacForm = this.formBuilder.group({
    Type: [''],
    IsGpsOn: [''],
    Seconds: ['']
  })
}

// sleep settings form function 

sleepSettingsFunction(){
  this.SleepSetting = this.formBuilder.group({
    "Type": "SleepTime",
    "watchID": "",
    "SleepSwitch": "",
    "SleepStartTime": "",
    "SleepEndTime": ""
  })
}

// customization of sleep setting form 

sleepCustomizationFunction(){
  this.CustomisSleepDates = this.formBuilder.group({
    'StartDate': '',
    'EndDate': ''
  })
}

viewcontactsformbuilder() {
  this.Contactsform = this.formBuilder.group({
    Name: ['', [Validators.required]],
    Number: ['', [Validators.minLength(10)]],
  })
}


viewwatchasersdetailsformbuilder() {
  this.viewaserssettings = this.formBuilder.group({
    Type: ['', []],
    watchID: ['', []],
    WorkMode: ['', [Validators.required]],
    FallAlertSensitivity: ['', [Validators.required]],
    SwitchForWhitelist: ['', [Validators.required]],
    FallAlarmSensitivity: ['', [Validators.required]],
    IsAutoMeasurementOn: ['', [Validators.required]],
    Minutes: ['', []],
  })
}


newThershold(): FormGroup {
  return this.formBuilder.group({
    VitalType: ['', [Validators.required, Validators.min(70)]],
    MinValue: "",
    MaxValue: ""
  });
}

watchDataParams() {
  this.watchIncomingData = this.formBuilder.group({
    "EndDate": [''],
    "StartDate": [''],
    "Type": [''],
    "ID": [''],
    "Interval": ['']
  })
}

remainderform() {
  this.RemaindersForm = this.formBuilder.group({
    Type: "SetAlarm",
    watchID: this.watchId,
    AlarmSwitch: [''],
    AlarmData: ['']
  })
}
alaramDataObj() {
  this.alarmObj = this.formBuilder.group({
    AlarmType: [''],
    Time: [''],
    Days: [''],
    IsAlarmOn: ['']
  })
}


}
