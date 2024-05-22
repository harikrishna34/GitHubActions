import { Component, OnInit,Injectable,NgModule  } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from './users.service'
import { SwPush } from "@angular/service-worker";
import { AppliationDashboardComponent  } from './application-dashboard/application-dashboard.component';
import { AsersmonitoringComponent } from './asersmodule/asersmonitoring/asersmonitoring.component';
// import { EmergecyCustomerDataComponent} from './emergecy-customer-data/emergecy-customer-data.component'
// import { NotificationPermission } from 'ngx-webpush';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AsersmonitoringComponent,AppliationDashboardComponent],
})
export class AppComponent implements OnInit {
  [x: string]: any;
  constructor(private _swPush: SwPush,private route: Router, private activatedRoute: ActivatedRoute,private monitoringComponent:AsersmonitoringComponent,private userservice: UsersService,private ApplicationDashBoard:AppliationDashboardComponent) { }
  EmergencyCustomerDetails:any
  modelBox:boolean=false
  token: any
  href:any
  currentURL:any;
  RecordID:any
  audioPath = new Audio('../../assets/alarmSounds/sirena_ambulanza.mp3')
  audioPath1 = new Audio('../../assets/alarmSounds/notification.mp3')
  sosPng:boolean=false
  fallpng:boolean = false
  deviceData:any
  notificationstobeshownasalert:any
  dropDownsThreeDotes:boolean=false
  // userAgent:string
  ngOnInit(): void {
   
    if (!sessionStorage.getItem('isPageRefreshed')) {
      sessionStorage.setItem('isPageRefreshed', 'true');
     // This will reload page once prevent reloading of page again for that session.
      window.location.reload();
 
  }
    console.log("This is working ")
    this.token = localStorage.getItem('x-fiftyaccess-token')
    if(this.token ==null){
      this.route.navigate(["login"],)
    }
 
    // this.webSubscription()
    this.requestSubscription()
    this._swPush.messages.subscribe((message:any)=>{
      console.log(message)
      this.notificationstobeshownasalert=message


      if(this.notificationstobeshownasalert?.notification?.customData?.NotificationFor == 'Emergency call Status Update'){
        this.audioPath.pause()
        this.audioPath1.pause()

        console.log('calling Notification Alarm sound')
      }
      if(this.notificationstobeshownasalert?.notification?.customData?.NotificationFor == 'Emergency Status Update'){
        // this["EmergecyCustomerDataComponent"].updateEmergrncyStatus({})
        this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload'
      // this.route.navigate(['./Dashboard/emergencyList'])
      }
      else if(this.notificationstobeshownasalert?.notification?.customData?.NotificationFor == 'CallCentre'){
        this.audioPath1.play()
        this.route.navigate(["/Dashboard/CustomerDashboard/customerComprehensiveDB"],{ queryParams:{CustRecID:this.notificationstobeshownasalert?.notification?.customData?.Details?.Cutomerdetails?.CustRecID}})
      }else{
        
        if(this.notificationstobeshownasalert?.notification?.customData?.AlarmType == "SOSAlarm"||this.notificationstobeshownasalert?.notification?.customData?.AlarmType == "FallAlarm"){
        this.audioPath.play()
          this.route.navigate(["/Dashboard/emergencyList"])
          this.notificationstobeshownasalert=false
        }else if(this.notificationstobeshownasalert?.notification?.customData?.AlarmType == "WearNoticeAlarm"||this.notificationstobeshownasalert?.notification?.customData?.AlarmType == "ThresholdAlarm"||this.notificationstobeshownasalert?.notification?.customData?.AlarmType == "GeoFenceAlarm"||this.notificationstobeshownasalert?.notification?.customData?.AlarmType == "HeartFailAlarm"||this.notificationstobeshownasalert?.notification?.customData?.AlarmType == "LowBatteryAlarm"){
        this.audioPath.play()
          this.route.navigate(["/Dashboard/asers/AsersMonitoring"])
          this.notificationstobeshownasalert=false
        }else if(this.notificationstobeshownasalert?.notification?.customData?.NotificationFor == 'Emergency'){
        this.audioPath.play()
          this.route.navigate(["/Dashboard/emergencyList"])
          this.notificationstobeshownasalert=false
        }else if(this.notificationstobeshownasalert?.notification?.customData?.NotificationFor == 'CallCentre'){
        this.audioPath.play()
          this.modelBox = false
          this.notificationstobeshownasalert=false
        }
      } 
     
    }
      )
 
    this._swPush.notificationClicks.subscribe(
      ({action,notification})=>{
        window.open(notification.data.url)
 
    })
   
    //  this.watchComponent.test()
    //  this.watchComponent.alertAction()
     
    // this.test()
   
 
    if ('Notification' in window && 'serviceWorker' in navigator) {
      if (Notification.permission === 'granted') {
        // Permission already granted
        // You can proceed with subscribing to push notifications
        // const authKey =.getKey('auth');
      //  this.requestSubscription();
      // this.webSubscription()
      } else if (Notification.permission !== 'denied') {
        // Request permission
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            // Permission granted
            // You can proceed with subscribing to push notifications
          //  this.requestSubscription();
            //  this.webSubscription()
          } else {
            // Permission denied or dismissed
            console.log('Notification permission denied');
          }
        });
      } else {
        // Permission denied
        console.log('Notification permission denied');
      }
    } else {
      // Browser does not support web push notifications
      console.log('Web push notifications not supported');
    }
 
   
    // this.userAgent = navigator.userAgent;     console.log('User Agent:', this.userAgent);


  }
 
  // webSubscription(){
 
  //   console.log(this._swPush.isEnabled)
 
  //   if (!this._swPush.isEnabled) {
  //     console.log("Notification is not enabled.");
  //     return;
  //   }
  //   this._swPush.requestSubscription({
  //     serverPublicKey:'BDDuFQHrBFdrkhsi_FTa9uAhgmnrgjas7FGEUfN0D-vuGcDpBw2MYtaAteQbIJit7T71hVB_foskg4acLvyfPFg'
  //   }).then((subscription:any) =>{
  //     // AppliationDashboardComponent.emergencyCountApi()
  //     console.log(subscription)
  //     const Keys = subscription.toJSON();
  //     console.log("Keys",Keys)
  //     // this.subscribenotification(Keys)}).catch(err => console.log(err));
  //     this.websubscribenotification(Keys)}).catch(err => console.log(err));
     
  // }
  // webrequestSubscription(){
 
  //   console.log(this._swPush.isEnabled)
 
  //   // if (!this._swPush.isEnabled) {
  //   //   console.log("Notification is not enabled.");
  //   //   return;
  //   // }
  //   this._swPush.requestSubscription({
  //     serverPublicKey: 'BHoZ3uhDUr5Sytm9P9Xd-tFPKy3DsUDiEjrO10ybpIUXnztQZ5Es8AE7_md4g3wiMVYWBBxXSuCIhoqAln7DlAU'}).then((subscription:any) =>{
 
     
  //     var  Keys = subscription.toJSON();
  //     console.log("2222",Keys)
  //     this.websubscribenotification(Keys)}).catch(err => console.log(err));
     
  // }
 
 
  requestSubscription(){
 
    console.log(this._swPush.isEnabled)
 
    if (!this._swPush.isEnabled) {
      console.log("Notification is not enabled.");
      return;
    }
    this._swPush.requestSubscription({
      serverPublicKey: 'BKqvrKH1aFMiNWh7VfJCZbKSZWHWOmIUey1ZObD5wTqSb7rvlxnVrBaEMlKEs5e86xiixIj1RAO3OeqM1xap4Z4'
    }).then((subscription:any) =>{
      // AppliationDashboardComponent.emergencyCountApi()
      const Keys = subscription.toJSON();
      console.log('ddddddd',Keys)
      this.subscribenotification(Keys)}).catch(err => console.log(err));
     
  }
 
 
 
  subscribenotification(keys:any){
 
     let endPointObj = {
      "endpoint":'',
      "expirationTime":'',
      "keys":'',
      "Token":'',
      "ServerType":"Tcp"
     }
 
     endPointObj.endpoint = keys.endpoint
     endPointObj.expirationTime = keys.endpoint
     endPointObj.keys = keys.keys
     endPointObj.Token = this.token
   
   
     console.log('subcription called ')
   
    this.userservice.subscribe(endPointObj).subscribe((Response) => {
      if (Response.code == "S001") {
        // console.log('subcription response')
      } else {
        // alert(Response.message)
      }
 
    }, (error) => {
      // alert(error.error.message)
    })
  }
 
//   websubscribenotification(keys:any){
 
//     let endPointObj = {
//      "endpoint":'',
//      "expirationTime":'',
//      "keys":'',
//      "Token":'',
//      "ServerType":"Web"
//     }
 
//     endPointObj.endpoint = keys.endpoint
//     endPointObj.expirationTime = keys.endpoint
//     endPointObj.keys = keys.keys
//     endPointObj.Token = this.token
   
   
//     console.log('subcription called ')
   
//    this.userservice.subscribe(endPointObj).subscribe((Response) => {
//      if (Response.code == "S001") {
 
//        console.log('subcription response',Response)
//      } else {
//        alert(Response.message)
//      }
 
//    }, (error) => {
//      alert(error.error.message)
//    })
//  }
  // test() {
  //   setInterval(() => {
  //     // this.watchalarm()
  //     this.emergencyCountApi()
  //   }, 60000)
  // }
 
 
  alaramRecords:any=[]
  alertAction() {
    this.modelBox = false
     for(let records of this.EmergencyCustomerDetails){
        this.alaramRecords.push(records.RecordID)        
     }
     Array.from(new Set(this.alaramRecords))
     this.stopAlarm()
    this.audioPath.pause()
   
  }
 
  watchalarm() {
 
 
    this.userservice.watchAlarmData({ "Type": "AL_LTE" }).subscribe((Response) => {
      if (Response.code == "S001") {
        if(Response.data.length != 0){
          this.EmergencyCustomerDetails =  Response.data
       
            // console.log("incoming data",this.EmergencyCustomerDetails)
          this.audioPath.play()
          this.modelBox = true
        }
       
      } else {
        alert(Response.message)
      }
 
    }, (error) => {
      alert(error.error.message)
    })
  }
 
  emergencynavigation(){
      if(this.notificationstobeshownasalert?.notification?.customData?.AlarmType == "SOSAlarm"||this.notificationstobeshownasalert?.notification?.customData?.AlarmType == "FallAlarm"){
        this.route.navigate(["/Dashboard/emergencyList"])
        this.notificationstobeshownasalert=false
      }else if(this.notificationstobeshownasalert?.notification?.customData?.AlarmType == "WearNoticeAlarm"||this.notificationstobeshownasalert?.notification?.customData?.AlarmType == "ThresholdAlarm"||this.notificationstobeshownasalert?.notification?.customData?.AlarmType == "GeoFenceAlarm"||this.notificationstobeshownasalert?.notification?.customData?.AlarmType == "HeartFailAlarm"||this.notificationstobeshownasalert?.notification?.customData?.AlarmType == "LowBatteryAlarm"){
        this.route.navigate(["/Dashboard/asers/AsersMonitoring"])
        this.notificationstobeshownasalert=false
      }else if(this.notificationstobeshownasalert?.notification?.customData?.NotificationFor == 'Emergency'){
        this.route.navigate(["/Dashboard/emergencyList"])
        this.notificationstobeshownasalert=false
      }else if(this.notificationstobeshownasalert?.notification?.customData?.NotificationFor == 'CallCentre'){
        this.modelBox = false
        this.notificationstobeshownasalert=false
      }
   
  }
  // toOpen(){
  //   this.dropDownsThreeDotes=this.dropDownsThreeDotes?true:false;
  //  }
 
 
  stopAlarm() {
     
    console.log("records",this.alaramRecords)
    this.userservice.emergencyAlertStop({ "RecordID": this.alaramRecords }).subscribe((Response) => {
 
      if (Response.code == "S001") {
     
        // this.route.navigate(["Dashboard/Emergency/emergencyCustomerData"],{ queryParams: {'CustRecID' :this.EmergencyCustomerDetails.SponsorID} })
           this.route.navigate(["Dashboard/Emergency/emergencyList"])
 
 
      } else if(Response.code == "ND01"){
        this.route.navigate(["Dashboard/Emergency/emergencyList"],{ queryParams: {'CustRecID' :this.EmergencyCustomerDetails.SponsorID,'RequestID':this.deviceData.RequestID} })
         
      }else{
        alert(Response.message)
      }
 
    }, (error) => {
      alert(error.error.message)
    })
  }
 
  EmergencyCount:any
  count:any
  emergencyCountApi(){
    this.userservice.EmergencyCount().subscribe(
      (Response) => {
        if (Response.code == 'S001') {
          this.modelBox = true
          this.count = Response.data.MonitorScreenCount
          this.EmergencyCount = Response.data.EmergencyCount
          if(this.EmergencyCount&& this.EmergencyCount > 0){
          this.audioPath.play()
          this.route.navigate(["/Dashboard/emergencyList"])
           
          }
 
        } else {
          alert(Response.message);
        }
      }
    );
   }
 
 
 
}
