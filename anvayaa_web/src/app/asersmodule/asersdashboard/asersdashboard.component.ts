import { Component, OnInit,NgModule } from '@angular/core';
import { UsersService } from '../../users.service'
import {ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-asersdashboard',
  templateUrl: './asersdashboard.component.html',
  styleUrls: ['./asersdashboard.component.css']
})
export class AsersdashboardComponent implements OnInit {
 Customers:any = []
 SponsersArray:any =[]
  constructor(private userservice: UsersService, private route: Router, private spinner: NgxSpinnerService, private Router: Router, private UsersService: UsersService, private FormBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.sponsoresName()
    
    this. allCustomers()
  }


  watchIntigration(){
    this.route.navigate(['Dashboard/asers/configuration'])
  }
  setting(){
    this.route.navigate(['Dashboard/asers/Instantsettings'])
  }
  features(){
    this.route.navigate(['Dashboard/asers/AsersMasters'])
  }
  aserscustomers(){
    this.route.navigate(['Dashboard/asers/AsersMonitoring'])

  }
  customerdetails(data:any){
    console.log("data",data)

    let CID = data.UserDetails.CustomerID;
    let DeviceId= data.DeviceDetails.IMEINumber
     console.log("cid",CID)
    // this.route.navigate(['Dashboard/asers/customerdetails'],{ queryParams:{CustomerID:CID,DeviceId:DeviceId,modelID:data.DeviceDetails.DeviceID} })
    this.route.navigate(["Dashboard/asers/customerdetailsview"],{ queryParams:{CustRecID:data.UserDetails.CustomerID} })
  }


  alaramHistory(){
    this.route.navigate(['Dashboard/asers/AlaramHistory'])
  }

  sponsoresName(){
    this.userservice.customerlist().subscribe((userlist) =>{      
      if(userlist.code == "S001"){
      
        this.spinner.hide();
         this.SponsersArray = userlist.data
         console.log("spon",this.SponsersArray)
      }else if(userlist.code == "PD01"){
        alert(userlist.data)
        this.spinner.hide();
        
      } else{
        this.spinner.hide();
        alert(userlist.message)
       

      }
    },(error)=>{
      this.spinner.hide();
      alert(error.error.data)
    })
  }

  allCustomers(){
   this.spinner.show()
    this.UsersService.allAsersCustomers().subscribe((response) => {
      this.spinner.hide();
      if (response.code == "S001") {

        let arr=    this.SponsersArray.filter( (sponser:any)=> {
                 
              console.log("Sponser",sponser)
            })

            
         this.Customers=response.data;
     
      } else {
      this.spinner.hide();

        alert(response.data)
      }
    }, ((error) => {
      this.spinner.hide();
    }))
  }
}
