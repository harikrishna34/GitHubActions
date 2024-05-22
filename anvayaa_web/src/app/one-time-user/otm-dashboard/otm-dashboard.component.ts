import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from 'src/app/users.service';
@Component({
  selector: 'app-otm-dashboard',
  templateUrl: './otm-dashboard.component.html',
  styleUrls: ['./otm-dashboard.component.css']
})
export class OTMDashboardComponent implements OnInit {

  constructor(public spinner:NgxSpinnerService,private userServices:UsersService) { }
  OTMdashBoardData:any={};
  PaymentdashBoardData:any={};
  ngOnInit(): void {
      this.spinner.show();


    // this.userServices.getOTMDashBoardCount().subscribe((dashBoardCOuntData)=>{
    //   this.OTMdashBoardData=dashBoardCOuntData.data.OTM;
    //   this.PaymentdashBoardData=dashBoardCOuntData.data.Payments;
    //   console.log("response",dashBoardCOuntData);

    //   console.log("OTM",this.OTMdashBoardData)






    // },(error)=>{
    //   alert(error.error.data)
    // })  
  }


  onCustomerSearch(){
    console.log("Customer Search clicked");
  }
}
