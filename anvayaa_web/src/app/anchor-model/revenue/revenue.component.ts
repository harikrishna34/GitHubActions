import { Component, OnInit } from '@angular/core';

import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent implements OnInit {
  public anchorsdata!: UntypedFormGroup;
  location:any
  anchorsda:any
  FranchiseIDData:any
  updateAnchorsData: any
  anchorsRevenueDetails:any=[]
  CompanyRevenueDetails:any={}
  CompanyPanCard:any={}
  paramsForAnchorViewnew:any={}
  updateSubmitbtn: any = false;
  paramsForAnchorView: any = {};
  
  constructor(private userservice: UsersService, private router: Router, private route: ActivatedRoute, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.anchorsdata = this.formBuilder.group({
   
      // FranchiseType: [''],
      Type: [''],
      PurchaseType:[''],
      FranchiseShare:[''],
      StartDate: [''],
      EndDate: [''],
      CityID: [''],
     
      
   

    })
    this.onExistingAnchorData();
  }
  onExistingAnchorData() {
    this.FranchiseIDData=localStorage.getItem('FranchiseID')
    console.log("frID",localStorage.getItem('FranchiseID'))
    // console.log("CompanyProfile", this.FranchiseIDData)
    this.paramsForAnchorView['FranchiseID'] = localStorage.getItem('FranchiseID');
    this.userservice.anchorsdata({"FranchiseID":localStorage.getItem('FranchiseID')}).subscribe((viewAnchorData) => {
      this.anchorsRevenueDetails=viewAnchorData.data.RevenueDetails

console.log("anchorsdatanew",this.anchorsdata.value)
      console.log("this.RevenueDetails",viewAnchorData.data.RevenueDetails)
      if (viewAnchorData.code == "S001") {
        this.anchorsdata.patchValue({FranchiseID:viewAnchorData.data.FranchiseID})
        this.anchorsdata.patchValue({FranchiseType:"RevenueDetails"})

        this.anchorsdata.patchValue({StartDate:viewAnchorData.data.RevenueDetails.StartDate})


       }
      else {
return;
      }
    })

  }
  dashboard(){
    this.router.navigate(["/anchorboard"])
   }
   updateachors() {
    // this.updateSubmitbtn = true;
    this.paramsForAnchorViewnew['']
    this.paramsForAnchorViewnew['FranchiseID'] = localStorage.getItem('FranchiseID');
    this.paramsForAnchorViewnew['FranchiseType'] = "RevenueDetails";
    this.CompanyRevenueDetails=this.anchorsdata.value
    this.paramsForAnchorViewnew['RevenueDetails']= this.CompanyRevenueDetails
    // console.log(this.anchorsdata.value);
    console.log( this.paramsForAnchorViewnew);  
      this.userservice.anchorsDashboard(this.paramsForAnchorViewnew).subscribe(Response => {
        console.log("updateeee", Response)
if(Response.code="S001"){
  this.anchorsda=
alert(Response.data)
}

      })

   console.log("d")

  }
}
