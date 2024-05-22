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
  selector: 'app-hexadevicesdetails',
  templateUrl: './hexadevicesdetails.component.html',
  styleUrls: ['./hexadevicesdetails.component.css']
})
export class HexadevicesdetailsComponent implements OnInit {
  ViewHexaDetailProduct: any;
  CustRecID: any;
  CategoryID: any;
  hexaForm: UntypedFormGroup;
  quantity = 1;
  items: string[] = ['Item 1'];

  constructor(private userservice: UsersService, private route: Router, private snap: ActivatedRoute, private spinner: NgxSpinnerService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.CustRecID = this.snap.snapshot.queryParamMap.get("CustRecID");
    this.CategoryID = this.snap.snapshot.queryParamMap.get("CategoryID");
    console.log('aaaaaaaaa',this.CategoryID)
    this.hexaForm = this.formBuilder.group({
      quantity: [null, [Validators.required, Validators.min(1)]]
    });
    this.viewHexaProductDetails();
  }

  viewHexaProductDetails() {
    this.userservice.viewHexadetailProducts({ "CustRecID": this.CustRecID, "ServiceID": this.CategoryID }).subscribe((response: any) => {
      if (response.code == 'S001') {
        this.ViewHexaDetailProduct = response.data.ServiceCategories;
        console.log("ViewHexaDetails", response.data);
      } else if (response.code == 'S002') {
        alert(response.data);
      } else {
        alert(response.data);
      }
    }, (error) => {
      alert(error.error.data);
    });
  }
  navigateToBuynowScreen(data:any){
    const CID = this.CategoryID
    console.log('qwertyui',this.CategoryID)
    this.route.navigate(['/Dashboard/HexaDevices/buynow'],{queryParams:{CategoryID:CID , quantity: this.quantity , CustRecID: this.CustRecID}})
  }
  addItem() {
    this.quantity++;
    const newItem = `Item ${this.quantity}`;
    this.items.push(newItem);
  }
 
  removeItem() {
    if (this.quantity > 1) {
      this.quantity--;
      this.items.pop();
    }
  }

}
