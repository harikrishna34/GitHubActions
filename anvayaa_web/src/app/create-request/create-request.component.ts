import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { UsersService } from '../users.service'
import { Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common'
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import * as moment from 'moment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

//import { asLiteral } from '@angular/compiler/src/render3/view/util';
@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css',]
})
export class CreateRequestComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;

  keyword: any = ''
  data: any = []
  CustRecID: any
  userDetails: any = {}
  landropdownSettings: IDropdownSettings;
  IDropdownSettings: any
  ServiceAreaID: any
  categaryDetails: any = []
  keyword1: any
  categoryID: any
  SubCategoryID: any
  selectedCategoryName:any
  serviceData: any
  serviceHistory: any
  CategoryID: any
  customerCity: String = ''
  ServiceID: string;
  Covered: string;
  NotCovered: string;
  serviceType: String
  public createRequestData: UntypedFormGroup;
  // public Recuring: FormGroup;
  dropdownSettings: Object = {}
  selectedItems: Array<String> = []
  notCoveredInPlan: boolean = false
  TotalPrice: number
  OTMSubscriptionDate: any;
  OTMSubscriptionEndDate: any;
  CoverdPlan: boolean = false
  paymentmode: String
  Beneficiaries: any = []
  CategoryTypeID: String
  pmsVerify: boolean = false
  formDetails: boolean = false
  daysData: any = []
  planType: String
  PackageNature: String
  planDetails: boolean = false
  selectBeneficiary: String = 'No'
  CustID: String
  createRequestbBtn: boolean = false
  serviceName: String
  ReqEndDate: any
  Placetime:any
  PaymentTo: String
  ReqDate: any
  categoryDetails: boolean = false
  RequestTypeSelect: any = false
  cityData: any
  citySelect: boolean = false
  ServiceSelect: boolean = false
  ServiceAreaName: String
  customerDetailscard: boolean = false
  CityID: any
  public newCustomer: UntypedFormGroup
  public queryForm: UntypedFormGroup
  newCustomerSubmit: boolean = false
  creatCustomerButton: boolean = false
  thirdPartyRequestType: boolean = false
  thirdRequest: any
  serviceInputBox: boolean = false
  SubSubCategory:any=[]
  SalesEmployees:any=[]
  public equipemtsetting:any = {};
  public medicalsetting:any = {};
  public nurseoncallsetting:any = {};
  public maidsetting:any = {};

  equipmenttext:any=[]
   medicaltext:any=[]
   nurseoncalltext:any=[]
   maidtext:any=[]
  


  SubSubCategoryName: String
  SubSubCategoryID: String
  Filteredobj:any={}
  PriceRange:any
  mindate = new Date();

  Insulin: boolean = false
  dropdownList: any = [];
  EmployeeID:any
  today:any;
  tempdate:any;
  disableDate() {
    return false;
}

  constructor(private location: Location, private userservice: UsersService, private route: Router, private spinner: NgxSpinnerService, private Router: Router, private UsersService: UsersService, private FormBuilder: UntypedFormBuilder, private DatePipe: DatePipe) { }

  ngOnInit(): void {
    this.spinner.show();
    this.cityDetails()
    // this.customerDetails()
    this.formatDate()
    this.spinner.hide();
    

    this.userservice.languages().subscribe((languages) => {
      this.dropdownList = languages.data.Languages
    })
    this.createRequestData = this.FormBuilder.group({
      RequestedDate: ['',[Validators.required, Validators.pattern('dd-MM-yyyy')]],
      RequestEndDate: [''],
      Note: [''],
      PaymentMode: [''],
      ServiceType: [''],
      Days: [''],
      ServiceRequestType: [''],
      PaymentTo: ['Anvayaa'],
      PayoutModel: [''],
      Budget: [''],
      SubSubCategoryName: [''],
      SubSubCategoryID: [''],
      Gender: [''],
      Languages: [''],
      PlacementTime:[''],
      Religion:[''],
      OrderType:[''],
      CareTakerType:[''],
      City:[''],
      MobileNumber:[''],
      AlternateMobileNumber:[''],
      Area:[''],
      Age:[''],
      Mobility:[''],
      WeightOfThePatient:[''],
      WashroomUsage:[''],
      FoodIntake:[''],
      Medication:[''],
      ExerciseActivity:[''],
      MedicalEquipmentAssistance:[''],
      ServiceRequired:[''],
      PricingQuoted:[''],
      PriceInformed:[''],
      DutyHours:[''],
      ServiceDurationRequested:[''],
      Insulin:[''],
      InsulinText:[''],
      TypeOfInsulin:[''],
      ExerciseText:[''],
      NoOfPeopleToCook:[''],
      ResidenceType:[''],
      SpecifyMaidWork:[''],
      CookingType:[''],
      EquipmentText:[''],
      TypeOfEquipment:[''],
      MedicalProcedure:[''],
      TypeOfPathology:[''],
      TypeOfRadiology:[''],
      ServicableDay:[''],
      MedicationText:[''],
      TypeOfMedicalProcedure:[''],
      MedicalProcedureText:[''],
      NurseType:[''],
      DoYouWantCook:[''],
      DoYouWantMaid:[''],
      // DoYouWantNurseOnCall:[''],
      // OnCallServiceRequired:[''],


    })

    this.newCustomer = this.FormBuilder.group({
      Name: ['', [Validators.required]],
      MobileNumber: ['', [Validators.required]],
      EmailID: ['', [Validators.required]]

    })
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

   this. equipmenttext=[
      {'key':'OxygenConcentrator','value':'OxygenConcentrator'},
      {'key':'OxygenCylinder','value':'OxygenCylinder'},
      {'key':'BiPAP','value':'BiPAP'},
      {'key':'CPAP','value':'CPAP'},
      {'key':'Ventilator','value':'Ventilator'},
      {'key':'Suction Machine','value':'Suction_Machine'},
      {'key':'Nebulizer','value':'Nebulizer'},
      {'key':'DVT Pump','value':'DVT_Pump'},
      {'key':'Syringe Pump','value':'Syringe_Pump'},
      {'key':'Para-Monitor','value':'Para-Monitor'},
      {'key':'Wheelchair','value':'Wheelchair'},
      {'key':'Walker','value':'Walker'},
      {'key':'Others','value':'Others'},
     
     
    ]
    this. medicaltext=[
      {'key':'Suctioning','value':'Suctioning'},
      {'key':'Tracheotomy','value':'Tracheotomy'},
      {'key':'Colectomy','value':'Colectomy'},
      {'key':'Wound Management','value':'Wound_Management'},
      {'key':'IM Injection','value':'IM_Injection'},
      {'key':'IV Injections','value':'IV_Injections'},
      {'key':'IV Saline','value':'IV_Saline'},
      {'key':'IV NS','value':'IV_NS'},
      {'key':'Others','value':'Others'},
    
     
    ]
    this. nurseoncalltext=[
      {'key':'Suctioning','value':'Suctioning'},
      {'key':'Tracheotomy Care','value':'Tracheotomy_Care'},
      {'key':'Colectomy Care','value':'Colectomy_Care'},
      {'key':'Catheterisation','value':'Catheterisation'},
      {'key':'Catheter Removal','value':'Catheter_Removal'},
      {'key':'Wound Management','value':'Wound_Management'},
      {'key':'IM Injection','value':'IM_Injection'},
      {'key':'IV Injections','value':'IV_Injections'},
      {'key':'IV Saline','value':'IV_Saline'},
      {'key':'IV NS','value':'IV_NS'},
     
     
     
    ]
    this. maidtext=[
      {'key':'Brooming','value':'Brooming'},
      {'key':'Moping','value':'Moping'},
      {'key':'Dusting','value':'Dusting'},
      {'key':'Washing Cloths With Hands','value':'Washing_Cloths_With_Hands'},
      {'key':'Washing Cloths With Machine','value':'Washing_Cloths_With_Machine'},
      {'key':'Washroom Cleaning','value':'Washroom_Cleaning'},
      {'key':'Utensil Cleaning','value':'Utensil_Cleaning'},

     
     
    ]


    this.equipemtsetting = {
      singleSelection: false,
      idField: 'value',
      textField: 'key',
      enableCheckAll: true,
      selectAllText: 'SelectAll',
      unSelectAllText: 'Un-SelectAll',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 4,
      searchPlaceholderText: 'type of Equipment',
      noDataAvailablePlaceholderText: 'Không có dữ liệu',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };
    
    this.medicalsetting = {
      singleSelection: false,
      idField: 'value',
      textField: 'key',
      enableCheckAll: true,
      selectAllText: 'SelectAll',
      unSelectAllText: 'Un-SelectAll',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 4,
      searchPlaceholderText: 'type of Medical Procedure',
      noDataAvailablePlaceholderText: 'Không có dữ liệu',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };

    this.nurseoncallsetting = {
      singleSelection: false,
      idField: 'value',
      textField: 'key',
      enableCheckAll: true,
      selectAllText: 'SelectAll',
      unSelectAllText: 'Un-SelectAll',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 4,
      searchPlaceholderText: 'Nurse on Call',
      noDataAvailablePlaceholderText: 'Không có dữ liệu',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    }
    this.maidsetting = {
      singleSelection: false,
      idField: 'value',
      textField: 'key',
      enableCheckAll: true,
      selectAllText: 'SelectAll',
      unSelectAllText: 'Un-SelectAll',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 4,
      searchPlaceholderText: 'Maid Services',
      noDataAvailablePlaceholderText: 'Không có dữ liệu',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    }
  }
  // public onFilterChange(item: any) {
  //   console.log(item);
  // }
  // public onDropDownClose(item: any) {
  //   console.log(item);
  // }

  // public onItemSelect(item: any) {
  //   console.log(item);
  // }
  // public onDeSelect(item: any) {
  //   console.log(item);
  // }

  // public onSelectAll(items: any) {
  //   console.log(items);
  // }
  // public onDeSelectAll(items: any) {
  //   console.log(items);
  // }
  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }
 
  customerDetails() {
    this.keyword = 'Name'
    this.UsersService.CustomerDetailsData().subscribe((customerDetails) => {
      if (customerDetails.code == "S001") {
        this.data = customerDetails.data
      } else {
        alert(customerDetails.data)
      }
    }, function (error) {
      alert(error.error.data)
    })

  }

  selectEvent(data: any) {
    this.CustRecID = data.CustRecID
    this.customerDetailscard = false
    this.viewUserData()
    //("custrecID", data.CustRecID)
  }
  onChangeSearch(data: any) {
    if (data == undefined || data.length < 3) {
      return
    }


    this.keyword = null
    if (!isNaN(data) == false) {
      this.keyword = "Name"
    } else {
      this.keyword = "MobileNumber"
    }


    this.UsersService.SearchUserWithKey({ data }).subscribe((customerDetails) => {
      this.data=[]
      if (customerDetails.code == "S001") {
        this.data = customerDetails.data
      } else {
        alert(customerDetails.data)
      }
    }, function (error) {
      alert(error.error.data)
    })

    this.creatCustomerButton = false
    for (let i = 0; i < this.data.length; i++) {
      if (data != this.data[i].Name) {
        this.creatCustomerButton = true
      } else {
        if (data.length == "") {
          this.creatCustomerButton = false

        }
      }
    }

    this.userDetails = {}
  }

  onFocused(data: any) {

    this.creatCustomerButton = false
    this.userDetails = {}
    this.serviceData = ''
    this.serviceHistory = ''
    this.planType = ''
    this.planDetails = false
    this.serviceData = ''
    this.NotCovered = ''
    this.Covered = ''
    this.TotalPrice = 0
    this.CoverdPlan = false
    this.notCoveredInPlan = false
    this.createRequestbBtn = false
    this.categoryDetails = false
    this.SubSubCategory = []


  }

  onFocuseSub(sub: any) {

  }

  viewUserData() {
    this.spinner.show();
    this.UsersService.viewUser(this.CustRecID).subscribe((userData) => {
      if (userData.code == "S001") {
        this.creatCustomerButton = false
        this.spinner.hide()
        this.planDetails = true
        this.userDetails = userData.data;
        this.Beneficiaries = userData.data.Beneficiaries
        if (this.userDetails.CustomerPackageObj == null) {
          this.citySelect = true
          this.customerCity = userData.data.City
          this.serviceInputBox = false
          this.ViewEmployees()

        } else {
          this.ServiceAreaID = userData.data.CustomerPackageObj.ServiceAreaID
          this.planType = userData.data.CustomerPackageObj.AliasName
          this.PackageNature = userData.data.CustomerPackageObj.PackageNature
          this.ServiceSelect = true
          this.citySelect = false
          this.serviceInputBox = true

          this.viewAllCategaryDetailsData()
        }

      } else {
        alert(userData.data)
      }
    }, function (error) {
      alert(error.error.data)
    })
  }


  ViewEmployees() {
    this.UsersService.getAllEmployees({ "Type": "FRONT OFFICE/SALES" }).subscribe((employees) => {
      if (employees.code == "S001") {
        this.SalesEmployees = employees.data
      } else {
        alert(employees.data)
      }
    }, function (error) {
      alert(error.error.data)
    })
  }

  selectCityID(cityID: any) {
    this.ServiceAreaID = cityID.target.value

    var serviceAreaName = this.cityData.filter((obj: any) => {
      return obj.CityID == cityID.target.value
    })
    this.ServiceAreaName = serviceAreaName[0].CityName
    this.ServiceSelect = true
    this.viewAllCategaryDetailsData()
    if (this.ServiceAreaID == '' || this.ServiceAreaID == null) {
      this.serviceInputBox = false
    } else {
      this.serviceInputBox = true
    }
  }

  selectEmployeeID(EmployeeID: any) {
    this.EmployeeID = EmployeeID.target.value

  }


  CustomerProfile(){

    this.route.navigate(["/Dashboard/CustomerDashboard/customerComprehensiveDB"],{ queryParams:{CustRecID:this.CustRecID}})
  }


  onChangePlan(data: any) {
    this.serviceData = ''
    this.serviceHistory = ''
    this.serviceData = ''
    this.NotCovered = ''
    this.Covered = ''
    this.TotalPrice = 0
    this.CoverdPlan = false
    this.notCoveredInPlan = false
    this.createRequestbBtn = false
    this.SubSubCategory = []
  }
  onFocuse(data: any) {
    this.serviceData = ''
    this.NotCovered = ''
    this.Covered = ''
    this.TotalPrice = 0
    this.CoverdPlan = false
    this.notCoveredInPlan = false
    this.createRequestbBtn = false
    this.SubSubCategory = []
    delete this.PriceRange


  }
  viewAllCategaryDetailsData() {
    this.spinner.show()
    this.keyword1 = "AliasName"


    this.UsersService.viewAllCategaryDetails(this.CustRecID, this.ServiceAreaID).subscribe((viewAllCategaryDetailsData) => {
      if (viewAllCategaryDetailsData.code == 'S001') {
        this.spinner.hide()
        for (let a in viewAllCategaryDetailsData.data.subcategories) {
          if (viewAllCategaryDetailsData.data.subcategories[a].Status === "Active") {
            this.categaryDetails.push(viewAllCategaryDetailsData.data.subcategories[a])
// console.log("all the list",this.categaryDetails)
          } else {
            this.spinner.hide()
          }
        }
console.log("all the list2",this.categaryDetails)

      } else {

        alert(viewAllCategaryDetailsData.data)

      }
    }, (error) => {
      this.spinner.hide()
      alert(error.error.data)
      this.categoryDetails = true
      location.reload()
    })
  }
  selectCategory(data: any) {
    console.log("select category",data.AliasName)
    this.selectedCategoryName = data.SubCategoryName
    this.SubCategoryID = data.SubCategoryID
    this.categoryID = data.CategoryID
    this.CategoryTypeID = data.CategoryTypeID
    this.formDetails = true

    this.thirdRequest = data.ThirdPartyRequest
    if (data.ThirdPartyRequest == "Yes") {
      this.thirdPartyRequestType = true
    } else {
      this.thirdPartyRequestType = false

    }
    this.viewServiceDetailsData()
    if (this.citySelect == false) {
      this.TotalPrice = 1
      this.subscriptionDetails()

    }


  }
  selectSubCategory(data: any) {
    this.SubSubCategoryID = data.CategoryID;
    this.SubSubCategoryName = data.AliasName;
    this.Filteredobj.ServiceAreaID = this.ServiceAreaID;
    this.Filteredobj.SubCategoryID = this.SubCategoryID;
    this.Filteredobj.CategoryID = this.CategoryTypeID;
    this.Filteredobj.ServiceID = this.SubSubCategoryID;
    this.UsersService.getPriceRangesBasedOnSubCategory(this.Filteredobj).subscribe((Response) => {
      if (Response && Response.code == "S001") {
        this.PriceRange = Response.data;
      } else {
        this.PriceRange = []
      }
    }, ((error) => {
      this.PriceRange = []
    }))


  }





  subscriptionDetails() {
    this.spinner.show()
    this.UsersService.packageSubscription(this.CustRecID, this.SubCategoryID).subscribe((subscriptionData) => {

      if (subscriptionData.code == 'SB00') {
        this.spinner.hide()
        this.NotCovered = "Service Not available in your package"
        this.notCoveredInPlan = false
        this.viewServiceDetailsData()


        
        return;
      }
      if (subscriptionData.code == "SR01") {
        this.spinner.hide()
        this.Covered = subscriptionData.data
        this.CoverdPlan = true

        this.spinner.hide()
        // this.CoverdPlan = false
        this.viewServiceDetailsData()
      } else {
        this.spinner.hide()
        this.NotCovered = subscriptionData.data
        this.notCoveredInPlan = true
        this.viewServiceDetailsData()
      }
    }, ((error) => {
      this.spinner.hide()
      alert(error.error.data)
    }))
  }
  viewServiceDetailsData() {

    this.UsersService.viewServiceDetails(this.CustRecID, this.SubCategoryID, this.ServiceAreaID).subscribe((serviceDetails) => {
      this.SubSubCategory = []
      this.serviceData = ''
      if (serviceDetails.data.servicesdetails != null) {
        this.selectBeneficiary = serviceDetails.data.servicesdetails.IsBeneficiary
      }
      if (serviceDetails.code == "S001") {

        if (serviceDetails.data.servicesdetails.InHouseRequest == 'Yes' && serviceDetails.data.servicesdetails.ThirdPartyRequest) {
          this.RequestTypeSelect = true
        }
        if (serviceDetails.data.servicesdetails.InHouseRequest == 'Yes') {
          this.createRequestData.patchValue({ ServiceRequestType: 'InHouseRequest' })
        }
        if (serviceDetails.data.servicesdetails.ThirdPartyRequest == 'Yes') {
          this.createRequestData.patchValue({ ServiceRequestType: 'ThirdPartyRequest' })
        }
        this.createRequestData.patchValue({ ServiceType: serviceDetails.data.servicesdetails.ServiceType })
        this.serviceType = serviceDetails.data.servicesdetails.ServiceType

        this.TotalPrice = serviceDetails.data.servicesdetails.TotalPrice
        this.CategoryID = serviceDetails.data.servicesdetails.CategoryID

        this.serviceName = serviceDetails.data.servicesdetails.AliasName;

        this.SubSubCategory = serviceDetails.data.SubSubCategory;
        this.pmsVarify()
      } else {
        this.SubSubCategory = []
        alert(serviceDetails.data)
      }
    }, function (error) {
      alert(error.error.data)
    })
  }

  createRequests() {
console.log("submit",)
    this.createRequestbBtn = true
    if (this.thirdRequest == "Yes") {
    }
    // if (this.createRequestData.status == 'INVALID') {
    // } else {
      if (!moment(this.createRequestData.value.RequestedDate, "DD-MM-YYYY", true).isValid()) {
        this.ReqDate = this.DatePipe.transform(this.createRequestData.value.RequestedDate, 'dd-MM-yyyy')  
      }
      if (!moment(this.createRequestData.value.RequestedDate, "DD-MM-YYYY", true).isValid()) {
        this.ReqEndDate = this.DatePipe.transform(this.createRequestData.value.RequestEndDate, 'dd-MM-yyyy')
      }
      if (!moment(this.createRequestData.value.PlacementTime, "DD-MM-YYYY HH:mm", true).isValid()) {
        this.Placetime = this.DatePipe.transform(this.createRequestData.value.PlacementTime, 'dd-MM-yyyy hh:mm')
      }


      this.createRequestData.value.CustRecID = this.CustRecID
      this.createRequestData.value.ServiceID = this.SubCategoryID
      this.createRequestData.value.ServiceAreaID = this.ServiceAreaID
      this.createRequestData.value.RequestedDate = this.ReqDate
      console.log('requested date',this)
      this.createRequestData.value.RequestEndDate = this.ReqEndDate
      this.createRequestData.value.PlacementTime = this.Placetime
      this.createRequestData.value.PaymentMode = this.paymentmode
      this.createRequestData.value.Days = this.daysData
      this.createRequestData.value.CustID = this.CustID
      if (this.EmployeeID && this.EmployeeID.length > 0) {
        this.createRequestData.value.EmployeeID = this.EmployeeID
      }







      this.createRequestData.value.PaymentType = 'Offline'
      this.createRequestData.value.ServiceAreaName = this.ServiceAreaName
      if (this.TotalPrice) {
        this.createRequestData.value.TotalPrice = this.TotalPrice
      }
      if(this.createRequestData.value.ServiceType=='Onetime'){
        console.log("req end date")
        this.createRequestData.value.RequestEndDate = this.ReqDate
        //this.createRequestData.value.RequestedDate = this.createRequestData.value.RequestEndDate
      }

      // if (!moment(this.createRequestData.value.RequestedDate, "dd-MM-YYYY ", true).isValid()) {
      //   this.ReqEndDate = this.DatePipe.transform(this.createRequestData.value.RequestEndDate, 'dd-MM-YYYY')
      // }
      if (!moment(this.OTMSubscriptionDate, "DD-MM-YYYY HH:mm", true).isValid()) {
        this.OTMSubscriptionEndDate = this.DatePipe.transform(this.OTMSubscriptionDate, 'dd-MM-YYYY')
      }
      if (this.OTMSubscriptionEndDate) {
        this.createRequestData.value.OTMSubscriptionEndDate = this.OTMSubscriptionEndDate
      }
      this.createRequestData.value.ServiceAreaName = this.ServiceAreaName
      this.createRequestData.value.PayoutModel = "Prepaid";

      if (this.SubSubCategoryID && this.SubSubCategoryName) {
        this.createRequestData.value.SubSubCategoryID = this.SubSubCategoryID
        this.createRequestData.value.SubSubCategoryName = this.SubSubCategoryName
      }


      this.today = moment(new Date()).unix()
      console.log(this.ReqEndDate)
      if (this.ReqDate != null) {

        this.tempdate = moment(new Date(this.ReqDate)).unix();
        if (this.tempdate < this.today) {
          if (this.citySelect && this.EmployeeID == undefined) {
            alert("Select Employee")
            return
          }
        }

      }




      this.spinner.show()

      this.UsersService.creteRequest(this.createRequestData.value).subscribe((Response) => {
        if (Response.code == "S001") {
          this.spinner.hide()
          alert(Response.message)
          this.route.navigate(["/Dashboard/support/employeeRequest"]);
        } else if (Response.code == "S002") {

          this.spinner.hide()
          alert(Response.message)
          this.createRequestData.reset()

        } else {
          this.spinner.hide()
          alert(Response.message)
        }
      }, (error) => {
        this.spinner.hide()
        alert(error.error.message)
      })

    
  }

  pmsVarify() {
    this.UsersService.pmsVarification(this.CustRecID, this.TotalPrice).subscribe((Response) => {
      if (Response.code == "F002") {
        this.pmsVerify = true
      } else {
        this.pmsVerify = false
      }
    }, (error) => {
      alert(error.error.data)
    })
  }
  paymentMode(type: any) {
    this.paymentmode = type.target.defaultValue
  }
  DaysSelect(days: any) {
    let day = days.target.defaultValue
    if (days.target.checked === true) {
      this.daysData.push(day);
    }
    if (days.target.checked === false)
      for (var i = this.daysData.length - 1; i >= -1; i--) {
        if (this.daysData[i] === day) {
          this.daysData.splice(i, 1);
        }
      }

  }
  plus() {
    this.customerDetails()
  }
  selectBeneficiaryID(CustID: any) {
    this.CustID = CustID.target.value
    //(this.CustID)

  }
  paymentTo(Payment: any) {
    this.PaymentTo = Payment.target.value
  }
  private formatDate() {
    const d = new Date((1666327969 * 1000));
    const minu = d.getMinutes();
    const hours = 'T' + d.getHours();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) {
      day = '0' + day + hours + ":" + minu;;
    } else {
      day = day + hours + ":" + minu;;
    }
    //([year, month, day].join('-'))
    return [year, month, day].join('-')
  }
  cityDetails() {
    this.userservice.cityApi().subscribe((response) => {

      if (response.code == 'S001') {
        this.cityData = response.data
      } else {
        alert(response.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }

  newCustomerForm() {
    this.customerDetailscard = !this.customerDetailscard
    this.newCustomer.value.reset({
      Name: '',
      MobileNumber: '',
      EmailID: ''
    })
  }

  creatCustomer() {

    this.newCustomerSubmit = true
    this.userservice.createNewCustomer(this.newCustomer.value).subscribe((response) => {
      if (response.code == 'D001') {

        alert(response.data)
        this.closebutton.nativeElement.click();
        this.newCustomer.value.reset({
          Name: '',
          MobileNumber: '',
          EmailID: ''
        })

      } else {
        alert(response.data)
      }
    }, (error) => {
      this.closebutton.nativeElement.click();

      alert(error.error.data)
    })
  }

}
