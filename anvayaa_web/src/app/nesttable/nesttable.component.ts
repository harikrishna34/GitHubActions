import { Component } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from 'src/app/users.service';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-nesttable',
  templateUrl: './nesttable.component.html',
  styleUrls: ['./nesttable.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class NesttableComponent {
  VendorsList:any= [];
  reqId:any
  partnerselected:any = []
  expandedRows: boolean[] = [];
  profilestoviewindetail:any;
  addStaffForm: UntypedFormGroup;
  dropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; onDeSelect: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  dropdownList: any;
  GDAinput: boolean = false;
  showQualification: boolean = false;
  GDAdocInput: boolean = false;
  NurseDocInput: boolean= false;
  AadhaarDoc: any;
  Addstaffshow:boolean=false
  PartnerId: any;
  ServiceName: any;
  ServiceAreaName: any;
  GdaAttachment: File;
  NurseAttachmentDoc: File;
  url: any;
  ProfilePic: any;
  ServiceID: any;
  ServiceAreaID: any;
  eighteenYearsAgo = new Date();
  changeSubmitObject:boolean = false
  constructor(private spinner: NgxSpinnerService,private userservice: UsersService,private router: Router,private route: ActivatedRoute,private formBuilder: UntypedFormBuilder,private datePipe: DatePipe) {
   }
  ngOnInit(): void {
    this.spinner.show()
    this.expandedRows = this.VendorsList.map(() => false);
    
    this.reqId=this.route.snapshot.queryParamMap.get("RequestID"); // reading the requestid from url
    this.vendorList();
    this.addStaffFormFunction()
    this.ReligionListFunction()
    this.allServieAreas()
    this.addStaffServices()
    this.languagesListFunction()
    this.viewRequest()

  // this below function is for selection of GDA input filed to show Upload GDA Upload Input  
  this.addStaffForm.get('GDACertified')?.valueChanges.subscribe(value => {
  if (value === 'Yes') { // Update 'requiredValue' with the value that triggers the qualification box
     this.GDAdocInput = true
  } else {
     this.GDAdocInput = false
    // If not required, reset the qualification value
  }
});

// this below function is for upload nursecertificate upload input field 
this.addStaffForm.get('NurseQualification')?.valueChanges.subscribe(value => {
if (value) { // Update 'requiredValue' with the value that triggers the qualification box
   this.NurseDocInput = true
} else {
   this.NurseDocInput = false
  // If not required, reset the qualification value
}

});


      // settings for dropdown for multi-select for languages  
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: ' SelectAll', 
        unSelectAllText: 'UnSelect All',
        onDeSelect: 'item_text',
        itemsShowLimit: 6,
        allowSearchFilter: true,
    
      };

  };
  isRowClickable(rowIndex: number): boolean {
    return this.VendorsList[rowIndex].staffData&&this.VendorsList[rowIndex].staffData.length > 0
  }
  vendorList(){

    this.userservice.Vendorprofiles({"RequestID":this.reqId}).subscribe((response:any)=>{
      if(response.code==="S001"){
        this.VendorsList = response.data
      }else if(response.code==="S002"){
        alert(response.data);
      }else{
        alert(response.data);
      }
    },(error:any)=>{
      alert(error.error.data)
    })
  }
  toggleRowExpansion(rowIndex: number) {
    this.expandedRows[rowIndex] = !this.expandedRows[rowIndex];
  }
  submitprofilesofpartners(){
    this.spinner.show()

        for(let partner of this.VendorsList){
          this.partnerselected.push(partner._id)//here we are pushing the id's only of the selected vendor
        }


    this.userservice.submitVendorProfiles({"RequestID":this.reqId,"VendorID":this.partnerselected}).subscribe((response:any)=>{
      this.spinner.hide();
      alert(response.data)
      this.spinner.hide();
      this.router.navigate(["Dashboard/Task/MyTask"]);
      this.changeSubmitObject = false
    }, (error) => {
      // Handle error response (status code 404 or other errors)
      if (error.status === 404) {
        alert(error.error.message)
        this.spinner.hide();
        // Handle 404 Not Found error
      } else {
        this.spinner.hide();
        // Handle other errors
      }
    })
  }
  viewprofiles(profiledata:any){
    this.profilestoviewindetail = profiledata;
  }



// form to add staff   
  addStaffFormFunction(){
    this.addStaffForm = this.formBuilder.group({
     PartnerID:"",
     ProfileImage:'',
     SubcategoryID:[''],
     SubcategoryName:"",
     Name:['',[ Validators.required]],
     DOB:['',[ Validators.required]],
     Gender:['',[ Validators.required]],
     Experience:['',[ Validators.required]],
     Education:['',[ Validators.required]],
     Address:['',[ Validators.required]],
     AadhaarNo:['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
     MobileNumber:['',[ Validators.required,Validators.minLength(10), Validators.maxLength(10)]],
     ServiceAreaID:[''],
     ServiceAreaName:'',
     Religion:['',[ Validators.required]],
     Languages:['',[ Validators.required]],
     GDACertified:"",
     NurseQualification:"",
     AdharCardDoc:['',[ Validators.required]],
     NurseQualificationAttachment:'',
     GDACertifiedAttachment:'',
    //  "Type":"AcceptProfile",
    })
}


  // below function to get religion list 

  ReligionList:any = []
  ReligionListFunction(){
    this.spinner.show()

    this.userservice.ReligionsList().subscribe(
      (services: any) => {
        this.spinner.hide()  
        // Handle successful response (status code 200)
         this.ReligionList = services.data.Religions
      },
      (error:any) => {
        // Handle error response (status code 404 or other errors)
        if (error.status === 404) {
          this.spinner.hide()
          // Handle 404 Not Found error
          alert(error.error.message)
        } else {
          this.spinner.hide()
          // Handle other errors
          alert(error.error.message)
        }
      }
    );
  }

    // this below function for list of cityes 
 Cities:any = []
 allServieAreas(){
   this.userservice.cityApi().subscribe(
     (services: any) => {
       // Handle successful response (status code 200)
        this.Cities = services.data
     },
     (error) => {
       // Handle error response (status code 404 or other errors)
       if (error.status === 404) {
         // Handle 404 Not Found error
         alert(error.error.message)
       } else {
         // Handle other errors
         alert(error.error.message)
       }
     }
   );
 }

   // languages api  for language List 
languagesListFunction(){
  this.userservice.languages().subscribe((languages) => {
    this.dropdownList = languages.data.Languages 
  })
}

addStaffServicesList:any=[]

addStaffServices(){
  this.userservice.serviceForAddStaff().subscribe(
    (services: any) => {
      // Handle successful response (status code 200)
       this.addStaffServicesList = services.data
    },
    (error:any) => {
      // Handle error response (status code 404 or other errors)
      if (error.status === 404) {
        // Handle 404 Not Found error
        alert(error.error.message)
      } else {
        // Handle other errors
        alert(error.error.message)
      }
    }
  );
}

// this below function is to declare to on keypress to press only number not alphabets 
onlyNumber(event: any) {
  let click: any = event.charCode
  return (click == 8 || click == 0) ? null : click >= 48 && click <= 57
}

// this below function is for when key press only aplhabets not numbers
onlyAlphabets(event: any) {
  let click: any = event.charCode
  return (click == 8 || click == 0) ? null : (click >= 65 && click <= 90 || click >= 97 && click <= 122)
}



// this function submit the addStaff details 
staffSubmit:boolean = false
submitAddStaff(){
  this.staffSubmit = true

  if(this.addStaffForm.valid){
    this.addStaffForm.value.DOB = this.datePipe.transform(this.addStaffForm.value.DOB, 'dd-MM-yyyy')
    let newStaffData:any = new FormData(); // this form is deleared to submit addstaffForm value 
   
    
    //below append thing is done for uploading files for that each and every value is appended 
    newStaffData.append('PartnerID',this.PartnerId)
    newStaffData.append('SubcategoryID',this.ServiceID)
    newStaffData.append('Name',this.addStaffForm.value.Name)
    newStaffData.append('DOB',this.addStaffForm.value.DOB)
    newStaffData.append('Gender',this.addStaffForm.value.Gender)
    newStaffData.append('Experience',this.addStaffForm.value.Experience)
    newStaffData.append('Education',this.addStaffForm.value.Education)
    newStaffData.append('Address',this.addStaffForm.value.Address)
    newStaffData.append('AadhaarNo',this.addStaffForm.value.AadhaarNo)
    newStaffData.append('MobileNumber',this.addStaffForm.value.MobileNumber)
    newStaffData.append('ServiceAreaID',this.ServiceAreaID)
    newStaffData.append('Religion',this.addStaffForm.value.Religion)
    newStaffData.append('Languages',this.addStaffForm.value.Languages)
    newStaffData.append('GDACertified',this.addStaffForm.value.GDACertified)
    newStaffData.append('NurseQualification',this.addStaffForm.value.NurseQualification)
    newStaffData.append('SubcategoryName',this.ServiceName)
    newStaffData.append('ServiceAreaName',this.ServiceAreaName)
    newStaffData.append('AdharCardDoc',this.AadhaarDoc)
    newStaffData.append('GDACertifiedAttachment',this.GdaAttachment)
    newStaffData.append('NurseQualificationAttachment',this.NurseAttachmentDoc)
    newStaffData.append('ProfileImage',this.ProfilePic)
    newStaffData.append('RequestID',this.reqId  )
    newStaffData.append('Type','AcceptProfile')
      this.spinner.show()
    this.userservice.addingNewStaff(newStaffData).subscribe(
      (services: any) => {
      this.spinner.hide()

        // Handle successful response (status code 200)
           this.changeSubmitObject = true
           alert(services.message)
           this.addStaffForm.reset()
           this.vendorList()
           this.router.navigate(["Dashboard/Task/MyTask"]);
           this.Addstaffshow = false
      },
      (error) => {
        // Handle error response (status code 404 or other errors)
        if (error.status === 404) {
      this.spinner.hide()
          // Handle 404 Not Found error
          alert(error.error.message)
        } else {
      this.spinner.hide()
          // Handle other errors
          alert(error.error.message)
        }
      }
    );
  }

}


// this function is for aadhaar card upload 
onFileSelected(event: any) {
  const files: FileList = event.target.files;
  if (files && files.length > 0) {
    const file: File = files[0];
    this.AadhaarDoc = file
  }
}


// this function is to get GDA attachment 
GDAattachmentFile(event:any){
  const files: FileList = event.target.files;
  if (files && files.length > 0) {
    const file: File = files[0];
    this.GdaAttachment = file
  }
}

// this function is to get nurse attachment 
NurseattachmentFile(event:any){
  const files: FileList = event.target.files;
  if (files && files.length > 0) {
    const file: File = files[0];
    this.NurseAttachmentDoc = file
  }
}

// this function is for no profiles found need to add by click this function 
  addStaffForPartner(PartnerData:any){
      this.Addstaffshow =! this.Addstaffshow
      this.PartnerId = PartnerData.partnerData.PartnerID
  }

// this function is for upload Profile Image 
  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
         this.ProfilePic = event.target.files[0]
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event:any) => {
        // called once readAsDataURL is completed
        this.url = event.target.result;
      };
    }
  }


  // this below function for to get request details 
  viewRequest() {
    this.spinner.show();

    this.userservice.viewRequest(this.reqId).subscribe(
      async (data: any) => {
        this.spinner.hide();
        this.ServiceAreaID  = data.data.ServiceAreaID
        this.ServiceAreaName = data.data.ServiceAreaName
        this.ServiceID = data.data.SubCategoryID
        this.ServiceName = data.data.SubCategoryName

        if (this.ServiceID  === 'AKCS14') { // Update 'requiredValue' with the value that triggers the qualification box
          this.showQualification = true;
          this.GDAinput = false;
          this.GDAdocInput = false
          this.NurseDocInput = false
        } else {
          this.showQualification = false;
          // If not required, reset the qualification value
          this.addStaffForm.get('NurseQualification')?.setValue('');
          this.addStaffForm.get('NurseQualificationAttachment')?.setValue('');
        }
    
        if (this.ServiceID  === 'AKCS72') { // Update 'requiredValue' with the value that triggers the qualification box
          this.GDAinput = true;
          this.showQualification = false;
          this.GDAdocInput = false
          this.NurseDocInput = false
        } else {
          this.GDAinput = false;
          this.addStaffForm.get('GDACertified')?.setValue('');
          this.addStaffForm.get('GDACertifiedAttachment')?.setValue('');
          // If not required, reset the qualification value
        }
      },
      (error) => {
        this.spinner.hide();
        alert(error.error.data);
      },
    );
  }

}
