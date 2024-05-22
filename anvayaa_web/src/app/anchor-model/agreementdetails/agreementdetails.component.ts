import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-agreementdetails',
  templateUrl: './agreementdetails.component.html',
  styleUrls: ['./agreementdetails.component.css']
})
export class AgreementdetailsComponent implements OnInit {
  public anchorsdata!: UntypedFormGroup;
  FranchiseIDData: any
  location: any
  model: any;

  anchorsda: any
  FranchiseIDDa: any
  updateAnchorsData: any
  anchorsAgreementDetails: any = []
  AgreementDetails: any = {}
  CompanyPanCard: any = {}
  paramsForAnchorViewnew: any = {}
  updateSubmitbtn: any = false;
  paramsForAnchorView: any = {};
  Image: any;
  cityIDData: any
  bankDetailsSubmitBtn: any = false
  constructor(private userservice: UsersService, private router: Router, private route: ActivatedRoute, private formBuilder: UntypedFormBuilder) { }

  maxdate = new Date();

  ngOnInit(): void {

    this.anchorsdata = this.formBuilder.group({

      // FranchiseType: [''],
      CityID: [''],
      StartDate: [''],
      EndDate: [''],
    })
    this.onExistingAnchorData();
  }


  onExistingAnchorData() {
    this.FranchiseIDData = localStorage.getItem('FranchiseID')
    console.log("frID", localStorage.getItem('FranchiseID'))
    // console.log("CompanyProfile", this.FranchiseIDData)
    this.paramsForAnchorView['FranchiseID'] = localStorage.getItem('FranchiseID');
    this.userservice.anchorsdata({ "FranchiseID": localStorage.getItem('FranchiseID') }).subscribe((viewAnchorData) => {
      this.anchorsAgreementDetails = viewAnchorData.data.AgreementDetails

      console.log("anchorsdatanew", this.anchorsdata.value)
      console.log("this.AgreementDetails", viewAnchorData.data.AgreementDetails)
      if (viewAnchorData.code == "S001") {
        this.anchorsdata.patchValue({ FranchiseID: viewAnchorData.data.FranchiseID })
        this.anchorsdata.patchValue({ FranchiseType: "AgreementDetails" })

      }
      if(viewAnchorData.code == "PD01"){
        alert(viewAnchorData.data)
      }
      else {
        return;
      }
    })

  }
  dashboard() {
    this.
      router.navigate(["/anchorboard"])
  }
  updateachors() {
    this.bankDetailsSubmitBtn = true


    if (this.anchorsdata.status == "INVALID") {
      console.log('mandatory');
      return;
    }
    // this.updateSubmitbtn = true;
    else {
      this.paramsForAnchorViewnew['']
      this.paramsForAnchorViewnew['FranchiseID'] = localStorage.getItem('FranchiseID');
      this.paramsForAnchorViewnew['FranchiseType'] = "AgreementDetails";
      this.AgreementDetails = this.anchorsdata.value
      this.paramsForAnchorViewnew['AgreementDetails'] = this.AgreementDetails
      // console.log(this.anchorsdata.value);
      console.log(this.paramsForAnchorViewnew);
      const agreementDetailsParams = new FormData();

      this.paramsForAnchorViewnew['file'] = this.Image


      this.FranchiseIDDa = localStorage.getItem('FranchiseID')
      this.cityIDData = localStorage.getItem('CityID')
      agreementDetailsParams.append('FranchiseID', this.FranchiseIDDa)
      agreementDetailsParams.append('FranchiseType', "AgreementDetails")
      agreementDetailsParams.append('AgreementDetails.CityID', this.cityIDData)
      agreementDetailsParams.append('AgreementDetails.StartDate', this.anchorsdata.value.StartDate)
      agreementDetailsParams.append('AgreementDetails.EndDate', this.anchorsdata.value.EndDate)
      agreementDetailsParams.append('AgreementDoc', this.Image)
      this.userservice.anchorsDashboard(agreementDetailsParams).subscribe(Response => {
        console.log("updateeee", Response)
        if (Response.code = "S001") {
          this.anchorsda =
            alert(Response.data)
        }

       } ,
        function (error) {
          alert(error.error.data)
        }
      )
    }




  }


  onFileUpload(img: any) {

    if (img.target.files.length > 0) {
      this.Image = img.target.files[0];
    }

  }
}
