import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/users.service';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  UntypedFormGroup,
  FormControl,
  UntypedFormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';


@Component({
  selector: 'app-view-emergency-request-details',
  templateUrl: './view-emergency-request-details.component.html',
  styleUrls: ['./view-emergency-request-details.component.css'],
})
export class ViewEmergencyRequestDetailsComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;

  public ambulanceUserDetailsForm: UntypedFormGroup;
  public ambulanceCreateForm:UntypedFormGroup;
  public DriverCreateForm:UntypedFormGroup;
  public StatusForm:UntypedFormGroup;


  

  ambulanceToken:any;
  ambulanceUserID:any;
  ambulanceList:any;
  requiredParams:any;
  RequestID: any;
  CustRecID: any;
  RequestDetails: any;
  authtoken: any;
  ambulanceDriverData: any;
  equipmentDropdownSettings:any;
  equipementlist:any=[];

  constructor(
    private location: Location,
    private spinner: NgxSpinnerService,
    private userservice: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {

    this.ambulanceCreateForm = this.formBuilder.group({
      "ambulance_type":['',[Validators.required]],
      "ac_required":['',[Validators.required]],
      "doctor_required": ['', [Validators.required]],
      "journey_type": ['', [Validators.required]],
      "payment_method":['',[Validators.required]],
      "mobile_no":['',[Validators.required,Validators.pattern('^[6-9][0-9]{9}$')]],
      "equipment":[''],
      "addresssource": ['', [Validators.required, Validators.minLength(3)]],
      "addressdest": ['', [Validators.required, Validators.minLength(3)]],
    });
    this.DriverCreateForm = this.formBuilder.group({
      "DriverName":['',[Validators.required]],
      "VehicleNo":['',[Validators.required]],
      "DriverContact": ['', [Validators.required]],
      
    });
    this.StatusForm = this.formBuilder.group({
      "Status":['',[Validators.required]],
      "Comments":['',[Validators.required]],
      
    });

    
    this.spinner.show();
    this.onCreateAmbulanceUser();
    this.RequestID = this.route.snapshot.queryParamMap.get('RequestID');
    this.CustRecID = this.route.snapshot.queryParamMap.get('CustRecID');
    // const ambulanceToken: any = localStorage.getItem('ambulanceUserToken');
    // const ambulanceUserID: any = localStorage.getItem('ambulanceUserid');
    // this.authtoken = ambulanceToken.concat(':'.concat(ambulanceUserID));
    this.userservice.viewRequestDetailsOld(this.RequestID, this.CustRecID).subscribe((requestDetails) => {
        if (requestDetails.code === 'S001') {
          this.RequestDetails = requestDetails.data;
          const beneficiaryDetailsFilter =
            this.RequestDetails.CustomerDetails.Beneficiaries.filter(
              (data: any) => {
                return this.RequestDetails.CustID === data.CustID;
              }
            );
          this.RequestDetails.BeneficiaryData = beneficiaryDetailsFilter[0];
          //this.handleAmbulanceDriverDetails();
          this.spinner.hide();
        }
      },(error)=>{
        this.spinner.hide();
        alert(error.error.data)
      })


      this.equipmentDropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'equipment_name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        // onDeSelect: 'item_text',
        // itemsShowLimit: 6,
         allowSearchFilter: true,
    
      };
  }


  onAmbulanceChange($event:any){
    this.ambulanceCreateForm.value['ambulance_type']=$event.target.value;
    console.log(this.ambulanceCreateForm.value)
    this.onEquipment();
  }


  onEquipment(){

  
   
       const requiredParamsForEquipment:any={}
       requiredParamsForEquipment.authtoken=this.requiredParams.authtoken;
      //  requiredParamsForEquipment.source_place_id=this.locations.sourcePlaceID;
       requiredParamsForEquipment.lat="17.90";
       requiredParamsForEquipment.long="78.90";
       requiredParamsForEquipment.ambulance_type=this.ambulanceCreateForm.value['ambulance_type'];
       requiredParamsForEquipment.addresssource="Secunderabad";
       requiredParamsForEquipment.addressdest="Apollo hospital";
       this.userservice.getAmbulanceEquipmentList(requiredParamsForEquipment).subscribe((equipementData)=>{
        console.log(equipementData.data)
         if(equipementData.code=="S001"){
           this.equipementlist=equipementData.data.equipmentlist;
           this.spinner.hide();
         }
         else if(equipementData.code=="S002"){
           //this.equipementlist=[]
           this.spinner.hide();
         }else{
           this.spinner.hide();
           alert(equipementData.data.message)
         }
       },(error)=>{
         this.spinner.hide();
         alert(error.error.data)
       })
       this.spinner.hide();
    
 
   }
  onCreateAmbulanceUser() {
    this.ambulanceUserDetailsForm = this.formBuilder.group({
      mobile_no: ['',[Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
      full_name: ['', [Validators.required, Validators.minLength(3)]],
      email_id: ['',[Validators.required,Validators.pattern('^[a-z0-9.]+@[a-z]+.[a-z]{2,3}')]],
      facility_start: ['', [Validators.required]],
      facility_end: ['', [Validators.required]],
    });

    this.ambulanceUserDetailsForm.value['full_name'] ="akhila";
    this.ambulanceUserDetailsForm.value['mobile_no'] ="9490219062";
    this.ambulanceUserDetailsForm.value['email_id'] ="prasanth.t@xrgsolutions.com";
    this.ambulanceUserDetailsForm.value['facility_start'] ="2023-12-04";
    this.ambulanceUserDetailsForm.value['facility_end'] ="2023-12-04";
    this.onSubmitAmbulanceUser()

  }

  DriverSubmit() {
    console.log("1")
    console.log(this.DriverCreateForm.value)
    this.spinner.show();
    
    this.DriverCreateForm.value['RequestID'] = this.RequestID;
     
      this.userservice.DriverDetails(this.DriverCreateForm.value).subscribe((response) => {
            if (response.code == 'S001') {
              // const tokenData = {
              //   ambulanceUserToken: response.data.authtoken,
              //   ambulanceUserid: response.data.authtoken,
              // };
           
              this.spinner.hide();
              alert('Driver Details Saved Successfully');
            window.location.reload();
             // this.router.navigate(['/Dashboard/ambulance/createambulance'], {queryParams: { RequestID: this.RequestID }});
            } else {
              this.spinner.hide();
              alert(response.Message);
            }
          },
          (error) => {
            this.spinner.hide();
            alert(error.error.data);
          }
        );
    }

    StatusSubmit() {
      console.log("1")
      console.log(this.StatusForm.value)
      this.spinner.show();
      
      this.StatusForm.value['RequestID'] = this.RequestID;
      this.StatusForm.value['CustRecID'] = this.CustRecID;
      
      this.StatusForm.value['CustID'] = this.RequestDetails.CustID;
        this.userservice.EmergencyStatus(this.StatusForm.value).subscribe((response) => {
              if (response.code == 'S001') {
                // const tokenData = {
                //   ambulanceUserToken: response.data.authtoken,
                //   ambulanceUserid: response.data.authtoken,
                // };
             
                this.spinner.hide();
                alert('Request Details Updated Sucessfully');
              window.location.reload();
               // this.router.navigate(['/Dashboard/ambulance/createambulance'], {queryParams: { RequestID: this.RequestID }});
              } else {
                this.spinner.hide();
                alert(response.Message);
              }
            },
            (error) => {
              this.spinner.hide();
              alert(error.error.data);
            }
          );
      }

  onSubmitAmbulanceUser() {
    console.log("1")
    console.log(this.ambulanceUserDetailsForm.value)
    this.spinner.show();
   
      this.ambulanceUserDetailsForm.value['corporatename'] =this.userservice.ambulanceUser['corporatename'];
      this.ambulanceUserDetailsForm.value['companyname'] =this.userservice.ambulanceUser['companyname'];
      this.ambulanceUserDetailsForm.value['parentApp'] =this.userservice.ambulanceUser['parentApp'];
      this.ambulanceUserDetailsForm.value['apikey'] =this.userservice.ambulanceUser['apikey'];
      this.ambulanceUserDetailsForm.value['secretkey'] =this.userservice.ambulanceUser['secretkey'];

      this.userservice.registerAmbulanceUser(this.ambulanceUserDetailsForm.value).subscribe((response) => {
            if (response.code == 'S001') {
              // const tokenData = {
              //   ambulanceUserToken: response.data.authtoken,
              //   ambulanceUserid: response.data.authtoken,
              // };
              localStorage.setItem('ambulanceUserToken',response.data.authtoken);
              localStorage.setItem('ambulanceUserid', response.data.id);
              this.closebutton.nativeElement.click();
              this.spinner.hide();
              this.getAmbulanceList()
             // this.router.navigate(['/Dashboard/ambulance/createambulance'], {queryParams: { RequestID: this.RequestID }});
            } else {
              this.spinner.hide();
              alert(response.Message);
            }
          },
          (error) => {
            this.spinner.hide();
            alert(error.error.data);
          }
        );
    }


    getAmbulanceList(){
      this.spinner.show();
      this.ambulanceToken = localStorage.getItem("ambulanceUserToken");
     this.ambulanceUserID= localStorage.getItem("ambulanceUserid");
      console.log(this.ambulanceToken ,this.ambulanceUserID)
      if(this.ambulanceToken!=undefined||this.ambulanceToken!=null){
        this.requiredParams={}
        this.requiredParams.authtoken=this.ambulanceToken.concat(":".concat(this.ambulanceUserID));
        this.userservice.getAmbulanceList(this.requiredParams).subscribe((data)=>{
          if(data.code=="S001"){
            this.ambulanceList=data.data;
            this.spinner.hide();
            // console.log(this.ambulanceList,"list")
          }else{
            this.spinner.hide();
            alert(data.data)
          }
        },(error)=>{
          this.spinner.hide();
          alert(error.error.data)
        })
      }
    }


    handleSubmit(){
      // if(this.ambulanceCreateForm.status==="VALID"){
        this.spinner.show();
        const requiredParamsForCreateAmbulanceRequest:any={};
        for(const key in this.ambulanceCreateForm.value){
          requiredParamsForCreateAmbulanceRequest[key]= this.ambulanceCreateForm.value[key];
        }
    
        requiredParamsForCreateAmbulanceRequest['doctor_required']= +requiredParamsForCreateAmbulanceRequest['doctor_required']
        requiredParamsForCreateAmbulanceRequest['ac_required']= 1
        // Start Here
        requiredParamsForCreateAmbulanceRequest['default_payment_method']="cash";
        requiredParamsForCreateAmbulanceRequest['payment_method']="cash";
        requiredParamsForCreateAmbulanceRequest['mobile_no']="9916540506";
        requiredParamsForCreateAmbulanceRequest['parentApp']="Dial Test";

        


        requiredParamsForCreateAmbulanceRequest['dest_address']= "6X9G+X8W, Kapurbawdi, Thane West, Thane, Maharashtra,India";
        requiredParamsForCreateAmbulanceRequest['dest_lat']="19.219914935173662";
        requiredParamsForCreateAmbulanceRequest['dest_long']="72.97615718096495";
        requiredParamsForCreateAmbulanceRequest['dest_place_id']= "";
        requiredParamsForCreateAmbulanceRequest['source_address']= "Romell Tech Park, Cama Industrial Estate, Goregaon,Mumbai, Maharashtra 400063, India";
        requiredParamsForCreateAmbulanceRequest['source_lat']= "19.15534892280782";
        
        requiredParamsForCreateAmbulanceRequest['source_long']= "72.85542491823435";
        requiredParamsForCreateAmbulanceRequest['source_place_id']="";
        requiredParamsForCreateAmbulanceRequest['parentApp']= "Anvayaakincare";
        requiredParamsForCreateAmbulanceRequest['authtoken']= this.requiredParams.authtoken;
        requiredParamsForCreateAmbulanceRequest['RequestID']= this.RequestID;
        requiredParamsForCreateAmbulanceRequest['network_type']= "mobile_data";
        requiredParamsForCreateAmbulanceRequest['journey_type']= "One Way";

        // const paramsForDistance:any={
        //   Source:this.locations.sourceLat+','+this.locations.sourceLong,
        //   Destination:this.locations.destinationLat+','+this.locations.destinationLong,
        // }
      //  this.getDistanceAndTime(paramsForDistance.Source,paramsForDistance.Destination).then((distanceData:any)=>{
        requiredParamsForCreateAmbulanceRequest['estimated_distance']= 24.8;
        requiredParamsForCreateAmbulanceRequest['estimated_time']= 52.0;
       this.userservice.createAmbulanceRequest(requiredParamsForCreateAmbulanceRequest).subscribe((requestData)=>{
          if(requestData.code=="S001"){
            this.spinner.hide();
            alert('Create Successfully');
            window.location.reload();
            //this.location.back();
          }else{
            this.spinner.hide();
            alert(requestData.data.message)
          }
        },(error)=>{
          this.spinner.hide();
          alert(error.error.data)
        }) 
       
      
    }
  
  handleAmbulanceDriverDetails() {
    const paramsForAmbulanceDriver: { authtoken?: string; crn?: string } = {};
    paramsForAmbulanceDriver.authtoken = this.authtoken;
    paramsForAmbulanceDriver.crn = this.RequestDetails.AmbulanceRequestID;

    this.userservice.getAmbulanceDriverDetails(paramsForAmbulanceDriver).subscribe((ambDriverData) => {
        if (ambDriverData.code === 'S001') {
          this.ambulanceDriverData = ambDriverData.data;
        } else if (ambDriverData.Message != 'No data Found') {
          alert(ambDriverData.Message);
          this.spinner.hide();
        }
      },(error) => {
        alert(error.error.data);
        this.spinner.hide();
      });
  }

  handleAmbulanceTrackURL() {
    this.spinner.show();
    const paramsForAmbulanceTrackURL: { authtoken?: string; crn?: string } = {};
    paramsForAmbulanceTrackURL.authtoken = this.authtoken;
    paramsForAmbulanceTrackURL.crn = this.RequestDetails.AmbulanceRequestID;
    for (let key in paramsForAmbulanceTrackURL) {
      if (!paramsForAmbulanceTrackURL[key as keyof typeof paramsForAmbulanceTrackURL]) {
        this.spinner.hide();
        alert('Something went wrong');
        return;
      }
    }
    this.userservice.ambulanceTrackURL(paramsForAmbulanceTrackURL).subscribe((trackurl) => {
        if (trackurl.code === 'S001') {
          this.spinner.hide();
          window.open(trackurl.data.tracking_url);
          // window.open("https://xrg.keka.com/#/home/dashboard");

        } else {
          this.spinner.hide();
          alert(trackurl.Message);
        }
      },(error) => {
        this.spinner.hide();
        alert(error.error.data);
      });
  }

  handleCancelAmbulanceRequest(){
    if (confirm("Do you really want to cancel the  request?")) {
      this.spinner.show();
      const paramsForCancelAmbulance: { authtoken?: string; crn?: string } = {};
      paramsForCancelAmbulance.authtoken = this.authtoken;
      paramsForCancelAmbulance.crn = this.RequestDetails.AmbulanceRequestID="";
    for (let key in paramsForCancelAmbulance) {
      if (!paramsForCancelAmbulance[key as keyof typeof paramsForCancelAmbulance]) {
        this.spinner.hide();
        alert('Something went wrong');
        return;
      }
    }
    this.userservice.cancelAmbulanceRequest(paramsForCancelAmbulance).subscribe((canceledData)=>{
      if(canceledData.code==="S001"){
        this.spinner.hide();
        alert(`Your Request has been canceled`);
      }else{
        this.spinner.hide();
        alert(`${canceledData.Message}`);
      }
    },
    (error) => {
      alert(error.error.data);
    })
  }
  };


  // showDialog() {  
  //   this.confirmDialogService.confirmThis("Are you sure to delete?", function () {  
  //     alert("Yes clicked");  
  //   }, function () {  
  //     alert("No clicked");  
  //   })  
  // }  
}

