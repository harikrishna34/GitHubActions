import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router, Route } from '@angular/router';


@Component({
  selector: 'app-anchor-dashboard',
  templateUrl: './anchor-dashboard.component.html',
  styleUrls: ['./anchor-dashboard.component.css']
})
export class AnchorDashboardComponent implements OnInit {

  constructor(private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
    profiel(){
      this.router.navigate(["/anchorprofiel"])

    }

    comapnydetails(){
      this.router.navigate(["/companyprofile"])
    }
    contactDetails(){
      this.router.navigate(["/contactdetails"])
    }
    bankDetails(){
      this.router.navigate(["/bankdetails"])
    }

    agreementDetails(){
      this.router.navigate(["/AgreementDetails"])
    }
    LocationDetails(){
      this.router.navigate(["/LocationDetails"])
    }

    
    revenue(){
      this.router.navigate(["/Revenue"])
    }
}
