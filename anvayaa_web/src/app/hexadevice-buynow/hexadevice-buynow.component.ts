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
  selector: 'app-hexadevice-buynow',
  templateUrl: './hexadevice-buynow.component.html',
  styleUrls: ['./hexadevice-buynow.component.css']
})
export class HexadeviceBuynowComponent implements OnInit{
  ViewPriceDetails:any
  CustRecID:any
  CategoryID:any
  quantity:any
  ViewHexaDetails:any
  quantities = 1;
  items: string[] = ['Item 1'];
  paymentMode: string = '';
  dataOnly:string
  viewStripsCategoaryID:any
  addAddressPress : boolean = false
  public shippingAddressForm!: UntypedFormGroup
  
  constructor(private userservice: UsersService, private route: Router, private snap: ActivatedRoute, private spinner: NgxSpinnerService, private formBuilder: UntypedFormBuilder) { }
  ngOnInit(): void {
    this.CustRecID = this.snap.snapshot.queryParamMap.get("CustRecID");
    this.CategoryID = this.snap.snapshot.queryParamMap.get('CategoryID');
    this.quantity = this.snap.snapshot.queryParamMap.get("quantity")
    this.viewHexaProductDetails()
    this.submitAddress()
  }
  submitAddress(){
    this.shippingAddressForm  = this.formBuilder.group({
      Address : ['', [Validators.required]]
    })
  }
  viewHexaPriceDetails(){
    let catogery: any;
    if (this.CategoryID === 'AKCST000211') {
      catogery = {
        "CustRecID": this.CustRecID,
        "serviceids": [
          {"ServiceID": this.CategoryID, "quantity": "1"},
          {"ServiceID": this.viewStripsCategoaryID, "quantity": this.quantity}
        ]
      };
    } else if (this.CategoryID === 'AKCST000212') {
      catogery = {
        "CustRecID": this.CustRecID,
        "serviceids": [
          {"ServiceID": this.CategoryID, "quantity": this.quantity}
        ]
      };
    }
    console.log('123567890',this.quantities)
    this.userservice.addPriceDetails(catogery).subscribe((response:any) => {
      if (response.code == 'S001') {
      this.ViewPriceDetails = response.data
      console.log("ViewPriceDetails", response.data)
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
  viewHexaProductDetails(){
    this.userservice.viewHexaProductDetails({"CustRecID":this.CustRecID}).subscribe((response:any) => {
      if (response.code == 'S001') {
      this.ViewHexaDetails = response.data.ServiceCategories
      const filteredCategories = this.ViewHexaDetails.filter((category: { Name: string; }) => category.Name == 'STRIPS');
      if (filteredCategories.length > 0) {
        this.viewStripsCategoaryID = filteredCategories[0].CategoryID;
        console.log("viewStripsCategoaryID:", this.viewStripsCategoaryID);
        this.viewHexaPriceDetails()
      }
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
  placeOrder(){
    this.paymentMode = this.dataOnly;
    this.addAddressPress = true
    if (this.shippingAddressForm.valid) {
      var address = this.shippingAddressForm.value.Address;
    }
    let placeOrderPayload:any 
    if (this.CategoryID === 'AKCST000211') {
      placeOrderPayload = {
        "CustRecID": this.CustRecID,
        "serviceids": [
          {"ServiceID": this.CategoryID, "quantity": "1"},
          {"ServiceID": this.viewStripsCategoaryID, "quantity": this.quantity},
          
        ],
        "Address": address,
        "PaymentMode":this.paymentMode
      };
    } else if (this.CategoryID === 'AKCST000212') {
      placeOrderPayload = {
        "CustRecID": this.CustRecID,
        "serviceids": [
          {"ServiceID": this.CategoryID, "quantity": this.quantity},
        ],
        "PaymentMode":this.paymentMode,
        "Address": address     
      };
    }
    this.userservice.placeOrder(placeOrderPayload).subscribe((response:any) => {
      if (response.code == 'S001') {
        alert("Your Request Has Been Successed")
        this.route.navigate(['/Dashboard/Task/MyTask'])
      }
      else if (response.code == 'S002') {
        // alert(response.data)
      } else {
        // alert(response.data)
      }
    }, (error) => {
      // alert(error.error.data)
    })
  }
  addItem(Name:any) {
    if (Name == 'STRIPS') {
      this.quantity++;
    this.updatecatogery();
    } 
    
  }
  removeItem(Name:any) {
    if(Name=='STRIPS'){
      if (this.quantity >= 1) {
      this.quantity--;
      this.updatecatogery()
    }
  }
  }
  updatecatogery() {
    this.viewHexaPriceDetails();
  }
  cashFunction(data: string): void {
    this.dataOnly = data
  }
}