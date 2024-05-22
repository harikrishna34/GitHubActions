import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router, Routes, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-dementiadashboard',
  templateUrl: './dementiadashboard.component.html',
  styleUrls: ['./dementiadashboard.component.css']
})
export class DementiadashboardComponent implements OnInit {

  dementiadb:any
  


  constructor( private spinner: NgxSpinnerService,private userservice: UsersService, private route: Router, private snap: ActivatedRoute,private FormBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {

    this.dementiadashboarddetails()
  }
  dementiadashboarddetails() {
 
    this.spinner.show()

    this.userservice.dashboraddementia({}).subscribe((response) => {
      console.log(response,"$$$$$$$$$$$")
    this.spinner.hide()

      if (response.code == 'S001') {
        this.dementiadb = response.data
        console.log("ssss",this.dementiadb)
        // alert("Successful")
      } else {
        alert(response.data)
      }

    }, (error) => {
    this.spinner.hide()

      alert(error.error.data)
    })


  }
  details(type:any){
    this.route.navigate(["Dashboard/dementia/viewdetailsdementia"],{ queryParams:{Type:type}})
  }
  detailscompleteopenreq(type:any){
    this.route.navigate(["Dashboard/dementia/Complete&OpenRequests"],{ queryParams:{Type:type}})
  }
  detailspending(type:any){
    this.route.navigate(["Dashboard/dementia/Pendingintialassesment"],{ queryParams:{Type:type}})
  }
  detailsfeedbacks(type:any){
    this.route.navigate(["Dashboard/dementia/Feedback&Openfb"],{ queryParams:{Type:type}})
  }
}
