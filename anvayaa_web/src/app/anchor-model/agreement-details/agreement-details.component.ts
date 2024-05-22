import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from '../../users.service';
@Component({
  selector: 'app-agreement-details',
  templateUrl: './agreement-details.component.html',
  styleUrls: ['./agreement-details.component.css']
})
export class AgreementDetailsComponent implements OnInit {
  FranchiseIDData:any


  public anchorsdata!: UntypedFormGroup;
  location:any
  anchorsda:any
  // FranchiseIDData:any
  updateAnchorsData: any
  anchorsAgreementDetails:any=[]
  AgreementDetails:any={}
  CompanyPanCard:any={}
  paramsForAnchorViewnew:any={}
  updateSubmitbtn: any = false;
  paramsForAnchorView: any = {};
  constructor(private userservice: UsersService, private router: Router, private route: ActivatedRoute, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.anchorsdata = this.formBuilder.group({
   
      // FranchiseType: [''],
      CityID: [''],
      StartDate:[''],
      EndDate:[''],
    })


    this. onExistingAnchorData
  }
  onExistingAnchorData() {
    this.FranchiseIDData=localStorage.getItem('FranchiseID')
    console.log("frID",localStorage.getItem('FranchiseID'))
    // console.log("CompanyProfile", this.FranchiseIDData)
    this.paramsForAnchorView['FranchiseID'] = localStorage.getItem('FranchiseID');
    this.userservice.anchorsdata({"FranchiseID":localStorage.getItem('FranchiseID')}).subscribe((viewAnchorData) => {
      this.anchorsAgreementDetails=viewAnchorData.data.AgreementDetails

console.log("anchorsdatanew",this.anchorsdata.value)
      console.log("this.AgreementDetails",viewAnchorData.data.AgreementDetails)
      if (viewAnchorData.code == "S001") {
        this.anchorsdata.patchValue({FranchiseID:viewAnchorData.data.FranchiseID})
        this.anchorsdata.patchValue({FranchiseType:"AgreementDetails"})
       }
      else {
return;
      }
    })

  }
  dashboard() {
    this.router.navigate(["/anchorboard"])
  }


  updateachors() {
    // this.updateSubmitbtn = true;
    this.paramsForAnchorViewnew['']
    this.paramsForAnchorViewnew['FranchiseID'] = localStorage.getItem('FranchiseID');
    this.paramsForAnchorViewnew['FranchiseType'] = "AgreementDetails";
    this.AgreementDetails=this.anchorsdata.value
    this.paramsForAnchorViewnew['AgreementDetails']= this.AgreementDetails
    // console.log(this.anchorsdata.value);
    console.log( this.paramsForAnchorViewnew);  
      this.userservice.anchorsDashboard(this.paramsForAnchorViewnew).subscribe(Response => {
        console.log("updateeee", Response)
if(Response.code="S001"){
  this.anchorsda=
alert(Response.data)
}

      })

   

  }
}
