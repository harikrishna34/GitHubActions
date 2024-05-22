import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  UntypedFormGroup,
  FormControl,
  UntypedFormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { CometChatUIKit } from '@cometchat/chat-uikit-angular';
import { checkCometChatUserLogIn } from 'src/app/common/CometChatUtils';
import { SwPush } from '@angular/service-worker';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';
@Component({
  selector: 'app-appliation-dashboard',
  templateUrl: './appliation-dashboard.component.html',
  styleUrls: ['./appliation-dashboard.component.css'],
})
export class AppliationDashboardComponent implements OnInit {
  static emergencyCountApi() {
    throw new Error('Method not implemented.');
  }
  token: any;
  Status = '';
  CityID: String = '';
  CategoryID: String = '';
  ServiceMasterData: any = [];
  PriceRange: any = [];
  CategoriesData: any = [];
  SubCategoriesData: any = [];
  SubSubCategories: any = [];
  TarrifTypes: any = [];
  keyword: any;
  data: any = [];
  Filtertarrifobj: any = {};
  CustRecID: any;
  userDetails: any = [];
  ServiceAreaID: any;
  TarrifID: String = '';
  categaryDetails: any = [];
  keyword1: any;
  categoryID: any;
  SubCategoryID: String = '';
  serviceData: any;
  serviceHistory: any;
  // CategoryID: any
  customerCity: String = '';
  ServiceID: string = '';
  Covered: string;
  NotCovered: string;
  serviceType: String;
  public createRequestData: UntypedFormGroup;
  public Recuring: UntypedFormGroup;
  dropdownSettings: Object = {};
  selectedItems: Array<String> = [];
  notCoveredInPlan: boolean = false;
  TotalPrice: number;
  CoverdPlan: boolean = false;
  paymentmode: String;
  Beneficiaries: any = [];
  CategoryTypeID: String;
  pmsVerify: boolean = false;
  formDetails: boolean = false;
  daysData: any = [];
  CitiesData: any = [];
  planType: String;
  PackageNature: String;
  planDetails: boolean = false;
  selectBeneficiary: String = 'No';
  CustID: String;
  createRequestbBtn: boolean = false;
  serviceName: String;
  dropdownValue: any;
  color: boolean = false;
  idFirstName: any;
  idLastName: any;
  customerList: boolean = false;
  supportColor: boolean = false;
  permissionDivColor: boolean = false;
  demintiaDivCOlor: boolean = false;
  mytaskDivColor: boolean = false;
  revenueDivColor: boolean = false;
  operationDivColor: boolean = false;
  ongoingDivColor: boolean = false;
  chatdivcolor: boolean = false;
  checkOutForm: UntypedFormGroup;
  changeStatusKey: any;
  // Days: Array<string> = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]
  constructor(
    private userservice: UsersService,
    private route: Router,
    private spinner: NgxSpinnerService,
    private Router: Router,
    private UsersService: UsersService,
    private FormBuilder: UntypedFormBuilder,
    private DatePipe: DatePipe,
    private _swPush: SwPush,
    private activeroute: ActivatedRoute,
    private location: Location,
  ) {
    this.currentScreen = this.location.path();

    // Subscribe to changes in the URL
    this.location.onUrlChange((url) => {
      this.currentScreen = url;
      console.log('screen Name ', this.currentScreen);
    });
  }
  currentScreen: any;
  ngOnInit(): void {
    this.token = localStorage.getItem('x-fiftyaccess-token');

    this.activeroute.url.subscribe((urlSegments) => {
      // Extract the first segment of the URL to determine the current route
      // this.currentScreen = urlSegments[0]?.path || 'Unknown';
    });

    this.Router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentScreen = this.Router.url;
      });

    this.idFirstName = localStorage.getItem('UserFirstName');
    this.idLastName = localStorage.getItem('UserLastName');
    this.createRequestData = this.FormBuilder.group({
      RequestedStartDate: [''],
      RequestedEndDate: [''],
      Note: [''],
      PaymentMode: [''],
      ServiceType: [''],
      Days: [''],
      ServiceRequestType: [''],
    });
    this.checkOutForm = this.FormBuilder.group({});
    this.emergencyCountApi();
    this._swPush.messages.subscribe((message: any) => {
      this.refreshComponent();
      console.log(message);
    });
  }

  onRequestManagementClick() {
    this.route.navigate(['Dashboard/requestsmanagementdashboard']);
  }
  refreshComponent() {
    // Implement the logic to refresh your component
    this.emergencyCountApi();
  }
  listBtnColor() {
    this.customerList = true;
    this.supportColor = false;
    this.permissionDivColor = false;
    this.demintiaDivCOlor = false;
    this.ongoingDivColor = false;
    this.operationDivColor = false;
    this.revenueDivColor = false;
    this.mytaskDivColor = false;
    this.chatdivcolor = false;
  }

  supportBtnColor() {
    this.supportColor = true;
    this.customerList = false;
    this.permissionDivColor = false;
    this.demintiaDivCOlor = false;
    this.ongoingDivColor = false;
    this.operationDivColor = false;
    this.revenueDivColor = false;
    this.mytaskDivColor = false;
    this.chatdivcolor = false;
  }

  permissionColor() {
    this.permissionDivColor = true;
    this.supportColor = false;
    this.customerList = false;
    this.demintiaDivCOlor = false;
    this.ongoingDivColor = false;
    this.operationDivColor = false;
    this.revenueDivColor = false;
    this.mytaskDivColor = false;
    this.chatdivcolor = false;
  }

  demintiaColor() {
    this.demintiaDivCOlor = true;
    this.permissionDivColor = false;
    this.supportColor = false;
    this.customerList = false;
    this.ongoingDivColor = false;
    this.operationDivColor = false;
    this.revenueDivColor = false;
    this.mytaskDivColor = false;
    this.chatdivcolor = false;
  }
  mytaskColor() {
    this.mytaskDivColor = true;
    this.demintiaDivCOlor = false;
    this.permissionDivColor = false;
    this.supportColor = false;
    this.customerList = false;
    this.revenueDivColor = false;
    this.ongoingDivColor = false;
    this.operationDivColor = false;
    this.chatdivcolor = false;
  }

  revenueColor() {
    this.revenueDivColor = true;
    this.mytaskDivColor = false;
    this.demintiaDivCOlor = false;
    this.permissionDivColor = false;
    this.supportColor = false;
    this.customerList = false;
    this.operationDivColor = false;
    this.ongoingDivColor = false;
    this.chatdivcolor = false;
  }

  operationsColor() {
    this.operationDivColor = true;
    this.revenueDivColor = false;
    this.mytaskDivColor = false;
    this.demintiaDivCOlor = false;
    this.permissionDivColor = false;
    this.supportColor = false;
    this.customerList = false;
    this.ongoingDivColor = false;
    this.chatdivcolor = false;
  }

  ongoingColor() {
    this.ongoingDivColor = true;
    this.operationDivColor = false;
    this.revenueDivColor = false;
    this.mytaskDivColor = false;
    this.demintiaDivCOlor = false;
    this.permissionDivColor = false;
    this.supportColor = false;
    this.customerList = false;
    this.chatdivcolor = false;
  }

  chatcolor() {
    this.chatdivcolor = true;
    this.ongoingDivColor = false;
    this.operationDivColor = false;
    this.revenueDivColor = false;
    this.mytaskDivColor = false;
    this.demintiaDivCOlor = false;
    this.permissionDivColor = false;
    this.supportColor = false;
    this.customerList = false;
  }

  // requestSubscription(){

  //   console.log(this._swPush.isEnabled)

  //   if (!this._swPush.isEnabled) {
  //     console.log("Notification is not enabled.");
  //     return;
  //   }
  //   this._swPush.requestSubscription({
  //     serverPublicKey: 'BKqvrKH1aFMiNWh7VfJCZbKSZWHWOmIUey1ZObD5wTqSb7rvlxnVrBaEMlKEs5e86xiixIj1RAO3OeqM1xap4Z4'
  //   }).then((subscription:any) =>{

  //    console.log("monitorScreen")
  //     const Keys = subscription.toJSON();
  //     this.subscribenotification(Keys)}).catch(err => console.log(err));

  // }

  //   subscribenotification(keys:any){

  //     let endPointObj = {
  //      "endpoint":'',
  //      "expirationTime":'',
  //      "keys":'',
  //      "Token":'',
  //      "ServerType":"Tcp"
  //     }

  //     endPointObj.endpoint = keys.endpoint
  //     endPointObj.expirationTime = keys.endpoint
  //     endPointObj.keys = keys.keys
  //     endPointObj.Token = this.token

  //     console.log('subcription called ')

  //    this.userservice.subscribe(endPointObj).subscribe((Response) => {
  //      if (Response.code == "S001") {

  //        console.log('subcription response')
  //      } else {
  //        alert(Response.message)
  //      }

  //    }, (error) => {
  //      alert(error.error.message)
  //    })
  //  }
  // When the count increments
  count: any;
  EmergencyCount: any;
  incrementCount() {
    this.count++; // Assuming you have a count variable
    this.EmergencyCount++;
    // Add a class to trigger the animation
    const badge = document.querySelector('.badge');
    badge?.classList.add('bounce-animation');

    // Remove the class after the animation completes
    setTimeout(() => {
      badge?.classList.remove('bounce-animation');
    }, 1000); // Adjust the timeout to match the animation duration
  }

  logout() {
    localStorage.removeItem('x-fiftyaccess-token');
    CometChatUIKit.logout();
    this.route.navigate(['/login']);
  }
  modo(value: any) {
    this.dropdownValue = value.target.value;
    if (this.dropdownValue == 'mod1') {
      this.route.navigate(['Dashboard/settings/settings']);
    }
    if (this.dropdownValue == 'mod2') {
      localStorage.removeItem('x-fiftyaccess-token');
      this.route.navigate(['/login']);
    }
  }

  checkStatus(status: any) {
    let modal: any = document.getElementById('staticBackdrop');
    modal.classList.add('show');
    modal.style.display = 'block';
  }

  isChecked: boolean = false;
  clockInStatus: any;
  checkStatu(event: any) {
    console.log('Checkbox checked:', this.isChecked);

    if (this.isChecked) {
      let modal: any = document.getElementById('staticBackdrop');
      modal.classList.remove('show');
      modal.style.display = 'none';
      this.changeChecklInStatus('Check-In');
    } else {
      let modal: any = document.getElementById('staticBackdrop');
      modal.classList.add('show');
      modal.style.display = 'block';
    }
    // You can perform any action based on the checkbox status here
  }

  closeTrack() {
    let modal: any = document.getElementById('staticBackdrop');
    modal.classList.remove('show');
    modal.style.display = 'none';
    if (this.changeStatusKey == null || this.changeStatusKey == '') {
      console.log('adsfghjk');
      this.isChecked = true;
    }
  }

  changeStatus(status: any) {
    console.log('123567890', status.target.value);
    this.changeStatusKey = status.target.value;
  }

  submitStatusTime() {
    if (this.changeStatusKey == null || this.changeStatusKey == '') {
      console.log('adsfghjk');
      this.isChecked = true;
    } else {
      this.changeChecklInStatus(this.changeStatusKey);
    }
    this.closeTrack();
  }
  // function for change checkin status
  changeChecklInStatus(status: any) {
    this.spinner.show();
    this.UsersService.checkinStatusUpdate({
      Check: status,
      Lat: '',
      Lng: '',
    }).subscribe(
      (plan: any) => {
        this.spinner.hide();
      },
      (error) => {
        // Handle error response (status code 404 or other errors)
        if (error.status === 404) {
          this.spinner.hide();

          // Handle 404 Not Found error
        } else {
          this.spinner.hide();

          // Handle other errors
        }
      },
    );
  }

  Emergency() {
    this.customerList = false;
    this.route.navigate(['/Emergencyplan']);
  }

  ConfiguraWatch() {
    this.route.navigate(['Dashboard/asers/configuration']);
  }

  watchMonitoring() {
    this.route.navigate(['Dashboard/asers/AsersMonitoring']);
  }
  doactivesidebar() {
    if (this.Status == '') {
      this.Status = 'active';
    } else {
      this.Status = '';
    }
    // console.log(this.Status)
  }
  onProfile() {
    this.customerList = false;
    this.route.navigate(['/supportDashBoard']);
  }
  onDementiaClick() {
    this.customerList = false;
    this.route.navigate(['Dashboard/dementia/dementiaSchedule']);
  }
  onDementiaAssesmentForm() {
    this.route.navigate(['Dashboard/dementia/assesmentform']);
  }

  emergencyList() {
    this.customerList = false;
    this.route.navigate(['Dashboard/emergencyList']);
  }
  escalation() {
    this.customerList = false;
    this.route.navigate(['Dashboard/Escalation/ViewAllEscalations']);
  }

  CustomerList() {
    this.customerList = true;
    this.route.navigate(['Dashboard/Customerslist']);
  }

  AnchorDashBoard() {
    this.customerList = false;
    this.route.navigate(['/anchorboard']);
  }

  Insurance() {
    this.customerList = false;
    this.route.navigate(['/insurancedashboard']);
  }
  onOneTimeUser() {
    this.customerList = false;
    this.route.navigate(['/OneTimeUser']);
  }

  ongoingJobs() {
    this.customerList = false;
    this.route.navigate(['/Dashboard/ongoingrequests']);
  }
  datepicker() {
    this.customerList = false;
    this.route.navigate(['/datepic']);
  }
  partner() {
    this.spinner.show();
    this.route.navigate(['Dashboard/partner/partnersTask']);
    this.spinner.hide();
  }
  revenue() {
    this.customerList = false;
    this.route.navigate(['/Dashboard/revenue/revenueList']);
  }

  chatroles() {
    this.route.navigate(['/Dashboard/chat/Viewroleschat']);
  }
  support() {
    // this.route.navigate(['/dashboard/support/requestDashboard'])
    this.customerList = false;
    this.route.navigate(['/Dashboard/support/employeeRequest']);
  }

  escalations() {
    this.route.navigate(['/Dashboard/escalation/dashboard']);
  }
  allUsers() {
    this.route.navigate(['/Dashboard/chat/chatUsers']);
  }

  createchatgroup() {
    this.route.navigate(['/Dashboard/chat/creatchatgroup']);
  }

  watchConfiguration() {
    this.route.navigate(['/Dashboard/UpdateConfigration']);
  }

  asers() {
    this.route.navigate(['/Dashboard/asers/asersdashboard']);
  }
  HHC() {
    this.route.navigate(['/Dashboard/HHC/HHCdashboard']);
  }

  CitySelection() {
    this.spinner.show();
    this.ServiceMasterData = [];
    this.CategoriesData = [];
    this.SubCategoriesData = [];
    this.SubSubCategories = [];
    this.TarrifTypes = [];
    this.CategoryID = '';
    this.SubCategoryID = '';

    this.ServiceID = '';
    this.TarrifID = '';

    this.UsersService.getServicesList(this.CityID).subscribe(
      (response) => {
        this.spinner.hide();

        if (response.code == 'S001') {
          this.ServiceMasterData = response.data;
          if (this.ServiceMasterData.Categories) {
            this.CategoriesData = this.ServiceMasterData.Categories;
          }
          if (this.ServiceMasterData.SubCategories) {
            this.SubCategoriesData = this.ServiceMasterData.SubCategories;
          }
        } else {
          this.ServiceMasterData = [];
          alert(response.data);
        }
      },
      function (error) {
        alert(error.error.data);
      },
    );
  }
  CategorySelection(data: any) {
    this.CategoryID = '';
    this.ServiceID = '';
    this.TarrifID = '';
    this.SubSubCategories = [];
    for (let sm in this.ServiceMasterData.Services) {
      if (
        data.target.value == this.ServiceMasterData.Services[sm].SubCategoryID
      ) {
        this.CategoryID = this.ServiceMasterData.Services[sm].CategoryID;
        this.SubSubCategories.push(this.ServiceMasterData.Services[sm]);
      }
    }
  }
  SubCategorySelection(data: any) {
    this.TarrifTypes = [];
    this.TarrifID = '';
    for (let sub in this.SubSubCategories) {
      if (this.SubSubCategories[sub].ServiceID == data.target.value) {
        this.TarrifTypes = this.SubSubCategories[sub].TariffTypes;
      }
    }
    this.TarrifSelection();
  }

  TarrifSelection() {
    this.spinner.show();
    this.Filtertarrifobj = {};
    this.Filtertarrifobj.ServiceID = this.ServiceID;
    this.Filtertarrifobj.ServiceAreaID = this.CityID;
    this.Filtertarrifobj.CategoryID = this.CategoryID;
    this.Filtertarrifobj.SubCategoryID = this.SubCategoryID;

    this.UsersService.getPriceRangesBasedOnSubCategory(
      this.Filtertarrifobj,
    ).subscribe(
      (response) => {
        this.spinner.hide();
        if (response.code == 'S001') {
          this.PriceRange = response.data;
        } else {
          this.PriceRange = [];
          alert(response.data);
        }
      },
      (error) => {
        this.spinner.hide();
        this.PriceRange = [];
      },
    );
  }

  onMyRequests() {
    this.route.navigate(['Dashboard/myrequests']);
  }

  PermissionsClick() {
    this.route.navigate(['/Dashboard/Permission']);
  }
  allRequestDashboard() {
    this.Router.navigate(['/support/allRequestDetails']);
  }

  myTask() {
    this.Router.navigate(['Dashboard/Task/MyTask']);
  }
  CreateRequest() {
    this.Router.navigate(['/CreateRequest']);
  }

  customerDetails() {
    this.keyword = 'Name';
    this.UsersService.CustomerDetailsData().subscribe(
      (customerDetails) => {
        if (customerDetails.code == 'S001') {
          this.data = customerDetails.data;
        } else {
          alert(customerDetails.data);
        }
      },
      function (error) {
        alert(error.error.data);
      },
    );
  }
  selectEvent(data: any) {
    this.CustRecID = data.CustRecID;

    this.viewUserData();
    //("custrecID", data.CustRecID)
  }
  onChangeSearch(data: any) {
    this.userDetails = [];
  }
  onFocused(data: any) {
    this.userDetails = [];
    this.serviceData = '';
    this.serviceHistory = '';
    this.planType = '';
    this.planDetails = false;
    this.serviceData = '';
    this.NotCovered = '';
    this.Covered = '';
    this.TotalPrice = 0;
  }

  viewUserData() {
    this.spinner.show();
    this.UsersService.viewUser(this.CustRecID).subscribe(
      (userData) => {
        if (userData.code == 'S001') {
          this.userDetails.push(userData.data);
          this.Beneficiaries = userData.data.Beneficiaries;
          this.ServiceAreaID = userData.data.CustomerPackageObj.ServiceAreaID;
          this.customerCity = userData.data.City;
          this.planType = userData.data.CustomerPackageObj.AliasName;
          this.PackageNature = userData.data.CustomerPackageObj.PackageNature;
          this.planDetails = true;
          this.spinner.hide();
          this.viewAllCategaryDetailsData();
        } else {
          alert(userData.data);
        }
      },
      function (error) {
        alert(error.error.data);
      },
    );
  }
  CitiesInfo() {
    this.UsersService.cityApi().subscribe(
      (response) => {
        if (response.code == 'S001') {
          this.CitiesData = response.data;
        } else {
          this.CitiesData = [];
          alert(response.data);
        }
      },
      function (error) {
        alert(error.error.data);
      },
    );
  }

  onChangePlan(data: any) {
    this.serviceData = '';
    this.serviceHistory = '';
  }
  onFocuse(data: any) {
    this.serviceData = '';
    this.NotCovered = '';
    this.Covered = '';
    this.TotalPrice = 0;
  }
  viewAllCategaryDetailsData() {
    this.spinner.show();
    this.keyword1 = 'AliasName';
    this.UsersService.viewAllCategaryDetails(
      this.CustRecID,
      this.ServiceAreaID,
    ).subscribe(
      (viewAllCategaryDetailsData) => {
        if (viewAllCategaryDetailsData.code == 'S001') {
          this.spinner.hide();
          for (let a in viewAllCategaryDetailsData.data.subcategories) {
            if (
              viewAllCategaryDetailsData.data.subcategories[a].Status ===
              'Active'
            ) {
              this.categaryDetails.push(
                viewAllCategaryDetailsData.data.subcategories[a],
              );
            } else {
              console.log('--');
            }
          }
        } else {
          alert(viewAllCategaryDetailsData.data);
        }
      },
      function (error) {
        alert(error.error.data);
      },
    );
  }
  selectCategory(data: any) {
    this.SubCategoryID = data.SubCategoryID;
    this.categoryID = data.CategoryID;
    this.CategoryTypeID = data.CategoryTypeID;
    this.formDetails = true;
    this.subscriptionDetails();
  }
  subscriptionDetails() {
    this.spinner.show();
    this.UsersService.packageSubscription(
      this.CustRecID,
      this.SubCategoryID,
    ).subscribe(
      (subscriptionData) => {
        if (subscriptionData.code == 'SB00') {
          alert(subscriptionData.data.message);

          window.location.reload();
          return;
        }
        if (subscriptionData.code == 'SR01') {
          this.spinner.hide();
          this.Covered = subscriptionData.data;
          this.CoverdPlan = true;
          this.spinner.hide();
          // this.CoverdPlan = false
          this.viewServiceDetailsData();
        } else {
          this.spinner.hide();
          this.NotCovered = subscriptionData.data;
          this.notCoveredInPlan = true;
          this.viewServiceDetailsData();
        }
      },
      function (error) {
        // alert(error.error.data)
      },
    );
  }
  viewServiceDetailsData() {
    this.UsersService.viewServiceDetails(
      this.CustRecID,
      this.SubCategoryID,
      '',
    ).subscribe(
      (serviceDetails) => {
        this.serviceData = '';

        this.selectBeneficiary =
          serviceDetails.data.servicesdetails.IsBeneficiary;
        if (serviceDetails.code == 'S001') {
          if (serviceDetails.data.servicesdetails.InHouseRequest == 'Yes') {
            this.createRequestData.patchValue({
              ServiceRequestType: 'InHouseRequest',
            });
          }
          if (serviceDetails.data.servicesdetails.ThirdPartyRequest == 'Yes') {
            this.createRequestData.patchValue({
              ServiceRequestType: 'ThirdPartyRequest',
            });
          }
          this.createRequestData.patchValue({
            ServiceType: serviceDetails.data.servicesdetails.ServiceType,
          });
          this.serviceType = serviceDetails.data.servicesdetails.ServiceType;

          this.TotalPrice = serviceDetails.data.servicesdetails.TotalPrice;
          this.CategoryID = serviceDetails.data.servicesdetails.CategoryID;
          this.serviceName = serviceDetails.data.servicesdetails.AliasName;
          this.pmsVarify();
        } else {
          alert(serviceDetails.data);
        }
      },
      function (error) {
        alert(error.error.data);
      },
    );
  }
  createRequests() {
    this.createRequestbBtn = true;
    // if(this.createRequestData.value.CustID==null &&   this.CustID==null && this.selectBeneficiary==true){
    //   alert("Select Beneficiary")
    //   return;
    // }

    // this.createRequestData.value.PaymentMode = this.paymentmode

    if (
      this.createRequestData.value.ServiceType == 'Recurring' &&
      this.daysData.length < 1
    ) {
      alert('Selet Days');
      return;
    }
    if (this.createRequestData.status == 'INVALID') {
    } else {
      let ReqDate = this.DatePipe.transform(
        this.createRequestData.value.RequestedStartDate,
        'dd-MM-YYYY hh:mm',
      );
      let ReqEndDate = this.DatePipe.transform(
        this.createRequestData.value.RequestedEndDate,
        'dd-MM-YYYY',
      );
      this.createRequestData.value.CustRecID = this.CustRecID;
      this.createRequestData.value.ServiceID = this.SubCategoryID;
      this.createRequestData.value.ServiceAreaID = this.ServiceAreaID;
      this.createRequestData.value.RequestedStartDate = ReqDate;
      this.createRequestData.value.RequestedEndDate = ReqEndDate;
      this.createRequestData.value.PaymentMode = this.paymentmode;
      this.createRequestData.value.Days = this.daysData;
      this.createRequestData.value.CustID = this.CustID;
      this.createRequestData.value.PaymentType = 'Offline';

      this.UsersService.creteRequest(this.createRequestData.value).subscribe(
        (Response) => {
          this.spinner.show();
          if (Response.code == 'S001') {
            this.spinner.hide();

            alert(Response.message);
            // window.location.reload()
            this.route.navigate(['/Dashboard/support/employeeRequest']);
          } else {
            alert(Response.message);
          }
        },
        function (error) {
          alert(error.error.message);
        },
      );
    }
  }
  checkbox(values: any) {}
  pmsVarify() {
    this.UsersService.pmsVarification(
      this.CustRecID,
      this.TotalPrice,
    ).subscribe(
      (Response) => {
        if (Response.code == 'F002') {
          this.pmsVerify = true;
        } else {
          // alert(Response.data)
          this.pmsVerify = false;
        }
      },
      (error) => {
        alert(error.error.data);
      },
    );
  }
  paymentMode(type: any) {
    this.paymentmode = type.target.defaultValue;
  }
  DaysSelect(days: any) {
    let day = days.target.defaultValue;
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
    this.spinner.show();
    this.Router.navigate(['/newrequest']);
  }
  Operations() {
    this.route.navigate(['/Dashboard/customeroperations/CustomerOperations']);
  }
  selectBeneficiaryID(CustID: any) {
    this.CustID = CustID.target.value;
  }
  close() {
    // this.route.navigate(["Dashboard/support/employeeRequest"]);

    location.reload();
  }
  paymentTo(Payment: any) {}
  navigateToChat() {
    this.route.navigate(['Dashboard/cometchat']);
  }

  onClickUpdate() {
    reset();
  }
  isChatUserLoggedIn() {
    checkCometChatUserLogIn();
  }

  emergencyCountApi() {
    this.UsersService.EmergencyCount().subscribe((Response) => {
      this.spinner.show();
      if (Response.code == 'S001') {
        this.spinner.hide();
        this.count = Response.data.MonitorScreenCount;
        this.EmergencyCount = Response.data.EmergencyCount;
      } else {
        alert(Response.message);
      }
    });
  }
}

function reset() {}

function value(value: any, any: any) {
  throw new Error('Function not implemented.');
}
