import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
// import { BrowserModule } from '@angular/platform-browser'
import { UsersService } from '../../users.service'
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder, Validators, FormArray, Form } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
// import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})

export class RequestDetailsComponent implements OnInit {
  ProfileDoc: any
  reqID: any
  addprofilebtn: any = false
  requestDetailsData: any = []
  createdDate: any
  requestedDate: any
  profileForm!: UntypedFormGroup
  Vendor: any = []
  vendorName: any
  vendorId: any
  vendorList: any = []
  partnerID: any
  SubCategoryID: any
  CustRecID: any
  isVendorProfiles: any
  vendorProfiles: any = []
  AssignedVendor: any = []
  CustomerDetails: any
  inputLength: any
  submitted: any = false
  IdNumber: any
  inputValue: any
  profileView: any = []
  ProfileID: any
  RequestID: any
  data: any
  Doc: any
  ExDoc: any
  ServiceAreaID: any
  Vendors: any
  requestData2: any
  VendorID: any
  vList: any
  addProfiletab: any = false
  partnerData: any = []
  profileData: any;
  idProofAadhar: any = false
  idVoter: any = false
  idLicence: any = false
  ExicutiveID: any
  subscription: Subscription;
  pUrl: any = false
  getVendorName: void;
  // fileUploader: any;

  constructor(private userservice: UsersService, private router: Router, private route: ActivatedRoute, private formBuilder: UntypedFormBuilder, private date: DatePipe) { }

  @ViewChild('fileUploader') fileUploader: ElementRef;

  ngOnInit(): void {
    this.reqID = this.route.snapshot.queryParamMap.get("RequestID")
    this.CustRecID = this.route.snapshot.queryParamMap.get("CustRecID")
    this.ExicutiveID = this.route.snapshot.queryParamMap.get("PartnerExecutiveID")

    this.userservice.viewRequestDetails(this.reqID, this.CustRecID).subscribe((requestData) => {
      this.requestDetailsData = requestData.data
      if (this.requestDetailsData.PartnerExecutiveID == '') {
        alert("Please Assign Executive For This Request")
        this.router.navigate(['Dashboard/partner/partnersTask'])
      }

      this.vendorProfiles = requestData.data.VendorProfile
      this.CustomerDetails = requestData.data.CustomerDetails
      this.profileView = requestData.data.VendorProfile
      // for (let a of this.profileView) {
      //   this.Doc = a.ProfileUrl
      // }

      if (this.requestDetailsData.ServiceType == "Onetime" || this.vendorProfiles.length > 0) {
        this.isVendorProfiles = true;
      } else {
        this.isVendorProfiles = false;
      }


      this.SubCategoryID = this.requestDetailsData.SubCategoryID
      this.CustRecID = this.requestDetailsData.CustRecID
      this.ServiceAreaID = this.requestDetailsData.ServiceAreaID

      // this.userservice.getVendors(this.ServiceAreaID, this.SubCategoryID).subscribe((VendorsList) => {
      //   if (VendorsList.code == "S001") {
      //     this.partnerData = VendorsList.data.filter((obj: any) => {
      //       return obj.VendorDetails.Status == "Active"
      //     })
      //   }
      //   if (VendorsList.code == "ND01") {
      //     alert("No Vendor Found")
      //     this.router.navigate(['Dashboard/partner/partnersTask'])
      //   } 
      // }, (error) => {
      //   alert(error.error.data);
      // })

    })

    


    this.profileForm = this.formBuilder.group({
      IdNumber: ['',],
      IdType: [],
      Name: ['', [Validators.required]],
      VendorID: [],
      PrimaryMobileNo: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])],

    })


    const control1 = <UntypedFormControl>this.profileForm.get('IdType');
    const control2 = <UntypedFormControl>this.profileForm.get('IdNumber');


    this.subscription = control1.valueChanges.subscribe(value => {
      if (value == "VoterID") {

        control2.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)])
      } else if (value == "AadharID") {
        control2.setValidators([Validators.required, Validators.maxLength(12), Validators.minLength(12)])
      } else if (value == "Licence") {

        control2.setValidators([Validators.required, Validators.maxLength(10), Validators.minLength(10)])
      }

    })
  }

  selectingVendor(data: any) {
    // this.partnerID = data.target.value
  }

  onuploadtaxFile(img: any) {
    if (img.target.files.length > 0) {
      this.ProfileDoc = img.target.files[0];
    }
  }

  backbtn() {
    this.router.navigate(['Dashboard/partner/partnersTask'])
  }

  SubmitProfile() {
    this.submitted = true;
    this.fileUploader.nativeElement.value = null
    let profileData = new FormData()
    profileData.append("ProfileDoc", this.ProfileDoc);
    profileData.append("Name", this.profileForm.value.Name)
    profileData.append("VendorID", this.profileForm.value.VendorID);
    profileData.append("PrimaryMobileNo", this.profileForm.value.PrimaryMobileNo);
    profileData.append("RequestID", this.reqID)
    profileData.append("SubcategoryID", this.SubCategoryID)
    profileData.append("IdNumber", this.profileForm.value.IdNumber)
    profileData.append("IdType", this.profileForm.value.IdType)

    this.userservice.CreateVendorProfile(profileData).subscribe((requestData) => {
      if (requestData.code == "S001") {

        this.profileForm.reset({
          IdNumber: '',
          IdType: '',
          Name: '',
          VendorID: '',
          PrimaryMobileNo: '',
          ProfileDoc: ''
        })

        alert(requestData.data)
        this.viewRequestDetails()
        this.fileUploader.nativeElement.value = null
        this.profileForm.controls['IdType'].setErrors(null);
        this.profileForm.controls['IdNumber'].setErrors(null);
        this.profileForm.controls['Name'].setErrors(null);
        this.profileForm.controls['VendorID'].setErrors(null);
        this.profileForm.controls['PrimaryMobileNo'].setErrors(null);
      } else {
        alert(requestData.data)
        this.fileUploader.nativeElement.value = null
      }
    }, (error) => {
      alert(error.error.data)
      this.fileUploader.nativeElement.value = null
    })
    this.profileForm.controls['IdType'].setErrors(null);
    this.profileForm.controls['IdNumber'].setErrors(null);
    this.profileForm.controls['Name'].setErrors(null);
    this.profileForm.controls['VendorID'].setErrors(null);
    this.profileForm.controls['PrimaryMobileNo'].setErrors(null);

  }

  viewRequestDetails() {

    this.userservice.requestView(this.reqID, this.CustRecID).subscribe((requestData) => {
      this.requestData2 = requestData.data
      
      this.vendorProfiles = requestData.data.VendorProfile
      this.CustomerDetails = requestData.data.CustomerDetails
      this.profileView = requestData.data.VendorProfile
      this.AssignedVendor = requestData.AssignedVendor;
      for (let a of this.profileView) {

        this.Doc = a.ProfileUrl
      }
      if (this.vendorProfiles.length > 0) {
        this.isVendorProfiles = true;
      }
    })
  }

  fileView(index:any) {

   this.Doc= this.profileView[index].ProfileUrl 
    return window.open(this.Doc, "_blank");
  }

  profileAddForm() {
    this.addProfiletab = true
  }

  idInput(data: any) {
    this.inputLength = data.target.value.length
    this.inputValue = data.target.value

    if (this.inputLength == null) {
      this.pUrl = false
    }

    if (this.inputLength == "10" && (this.profileForm.value.IdType == "VoterID" || this.profileForm.value.IdType == "Licence")) {
      this.IdNumber = this.inputValue
      this.userservice.IdVerification(this.IdNumber,).subscribe((requestData) => {
        this.profileForm.patchValue({ Name: requestData.data.Name })
        this.profileForm.patchValue({ PrimaryMobileNo: requestData.data.PrimaryMobileNo })
        this.profileForm.patchValue({ VendorID: requestData.data.VendorID })

        this.ExDoc = requestData.data.ProfileUrl
        if (this.ExDoc != null) {
          this.pUrl = true
        }
      })
    }

    if (this.inputLength == "") {

      this.profileForm.reset({
        IdNumber: '',
        IdType: '',
        Name: '',
        VendorID: '',
        PrimaryMobileNo: '',
        ProfileDoc: ''
      })

      this.pUrl = false

    }

    if (this.inputLength == "12" && this.profileForm.value.IdType == "AadharID") {
      this.IdNumber = this.inputValue
      this.userservice.IdVerification(this.IdNumber,).subscribe((idData) => {


        this.profileForm.patchValue({ Name: idData.data.Name })
        this.profileForm.patchValue({ PrimaryMobileNo: idData.data.PrimaryMobileNo })
        this.profileForm.patchValue({ ProfileDoc: idData.data.ProfileDoc })
        this.profileForm.patchValue({ VendorID: idData.data.VendorID })

        this.ExDoc = idData.data.ProfileUrl
        if (this.ExDoc != null) {
          this.pUrl = true
        }
        this.getVendorName = idData.data.VendorDetails.VendorName
        // this.profileData.patchValue({ ProfileDoc: requestData.data.ProfileDoc })

      })

    }

  }

  removeProfile(data: any) {
    this.ProfileID = data.ProfileID
    this.userservice.removeUplodedProfile(this.reqID, this.ProfileID).subscribe((requestData) => { })
    window.location.reload();
  }

  SubmitToPartner() {
    this.userservice.submitProfiles(this.reqID).subscribe((requestData) => {
      if (requestData.code == "S001") {
        alert(requestData.data)
        this.router.navigate(['Dashboard/partner/partnersTask'])

      }
    }, function (error) {
      alert("please add profiles")
    })

  }
  vendorID(data: any) {
    this.VendorID = data.target.value
  }
  assignVendorForRequest() {

    this.userservice.assignVendorForRequest("this.reqID, this.VendorID").subscribe((requestData) => {

      if (requestData.code == "S001") {
        alert(requestData.data)
      }
    })


  }

  existing() {
    return window.location.href = this.ExDoc

  }

  idValidation(data: any) {
    if (data.target.value == "AadharID") {
      this.idProofAadhar = true
      this.idLicence = false
      this.idVoter = false
    } else {
      if (data.target.value == "VoterID") {
        this.idVoter = true
        this.idProofAadhar = false
        this.idLicence = false
      } else {
        if (data.target.value == "Licence") {
          this.idLicence = true
          this.idVoter = false
          this.idProofAadhar = false
        }
      }
    }



  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
function existing() {
  throw new Error('Function not implemented.');
}

