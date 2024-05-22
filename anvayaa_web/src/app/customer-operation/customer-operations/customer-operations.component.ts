import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service'
import { Router, Routes, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-customer-operations',
  templateUrl: './customer-operations.component.html',
  styleUrls: ['./customer-operations.component.css']
})
export class CustomerOperationsComponent implements OnInit {
  customerPackageDetailsData: any = []
  CustRecID: any;
  constructor(private userservice: UsersService, private route: Router, private spinner: NgxSpinnerService, private Router: Router, private activatedRoute: ActivatedRoute, private UsersService: UsersService, private date: DatePipe) { }

  ngOnInit(): void {



    this.customerPackageDetails();
  }




  customerPackageDetails() {
    this.spinner.show()
    this.userservice.PackageSubsciptionsDetails().subscribe((packageData: any) => {
      if (packageData.code == 'S001') {
        this.spinner.hide()
        this.customerPackageDetailsData = packageData.data
      } else {
        this.spinner.hide()
        alert(packageData.data)
      }
    }, (error) => {
      this.spinner.hide()
      alert(error.error.data)
    })
  }


  detailsPage(data: any) {

    console.log("custrec id", data)
    this.route.navigate(['Dashboard/customeroperations/customerDetailsScreen'], { queryParams: { CustRecID: data.CustRecID } })
  }
}
