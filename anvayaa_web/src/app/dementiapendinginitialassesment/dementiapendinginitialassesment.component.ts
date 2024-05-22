import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UsersService } from '../users.service'
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form } from '@angular/forms';

@Component({
  selector: 'app-dementiapendinginitialassesment',
  templateUrl: './dementiapendinginitialassesment.component.html',
  styleUrls: ['./dementiapendinginitialassesment.component.css']
})
export class DementiapendinginitialassesmentComponent implements OnInit {
  Type: any
  dementiadbpending:any

  constructor(private userservice: UsersService, private datePipe: DatePipe, private route: Router, private snap: ActivatedRoute, private spinner: NgxSpinnerService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.Type = this.snap.snapshot.queryParamMap.get("Type")
    this.viewdementiadashboardpending()
    

  }
viewdementiadashboardpending() {
  this.spinner.show()

 this.userservice.viewdashboraddementia(this.Type).subscribe((response) => {
  this.spinner.hide()
   
   if (response.code == 'S001') {

     this.dementiadbpending = response.data
   
     // alert("Successful")
   } else {
     alert(response.data)
   }

 }, (error) => {
  this.spinner.hide()

   alert(error.error.data)
 })


}
}
