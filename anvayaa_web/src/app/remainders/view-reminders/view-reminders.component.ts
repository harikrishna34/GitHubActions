import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service'
import { Router, Routes, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-view-reminders',
  templateUrl: './view-reminders.component.html',
  styleUrls: ['./view-reminders.component.css']
})
export class ViewRemindersComponent implements OnInit {

  CustRecID:any
  RId:any
  remaindersDataArray:any = []
  constructor(private formBuilder: UntypedFormBuilder, private userservice: UsersService, private route: Router, private spinner: NgxSpinnerService, private Router: Router, private activatedRoute: ActivatedRoute, private UsersService: UsersService, private datePipe: DatePipe) { }
  
  ngOnInit(): void {
    this.CustRecID = this.activatedRoute.snapshot.queryParamMap.get("CustRecID");

    this.remaindersData()  // calling onpage loading for remainders data 
  }
  
 
   remaindersData(){
    this.userservice.ViewRemainder({ "CustRecID": this.CustRecID }).subscribe((details) => {
      if (details.code == 'S001') {
         this.remaindersDataArray = details.data.filter((value:any)=>{ return value.Status != 'Stopped' && value.Status != 'Canceled'})
         
      } else {
        alert(details.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
   }

   confirmRemove(data:any){
        
         this.RId =    data.ReminderID

   

   }
   removeremainder(){


    
      this.userservice.removeRemainder({ "ReminderID": this.RId}).subscribe((details) => {
        if (details.code == 'S001') {
           alert(details.data)
           this.remaindersData()
        } else {
          alert(details.data)
        }
      }, (error) => {
        alert(error.error.data)
      })
  
    



  }
  

   

   newRemainder(){
    this.route.navigate(["/Dashboard/remainders/createRemainders"],{ queryParams: {CustRecID :this.CustRecID} })
   }
}


