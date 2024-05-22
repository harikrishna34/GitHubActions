import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UsersService } from '../../users.service'
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form } from '@angular/forms';

@Component({
  selector: 'app-instantsettings',
  templateUrl: './instantsettings.component.html',
  styleUrls: ['./instantsettings.component.css']
})
export class InstantsettingsComponent implements OnInit {
  sos1 : any
  sos2 : any
  sos3 : any
  wlist1 : any
  wlist2 : any
  wlist3 : any
  wmode1: any
  healthdata:any
  SOSNumbers : any = []
  WhiteList : any = []
  Type : any
  watchobj: any
  SetHealthData:any
  fall : boolean = false;
  switchwhitelist : boolean = false;
  constructor(private userservice: UsersService, private datePipe: DatePipe, private route: Router, private snap: ActivatedRoute, private spinner: NgxSpinnerService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    
  }
sosnumber(){


  if(this.sos1.length >0 || this.sos2.length >0 || this.sos3.length > 0){
   this.SOSNumbers.push (this.sos1)
  //  this.SOSNumbers.push (this.sos2)
  //  this.SOSNumbers.push (this.sos3)
  }
  this.watchupdate("SOSNumbers",this.SOSNumbers )

  
}
whitelist(){
  
  if(this.wlist1 >0 || this.wlist2 >0 ||this.wlist3 >0 ){
    this.WhiteList.push (this.wlist1)

  }
  this.watchupdate("WhiteList",this.WhiteList )
  

}
fallalaram(event : any){
  console.log(event.target.value)
  let fall = event.target.value
  this.watchupdate('FallAlarmSensitivity',fall)
}
workmode(event : any){
  // if(this.wlist1 >0 || this.wlist2 >0 ||this.wlist3 >0 ){
  //   this.WhiteList.push (this.wlist1)

  // }
  console.log(event.target.value)
  let work = event.target.value
  this.watchupdate('WorkingMode',work)
}
fallsensitive(){
  // console.log(this.fall)
  let fallen 

  if(this.fall==true){
    fallen = 1
  }else{
    fallen = 0
  }
  this.watchupdate('FallAlertSensitivity',fallen)
}

swhitelist(){
  let switchlist

  if(this.switchwhitelist==true){
    switchlist = 1
  }else{
    switchlist = 0
  }
  this.watchupdate('SwitchForWhiteList',switchlist)


}

datainterval(event : any ){
  let healthtimer = event.target.value
  if(this.healthdata.length > 0){
    this.SetHealthData.push (this.healthdata)
  }
  this.watchupdate('SetHealthData',healthtimer)

}

watchupdate(type:any,value:any){


  this.watchobj = {
    "Type":type,
    "watchID":"861265060009831"
  }

  if(type=="SOSNumbers"){
    this.watchobj.SosNumbers = value
  }
  if(type=="WhiteList"){
    this.watchobj.WhiteList = value
  }
  if(type=="FallAlarmSensitivity"){
    this.watchobj.FallAlarmSensitivity = value
  }
  if(type=="WorkingMode"){
    this.watchobj.WorkMode = value
  }
  if(type=="FallAlertSensitivity"){
    this.watchobj.FallAlertSensitivity = value
  }
  if(type=="SwitchForWhiteList"){
    this.watchobj.SwitchForWhitelist = value
  }
  if(type=="SetHealthData"){
    this.watchobj.Minutes=value
  }
  
 
  this.userservice.assersupdatesettings(this.watchobj).subscribe((response) => {
    // this.spinner.hide()
    
    if (response.code == 'S001') {
      alert(response.data)
      }else if(response.code == 'S002'){
      alert(response.msg)
     }else{
      alert(response.data)

     }
  }, (error) => {

    // this.spinner.hide()

    alert(error.error.data)
  })
}
}
