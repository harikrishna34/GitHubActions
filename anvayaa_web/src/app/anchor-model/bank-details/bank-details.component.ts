// import { REFERENCE_PREFIX } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from '../../users.service';
@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {
  public anchorsdata!: UntypedFormGroup;
  Image: any
  bankdata:any=false
  location: any
  anchorsda: any
  FranchiseIDData: any
  updateAnchorsData: any
  anchorsBankDetails: any = []
  BankDetailsdata: any = {}
  CompanyPanCard: any = {}
  paramsForAnchorViewnew: any = {}
  updateSubmitbtn: any = false;
  paramsForAnchorView: any = {};
  bankDetailsSubmitBtn: any = false;
  cityIDdata: any
  constructor(private userservice: UsersService, private router: Router, private route: ActivatedRoute, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.anchorsdata = this.formBuilder.group({

      // FranchiseType: [''],
      CityID: [''],
      AccountNumber: ['', Validators.pattern('[0-9]*$')],
      BankName: [''],
      Type: [''],
      IFSC: ['',Validators.pattern('[A-Z]{4}0[A-Z0-9]{6}$')],




    })

    this.onExistingAnchorData();


    
  }
  onExistingAnchorData() {
    
    this.FranchiseIDData = localStorage.getItem('FranchiseID')
    console.log("frID", localStorage.getItem('FranchiseID'))
    // console.log("CompanyProfile", this.FranchiseIDData)
    this.paramsForAnchorView['FranchiseID'] = localStorage.getItem('FranchiseID');
    this.userservice.anchorsdata({ "FranchiseID": localStorage.getItem('FranchiseID') }).subscribe((viewAnchorData) => {
      this.anchorsBankDetails = viewAnchorData.data.BankDetails

      console.log("anchorsdatanew", this.anchorsdata.value)
      console.log("this.anchorsContactDetails", viewAnchorData.data.BankDetails)
      if (viewAnchorData.code == "S001") {
  console.log("bankdetils",this.anchorsBankDetails)
        this.bankdata=true
        this.anchorsdata.patchValue({ FranchiseID: viewAnchorData.data.FranchiseID })
        this.anchorsdata.patchValue({ FranchiseType: "BankDetails" })
        this.anchorsdata.patchValue({ AccountNumber: viewAnchorData.data.BankDetails[0].AccountNumber })
        this.anchorsdata.patchValue({ BankName: viewAnchorData.data.BankDetails[0].BankName })
        this.anchorsdata.patchValue({ Type: viewAnchorData.data.BankDetails[0].Type })
        this.anchorsdata.patchValue({ IFSC: viewAnchorData.data.BankDetails[0].IFSC })
      }
      if (viewAnchorData.code == "PD01") {
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
    this.bankDetailsSubmitBtn = true;
    console.log(this.anchorsdata);
    if (this.anchorsdata.status == "INVALID") {
      console.log('mandatory');
      return;
    }
    else {

      // this.updateSubmitbtn = true;
      this.paramsForAnchorViewnew['']
      this.paramsForAnchorViewnew['FranchiseID'] = localStorage.getItem('FranchiseID');
      this.paramsForAnchorViewnew['FranchiseType'] = "BankDetails";
      this.BankDetailsdata = this.anchorsdata.value
      this.paramsForAnchorViewnew['BankDetails'] = this.BankDetailsdata
      // console.log(this.anchorsdata.value);
      console.log(this.paramsForAnchorViewnew);



      const bankDetailsParams = new FormData();
      // this.FranchiseIDDa=localStorage.getItem('FranchiseID')
      this.cityIDdata = localStorage.getItem('CityID')
      bankDetailsParams.append('FranchiseID', this.FranchiseIDData)
      bankDetailsParams.append('FranchiseType', "BankDetails")
      bankDetailsParams.append('BankDetails.Type', this.anchorsdata.value.Type)

      bankDetailsParams.append('BankDetails.CityID', this.cityIDdata)
      bankDetailsParams.append('BankDetails.AccountNumber', this.anchorsdata.value.AccountNumber)
      bankDetailsParams.append('BankDetails.BankName', this.anchorsdata.value.BankName)
      // bankDetailsParams.append('BankDetails.CityID',this.anchorsdata.value.Type)
      bankDetailsParams.append('BankDetails.IFSC', this.anchorsdata.value.IFSC)
      // agreementDetailsParams.append('BankDetails.BankName',this.anchorsdata.value.BankName)

      bankDetailsParams.append('CanceledCheck', this.Image)


      this.userservice.anchorsDashboard(bankDetailsParams).subscribe(Response => {
        console.log("updateeee", Response)
        if (Response.code = "S001") {
          this.anchorsda =
            alert(Response.data)
        }

      },
      function(error){
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
