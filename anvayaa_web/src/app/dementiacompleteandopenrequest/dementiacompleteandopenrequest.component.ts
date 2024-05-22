import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UsersService } from '../users.service'
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form } from '@angular/forms';

@Component({
  selector: 'app-dementiacompleteandopenrequest',
  templateUrl: './dementiacompleteandopenrequest.component.html',
  styleUrls: ['./dementiacompleteandopenrequest.component.css']
})
export class DementiacompleteandopenrequestComponent implements OnInit {

  Type: any
  CompletedRequestsInLastOneWeeks:boolean=false
  OpenRequest:boolean=false
  dementiadbcomplete:any

  constructor(private userservice: UsersService, private datePipe: DatePipe, private route: Router, private snap: ActivatedRoute, private spinner: NgxSpinnerService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.Type = this.snap.snapshot.queryParamMap.get("Type")
    this.viewdementiadashboarddetailscompleterequest() 


}
viewdementiadashboarddetailscompleterequest() {
      if(this.Type == 'CompletedRequestsInLastOneWeek'){
      this.CompletedRequestsInLastOneWeeks= true
   }
   if(this.Type == 'OpenRequests'){
    this.OpenRequest= true
 }

   this.spinner.show()
 this.userservice.viewdashboraddementia(this.Type).subscribe((response) => {
  this.spinner.hide()
   if (response.code == 'S001') {
     this.dementiadbcomplete = response.data
   
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
