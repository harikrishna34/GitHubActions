import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UsersService } from '../users.service'
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, Form , UntypedFormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SwPush } from "@angular/service-worker";


@Component({
  selector: 'app-touch-points',
  templateUrl: './touch-points.component.html',
  styleUrls: ['./touch-points.component.css']
})
export class TouchPointsComponent implements OnInit {
  IncommingStatusTrack :any = []
  lastElement:any = []
  CustRecID: any
  ViewTouchpointScreen = {}
  CallOption: boolean
  Frequency: any
  Message : any
  viewData:any
  constructor(private _swPush: SwPush,
    private snap: ActivatedRoute,
    private userservice: UsersService, private datePipe: DatePipe, private route: Router , private spinner: NgxSpinnerService, private formBuilder: FormBuilder) { }
    TouchpointsForm: UntypedFormGroup

  ngOnInit(): void {
    this.CustRecID = this.snap.snapshot.queryParamMap.get("CustRecID");
    this.TouchpointsForm = this.formBuilder.group({
      CustRecID : this.CustRecID,
      CallOption : [false],
      Frequency : [''],
      Message : ['']
    })

    // this.CustomerConfigData()
    // this.customerConfigurtaion()
    this.viewTouchPoints()
  }
  frequencyTable:boolean = true

  customerConfigurtaion(){
    this.TouchpointsForm.value.CallOption = this.TouchpointsForm.value.CallOption === 'true';

    if (this.TouchpointsForm.value.CallOption) {
      delete this.TouchpointsForm.value.Message;
    }
  
    if (!this.TouchpointsForm.value.CallOption) {
      delete this.TouchpointsForm.value.Frequency;
    }
  
    this.userservice.viewTouchPointsdetails(this.TouchpointsForm.value).subscribe((response) => {
      // this.spinner.hide() 
      if (response.code == 'S001') {
        alert(response.data)
        this.frequencyTable=true
      } else {
        // alert(response.data)
      }
    }, (error) => {
      // this.spinner.hide()
      alert(error.error.data)
    })
  }
  viewTouchPoints(){
    this.userservice.viewEmpCustomerExpConfigData(this.CustRecID).subscribe((response:any) => {
      if (response.code == 'S001') {
        this.viewData=response.data
      } else {
        alert(response.data)
      }
    }, (error) => {
      // this.spinner.hide()
      alert(error.error.data)
    })
  }

  UpdateTouchPoint(data:any){
  
    this.userservice.updateTouchPointData({CustRecID:this.CustRecID,Status:'completed'}).subscribe((response:any)=>{
      if (response.code == 'S001') {
      alert(response.data)
      this.route.navigate(['/Dashboard/Task/MyTask'])
      } else {
        alert(response.data)
      }
    }, (error) => {
      // this.spinner.hide()
      alert(error.error.data)
    })

  }
}

