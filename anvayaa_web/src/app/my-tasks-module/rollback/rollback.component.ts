import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser'
import { UsersService } from '../../users.service'
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form, AbstractControl, ValidatorFn } from '@angular/forms';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-rollback',
  templateUrl: './rollback.component.html',
  styleUrls: ['./rollback.component.css']
})
export class RollbackComponent implements OnInit {
   CustRecID:any
   customerDetails :any = []
   comment:UntypedFormGroup
  
   submitRollBack:boolean = false
  constructor(private userservice: UsersService, private datePipe: DatePipe, private route: Router, private activatedRoute: ActivatedRoute, private formBuilder: UntypedFormBuilder, private DatePipe: DatePipe, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.CustRecID = this.activatedRoute.snapshot.queryParamMap.get("CustRecID");
    this.incomingRollBacks()

    this.comment = this.formBuilder.group({
      "RollBackComments":'',
      "AnvayaaPaymentID":''
    })
  }



  incomingRollBacks(){
    this.spinner.show();
    this.userservice.UserTaskAssigned().subscribe((response) => {
      if (response.code == "S001") {
        this.spinner.hide();
        
        let RollBackDetailsArray:any = []
        RollBackDetailsArray =  response.data.RollBack_Requests_Details
        
       this.customerDetails =  RollBackDetailsArray.filter( (data:any)=>{
            if(data.CustomerData.CustRecID == this.CustRecID){
              return data
            }
        })
        console.log("ffff",this.customerDetails[0])
      } else {
        alert(response.data);
        this.spinner.hide();
      }
    }, (err) => {
      alert(err.error.data);
      this.spinner.hide();
    })
  }

  approveRoleBack(){

    this.submitRollBack = true
     
      if(this.comment.status=='INVALID'){

      }else{
       
        const approvelObj = {
          "RollBackComments":this.comment.value.RollBackComments,
          "AnvayaaPaymentID":this.customerDetails[0]?.Payment?.AnvayaaPaymentID
        }
             this.spinner.show();
             this.userservice.ApproveRollBacks(approvelObj).subscribe((response) => {
               if (response.code == "S001") {
                 this.spinner.hide();
                 alert(response.data)
                 this.route.navigate(['Dashboard/Task/MyTask'])
               } else {
                 alert(response.data);
                 this.spinner.hide();
               }
             }, (err) => {
               alert(err.error.data);
               this.spinner.hide();
             })
      }
  
  }
}
