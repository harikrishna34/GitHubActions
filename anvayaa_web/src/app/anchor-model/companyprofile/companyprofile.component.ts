import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from '../../users.service';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-companyprofile',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.css']
})
export class CompanyprofileComponent implements OnInit {
  // anchorsdata:any


  constructor(private userservice: UsersService, private router: Router, private route: ActivatedRoute, private formBuilder: UntypedFormBuilder) { }
  public anchorsdata!: UntypedFormGroup;
  location: any
  anchorsda: any
  FranchiseIDData: any
  updateAnchorsData: any
  anchorsCompanyDetails: any = []
  CompanyDetailsdata: any = {}
  CompanyPanCard: any = {}
  paramsForAnchorViewnew: any = {}
  updateSubmitbtn: any = false;
  paramsForAnchorView: any = {};
  Image: any
  cityIDdata: any
  taxIMG: any
  IsTaxExeempeted: any
  isexam: any = true
  bankDetailsSubmitBtn: any = false
  isTaxExemptedbtn:any=false;
  taxfiledata:any=false
  taxfilingSubmitBtn:any=true
  ngOnInit(): void {

    this.anchorsdata = this.formBuilder.group({
      CompanyName: [''],
      CityID: [''],
      CompanyEmail: [''],
      MobileNumber: ['',[Validators.pattern('[5-9][0-9]{9}$')]],
      GST: ['',[Validators.pattern('[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')]],
      PanCard: [''],
      Address: [''],
      InCorporation: [''],
      TaxFile:[''],
      panfileimg:['',Validators.required]

    })

    this.onExistingAnchorData();
  }
  onExistingAnchorData() {
    console.log(this.anchorsdata)
    this.FranchiseIDData = localStorage.getItem('FranchiseID')
    // console.log("frID",localStorage.getItem('FranchiseID'))
    // console.log("CompanyProfile", this.FranchiseIDData)
    this.paramsForAnchorView['FranchiseID'] = localStorage.getItem('FranchiseID');
    // this.paramsForAnchorView['FranchiseType'] = "CompanyDetails";
    // this.paramsForAnchorView['CompanyDetails']=this.anchorsdata
    this.userservice.anchorsdata({ "FranchiseID": localStorage.getItem('FranchiseID') }).subscribe((viewAnchorData) => {
      this.anchorsCompanyDetails = viewAnchorData.data.CompanyDetails

      // console.log("anchorsdatanew",this.anchorsdata.value)

      // console.log("this.anchorsCompanyDetails",viewAnchorData.data.CompanyDetails)
      if (viewAnchorData.code == "S001") {
        this.anchorsdata.patchValue({ FranchiseID: viewAnchorData.data.FranchiseID })
        this.anchorsdata.patchValue({ FranchiseType: "CompanyDetails" })
      }if(viewAnchorData.code == "PD01"){
        alert(viewAnchorData.data)
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
    console.log(this.anchorsdata)
    this.bankDetailsSubmitBtn = true
   
    if (this.anchorsdata.status == "INVALID") {
   
      return;
    }
    else {
      const companyDetailsParams = new FormData();
      // this.FranchiseIDDa=localStorage.getItem('FranchiseID')
      this.cityIDdata = localStorage.getItem('CityID')
      companyDetailsParams.append('FranchiseID', this.FranchiseIDData)
      companyDetailsParams.append('FranchiseType', "CompanyDetails")
      companyDetailsParams.append('CompanyDetails.CompanyName', this.anchorsdata.value.CompanyName)

      companyDetailsParams.append('CompanyDetails.CityID', this.cityIDdata)
      companyDetailsParams.append('CompanyDetails.IsTaxExeempeted', this.IsTaxExeempeted)
      // console.log("inside",typeof(this.IsTaxExeempeted))
      // console.log("city",this.cityIDdata)

      companyDetailsParams.append('CompanyDetails.CompanyEmail', this.anchorsdata.value.CompanyEmail)
      // bankDetailsParams.append('BankDetails.CityID',this.anchorsdata.value.Type)
      // companyDetailsParams.append('CompanyDetails.MobileNumber',this.anchorsdata.value.MobileNumber)
      companyDetailsParams.append('CompanyDetails.BankName', this.anchorsdata.value.BankName)
      companyDetailsParams.append('CompanyDetails.MobileNumber', this.anchorsdata.value.MobileNumber)
      companyDetailsParams.append('CompanyDetails.GST', this.anchorsdata.value.GST)
      companyDetailsParams.append('CompanyDetails.PanCard', this.anchorsdata.value.PanCard)
      companyDetailsParams.append('CompanyDetails.Address', this.anchorsdata.value.Address)
      companyDetailsParams.append('CompanyDetails.InCorporation', this.anchorsdata.value.InCorporation)
      companyDetailsParams.append('CompanyPanCard', this.Image)
      companyDetailsParams.append('TaxFile', this.taxIMG)



      this.userservice.anchorsDashboard(companyDetailsParams).subscribe(Response => {
        // console.log("updateeee", Response)
        if (Response.code == "S001") {
          this.anchorsda =
            alert(Response.data)
        }
        if (Response.code == "S002") {
          alert(Response.data)
        }

      }, function (error) {
        alert(error.error.data)
      }
      )





    }
    // this.updateSubmitbtn = true;
  }

  onuploadcompanypan(img: any) {

    if (img.target.files.length > 0) {
      this.Image = img.target.files[0];
    }

  }
  onuploadtaxFile(img: any) {

    if (img.target.files.length > 0) {
      this.taxIMG = img.target.files[0];
    }

  }


  clickwrite(data:any) {
    this.isTaxExemptedbtn=true;
    this.taxfiledata=true
    this.IsTaxExeempeted = data
    console.log("true",this.IsTaxExeempeted)
  }
  clickfalse(data:any){
    this.isTaxExemptedbtn=false;
    this.IsTaxExeempeted =data
    console.log( this.IsTaxExeempeted)
  }

}
