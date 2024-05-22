import { Component, OnInit, ElementRef, Renderer2, ViewChild} from '@angular/core';
import { UsersService } from '../../users.service'
import { Router, Routes, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, UntypedFormArray } from '@angular/forms';
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
  selector: 'app-customerdetails',
  templateUrl: './customerdetails.component.html',
  styleUrls: ['./customerdetails.component.css']
})
export class CustomerdetailsComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  // public chartOptions: Partial<ChartOptions>;
  public viewaserssettings: UntypedFormGroup
  public thersholdform: UntypedFormGroup
  public Contactsform: UntypedFormGroup
  CustomerID: any
  CustomerObj: any = {}
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
  CustomizeSettinsForm: UntypedFormGroup
  maxdate = new Date()
  watchIncomingData: UntypedFormGroup
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
  RemaindersForm: UntypedFormGroup
  alarmObj!: UntypedFormGroup
  alarms: any = []
  remainderAddBtn: boolean = true
  remainderUpdBtn: boolean = false
  RemainderIndex: any
  InstantScreen: boolean = false
  LocationMacForm: UntypedFormGroup
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
  sleepForm: UntypedFormGroup
  // sleep Data Declerations
  sleepGraphContainer: boolean = false
  toDay: any
  Sleep_x_Axis:any = []
  Sleep_Seriase:any=[]
  SleepXaxis:any = []
  SleepSeriase:any = []
  customYAxisLabels: any = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'];
  CustomisSleepDates:UntypedFormGroup
  //Steps Graph
  StepsGraph:boolean = false
  Did : any
  EcgBtn:boolean = false 
  constructor(private userservice: UsersService, private route: Router, private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService, private UsersService: UsersService, private FormBuilder: UntypedFormBuilder, private datePipe: DatePipe) {
  }
  @ViewChild('alarmDataModal') alarmDataModal: ElementRef;
  @ViewChild('AlaramData', { static: false }) alaramDataModal: any;
  @ViewChild('btn') fileInput:ElementRef;

  ngOnInit(): void {
    this.thersholdform = this.FormBuilder.group({
      ThresholdLimits: this.FormBuilder.array([])
    });
    // this.generateTimeSlots({},{})
    // this.watchIncomingData.patchValue({"EndDate":this.maxdate})
    this.CustomerID = this.activatedRoute.snapshot.queryParamMap.get("CustomerID");
    this.watchId = this.activatedRoute.snapshot.queryParamMap.get("DeviceId");
    this.Did = this.activatedRoute.snapshot.queryParamMap.get("modelID");
    this.CustomerDetails()
    this.devices()
    this.watchviewsettings()
    this.thershold(this.CustomerID,this.Did)
    this.ThresholdLimit()
    this.newThershold()
    this.viewwatchasersdetailsformbuilder()
    this.viewcontactsformbuilder()
    this.watchDataParams()
    this.remainderform()
    this.alaramDataObj()
    this.whatchAlarmData()
    this.selectedWatchVitals('HeartRate','Hour')

    this.sleepForm = this.FormBuilder.group({
      "Type": "SleepTime",
      "watchID": "",
      "SleepSwitch": "",
      "SleepStartTime": "",
      "SleepEndTime": ""
    })

   
  
    this.dropdownSettings = {
      // singleSelection: false,
      idField: 'Value',
      textField: 'Day',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 6,
      allowSearchFilter: true
    };
    this.CustomisSleepDates = this.FormBuilder.group({
      'StartDate':'',
      'EndDate':''
    })
    this.toDay = new Date()
    this.toDay = this.datePipe.transform(this.toDay, 'dd-MM-yyyy')

    
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

  Selectedfeatures(event:any){
  }

  // openModal(modalId: string) {

  //   this.modalService.open('alarmDataModal');
  // }


  openAlarmDataModal() {
    // const modalRef = this.modalService.open(this.alaramDataModal);
    // this.btn.nativeElement.click();
    // // Optionally, you can subscribe to the modal's events or perform other actions.
    // modalRef.result.then((result) => {
    //   console.log(`Modal closed with result: ${result}`);
    // }, (reason) => {
    //   console.log(`Modal dismissed with reason: ${reason}`);
    // });
  }
  
  Devices:any = []
  devices() {
    this.userservice.allElectronicDevices().subscribe((devicelist) => {
      // this.VitalType = this.Devices[0].Features
      if (devicelist.code == "S001") {

        this.Devices = devicelist.data.filter((model:any)=>{
              if(model.DeviceID == this.Did){
                   return model
            }
        })
       this.Devices = this.Devices[0].Features.filter((feature:any)=>  feature.Type=='Screen')
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
    return this.Devices.some((feature:any) => feature.Feature === featureName);
  }
  CustomerDetails() {
    this.spinner.show()
    this.UsersService.customerWatchDetails({ "CustomerID": this.CustomerID }).subscribe((response) => {
      this.spinner.hide();
      if (response.code == "S001") {
        this.CustomerObj = response.data.filter((data:any)=>{
            if(data.DeviceDetails.DeviceID ==  this.Did){
               return data
                 
            }
        })
        this.CustomerObj = this.CustomerObj[0]
        this.ConfigSequence = this.CustomerObj.ConfigSequence
        this.CustomerID = this.CustomerObj.UserDetails.CustomerID
        this.DeviceID = this.CustomerObj.DeviceDetails.DeviceID
        this.dashboarddetails()
      } else {
        this.spinner.hide();
        alert(response.data)
      }
    }, ((error) => {
      this.spinner.hide();
    }))
  }
  arrayOfArrays:any =[]
  getSleepData(date: any) {
    let obj:any = {
      "SleepStartDate": " ",
      "SleepEndDate": "",
      "Type": "SleepTime",
      "ID": this.watchId
    }
    if (date == 'today') {
      obj.SleepStartDate = this.toDay
      obj.SleepEndDate = this.toDay
    }
    if(date == 'custom'){
      obj.SleepStartDate = this.datePipe.transform(this.CustomisSleepDates.value.StartDate, 'dd-MM-yyyy')
      obj.SleepEndDate = this.datePipe.transform(this.CustomisSleepDates.value.EndDate, 'dd-MM-yyyy')
    }
    this.UsersService.getAseresSleepData(obj).subscribe((response) => {
      this.spinner.hide();
      if (response.code == "S001") {
           this.nodatafound = false
          this.graphblock = true
          this.sleepGraphContainer = true
         if(this.arrayOfArrays.length > 0 ){
            this.arrayOfArrays = []
         }
         if(this.Sleep_x_Axis.length> 0 && this.Sleep_Seriase.length > 0){
          this.Sleep_x_Axis=[]
          this.Sleep_Seriase=[]
         }
        response.data.forEach((obj:any) => {
            let xaxis = []
            let series = []
             for(let a of obj.Data.sleep_stages){
              xaxis.push(a.sleeptime)
              series.push(a.sleep)
             }
            obj.SleepInterval = xaxis
            obj.Sleep = series
          this.arrayOfArrays.push([obj]); // Create a new array containing the object
        });
        for(let array of this.arrayOfArrays){
            this.Sleep_x_Axis = array[0].SleepInterval
            this.Sleep_Seriase = array[0].Sleep
        }
        
      }else{
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
  sleepDynamicGraph(data:any){
      if(this.Sleep_x_Axis.length> 0 && this.Sleep_Seriase.length > 0){
        this.Sleep_x_Axis=[]
        this.Sleep_Seriase=[]
       }
       this.Sleep_x_Axis=data.SleepInterval
       this.Sleep_Seriase=data.Sleep
  }
  SleepDataContainer() {
    this.sleepGraphContainer = true
    this.heartrategraph = false
    this.StepsGraph = false
    this.getSleepData('today')
  }
  watchviewsettings() {
    this.userservice.viewwatchsettings(this.watchId).subscribe((response) => {
      if (response.code == 'S001') {
        this.settingsview = response.data[0]
        if (this.settingsview.WorkingMode.WorkingMode == '8') {
          this.customizeSettingsTab = true
        }        
        this.viewaserssettings.patchValue({ "WorkMode": this.settingsview?.WorkingMode?.WorkingMode})
        this.viewaserssettings.patchValue({ "FallAlertSensitivity": this.settingsview?.IsFallAlertSensitivity })
        this.viewaserssettings.patchValue({ "SwitchForWhitelist": this.settingsview?.IsWhiteListOn })
        this.viewaserssettings.patchValue({ "IsAutoMeasurementOn": this.settingsview?.SetHealthData?.IsAutoMeasurementOn })
        this.viewaserssettings.patchValue({ "Minutes": this.settingsview?.SetHealthData?.Time })
        this.viewaserssettings.patchValue({ "FallAlarmSensitivity": this.settingsview?.FallAlarmSensitivity })
        this.viewaserssettings.controls['CustomizeSettinsForm'].patchValue({"Time": this.settingsview.WorkingMode.Time })
        this.viewaserssettings.controls['CustomizeSettinsForm'].patchValue({"IsGpsOn": this.settingsview.WorkingMode.IsGpsOn })
        this.viewaserssettings.controls['CustomizeSettinsForm'].patchValue({"WorkingMode": this.settingsview.WorkingMode.WorkingMode })
        this.viewaserssettings.controls['LocationMacForm'].patchValue({"IsGpsOn": this.settingsview.LocationMac.IsGpsOn })
        this.viewaserssettings.controls['LocationMacForm'].patchValue({"Seconds": this.settingsview.LocationMac.Seconds})
        this.viewaserssettings.controls['sleepForm'].patchValue({"SleepSwitch": this.settingsview.SleepTime.SleepSwitch})
        this.viewaserssettings.controls['sleepForm'].patchValue({"SleepStartTime": this.settingsview.SleepTime.SleepStartTime})
        this.viewaserssettings.controls['sleepForm'].patchValue({"SleepEndTime": this.settingsview.SleepTime.SleepEndTime})
   
      } else if (response.code == 'S002') {
        alert(response.msg)
      } else {
        alert(response.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }
  viewcontactsformbuilder() {
    this.Contactsform = this.FormBuilder.group({
      Name: ['', [Validators.required]],
      Number: ['', [Validators.minLength(10)]],
    })
  }
  viewwatchasersdetailsformbuilder() {
    this.viewaserssettings = this.FormBuilder.group({
      Type: ['', []],
      watchID: ['', []],
      WorkMode: ['', [Validators.required]],
      FallAlertSensitivity: ['', [Validators.required]],
      SwitchForWhitelist: ['', [Validators.required]],
      FallAlarmSensitivity: ['', [Validators.required]],
      IsAutoMeasurementOn: ['', [Validators.required]],
      Minutes: ['', []],
      CustomizeSettinsForm : this.FormBuilder.group({
        IsGpsOn: [''],
        Time: [''],
        WorkingMode: '8'
      }),
       LocationMacForm:this.FormBuilder.group({
        Type: [''],
        IsGpsOn: [''],
        Seconds: ['']
      }),
      sleepForm:this.FormBuilder.group({
        "Type": "SleepTime",
        "watchID": "",
        "SleepSwitch": "",
        "SleepStartTime": "",
        "SleepEndTime": ""
      })
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
  
  EcgLink:any
  dashboarddetails() {

    this.spinner.show()
    this.UsersService.customerdashboarddetails(this.CustomerID,this.watchId).subscribe((response) => {
      this.spinner.hide();
      if (response.code == "S001") {
        const data = response.data
        if(data){

        }
        const dataArray = Object.keys(data).map(key => ({ key, value: data[key] }));

              for(let data of dataArray){
                   if(data.key == 'Ecgdata'){
                    this.EcgBtn = true

                    this.EcgLink = data.value.Data?.PDFFile
                  
                   }else{
                    this.EcgBtn = false 
                     
                   }
              }

        this.dashboarddata = dataArray.filter((data:any)=>{

               if(data.key != 'Ecgdata'&&data.key!='Location'){
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


  ecgfunction(){
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
    this.viewaserssettings.value.IsGpsOn = this.viewaserssettings?.controls['CustomizeSettinsForm'].value.IsGpsOn
    this.viewaserssettings.value.Time = this.viewaserssettings?.controls['CustomizeSettinsForm'].value.Time
    this.userservice.assersupdatesettings(this.viewaserssettings.value).subscribe((response) => {
      if (response.code == 'S001') {
        alert(response.data + "fffff")
        this.customizeSettingsTab = false
        // this.viewaserssettings.reset()
        this.watchviewsettings()
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

    let LocationsObj = {
        Type:type,
        watchID:this.watchId,
        IsGpsOn: this.viewaserssettings?.controls['LocationMacForm'].value.IsGpsOn,
        Seconds: this.viewaserssettings?.controls['LocationMacForm'].value.Seconds
    }
   
    this.userservice.assersupdatesettings(LocationsObj).subscribe((response) => {
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
    
    let sleepObj = {
      "Type": "SleepTime",
      "watchID": this.watchId,
      "SleepSwitch": this.viewaserssettings?.controls['sleepForm'].value.SleepSwitch,
      "SleepStartTime":this.viewaserssettings?.controls['sleepForm'].value.SleepStartTime,
      "SleepEndTime":this.viewaserssettings?.controls['sleepForm'].value.SleepEndTime
    }
  
    this.userservice.assersupdatesettings(sleepObj).subscribe((response) => {
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
        this.watchviewsettings()
      } else if (response.code == 'S002') {
        alert(response.data)
      } else {
        alert(response.data)
      }
    }, (error) => {
      alert(error.error?.message)
    })
  }
  thershold(CustomerID: any,DeviceID:any) {
    this.userservice.configrationDetails(CustomerID,DeviceID).subscribe((response) => {
      if (response.code == 'S001') {
        this.WhitlistedContacts = response?.data?.Whitelisted_Contacts.map((item:any) => {
          return {
            Name: item?.Name,
            Number: item?.ContactNumber
          }
        })
        for (let i = 0; i < response.data.ThresholdLimits.length; i++) {
          this.ThresholdLimit().push(this.newThershold());
          this.thersholdform.controls['ThresholdLimits'].patchValue(response.data.ThresholdLimits);
        }
        const formArray = this.thersholdform.get('ThresholdLimits') as UntypedFormArray;
        formArray.controls.forEach((control: any) => {
          control.disable();
        });
      } else {
        alert(response.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }
  ThresholdLimit(): UntypedFormArray {
    return this.thersholdform.get("ThresholdLimits") as UntypedFormArray;
  }
  newThershold(): UntypedFormGroup {
    return this.FormBuilder.group({
      VitalType: ['', [Validators.required]],
      MinValue: "",
      MaxValue: ""
    });
  }
  EditConfiguration() {
    const formArray: any = this.thersholdform.get('ThresholdLimits') as UntypedFormArray;
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
  vitalkey:any
  selectedWatchVitals(vital: any, Intervel: any) {
   
     const key = vital.key
    this.WatchVitalKey = vital
    this.vitalkey = key
    if(vital =='Stepcount'){
       this.StepsGraph = true
       this.heartrategraph = false
       this.sleepGraphContainer = false
    }else{
      this.StepsGraph = false
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
  watchDataParams() {
    this.watchIncomingData = this.FormBuilder.group({
      "EndDate": [''],
      "StartDate": [''],
      "Type": [''],
      "ID": [''],
      "Interval": ['']
    })
  }
  nodatafound: boolean = false
  count: any = 0
  graphblock: boolean = false
  WatchData() {
    if (this.watchIncomingData.status == 'INVALID') {
    } else {
      this.watchIncomingData.value.Type = this.WatchVitalKey
      this.watchIncomingData.value.ID = this.CustomerObj.DeviceDetails?.IMEINumber
      this.watchIncomingData.value.Interval = this.IntervelType
      this.watchIncomingData.value.CustomerID = this.CustomerID
      // this.watchIncomingData.value.StartDate = this.datePipe.transform(this.watchIncomingData.value.StartDate, 'dd-MM-yyyy')
      // this.watchIncomingData.value.EndDate = this.datePipe.transform(this.watchIncomingData.value.EndDate, 'dd-MM-yyyy')
      this.userservice.incommingWatchData(this.watchIncomingData.value).subscribe((response) => {
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
        } else {
          alert(response.data)
        }
      }, (error) => {
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
      this.watchIncomingData.value.ID = this.CustomerObj.DeviceDetails.IMEINumber
      this.watchIncomingData.value.Interval = this.IntervelType
      this.watchIncomingData.value.CustomerID = this.CustomerID
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
              this.IncomingSeriesArray.push(parseInt(data.Heartrate))
              this.IncomingXaxis.push(data._id)
              this.VitalDataArray.push({ "Heartrate": data.Heartrate, "Date": data._id })
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

              const [firstNumber, secondNumber] = data.BloodPressure.split('/');
              this.IncomingSeriesArray.push(parseInt(firstNumber))
              this.bpseriesarray2.push(parseInt(secondNumber))
              this.IncomingXaxis.push(this.datePipe.transform(data._id * 1000, 'dd-MM-yyyy'))
              this.VitalDataArray.push({  "Hypertension": data.BloodPressure, "CreatedDate": data.CreatedDate })
              this.serisData = this.IncomingSeriesArray
              this.bpseries2 = this.bpseriesarray2
              this.xaxisdata = this.IncomingXaxis
            }
            if (this.WatchVitalKey == 'Stepcount') {
              this.heartrategraph = false
              this.IncomingSeriesArray.push(parseInt(data.Stepcount))
              this.IncomingXaxis.push(data._id)
              this.VitalDataArray.push({ "Heartrate": data.Stepcount, "Created": data._id })
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
          alert(response.message
          )
        } else {
          alert(response.data)
        }
      }, (error) => {
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
  remainderform() {
    this.RemaindersForm = this.FormBuilder.group({
      Type: "SetAlarm",
      watchID: this.watchId,
      AlarmSwitch: [''],
      AlarmData: ['']
    })
  }
  alaramDataObj() {
    this.alarmObj = this.FormBuilder.group({
      AlarmType: [''],
      Time: [''],
      Days: [''],
      IsAlarmOn: ['']
    })
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
      //  let ConvertedDays:any = [ ]
      //  this.days.filter((obj:any) => {
      //   ConvertedDays.push(obj.Value) 
      // })
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
}