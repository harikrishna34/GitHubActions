import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../users.service'
import { Router, Routes, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
@Component({
  selector: 'app-plandetails',
  templateUrl: './plandetails.component.html',
  styleUrls: ['./plandetails.component.css']
})
export class PlandetailsComponent implements OnInit {
  Months: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  public downGrade: UntypedFormGroup
  PackageID:any
  cityID:any
  custrecID:any
  constructor(private formBuilder: UntypedFormBuilder, private userservice: UsersService, private route: Router, private spinner: NgxSpinnerService, private Router: Router, private activatedRoute: ActivatedRoute, private UsersService: UsersService, private datePipe: DatePipe) { }
  

  ngOnInit(): void {
    this.PackageID = this.activatedRoute.snapshot.queryParamMap.get("packageID");
    this.cityID = this.activatedRoute.snapshot.queryParamMap.get("cityID");
    this.custrecID = this.activatedRoute.snapshot.queryParamMap.get("custrecID");
    console.log("params",this.PackageID)
    this.downGrade = this.formBuilder.group({
      "TimePeriodInMonths": ['']
    })
   
    this.downgradeplan()
  }

  downgradeplan() {
  
    var downgradeplan = {
      CustRecID: this.custrecID,
      ServiceAreaID:this.cityID,
      PackageID: this.PackageID ,
      TimePeriodInMonths: this.downGrade.value.TimePeriodInMonths


    }
    console.log("downGradevalue", downgradeplan)
    this.getDowngradPlansPriceCalculationDetails()
    
    this.userservice.downgradePlan(downgradeplan).subscribe((response) => {
      if (response.code == 'S001') {
      } else {
        alert(response.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }


  getDowngradPlansPriceCalculationDetails() {

    var getdowngradeplanDetails = {
      CustRecID: this.custrecID,
      ServiceAreaID: this.cityID,
      PackageID:  this.PackageID ,
      TimePeriodInMonths: this.downGrade.value.TimePeriodInMonths


    }


    this.userservice.getDowngradingPlansPriceCalculationDetails("").subscribe((response) => {
      if (response.code == 'S001') {

      } else {
        alert(response.data)
      }
    }, (error) => {
      alert(error.error.data)
    })

  }
}
