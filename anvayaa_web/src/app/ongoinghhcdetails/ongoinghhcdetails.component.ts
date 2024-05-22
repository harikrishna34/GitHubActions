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
  selector: 'app-ongoinghhcdetails',
  templateUrl: './ongoinghhcdetails.component.html',
  styleUrls: ['./ongoinghhcdetails.component.css']
})
export class OngoinghhcdetailsComponent implements OnInit{
  ViewCCdbArray:any
  CustRecID: any 
  selectedData:any
  constructor(private userservice: UsersService, private route: Router, private snap: ActivatedRoute, private spinner: NgxSpinnerService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.CustRecID = this.snap.snapshot.queryParamMap.get("CustRecID");
    this.ongoingHHCdetails()
  }
  ongoingHHCdetails() {
    this.userservice.ComprehensivecustomersData(this.CustRecID,"HHCDetails").subscribe((response) => {
      this.ViewCCdbArray = response.data
      console.log("ViewCCdbArray", response.data)
      // console.log('123456789')
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
