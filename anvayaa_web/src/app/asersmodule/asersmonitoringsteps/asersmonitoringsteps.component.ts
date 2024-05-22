import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UsersService } from '../../users.service'
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, Form } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-asersmonitoringsteps',
  templateUrl: './asersmonitoringsteps.component.html',
  styleUrls: ['./asersmonitoringsteps.component.css']
})
export class AsersmonitoringstepsComponent implements OnInit {
  stepmonitoringdata:any
  stepmonitoringactions:any
  CustomerID: string | null = null;
  RecordID: string | null = null;
  personalDetails!: FormGroup;
  addressDetails!: FormGroup;
  educationalDetails!: FormGroup;
  personal_step = false;
  address_step = false;
  education_step = false;
  step = 1;
  emergtype: any;
  removefeatureanddeviceobj:any;
  removefeatureanddeviceobjs:any;
  removefeatureanddeviceobjss:any;
  updatingsteplevel:any
  data: any;
  callingNumber:any
  dropDownsThreeDotes:boolean=false
  forcalling:boolean=false
  callingTo:any;
  constructor(private userservice: UsersService, private datePipe: DatePipe, private route: Router, private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.CustomerID = this.activatedRoute.snapshot.queryParamMap.get("CustomerID");
    this.RecordID = this.activatedRoute.snapshot.queryParamMap.get("RecordID");
    this.monitorstepdisplayingasersmonitor()

    this.personalDetails = this.formBuilder.group({
      Note: ['', Validators.required],
      // email: [''],
      // phone: ['']
  });

  this.callingTo="Customer"
  this.personalDetails.patchValue({'Note':"calling to " +this.callingTo})
  this.addressDetails = this.formBuilder.group({
      city: [''],
      address: [''],
      pincode: ['']
  });

  this.educationalDetails = this.formBuilder.group({
      highest_qualification: ['', Validators.required],
      university: ['', Validators.required],
      total_marks: ['',Validators.required]
  });

  }
  get personal() { return this.personalDetails.controls; }
  get education() { return this.educationalDetails.controls; }
  get address() { return this.addressDetails.controls; }

  next(){
// this.spinner.show()
    if(this.step==1){
          this.personal_step = true;
          if (this.personalDetails.invalid) { return  }
          this.step++
    }
    // this.spinner.hide()
  }
  next2(){
// this.spinner.show()

    if(this.step==2){
      this.address_step = true;
      if (this.addressDetails.invalid) { return }
          this.step++;
  }
  // this.spinner.hide()
  }
  previous(){
    this.spinner.show()

    this.step--
    if(this.step==1){
      this.personal_step = false;
    }
    if(this.step==2){
      this.education_step = false;
    }
    this.spinner.hide()

  }
  submit(){
    this.spinner.show()

    // if(this.step==3){
    //   this.education_step = true;
    //   if (this.educationalDetails.invalid) { return }
    // }
    this.route.navigate(['/Dashboard/asers/AsersMonitoring'])
    this.spinner.hide()

  }
  stepsforactioninmonitoringscreen() {
this.spinner.show()
    
    this.userservice.stepperformasersactions(this.stepmonitoringdata?.AlarmType).subscribe((response) => {
    this.spinner.hide()
      if (response.code == 'S001') {
        this.stepmonitoringactions= response.data
        console.log("stepmonitoringactions", response.data)
        // alert(response.data)
      }
      else if (response.code == 'S002') {
    this.spinner.hide()
        alert(response.data)
      } else {
        alert(response.data)
      }
    }, (error) => {
    this.spinner.hide()
      alert(error.error.data)
    })
    this.spinner.hide()
  }
 monitorstepdisplayingasersmonitor() {
  this.spinner.show()

    this.userservice.stepgetasersmonitoringscreendata(this.CustomerID,this.RecordID).subscribe((response) => {
      this.spinner.hide()
    
      if (response.code == 'S001') {
        this.stepmonitoringdata = response.data
        console.log("stepmonitoring",  this.stepmonitoringdata)
        this.stepsforactioninmonitoringscreen()
        // alert(response.data)
      }
      else if (response.code == 'S002') {
        alert(response.data)
      } else {
    this.spinner.hide()
        alert(response.data)
      }
    }, (error) => {
    this.spinner.hide()
      alert(error.error.data)
    })
    this.spinner.hide()
  }
  release(status: any) {
console.log("fffffffffffffff",this.stepmonitoringdata.CustomerDetails)
    this.removefeatureanddeviceobj = {
      'Status': status,
      Note:'',
      RecordID:'',
      CustomerID:'',
      CustRecID:'',
      DeviceID:'',
      // CustID:'',
      Type :"ASERS" 
    }
    this.removefeatureanddeviceobj.Note= this.personalDetails.value.Note
    this.removefeatureanddeviceobj.RecordID=  this.stepmonitoringdata.RecordID
    this.removefeatureanddeviceobj.CustomerID=  this.stepmonitoringdata.CustomerID
    this.removefeatureanddeviceobj.CustRecID=  this.stepmonitoringdata.CustomerDetails.CustRecID
    this.removefeatureanddeviceobj.DeviceID=  this.stepmonitoringdata.DeviceID
    // this.removefeatureanddeviceobj.CustID=  this.stepmonitoringdata.CustomerDetails.CustID

    if (status == 'Release') {

      this.userservice.updatemonitoringsteps(this.removefeatureanddeviceobj).subscribe((response) => {
        if (response.code == 'S001') {
          console.log("updatingsteplevel", response.data)
          this.updatingsteplevel = response.data
          alert(response.data)
          // this.step=3
    this.route.navigate(['/Dashboard/asers/AsersMonitoring'])


        }
        else if (response.code == 'S002') {
          alert(response.data)
          this.step=3

        } else {
          alert(response.data)
        }
      }, (error) => {
        alert(error.error.data)
      })
    }
    if (status == 'RaiseEmergency') {

      this.userservice.updatemonitoringsteps(this.removefeatureanddeviceobj).subscribe((response) => {
        if (response.code == 'S001') {
          console.log("updatingsteplevel", response.data)
          this.updatingsteplevel = response.data.data
          alert(response.data.data)
          console.log("stage33")

          // this.step=3
    this.route.navigate(['/Dashboard/asers/AsersMonitoring'])


        }
        else if (response.code == 'S002') {
          alert(response.data.data)
          this.step=3


        } else {
          console.log("stage33")
          alert(response.data.data)
        }
      }, (error) => {
        alert(error.error.data)
      })
    }
    if (status == 'RaiseRequest') {

      this.userservice.updatemonitoringsteps(this.removefeatureanddeviceobj).subscribe((response) => {
        if (response.code == 'S001') {
          console.log("updatingsteplevel", response.data)
          this.updatingsteplevel = response.data
          alert(response.data)
          // this.step=3
    this.route.navigate(['/Dashboard/asers/AsersMonitoring'])


        }
        else if (response.code == 'S002') {
          alert(response.data)
        } else {
          alert(response.data)
        }
      }, (error) => {
        alert(error.error.data)
      })
    }
    if (status == 'Close') {

      this.userservice.updatemonitoringsteps(this.removefeatureanddeviceobj).subscribe((response) => {
        if (response.code == 'S001') {
          console.log("updatingsteplevel", response.data)
          this.updatingsteplevel = response.data
          alert(response.data)
          // this.step=3
    this.route.navigate(['/Dashboard/asers/AsersMonitoring'])


        }
        else if (response.code == 'S002') {
          alert(response.data)
        } else {
          alert(response.data)
        }
      }, (error) => {
        alert(error.error.data)
      })
    }
    if (status == 'CallBack') {

      this.userservice.updatemonitoringsteps(this.removefeatureanddeviceobj).subscribe((response) => {
        if (response.code == 'S001') {
          console.log("updatingsteplevel", response.data)
          this.updatingsteplevel = response.data
          alert(response.data)
          // this.step=3
    this.route.navigate(['/Dashboard/asers/AsersMonitoring'])


        }
        else if (response.code == 'S002') {
          alert(response.data)
          this.step=3
        } else {
          alert(response.data)
        }
      }, (error) => {
        alert(error.error.data)
      })
    }
  }
  navigatetoviewcustomerscreen(data:any){
   console.log('fffff',data)
    this.spinner.show();

let CID = data.CustomerDetails.CustRecID;
let customerID = data.CustomerID;


//  this.route.navigate(['/Dashboard/asers/customerdetailsview'],{ queryParams:{CustRecID:CID,CustomerID:customerID,Model:data.ConfigurationDetails[0].DeviceDetails.Model,DeviceID:data.DeviceID}})
// Constructing the URL for the new tab
let url = `/Dashboard/asers/customerdetailsview?CustRecID=${CID}&CustomerID=${customerID}&Model=${data.ConfigurationDetails[0].DeviceDetails.Model}&DeviceID=${data.DeviceID}`;

// Opening the URL in a new tab 
window.open(url, '_blank');

this.spinner.hide();

  }
  
  phoneconfirmation(status: any){
    
    this.removefeatureanddeviceobjs = {
      'Status': status,
      Note:'',
      RecordID:'',
      CustomerID:'',
      CustRecID:'',
      DeviceID:'',
      toPhoneNumber:'', 
      Type :"ASERS"
    }
    this.callingTo= "Customer"
    this.personalDetails.patchValue({'Note':"calling to " +this.callingTo})

    this.removefeatureanddeviceobjs.Note= this.personalDetails.value.Note
    this.removefeatureanddeviceobjs.RecordID=  this.stepmonitoringdata.RecordID
    this.removefeatureanddeviceobjs.CustomerID=  this.stepmonitoringdata.CustomerID
    this.removefeatureanddeviceobjs.CustRecID=  this.stepmonitoringdata.CustomerDetails.CustRecID
    this.removefeatureanddeviceobjs.DeviceID=  this.stepmonitoringdata.DeviceID
    this.removefeatureanddeviceobjs.toPhoneNumber= this.stepmonitoringdata?.CustomerDetails?.MobileNumber
    this.removefeatureanddeviceobj.Type = "ASERS"
    // this.removefeatureanddeviceobjs.fromPhoneNumber=  this.stepmonitoringdata?.CustomerDetails?.fromPhoneNumber

    if (status == 'CallConfirmation') {

      this.userservice.updatemonitoringsteps(this.removefeatureanddeviceobjs).subscribe((response) => {
        if (response.code == 'S001') {
          console.log("updatingsteplevel", response.data)
          this.updatingsteplevel = response.data
          alert(response.data)

        }
        else if (response.code == 'S002') {
          alert(response.data)
        } else {
          alert(response.data.data)
        }
      }, (error) => {
        alert(error.error.message)
      })
    }
  }
  neighbourphoneconfirmation(status: any){
    this.callingTo= "Neighbour"
    this.personalDetails.patchValue({'Note':"calling to " +this.callingTo})

    this.removefeatureanddeviceobjs = {
      'Status': status,
      Note:'',
      RecordID:'',
      CustomerID:'',
      CustRecID:'',
      DeviceID:'',
      toPhoneNumber:'',
      Type :"ASERS"
    }
    this.removefeatureanddeviceobjs.Note= this.personalDetails.value.Note
    this.removefeatureanddeviceobjs.RecordID=  this.stepmonitoringdata.RecordID
    this.removefeatureanddeviceobjs.CustomerID=  this.stepmonitoringdata.CustomerID
    this.removefeatureanddeviceobjs.CustRecID=  this.stepmonitoringdata.CustomerDetails.CustRecID
    this.removefeatureanddeviceobjs.DeviceID=  this.stepmonitoringdata.DeviceID
    this.removefeatureanddeviceobjs.toPhoneNumber= this.stepmonitoringdata?.CustomerHealthPlanDetails[0]?.Neighbours[0]?.ContactNumber
    
    // this.removefeatureanddeviceobjs.fromPhoneNumber=  this.stepmonitoringdata?.CustomerDetails?.fromPhoneNumber
    if (status == 'CallConfirmation') {

      this.userservice.updatemonitoringsteps(this.removefeatureanddeviceobjs).subscribe((response) => {
        if (response.code == 'S001') {
          console.log("updatingsteplevel", response.data)
          this.updatingsteplevel = response.data
          alert(response.data)

        }
        else if (response.code == 'S002') {
          alert(response.data.data)
        } else {
          alert(response.data.data)
        }
      }, (error) => {
        alert(error.error.message)
      })
    }
  }
  caremanagerphoneconfirmation(status: any){
    this.removefeatureanddeviceobjs = {
      'Status': status,
      Note:'',
      RecordID:'',
      CustomerID:'',
      CustRecID:'',
      DeviceID:'',
      toPhoneNumber:'',
      Type :"ASERS"
    }
    this.callingTo= "Care Manager"
    this.personalDetails.patchValue({'Note':"calling to " +this.callingTo})

    this.removefeatureanddeviceobjs.Note= this.personalDetails.value.Note
    this.removefeatureanddeviceobjs.RecordID=  this.stepmonitoringdata.RecordID
    this.removefeatureanddeviceobjs.CustomerID=  this.stepmonitoringdata.CustomerID
    this.removefeatureanddeviceobjs.CustRecID=  this.stepmonitoringdata.CustomerDetails.CustRecID
    this.removefeatureanddeviceobjs.DeviceID=  this.stepmonitoringdata.DeviceID
    this.removefeatureanddeviceobjs.toPhoneNumber= this.stepmonitoringdata?.CareManagerDetails[0]?.ContactNumber
    
    // this.removefeatureanddeviceobjs.fromPhoneNumber=  this.stepmonitoringdata?.CustomerDetails?.fromPhoneNumber
    if (status == 'CallConfirmation') {

      this.userservice.updatemonitoringsteps(this.removefeatureanddeviceobjs).subscribe((response) => {

        if (response.code == 'S001') {
          console.log("updatingsteplevel", response.data)
          this.updatingsteplevel = response.data
          alert(response.data)

        }
        else if (response.code == 'S002') {
          alert(response.data.data)
        } else {
          alert(response.data.data)
        }
      }, (error) => {
        alert(error.error.message)
      })
    }
  }

  Ajustthresholds(data:any){
    console.log("Clicked",data)
    this.spinner.show()
  // let CRID = data.CustomerDetails.CustRecID;
  // let customerID = data.CustomerID;
  // let deviceID = data.ConfigurationDetails[0].DeviceDetails.DeviceID;
  // this.route.navigate(["/Dashboard/asers/configuration"],{ queryParams:{CustRecID:CRID,CustomerID:customerID,DeviceID:deviceID,Comp:'AsersmonitoringstepsComponent'}})
  // this.spinner.hide()
  let CRID = data.CustomerDetails.CustRecID;
let customerID = data.CustomerID;
let deviceID = data.ConfigurationDetails[0].DeviceDetails.DeviceID;

// Constructing the URL for the new tab
let url = `/Dashboard/asers/configuration?CustRecID=${CRID}&CustomerID=${customerID}&DeviceID=${deviceID}`;

// Opening the URL in a new tab
window.open(url, '_blank');

this.spinner.hide();

}
callingnumber(event:any){
console.log("uffffffffff",event)
this.callingNumber = event
}
toOpen(){
 this.dropDownsThreeDotes=this.dropDownsThreeDotes?false:true;
}
toOpenup(){
  this.forcalling=this.forcalling?false:true;
 }
}

