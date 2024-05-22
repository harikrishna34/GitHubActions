import { Component, OnInit } from '@angular/core';

import { UsersService } from '../users.service'
import { Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-customer-operations',
  templateUrl: './customer-operations.component.html',
  styleUrls: ['./customer-operations.component.css']
})
export class CustomerOperationsComponent implements OnInit {
  customerPackageDetailsData:any=[]
  constructor(private userservice: UsersService, private route: Router, private spinner: NgxSpinnerService, private Router: Router, private UsersService: UsersService) { }

  ngOnInit(): void {

    this.customerPackageDetails();
  }



  customerPackageDetails() {
    this.userservice.PackageSubsciptionsDetails().subscribe((packageData: any) => {
      if (packageData.code == 'S001') {

this.customerPackageDetailsData=packageData.data
      } else {
        alert(packageData.data)
      }
    },(error)=>{
      alert(error.error.data)
    })
  }
}
