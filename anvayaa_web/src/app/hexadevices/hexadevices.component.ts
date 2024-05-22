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
  selector: 'app-hexadevices',
  templateUrl: './hexadevices.component.html',
  styleUrls: ['./hexadevices.component.css']
})
export class HexadevicesComponent implements OnInit{
  ViewHexaDetails:any
  CustRecID:any
  constructor(private userservice: UsersService, private route: Router, private snap: ActivatedRoute, private spinner: NgxSpinnerService, private formBuilder: UntypedFormBuilder) { }
  ngOnInit(): void {
    this.CustRecID = this.snap.snapshot.queryParamMap.get("CustRecID");
    this.viewHexaProductDetails()
  }
  viewHexaProductDetails(){
    this.userservice.viewHexaProductDetails({"CustRecID":this.CustRecID}).subscribe((response:any) => {
      
      if (response.code == 'S001') {
      this.ViewHexaDetails = response.data.ServiceCategories
      console.log("ViewHexaDetails", response.data)
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
  navigateToDetailScreen(data:any){
    console.log("aaaaaasssssssss",data?.CategoryID)
    let CID = data?.CategoryID
    this.route.navigate(['/Dashboard/HexaDevices/viewHexaServiceDetails'],{queryParams:{CategoryID: data?.CategoryID,CustRecID: this.CustRecID}})
  }
}
