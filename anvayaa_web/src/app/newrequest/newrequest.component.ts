import { Component } from '@angular/core';
import { UsersService } from '../users.service'
import { Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';



@Component({
  selector: 'app-newrequest',
  templateUrl: './newrequest.component.html',
  styleUrls: ['./newrequest.component.css']
})

export class NewrequestComponent {

  userList: any[] = []  // array for incoming user List 
  keyword: any = ''
  keyword1: string = 'AliasName'
  sponserDetils: any = {}
  benficiaries: any[] = []
  cutomertile_serviceInput: boolean = false
  categaryDetails: any[] = []
  SubCategory: any[] = []
  SubSub_Category: any = []
  ServiceAvailabilityMessage:string
  CustRecID:any
  ServiceAreaID:string
  totalChargesForService:string
  ServiceID:string
  tariffDetails:any[] = []
  creatRequest: UntypedFormGroup
  keyword2:any = 'Name'
  SubSubCategoryID:any
  citySelect:boolean = false
  allCities:any[]=[]
  servicetile:boolean = false
  OtherInputBoxes:boolean = false 
  minDate: string;
  PlcamentMinDate:any
  submit:boolean = false
  activeBeneficiaries: any[] = []; // Array to hold active beneficiaries

  constructor(private userservice: UsersService, private spinner: NgxSpinnerService, private Router: Router, private UsersService: UsersService, private FormBuilder: UntypedFormBuilder, private DatePipe: DatePipe) { }
  
  ngOnInit(): void{

       this.requestFormFunction()
       const today = new Date();
       // Set the minimum date to today's date
       this.minDate = today.toISOString().split('T')[0];

  }


     requestFormFunction(){
        this.creatRequest = this.FormBuilder.group({
          "CustRecID":"",
          "CustID":['', Validators.required],
          "SubCategoryID":'',
          "SubSubCategoryID":'',
          "RequestedDate":['', Validators.required],
          "PlacementTime":['', Validators.required],
          "PaymentMode":"",
          "Note":['', Validators.required]
        })
     }
  // search user api calling 
  onChangeSearch(keys: any) {
    
    this.keyword = null
    if (!isNaN(keys) == false) {
      this.keyword = "Name"
    } else {
      this.keyword = "MobileNumber"
    }
    this.UsersService.UserSearch(keys).subscribe((customerDetails: any) => {
      this.userList = customerDetails.data
    }, (error) => {
      // Handle error response (status code 404 or other errors)
      if (error.status === 404) {
        // Handle 404 Not Found error
      } else {
        // Handle other errors
      }
    })
  }

  // function for selected customer 
  selectEvent(data: any) {
    this.spinner.show();
    this.CustRecID = data.CustRecID
    this.UsersService.UserdetailsBysearch(data.CustRecID).subscribe((customerDetails: any) => {
      this.spinner.hide();
      this.sponserDetils = customerDetails.data
      this.benficiaries = customerDetails.data.Beneficiaries
      this.activeBeneficiaries = this.benficiaries?.filter((ben:any)=>{
        if(ben.Status == 'Active'){
         return ben
        }  
     })

      if (!this.sponserDetils.hasOwnProperty('CustomerPackage')) {
        this.cutomertile_serviceInput = true
        this.citySelect = true
        this.cityDetails()
      }else{
        this.servicesList(this.sponserDetils.CustRecID, this.sponserDetils?.CustomerPackage?.ServiceAreaID)
        this.cutomertile_serviceInput = true
        this.citySelect = false
        this.servicetile = true
      }


      
    }, (error) => {
      // Handle error response (status code 404 or other errors)
      if (error.status === 404) {
        // Handle 404 Not Found error
      } else {
        // Handle other errors
      }
    })
  }

  onFocused() {
    this.cutomertile_serviceInput = false
    this.SubSub_Category = []
    this.ServiceAvailabilityMessage = '' //clearing the message if clear 
    this.totalChargesForService = '' //clearing the message if clear 
    this.tariffDetails = []
    this.citySelect = false //this for hide city dropdown on change customer 
    this.servicetile = false // this for hide service and ben selection 
    this.OtherInputBoxes = false 
  }


  servicesList(CustRecID: any, ServiceArea: any) {
    this.spinner.show();
    if(this.ServiceAreaID == undefined){
    this.ServiceAreaID = ServiceArea
    }
    this.UsersService.viewAllCategaryDetails(CustRecID, this.ServiceAreaID).subscribe((viewAllCategaryDetailsData) => {
      
      // below loop for finding categories 
      this.SubCategory = viewAllCategaryDetailsData.data.subsubCategories

      for (let a in viewAllCategaryDetailsData.data.subcategories) {
        if (viewAllCategaryDetailsData.data.subcategories[a].Status === "Active") {
          this.categaryDetails.push(viewAllCategaryDetailsData.data.subcategories[a])
        } else {
          this.spinner.hide()
        }
      }
      this.spinner.hide();
    }, (error) => {
      // Handle error response (status code 404 or other errors)
      if (error.status === 404) {
        // Handle 404 Not Found error
      } else {
        // Handle other errors
      }
    })

  }

  // selected category sub category filter function 
  selectedCategory(subcategory: any) {
    this.OtherInputBoxes = true
    this.ServiceID = subcategory.SubCategoryID
    this.serviceavilability(this.CustRecID,subcategory.SubCategoryID)
    this.serviceDetailsforSelectedService(this.CustRecID,subcategory.SubCategoryID,this.ServiceAreaID)
    for (let category of this.SubCategory) {
      if (category.Status == 'Active' && subcategory.SubCategoryID == category.CategoryTypeID) {
        this.SubSub_Category.push(category)
      }
    }
  }

  // function to empty the sub Category 
  clearSubCategory() {
    this.SubSub_Category = []
    this.ServiceAvailabilityMessage = '' //clearing the message if clear 
    this.totalChargesForService = '' //clearing the message if clear 
    this.OtherInputBoxes = false 
  }


 // this function is to check service is aplicable or not for that service 

   serviceavilability(CustRecID:any,ServiceID:any){
    this.spinner.show();
    this.UsersService.serviceAvailabilityForPlan({'CustRecID':CustRecID,'ServiceID':ServiceID}).subscribe((plan:any) => {
      this.spinner.hide();
      this.ServiceAvailabilityMessage = plan.data.Message
    }, (error) => {
      // Handle error response (status code 404 or other errors)
      if (error.status === 404) {
        this.spinner.hide();
        // Handle 404 Not Found error
      } else {
        this.spinner.hide();
        // Handle other errors
      }
    })

   }

  // function for getting service details  
   serviceDetailsforSelectedService(CustRecID:string,ServiceID:string,ServiceAreaID:string){
    this.spinner.show();
    this.UsersService.selectedServiceDetails({"CustRecID":CustRecID,"ServiceID":ServiceID,"ServiceAreaID":this.ServiceAreaID}).subscribe((plan:any) => {
      this.totalChargesForService = plan.data.servicesdetails.TotalPrice
      this.spinner.hide();

    }, (error) => {
      // Handle error response (status code 404 or other errors)
      if (error.status === 404) {
        this.spinner.hide();

        // Handle 404 Not Found error
      } else {
        this.spinner.hide();

        // Handle other errors
      }
    })
   }


   // function to get tariff details API for 

   tariffDetailsBySubCategory(details:any){
   

    this.SubSubCategoryID = details.SubCategoryID
    let detailsObj = {
      "ServiceAreaID":this.ServiceAreaID,
      "SubCategoryID": this.ServiceID,
      "CategoryID":details.CategoryID,
      "ServiceID":details.SubCategoryID
      ,
    }

    this.spinner.show();
    this.UsersService.getTariffdetails(detailsObj).subscribe((tariff:any) => {
      this.tariffDetails = tariff.data
      this.spinner.hide();

    }, (error) => {
      // Handle error response (status code 404 or other errors)
      if (error.status === 404) {
        this.spinner.hide();

        alert(error.error.data)
      } else {
        this.spinner.hide();

        // Handle other errors
      }
    })
   }

   SubmitRequestDetails(){
    let Placetime
    let PlaceDate
    
    this.submit = true

    if(this.creatRequest.valid){
      if (!moment(this.creatRequest.value.PlacementTime, "DD-MM-YYYY HH:mm", true).isValid()) {
        PlaceDate = this.DatePipe.transform(this.creatRequest.value.RequestedDate, 'dd-MM-yyyy')
      }
      if (!moment(this.creatRequest.value.PlacementTime, "DD-MM-YYYY HH:mm", true).isValid()) {
        Placetime = this.DatePipe.transform(this.creatRequest.value.PlacementTime, 'dd-MM-yyyy')
      }
         let FormDetails = this.creatRequest.value
          FormDetails.CustRecID = this.CustRecID
          FormDetails.SubCategoryID = this.ServiceID
          FormDetails.SubSubCategoryID = this.SubSubCategoryID
          FormDetails.PlacementTime = Placetime
          FormDetails.RequestedDate = PlaceDate
          FormDetails.ServiceAreaID = this.ServiceAreaID
  
          this.spinner.show()
          
          this.UsersService.createRequestV2(FormDetails).subscribe((request:any) => {
            this.spinner.hide();
             alert(request.message)
            this.Router.navigate(["Dashboard/Task/MyTask"]);
             
          }, (error) => {
            // Handle error response (status code 404 or other errors)
            if (error.status === 404) {
            this.spinner.hide();
              // Handle 404 Not Found error
              alert(error.error.message)
            } else {
            this.spinner.hide();
              // Handle other errors
            }
          })
    }else{

    }



   }

   cityDetails() {
    this.spinner.show()
    this.userservice.cityApi().subscribe((response) => {
        this.allCities = response.data
      }, (error) => {
        // Handle error response (status code 404 or other errors)
        if (error.status === 404) {
          this.spinner.hide();
          // Handle 404 Not Found error
          alert(error.error.message)
        } else {
          this.spinner.hide();
          // Handle other errors
        }
      })
  }

  // this function for who dont have package and they will select the city for them 
  selectedCity(cityID:any){
      this.servicetile = true 
      this.ServiceAreaID = cityID.target.value
      this.servicesList(this.CustRecID,this.ServiceAreaID)
  }

  closerequestscreen(){
    this.Router.navigate(["Dashboard/Task/MyTask"]);
  }

  resetComponen(){
    this.SubSub_Category = []
    this.ServiceAvailabilityMessage = '' //clearing the message if clear 
    this.totalChargesForService = '' //clearing the message if clear 
    this.OtherInputBoxes = false 
    this.cutomertile_serviceInput = false
    this.SubSub_Category = []
    this.ServiceAvailabilityMessage = '' //clearing the message if clear 
    this.totalChargesForService = '' //clearing the message if clear 
    this.tariffDetails = []
    this.citySelect = false //this for hide city dropdown on change customer 
    this.servicetile = false // this for hide service and ben selection 
    this.OtherInputBoxes = false 
    this.Router.navigate(["Dashboard/Task/MyTask"]);
  }

  setMinPlcaementTime(event:any){

    // this.PlcamentMinDate = event.target.value
    // const selectedDate = event.target.value;
    // this.PlcamentMinDate = selectedDate;

    const selectedDateTime = event.target.value;
  const selectedDate = selectedDateTime.slice(0, 10); // Extract date part (YYYY-MM-DD)
  const selectedTime = selectedDateTime.slice(11); // Extract time part (HH:MM)
  this.PlcamentMinDate = selectedDate + 'T' + selectedTime;
  }

}
