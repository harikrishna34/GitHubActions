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
  selector: 'app-hhc-partner-invoices',
  templateUrl: './hhc-partner-invoices.component.html',
  styleUrls: ['./hhc-partner-invoices.component.css']
})
export class HhcPartnerInvoicesComponent implements OnInit {
  PartnerID: any
  viewData:any
  constructor(private _swPush: SwPush,
    private snap: ActivatedRoute,
    private userservice: UsersService, private datePipe: DatePipe, private route: Router , private spinner: NgxSpinnerService, private formBuilder: FormBuilder) { }
    TouchpointsForm: UntypedFormGroup

  ngOnInit(): void {
    this.PartnerID = this.snap.snapshot.queryParamMap.get("PartnerID");
    this.viewHHcPartner()
  }
  viewHHcPartner(){
    this.spinner.show()
    this.userservice.viewHHCPartnerInvoices(this.PartnerID).subscribe((response:any) => {
      if (response.code == 'S001') {
        this.viewData=response.data
        this.spinner.hide()
      } else {
        alert(response.data)
      }
    }, (error) => {
      this.spinner.hide()
      alert(error.error.data)
    })
  }

  viewInvoice(invoiceUrl: string) {
    if (invoiceUrl) { 
      window.open(invoiceUrl, '_blank');
    } else {
      alert('No invoice attachment available.');
    }
  }
  makePayment(id:any){
    console.log('12345678',id)
    this.spinner.show()
    this.userservice.makePaymentInvoices({'partnerID':this.PartnerID, 'paymentID': id}).subscribe((response:any) => {
      if (response.code == 'S001') {
        alert('transaction successful')
        this.spinner.hide()
        window.location.reload()
      } else {
        alert(response.data)
      }
    }, (error) => {
      this.spinner.hide()
      alert(error.error.data)
    })
  }
}
