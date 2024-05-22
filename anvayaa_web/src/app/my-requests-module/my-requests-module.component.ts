import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../users.service';
import { Router, Routes ,ActivatedRoute} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UntypedFormBuilder, UntypedFormGroup, FormControl, Validators  } from '@angular/forms';
interface onCancelParams {
  RequestID: String;
}
@Component({
  selector: 'app-my-requests-module',
  templateUrl: './my-requests-module.component.html',
  styleUrls: ['./my-requests-module.component.css']
})
export class MyRequestsModuleComponent implements OnInit {
  @ViewChild ('cancelRequestCloseBtn') cancelRequestCloseBtn:any;
  myRequestsArr=[];
  filtersForm:UntypedFormGroup;
  requestID:String;
  constructor(private activatedRoute:ActivatedRoute,private fb:UntypedFormBuilder,private userServices:UsersService,private route:Router,private spinner:NgxSpinnerService,private Router: Router) { }
  ngOnInit(): void {
    this.spinner.show();
    this.onListOfMyRequests(null,null,null);
    this.filtersForm=this.fb.group({
      StartDate:[''],
      EndDate:['']
    });
    this.spinner.hide();
  };
  isHideTheCancelButton(statusData:any){
   let isStatusApplicableForCancelation=false;
    switch(statusData.Status){
        case "Requested":
         isStatusApplicableForCancelation=true;
          break;
        case "Assigned_To_Partner_Team":
          isStatusApplicableForCancelation=true;
          break;
        case "Partner_Team_Accepeted":
          isStatusApplicableForCancelation=true;
          break;
        case "Pending_Customer_Approval":
          isStatusApplicableForCancelation=true;
          break;
        case "Scheduled":
          isStatusApplicableForCancelation=true;
          break;
      }
    return isStatusApplicableForCancelation;
  }
  onCancelClick(requestDetails:any){
    this.requestID=requestDetails.RequestID;
  }
  onCancelSubmit(){
    const requiredParamsForCancelRequest:onCancelParams={
      "RequestID":this.requestID
    };
    this.userServices.cancelRequestDetails(requiredParamsForCancelRequest).subscribe((response)=>{
      if(response.code=="S001"){
        this.cancelRequestCloseBtn.nativeElement.click();
        this.onSearch()
        alert(response.data);
      }
      else{
        alert(response.data)
      }
    },(err)=>{
      alert(err.error.data)
    })
  }
  onSearch(){
    const startDate=this.filtersForm.value.StartDate;
    const endDate=this.filtersForm.value.EndDate;
    this.onListOfMyRequests(null,startDate,endDate);
  }
  onListOfMyRequests(type:any,StartDate:any,EndDate:any){
    this.userServices.getListOfSubmittedProfiles(null,StartDate,EndDate).subscribe((response)=>{
      if(response.code=="S001"){
        this.myRequestsArr=response.data;
      }else{
        alert(response.data)
      }
    },(err)=>{
      alert(err.error.data)
    })
  }


  requestDetails(requestobj: any) {

    console.log(requestobj)

    const allRequestDetails = this.Router.serializeUrl(this.Router.createUrlTree(['Dashboard/support/allRequestDetails'], { queryParams: { "RequestID": requestobj.RequestID, "CustRecID": requestobj.CustRecID, "Status": requestobj.Status } }))

    window.open(allRequestDetails, '_blank')
  }

}
