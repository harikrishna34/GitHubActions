import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UsersService } from '../users.service'
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form } from '@angular/forms';

@Component({
  selector: 'app-viewdementiadashboard',
  templateUrl: './viewdementiadashboard.component.html',
  styleUrls: ['./viewdementiadashboard.component.css']
})
export class ViewdementiadashboardComponent implements OnInit {
  Type: any
  dementiadb:any
  Activeplans: boolean = false
  MyFamiliestype : boolean = false
  constructor(private userservice: UsersService, private datePipe: DatePipe, private route: Router, private snap: ActivatedRoute, private spinner: NgxSpinnerService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {

      this.Type = this.snap.snapshot.queryParamMap.get("Type")
       this.viewdementiadashboarddetails() 
  }
  viewdementiadashboarddetails() {
 
     if(this.Type == 'ActivePlans'){
        this.Activeplans= true
     }
     if(this.Type == 'MyFamilies'){
      this.MyFamiliestype= true
   }
    this.userservice.viewdashboraddementia(this.Type).subscribe((response) => {
      
      if (response.code == 'S001') {
        this.dementiadb = response.data
      
        // alert("Successful")
      } else {
        alert(response.data)
      }

    }, (error) => {
      alert(error.error.data)
    })


  }

}
