import { Component, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from 'src/app/users.service';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import {animate, state, style, transition, trigger} from '@angular/animations';
@Component({
  selector: 'app-search-profile',
  templateUrl: './search-profile.component.html',
  styleUrls: ['./search-profile.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SearchProfileComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  @ViewChild('rejectProfilebutton') rejectProfilebutton: any;

  RequestID:any;
  CustRecID:any;
  RequestDetails:any;
  searchForm:UntypedFormGroup;
  rejectProfileForm:UntypedFormGroup;
  partnersData:any=[];
  partnersDataFlag:boolean=false;
  selectedProfile:any={};
  tarrifDetails:any={};
  profileIDForReject:string='';
  profiles:any=[];
  noProfilesFoundFlag:boolean=false
  constructor(
    private spinner: NgxSpinnerService,
    private userservice: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder
  ) { }
  ngOnInit(): void {
    this.RequestID = this.route.snapshot.queryParamMap.get('RequestID');
    this.CustRecID = this.route.snapshot.queryParamMap.get('CustRecID');
    this.vendorList()
    this.onSearchFormLoad();
    this.onRejectProfileForm();
    this.viewrequestDetails();

  };
  onSearchFormLoad(){
    this.searchForm=this.formBuilder.group({
      Gender:['',[Validators.required]],
    })
  }
  onRejectProfileForm(){
    this.rejectProfileForm=this.formBuilder.group({
      Comment:['',[Validators.required,Validators.minLength(3)]],
    })
  }
  handleSearchSubmit(){
    if(this.searchForm.status!="INVALID"){
      const paramsForSearchProfiles:{RequestID:string,Gender:string}={
        RequestID:this.RequestID,
        Gender:this.searchForm.value.Gender
      }
      this.userservice.searchProfiles(paramsForSearchProfiles).subscribe((profilesData)=>{
        if (profilesData.code === 'S001') {
          this.partnersData=profilesData.data;
          this.partnersDataFlag=true          
        }else{          
          alert(profilesData.message);
        }
      },(error)=>{
        if(error.error.code==="P001" || error.error.code==="S002"){
          this.partnersData=[];
          this.noProfilesFoundFlag=true  
        }
        this.spinner.hide();
        alert(error.error.data)
      })
    }

  }
  handleAddProfile(profileDetails:any){
    this.selectedProfile=profileDetails;
  }
  handleTarrifChange(tarrifData:any){
    const filteredArrOfTarrif=this.selectedProfile.Rates.filter((obj:any)=>{return obj["TarrifType"]===tarrifData.target.value});
    this.tarrifDetails=filteredArrOfTarrif[0];
  }
  handleSaveProfileToRequest(){
    this.spinner.show();
    const paramsForProfiles:any={
      ProfileID:this.selectedProfile.ProfileID,
      "VendorPrice": +this.tarrifDetails.VendorPrice,  
      "MinimumPrice": +this.tarrifDetails.MinimumPrice, 
      "TariffType":this.tarrifDetails.TarrifType,
      "ReferralType": this.tarrifDetails.ReferalType,
      "AnvayaaReferralFee": +this.tarrifDetails.ReferalFee,
    };
    const paramsForSubmitProfileToRequest:any={};
     paramsForSubmitProfileToRequest.RequestID=this.RequestID;
     paramsForSubmitProfileToRequest.Profiles=[];
     paramsForSubmitProfileToRequest.Profiles.push(paramsForProfiles);
    this.userservice.assignProfilesToRequest(paramsForSubmitProfileToRequest).subscribe((data)=>{
      if(data.code==="S001"){
        this.spinner.hide();
        alert(data.data);
        this.handleDefaultValues()
      }else{
        this.spinner.hide();
        this.handleDefaultValues()
        alert(data.data)
      }
    },(error)=>{
      this.spinner.hide();
      this.handleDefaultValues()
      alert(error.error.data)
    })
  }
  handleDefaultValues(){
    this.tarrifDetails={};
    this.selectedProfile={};
    this.handleSearchSubmit();
    this.viewrequestDetails()
    this.closebutton.nativeElement.click();
  }
  viewrequestDetails(){
    this.spinner.show();
    this.userservice.viewRequestDetailsOld(this.RequestID, this.CustRecID).subscribe((requestDetails) => {
      if (requestDetails.code === 'S001') {
        this.RequestDetails = requestDetails.data;
        const beneficiaryDetailsFilter =this.RequestDetails.CustomerDetails.Beneficiaries.filter((data: any) => {
              return this.RequestDetails.CustID === data.CustID;
            });
        this.RequestDetails.BeneficiaryData = beneficiaryDetailsFilter[0];
        this.profiles=this.RequestDetails.PartnerProfiles.filter((partnerDetails:any)=>{return partnerDetails['Status']==="NotApproved" })
        this.spinner.hide();
      }else{
        alert(requestDetails.data)
      }
    },(error)=>{
      this.spinner.hide();
      alert(error.error.data);
    })
  }
  handleRejectProfile(data:any){
    this.profileIDForReject=data.ProfileID;
  }
  submitRejectProfile(){
    this.spinner.show();
    const paramsForReoveProfileFromRequest:any={};
    paramsForReoveProfileFromRequest.RequestID=this.RequestID;
    paramsForReoveProfileFromRequest.ProfileID=this.profileIDForReject;
    paramsForReoveProfileFromRequest.Comment=this.rejectProfileForm.value["Comment"];
    this.userservice.removeProfilesFromRequest(paramsForReoveProfileFromRequest).subscribe((data)=>{
      if(data.code==="S001"){
        this.spinner.hide();
        alert(data.data);
        this.rejectProfilebutton.nativeElement.click();
        this.viewrequestDetails();
      }else{
        this.spinner.hide();
        alert(data.data)
      }
    },(error)=>{
      this.spinner.hide();
      alert(error.error.data)
    })
  }
  handleAssignRequestToPartnerTeam(){
    this.spinner.show();
    this.userservice.assignRequestToPartnerteam(this.RequestID).subscribe((data)=>{
      if(data.code==="S001"){
        this.spinner.hide();
        alert(data.data);
      }else{
        this.spinner.hide();
        alert(data.data);
      }
    },(error)=>{
      this.spinner.hide();
      alert(error.error.data)
    })
  }
  handleAcceptProfile(data:any){
    this.spinner.show();
    this.userservice.profileActed(this.RequestID,data.ProfileID,"Approved",'').subscribe((data)=>{
      if(data.code==="S001"){
        this.viewrequestDetails()
        this.spinner.hide();
        alert(data.data);
        this.router.navigate(['/Dashboard/Task/MyTask'])
      }else{
        this.viewrequestDetails()
        this.spinner.hide();
        alert(data.data);
      }
    },(error)=>{
      this.viewrequestDetails()
      this.spinner.hide();
      alert(error.error.data)
    })
  }

  expanded: {[key: string]: boolean} = {};
  
  
  isRowClickable(rowIndex: number): boolean {
    return this.VendorsList[rowIndex].staffData&&this.VendorsList[rowIndex].staffData.length > 0
  }
  VendorsList:any= []
  vendorList(){
    this.spinner.show();
    this.userservice.Vendorprofiles({"RequestID":this.RequestID}).subscribe((data:any)=>{
      if(data.code==="S001"){
        
        this.spinner.hide();
        this.VendorsList = data.data
       
      }else{
       
        this.spinner.hide();
        alert(data.data);
      }
    },(error)=>{
      
      this.spinner.hide();
      alert(error.error.data)
    })
  }

  submitVendorsProfiles(){

    let SelectedVendorsArray:any = []

      for(let vendor of this.VendorsList){
        SelectedVendorsArray.push(vendor._id)
      }

    this.spinner.show();
    this.userservice.submitVendorProfiles({"RequestID":this.RequestID,"VendorID":SelectedVendorsArray}).subscribe((data:any)=>{
      if(data.code==="S001"){
        
        this.spinner.hide();
         alert(data.data)   
         this.router.navigate(['/Dashboard/Task/MyTask'])
      }else{
       
        this.spinner.hide();
        alert(data.data);
      }
    },(error)=>{
      
      this.spinner.hide();
      alert(error.error.data)
    })
  }

}
