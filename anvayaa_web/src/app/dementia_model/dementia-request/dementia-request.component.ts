import { Component, OnInit,ViewChild } from '@angular/core';
import { UsersService } from '../../users.service'
import { FormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form } from '@angular/forms';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { first, retryWhen } from 'rxjs';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DatePipe } from '@angular/common'
import * as moment from 'moment';
import { conforms } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dementia-request',
  templateUrl: './dementia-request.component.html',
  styleUrls: ['./dementia-request.component.css']
})
export class DementiaRequestComponent implements OnInit {
  RequestID:any
  CustID:any
  payloadobj:any={}
  Request:any={}

  constructor(private userservice: UsersService, private router: Router, private route: ActivatedRoute, private formBuilder: UntypedFormBuilder, private DatePipe: DatePipe, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.RequestID = this.route.snapshot.queryParamMap.get("RequestID")
    this.CustID = this.route.snapshot.queryParamMap.get("CustID")
    this.viewdementiaRequest()
  }


  viewdementiaRequest() {

    this.payloadobj.RequestID=this.RequestID
    this.payloadobj.CustID=this.CustID
    this.userservice.ViewDemenitaRequest(this.payloadobj).subscribe((response) => {
   
     if(response.code =="S001"){
        this.Request=response.data;
        console.log(this.Request)
     }


    }, (error) => {
      alert(error.error.data)
    })

  }

}
