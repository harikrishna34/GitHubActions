import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service'
import { Router, Routes, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';


import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-customer-watch-details',
  templateUrl: './customer-watch-details.component.html',
  styleUrls: ['./customer-watch-details.component.css']
})
export class CustomerWatchDetailsComponent implements OnInit {
  CustRecID: any
  UserDetails: any
  DeviceId: any
  watchdata: any = []
  modelBox: boolean = false
  RecordID: any
  Dates:UntypedFormGroup
 startDate:any

  audioPath = new Audio('../../assets/alarmSounds/sirena_ambulanza.mp3')



 

 

  
  constructor(private userservice: UsersService, private route: Router, private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService, private Router: Router, private UsersService: UsersService, private FormBuilder: UntypedFormBuilder, private DatePipe: DatePipe) {
    let currentDateTime = this.DatePipe.transform((new Date), 'dd/MM/yyyy h:mm:ss');

    console.log(currentDateTime);
  }

  ngOnInit(): void {
    this.CustRecID = this.activatedRoute.snapshot.queryParamMap.get("CustRecID");
    this.customerDetails()
    // this.test()

  

    // console.log(this.audioPath.play())

    this.Dates = this.FormBuilder.group({
      StartDate:[''],
      EndDate:[''],
      "ID": [''],
      "Type":['']
    })


  
  }


  customerDetails() {

    this.userservice.customerWatchDetails({ "CustRecID": this.CustRecID }).subscribe((Response) => {
      this.spinner.show()
      if (Response.code == "S001") {
        this.spinner.hide()

        if (Response.data == '') {
          alert("Device Not Found")

          this.route.navigate(["Dashboard/Customerslist"])

        } else {

          this.UserDetails = Response.data[0].UserDetails
          this.DeviceId = Response.data[0].DeviceID
          this.watchData('UD_LTE')
        }



      } else {
        alert(Response.message)
        this.spinner.hide()
      }

    }, (error) => {
      alert(error.error.message)
      this.spinner.hide()
    })
  }


  watchData(type: any) {
 
     console.log("type",type)
    this.Dates.value.ID = this.DeviceId
    this.Dates.value.Type = type
    this.Dates.value.StartDate = this.DatePipe.transform(this.Dates.value.StartDate,"dd-MM-yyyy")
    this.Dates.value.EndDate = this.DatePipe.transform(this.Dates.value.EndDate,"dd-MM-yyyy")
        

              console.log(this.Dates.value)
    this.userservice.incommingWatchData(this.Dates.value).subscribe((Response) => {
      this.spinner.show()
      if (Response.code == "S001") {
           this.spinner.hide()
        console.log("sdcscjcbsjdbdsb", Response.data)
        this.watchdata = Response.data

      
      } else {
        alert(Response.message)
        this.spinner.hide()
      }

    }, (error) => {
      alert(error.error.message)
      this.spinner.hide()
    })
  }

  watchalarm() {


    this.userservice.watchAlarmData({ "Type": "AL_LTE" }).subscribe((Response) => {
      this.spinner.show()
      if (Response.code == "S001") {
        this.spinner.hide()

        this.RecordID = Response.data[0].RecordID
        console.log("sdvsdvsd", this.RecordID)
        this.audioPath.play()
        this.modelBox = true
      } else {
        alert(Response.message)
        this.spinner.hide()
      }

    }, (error) => {
      alert(error.error.message)
      this.spinner.hide()
    })
  }


  // test() {
  //   setInterval(() => {
  //     this.watchalarm()
  //   }, 5000)
  // }


  alertAction() {
    this.modelBox = false
    this.audioPath.pause()
    this.stopAlarm()
  }

  stopAlarm() {

    this.userservice.emergencyAlertStop({ "RecordID": this.RecordID }).subscribe((Response) => {
      this.spinner.show()
      if (Response.code == "S001") {
        this.spinner.hide()
        console.log("sdswecwcd")
      } else {
        alert(Response.message)
        this.spinner.hide()
      }

    }, (error) => {
      alert(error.error.message)
      this.spinner.hide()
    })
  }


}
