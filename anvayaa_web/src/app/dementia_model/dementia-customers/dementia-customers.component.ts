import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users.service';
import {ActivatedRoute,Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-dementia-customers',
  templateUrl: './dementia-customers.component.html',
  styleUrls: ['./dementia-customers.component.css']
})
export class DementiaCustomersComponent implements OnInit {

  constructor(private snap:ActivatedRoute,private router:Router,private userService:UsersService,private spinner:NgxSpinnerService) { }

  AllDementiaCustomers:any=[]

  ngOnInit(): void {
    this.spinner.show();
    this.userService.viewAllDementiaCustomers().subscribe((response)=>{
           if(response.code=="S001"){
        this.AllDementiaCustomers=response.data;
        this.spinner.hide();
      }
      else{
        alert(response.data);
        this.spinner.hide();
      }
    },(error)=>{
      alert(error.error.data)
    })
    this.spinner.hide();

  }

  onBackBtnClick(){
    this.spinner.show();
    this.router.navigate(['/Dashboard/dementia/dementiaSchedule']);
    this.spinner.hide();

  }
  onSelectedCustomer(customerID:any){
    let CustRecID=customerID.target.innerText;
    // console.log("Point",CustRecID);
    this.spinner.show();
    this.router.navigate(['/Dashboard/dementia/dementiaCreateSchedule'],{ queryParams: {CustRecID :CustRecID} });
    this.spinner.hide();
  }

}
