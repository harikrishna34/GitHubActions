import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UsersService } from '../users.service'
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form } from '@angular/forms';


@Component({
  selector: 'app-dementiafeedbackandopenfb',
  templateUrl: './dementiafeedbackandopenfb.component.html',
  styleUrls: ['./dementiafeedbackandopenfb.component.css']
})
export class DementiafeedbackandopenfbComponent implements OnInit {
  Type: any
  CompletedFeedBackInLastOneWeeks:boolean=false
  Openfeedbacks:boolean=false
  dementiadbfeedback:any
  today: any
  StartDate:any
  StartDates:any
  constructor(private userservice: UsersService, private datePipe: DatePipe, private route: Router, private snap: ActivatedRoute, private spinner: NgxSpinnerService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.Type = this.snap.snapshot.queryParamMap.get("Type")
    this.viewdementiadashboardfeedback()
    
  
  }
  viewdementiadashboardfeedback() {
    if(this.Type == 'CompletedFeedBackInLastOneWeek'){
      this.CompletedFeedBackInLastOneWeeks= true
   }
   if(this.Type == 'OpenFeedBacks'){
    this.Openfeedbacks= true

   
 }
 this.spinner.show()

    this.userservice.viewdashboraddementia(this.Type).subscribe((response) => {
      
      if (response.code == 'S001') {
  this.spinner.hide()

        this.dementiadbfeedback = response.data
        const ONE_DAY = 1000 * 60 * 60 * 24;
        this.today = new Date()
    
    
        for (let i = 0; i < this.dementiadbfeedback?.openFeedBacks?.length; i++) {
          this.StartDate = new Date(0)
          this.StartDate.setUTCSeconds(this.dementiadbfeedback?.openFeedBacks[i].CreatedDateTime)
          this.dementiadbfeedback.openFeedBacks[i]['days'] = Math.round((this.today - this.StartDate) / ONE_DAY)
    
        }
        for (let i = 0; i < this.dementiadbfeedback?.completedFeedBackInLast7Days?.length; i++) {
          this.StartDates = new Date(0)
          this.StartDates.setUTCSeconds(this.dementiadbfeedback?.completedFeedBackInLast7Days[i].CreatedDateTime)
          this.dementiadbfeedback.completedFeedBackInLast7Days[i]['Days'] = Math.round((this.today - this.StartDates) / ONE_DAY)
          console.log('dddd',this.dementiadbfeedback.completedFeedBackInLast7Days[i]['Days'])
        }
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
