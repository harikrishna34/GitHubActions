import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from '../../users.service';
@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {
  public anchorsdata!: UntypedFormGroup;
  location:any
  anchorsda:any
  FranchiseIDData:any
  updateAnchorsData: any
  anchorsLocationDetails:any=[]
  CompanyContactDetails:any={}
  CompanyPanCard:any={}
  paramsForAnchorViewnew:any={}
  updateSubmitbtn: any = false;
  paramsForAnchorView: any = {};
  constructor(private userservice: UsersService, private router: Router, private route: ActivatedRoute, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {

    this.anchorsdata = this.formBuilder.group({
   
      // FranchiseType: [''],
      CityName: [''],     
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
      this.anchorsLocationDetails=viewAnchorData.data.LocationDetails

console.log("anchorsdatanew",this.anchorsdata.value)
      console.log("this.LocationDetails",viewAnchorData.data.LocationDetails)
      if (viewAnchorData.code == "S001") {
        this.anchorsdata.patchValue({FranchiseID:viewAnchorData.data.FranchiseID})
        this.anchorsdata.patchValue({FranchiseType:"LocationDetails"})
       }
      else {
return;
      }
    })

  }
  updateachors() {
    const LocationDetailsParams=new FormData();
    this.updateSubmitbtn = true;
   
    LocationDetailsParams.append('FranchiseID',this.FranchiseIDData)
    LocationDetailsParams.append('FranchiseType',"LocationDetails")
    LocationDetailsParams.append('LocationDetails.CityID',this.anchorsdata.value.CityID)
    LocationDetailsParams.append('LocationDetails.CityName',this.anchorsdata.value.CityName)

      this.userservice.anchorsDashboard(LocationDetailsParams).subscribe(Response => {
        console.log("updateeee", Response)
if(Response.code="S001"){
  this.anchorsda=
alert(Response.data)
}

      })

   

  }
  dashboard() {
    this.router.navigate(["/anchorboard"])
  }
}
