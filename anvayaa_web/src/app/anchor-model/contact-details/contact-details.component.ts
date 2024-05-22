import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from '../../users.service';
@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  public anchorsdata!: UntypedFormGroup;
  location:any
  anchorsda:any
  FranchiseIDData:any
  updateAnchorsData: any
  anchorsContactDetails:any=[]
  CompanyContactDetails:any={}
  CompanyPanCard:any={}
  paramsForAnchorViewnew:any={}
  updateSubmitbtn: any = false;
  paramsForAnchorView: any = {};
  panImage:any
  cityID:any
  adharImage:any
  bankDetailsSubmitBtn:any=false

  constructor(private userservice: UsersService, private router: Router, private route: ActivatedRoute, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.anchorsdata = this.formBuilder.group({
   
      // FranchiseType: [''],
      CityID: [''],
      // CityName:['',Validators.pattern('[A-Za-z]+$')],
      Name: ['',Validators.pattern('[a-zA-Z \-\]*$')],
      Email:[''],
      MobileNumber:['',[Validators.minLength(10),Validators.pattern('[5-9][0-9]{9}$')]],
      Aadhar: ['',[Validators.minLength(12),Validators.maxLength(12)]],
      PanCard: ['',Validators.minLength(10)],
      PanCardimg:['',Validators.required],
      adharfile:['',Validators.required]
    
    })
    
    this.onExistingAnchorData();
  }
  onExistingAnchorData() {
    this.FranchiseIDData=localStorage.getItem('FranchiseID')
    console.log("frID",localStorage.getItem('FranchiseID'))
    // console.log("CompanyProfile", this.FranchiseIDData)
    this.paramsForAnchorView['FranchiseID'] = localStorage.getItem('FranchiseID');
    this.userservice.anchorsdata({"FranchiseID":localStorage.getItem('FranchiseID')}).subscribe((viewAnchorData) => {
      this.anchorsContactDetails=viewAnchorData.data.ContactDetails

console.log("anchorsdatanew",this.anchorsdata.value)
      console.log("this.anchorsContactDetails",viewAnchorData.data)
      if (viewAnchorData.code == "S001") {
        this.anchorsdata.patchValue({FranchiseID:viewAnchorData.data.FranchiseID})
        this.anchorsdata.patchValue({FranchiseType:"ContactDetails"})
        // this.anchorsdata.patchValue({Email:viewAnchorData.data.ContactDetails[0].EmailID}) 
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
    this.router.navigate(["/anchorboard"])
  }
  updateachors() {
     this.updateSubmitbtn = true;
    console.log(this.anchorsdata)
    this.bankDetailsSubmitBtn=true
    if(this.anchorsdata.status=="INVALID"){
      console.log('mandatory');
      return;
    }else{
      const contactDetailsParams=new FormData();
      this.cityID=localStorage.getItem('CityID')
      contactDetailsParams.append('FranchiseID',this.FranchiseIDData)
      contactDetailsParams.append('FranchiseType',"ContactDetails")
      contactDetailsParams.append('ContactDetails.Name',this.anchorsdata.value.Name)
      // contactDetailsParams.append('ContactDetails.CityName',this.anchorsdata.value.CityName)
      contactDetailsParams.append('ContactDetails.CityID',this.cityID)
      contactDetailsParams.append('ContactDetails.MobileNumber',this.anchorsdata.value.MobileNumber)
      contactDetailsParams.append('ContactDetails.Email',this.anchorsdata.value.Email)
      contactDetailsParams.append('ContactDetails.Aadhar',this.anchorsdata.value.Aadhar)
      contactDetailsParams.append('AadharCard',this.adharImage)
      contactDetailsParams.append('ContactDetails.PanCard',this.anchorsdata.value.PanCard)
      contactDetailsParams.append('PanCard',this.panImage)
  
  
  
  
this.userservice.anchorsDashboard(contactDetailsParams).subscribe(function(Response){
  // this.dataa=Response.Data
          console.log("updateeee", Response.code)
         

  if(Response){
  
  alert(Response.data)
  }


},function(error){
  alert(error.error.data)
}

)
  
    }
   
   
   

  }
  onFileUploadPan(img:any){
   
    if(img.target.files.length > 0){
      this.panImage=img.target.files[0];
    }
   
  }
  onFileUploadAdhar(img:any){
    if(img.target.files.length > 0){
      this.adharImage=img.target.files[0];
    }


  }

}
