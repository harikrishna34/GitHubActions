import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UsersService } from '../users.service'
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, FormControl, FormArrayName, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SwPush } from "@angular/service-worker";

@Component({
  selector: 'app-ongoingcaremanagerdetails',
  templateUrl: './ongoingcaremanagerdetails.component.html',
  styleUrls: ['./ongoingcaremanagerdetails.component.css']
})
export class OngoingcaremanagerdetailsComponent implements OnInit{
  ViewCCdbArray:any
  CustRecID: any
  selectedData:any
  Type:'CMVisits'

  constructor(private userservice: UsersService, private route: Router, private snap: ActivatedRoute, private spinner: NgxSpinnerService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.CustRecID = this.snap.snapshot.queryParamMap.get("CustRecID");
    this.ongoingCMdetails()
  }

  ongoingCMdetails() {
    this.userservice.ComprehensivecustomersData(this.CustRecID,"CMDetails").subscribe((response) => {
      this.ViewCCdbArray = response.data
      console.log("ViewCCdbArray", response.data)
      if (response.code == 'S001') {
        // alert(response.data)
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
  showStatusTrack(data: any) {
    this.selectedData = data;
  }
}
