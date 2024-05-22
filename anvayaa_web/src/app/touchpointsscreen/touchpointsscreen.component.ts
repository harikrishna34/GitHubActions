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
  selector: 'app-touchpointsscreen',
  templateUrl: './touchpointsscreen.component.html',
  styleUrls: ['./touchpointsscreen.component.css']
})
export class TouchpointsscreenComponent implements OnInit {
  IncommingStatusTrack :any = []
  lastElement:any = []
  CustRecID: any
  ViewTouchpointScreen = {}
  CallOption: boolean
  Frequency: any
  Message : any
  viewData:any
  status:any
  constructor(private _swPush: SwPush,
    private snap: ActivatedRoute,
    private userservice: UsersService, private datePipe: DatePipe, private route: Router , private spinner: NgxSpinnerService, private formBuilder: FormBuilder) { }
    TouchpointsForm: UntypedFormGroup

  ngOnInit(): void {
    this.CustRecID = this.snap.snapshot.queryParamMap.get("CustRecID");
    this.viewTouchPoints()
  }
  viewTouchPoints(){
    this.userservice.viewTouchPointData(this.CustRecID).subscribe((response) => {
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

}
