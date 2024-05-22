import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UsersService } from '../../users.service'
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, Form } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SwPush } from "@angular/service-worker";
@Component({
  selector: 'app-asersmonitoring',
  templateUrl: './asersmonitoring.component.html',
  styleUrls: ['./asersmonitoring.component.css']
})
export class AsersmonitoringComponent implements OnInit {
  monitoringdata:any=[]
  // CDB:any
  token:any
  sortBy: string = 'Name';
  sortOrder: string = 'asc';
  constructor(private _swPush: SwPush,private userservice: UsersService, private datePipe: DatePipe, private route: Router, private snap: ActivatedRoute, private spinner: NgxSpinnerService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  // const stepper = document.querySelector('#stepper');
  // new this.CDB.Stepper(stepper);
  this.token = localStorage.getItem('x-fiftyaccess-token')
  if(this.token ==null){
    this.route.navigate(["login"],)
  }
    this.displayingasersmonitor()
    // this.requestSubscription()
    // this._swPush.messages.subscribe((message:any)=>{
    //   console.log(message)
    //   this.refreshComponent();
    // }
    //   )
  }

  refreshComponent() {
    // Implement the logic to refresh your component
    this.displayingasersmonitor()
  }
displayingasersmonitor() {
    this.userservice.getasersmonitoringscreendata().subscribe((response) => {
      this.monitoringdata = response.data
      console.log("monitoring", response.data)
      if (response.code == 'S001') {
        // alert(response.data)
      }
      else if (response.code == 'S002') {
        alert(response.data)
      } else {
        alert(response.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }
  customermonitordetails(data:any){
    console.log("xcccxcccx",data)
    let CID = data.CustomerID;
    let RID = data.RecordID;
    this.route.navigate(['Dashboard/asers/AsersMonitoringSteps'],{ queryParams:{CustomerID:CID,RecordID:RID}})
    
  }


  // requestSubscription(){

  //   console.log(this._swPush.isEnabled)

  //   if (!this._swPush.isEnabled) {
  //     console.log("Notification is not enabled.");
  //     return;
  //   }
  //   this._swPush.requestSubscription({
  //     serverPublicKey: 'BKqvrKH1aFMiNWh7VfJCZbKSZWHWOmIUey1ZObD5wTqSb7rvlxnVrBaEMlKEs5e86xiixIj1RAO3OeqM1xap4Z4'
  //   }).then((subscription:any) =>{

  //    console.log("monitorScreen")
  //     const Keys = subscription.toJSON();
  //     this.subscribenotification(Keys)}).catch(err => console.log(err));
      
  // }
  



//   subscribenotification(keys:any){

//     let endPointObj = {
//      "endpoint":'',
//      "expirationTime":'',
//      "keys":'',
//      "Token":'',
//      "ServerType":"Tcp"
//     }

//     endPointObj.endpoint = keys.endpoint
//     endPointObj.expirationTime = keys.endpoint
//     endPointObj.keys = keys.keys
//     endPointObj.Token = this.token
   
   
//     console.log('subcription called ')
   
//    this.userservice.subscribe(endPointObj).subscribe((Response) => {
//      if (Response.code == "S001") {

//        console.log('subcription response')
//      } else {
//        alert(Response.message)
//      }

//    }, (error) => {
//      alert(error.error.message)
//    })
//  }
 sortdetails(column: string){
  if (this.sortBy === column) {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortBy = column;
    this.sortOrder = 'asc';
  }
  this.performSorting();
}
 

 
performSorting() {
  if (this.sortBy && this.sortOrder) {
    this.monitoringdata.sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => {
      const valA = a[this.sortBy];
      const valB = b[this.sortBy];
      if (valA < valB) return this.sortOrder === 'asc' ? -1 : 1;
      else if (valA > valB) return this.sortOrder === 'asc' ? 1 : -1;
      else return 0;
    });
  }
}
}
