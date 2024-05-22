import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service'
import {ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-allalarmshistory',
  templateUrl: './allalarmshistory.component.html',
  styleUrls: ['./allalarmshistory.component.css']
})
export class AllalarmshistoryComponent implements OnInit {
  HistoryArray:any=[]
  RangeSelection:FormGroup
  maxdate = new Date()
  searchText =''
  submitBtn:boolean = false
  constructor(private DatePipe: DatePipe,private userservice: UsersService, private route: Router, private spinner: NgxSpinnerService, private Router: Router, private UsersService: UsersService, private FormBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.RangeSelection = this.FormBuilder.group({
      'watchID':'',
       "StartDate":"",
       "EndDate":""
    })
    this.alaramGetFunction('')
  }

  alaramGetFunction(click:any){
 
    console.log("click ",click)

    if(click == 'click'){
     this.submitBtn =true
    }
 
    if(this.RangeSelection.status=='INVALID'){

    }else{

     if(this.RangeSelection.value.StartDate != '' && this.RangeSelection.value.EndDate!=''){
       this.RangeSelection.value.StartDate = this.DatePipe.transform(this.RangeSelection.value.StartDate, 'dd-MM-YYYY hh:mm')
       this.RangeSelection.value.EndDate = this.DatePipe.transform(this.RangeSelection.value.EndDate, 'dd-MM-YYYY hh:mm')
     }
 
     this.spinner.show()
      
     this.UsersService.getWatchAlarmRecords(this.RangeSelection.value).subscribe((response) => {
       this.spinner.hide();
       if (response.code == "S001") {
 
         this.HistoryArray = response.data
       } else {
       this.spinner.hide();
 
         alert(response.data)
       }
     }, ((error) => {
       this.spinner.hide();
     }))
    }
 
 }

}
