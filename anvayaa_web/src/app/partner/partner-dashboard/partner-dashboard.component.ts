import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-partner-dashboard',
  templateUrl: './partner-dashboard.component.html',
  styleUrls: ['./partner-dashboard.component.css']
})
export class PartnerDashboardComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }



partnerDashboard(){
  
}
backbtn(){
  this.route.navigate(['/partner/partnersTask'])
}

}
