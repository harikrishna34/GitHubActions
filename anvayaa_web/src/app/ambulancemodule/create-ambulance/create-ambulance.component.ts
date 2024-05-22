import { UsersService } from 'src/app/users.service';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { Component, OnInit ,ViewChild, ElementRef, NgZone } from '@angular/core';
import { Injectable } from '@angular/core';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
// import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Location } from '@angular/common'
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-create-ambulance',
  templateUrl: './create-ambulance.component.html',
  styleUrls: ['./create-ambulance.component.css']
})
export class CreateAmbulanceComponent implements OnInit {
  
  // @ViewChild('search')  searchElementRef: ElementRef;
  @ViewChild('source')  sourceElementRef: ElementRef;
  @ViewChild('destination')  destinationSearch: ElementRef;


  requiredParams:any={};
  ambulanceToken:any;
  equipmentDropdownSettings:any;
  ambulanceUserID:any;
  public ambulanceCreateForm:UntypedFormGroup;
  ambulanceList:any=[];
  equipementlist:any=[];
  zoom:number;
  equipmentFlag:boolean=false;
  submitBtn:boolean=false;
  private geoCoder:any;
  locations:any={}
  dir:boolean=false;
  RequestID:any;
  directions:any={};
  constructor(private spinner:NgxSpinnerService,private location: Location,
    // private mapsAPILoader: MapsAPILoader,
     private ngZone: NgZone,private userservice: UsersService, private route: Router, private router: ActivatedRoute, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.spinner.show();
    this.RequestID = this.router.snapshot.queryParamMap.get("RequestID");

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
    this.getAmbulanceList();
    this.onLocationsSearch("destination");
    this.onLocationsSearch("source");
    this.getDirection();
    this.equipmentDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'equipment_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      // onDeSelect: 'item_text',
      // itemsShowLimit: 6,
      // allowSearchFilter: true,
  
    };
    this.spinner.hide();
  }
  getAmbulanceList(){
    this.spinner.show();
    //  this.requiredParams=;
     this.ambulanceToken = localStorage.getItem("ambulanceUserToken");
    this.ambulanceUserID= localStorage.getItem("ambulanceUserid");
    if(this.ambulanceToken!=undefined||this.ambulanceToken!=null){
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
  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.locations.sourceLat = position.coords.latitude;
        this.locations.sourceLong = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }
  onLocationsSearch(searchField:any){
    // this.mapsAPILoader.load().then(() => {
    //   this.setCurrentLocation();
    //   let query;
    //   if(searchField==="destination"){
    //     query=this.destinationSearch.nativeElement
    //   }
    //   if(searchField==="source"){
    //     query=this.sourceElementRef.nativeElement
    //   }
    //  // let autocomplete = new google.maps.places.Autocomplete(query);
    //   // autocomplete.addListener("place_changed", () => {
    //   //   this.ngZone.run(() => {
    //   //     let place: any = autocomplete.getPlace();
    //   //     if (place.geometry === undefined || place.geometry === null) {
    //   //       return;
    //   //     }
    //   //     //set latitude, longitude and zoom
    //   //     if(searchField==="destination"){
    //   //       this.locations.destinationLat = place.geometry.location.lat();
    //   //       this.locations.destinationLong = place.geometry.location.lng();
    //   //       this.getAddress(this.locations.destinationLat, this.locations.destinationLong,"destination");
    //   //       // locations.sourceAddress
            
    //   //       this.getDirection();
    //   //     }
    //   //     if(searchField==="source"){
    //   //     this.locations.sourceLat = place.geometry.location.lat();
    //   //     this.locations.sourceLong = place.geometry.location.lng();
    //   //     this.getAddress(this.locations.sourceLat, this.locations.sourceLong,"source");
    //   //     this.getDirection();
    //   //   }
    //   //     this.zoom = 15;
    //   //   });
    //   // });
    // });
  }
  sourceLocationData($event:MouseEvent){
    this.spinner.show();
    // this.locations.sourceLat = $event.coords.lat;
    // this.locations.sourceLong = $event.coords.lng;
    this.getAddress(this.locations.sourceLat, this.locations.sourceLong,"source");
    this.getDirection();
    this.spinner.hide();

  };
  destinationLocationData($event:MouseEvent){
    this.spinner.show();
    // this.locations.destinationLat = $event.coords.lat;
    // this.locations.destinationLong = $event.coords.lng;
    this.getAddress(this.locations.destinationLat, this.locations.destinationLong,"destination");
    this.getDirection();
    this.spinner.hide();
  }
  getAddress(latitude:any, longitude:any,type:string) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results:any, status:any) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          if(type==='source'){
            this.locations.sourceAddress = results[0].formatted_address;
            this.locations.sourcePlaceID = results[0].place_id;
            this.ambulanceCreateForm.patchValue({'addresssource':results[0].formatted_address})
          };
          if(type==='destination'){
            this.locations.destinationAddress = results[0].formatted_address;
            this.locations.destinationPlaceID = results[0].place_id;
            this.ambulanceCreateForm.patchValue({'addressdest':results[0].formatted_address})
          };
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  onEquipment(){
   this.spinner.show();
    this.submitBtn=true;
    let valuesCheckKey:boolean=false;
    const validationParams:any={
      sourceAdd:this.locations.sourceAddress,
      destinationAdd:this.locations.destinationAddress,

    }
    for(const keys in validationParams){
      if(validationParams[keys] && this.ambulanceCreateForm.status==="VALID"){
        valuesCheckKey=true
      }
    };
    if(valuesCheckKey){
      const requiredParamsForEquipment:any={}
      requiredParamsForEquipment.authtoken=this.requiredParams.authtoken;
      requiredParamsForEquipment.source_place_id=this.locations.sourcePlaceID;
      requiredParamsForEquipment.lat=this.locations.sourceLat;
      requiredParamsForEquipment.long=this.locations.sourceLong;
      requiredParamsForEquipment.ambulance_type=this.ambulanceCreateForm.value['ambulance_type'];
      requiredParamsForEquipment.addresssource=this.ambulanceCreateForm.value['addresssource'];
      requiredParamsForEquipment.addressdest=this.ambulanceCreateForm.value['addressdest'];
      this.userservice.getAmbulanceEquipmentList(requiredParamsForEquipment).subscribe((equipementData)=>{
        if(equipementData.code=="S001"){
          this.equipementlist=equipementData.data.equipmentlist;
          this.spinner.hide();
        }
        else if(equipementData.code=="S002"){
          this.equipementlist=[]
          this.spinner.hide();
        }else{
          this.spinner.hide();
          alert(equipementData.data.message)
        }
      },(error)=>{
        this.spinner.hide();
        alert(error.error.data)
      })
      this.equipmentFlag=!this.equipmentFlag;
      this.spinner.hide();
    }
    this.spinner.hide();

  }

  onAmbulanceChange($event:any){
    this.ambulanceCreateForm.value['ambulance_type']=$event.target.value;
    this.onEquipment();
  }
  handleSubmit(){
    this.submitBtn=true;
    if(this.ambulanceCreateForm.status==="VALID"){
      this.spinner.show();
      const requiredParamsForCreateAmbulanceRequest:any={};
      for(const key in this.ambulanceCreateForm.value){
        requiredParamsForCreateAmbulanceRequest[key]= this.ambulanceCreateForm.value[key];
      }
  
      requiredParamsForCreateAmbulanceRequest['doctor_required']= +requiredParamsForCreateAmbulanceRequest['doctor_required']
      requiredParamsForCreateAmbulanceRequest['ac_required']= +requiredParamsForCreateAmbulanceRequest['ac_required']
      // Start Here
      requiredParamsForCreateAmbulanceRequest['default_payment_method']="cash";
      requiredParamsForCreateAmbulanceRequest['dest_address']= this.locations.destinationAddress;
      requiredParamsForCreateAmbulanceRequest['dest_lat']=this.locations.destinationLat;
      requiredParamsForCreateAmbulanceRequest['dest_long']=this.locations.destinationLong;
      requiredParamsForCreateAmbulanceRequest['dest_place_id']= this.locations.destinationPlaceID;
      requiredParamsForCreateAmbulanceRequest['source_address']= this.locations.sourceAddress;
      requiredParamsForCreateAmbulanceRequest['source_lat']= this.locations.sourceLat;
      requiredParamsForCreateAmbulanceRequest['source_long']= this.locations.sourceLong;
      requiredParamsForCreateAmbulanceRequest['source_place_id']=this.locations.sourcePlaceID;
      requiredParamsForCreateAmbulanceRequest['parentApp']= "Anvayaakincare";
      requiredParamsForCreateAmbulanceRequest['authtoken']= this.requiredParams.authtoken;
      requiredParamsForCreateAmbulanceRequest['RequestID']= this.RequestID;
      requiredParamsForCreateAmbulanceRequest['network_type']= "mobile_data";
      const paramsForDistance:any={
        Source:this.locations.sourceLat+','+this.locations.sourceLong,
        Destination:this.locations.destinationLat+','+this.locations.destinationLong,
      }
    //  this.getDistanceAndTime(paramsForDistance.Source,paramsForDistance.Destination).then((distanceData:any)=>{
    //   requiredParamsForCreateAmbulanceRequest['estimated_distance']= distanceData.distance;
    //   requiredParamsForCreateAmbulanceRequest['estimated_time']= distanceData.duration;
    //  this.userservice.createAmbulanceRequest(requiredParamsForCreateAmbulanceRequest).subscribe((requestData)=>{
    //     if(requestData.code=="S001"){
    //       this.spinner.hide();
    //       alert('Create Successfully');
    //       this.location.back();
    //     }else{
    //       this.spinner.hide();
    //       alert(requestData.data.message)
    //     }
    //   },(error)=>{
    //     this.spinner.hide();
    //     alert(error.error.data)
    //   }) 
    //  }).catch((e)=>{
    //   if(e){
    //     this.spinner.hide();
    //     alert('Something went Wrong')
    //   }
    //  })
    }else{
      // this.submitBtn=false;
    }  
  }

 // getDistanceAndTime(origin: string, destination: string): Promise<{ distance: number; duration: number }> {
    //  let directionsService:any = new google.maps.DirectionsService();

    // return new Promise((resolve, reject) => {
    //   directionsService.route(
    //     {
    //       origin: origin,
    //       destination: destination,
    //       travelMode: google.maps.TravelMode.DRIVING // or other modes like WALKING, BICYCLING, TRANSIT
    //     },
    //     (response:any, status:any) => {
    //       if (status === 'OK' && response.routes[0]) {
    //         const route = response.routes[0];
    //         const distance = +(route.legs[0].distance.value/1000).toFixed(2);
    //         const duration = Math.round(route.legs[0].duration.value/60);

    //         resolve({ distance, duration });
    //       } else {
    //         reject('Directions request failed');
    //       }
    //     }
    //   );
    // });
 // }
  getDirection() {
    if(this.locations.sourceLat && this.locations.destinationLat){
      this.dir=true;
      this.directions = {
        origin: { lat: this.locations.sourceLat, lng:this.locations.sourceLong },
        destination: { lat: this.locations.destinationLat, lng:this.locations.destinationLong  }
      }
    }
    
  }
  

  }

