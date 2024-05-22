import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
// import { BrowserModule } from '@angular/platform-browser'
import { UsersService } from '../../users.service'
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder, Validators, UntypedFormArray, Form, AbstractControl, ValidatorFn } from '@angular/forms';
import { formatDate } from '@angular/common';

// import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { ConditionalExpr, ReturnStatement } from '@angular/compiler';
import { Subscription } from 'rxjs';
import { ToWords } from 'to-words';
import { IDropdownSettings } from 'ng-multiselect-dropdown';



const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: true,
    currencyOptions: { // can be used to override defaults for the selected locale
      name: 'Rupee',
      plural: 'Rupees',
      symbol: '₹',
      fractionalUnit: {
        name: 'Paisa',
        plural: 'Paise',
        symbol: '',
      },
    }
  }
});





interface onDateChangeParams {
  EndDate: any;
  CustRecID: string;
  PaymentID: string;
}
// import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-compilition-screen',
  templateUrl: './compilition-screen.component.html',
  styleUrls: ['./compilition-screen.component.css']
})

export class CompilitionScreenComponent implements OnInit {

  @ViewChild('closebutton') closebutton: any;
  @ViewChild('commentsForDiscountPrice') commentsForDiscountPrice: ElementRef;

  daysData: any = []
  tasksTab: boolean = true
  jobsAndBillsTab: boolean = false
  requestDetailsTab: boolean = false
  customerDetailsTab: boolean = false
  Activites: boolean = false
  public updateRequestDetails: UntypedFormGroup;
  public changeRequestDetails: UntypedFormGroup;
  public dropJob: UntypedFormGroup;
  public informVendorNewJob: UntypedFormGroup;
  tasksButton: boolean = true
  jobsAndBillsTabButton: boolean = false
  requestDetailsTabButton: boolean = false
  customerDetailsTabButtons: boolean = false
  ActivitesButton: boolean = false
  RequestID: any
  CustRecID: any
  requestDetailsObj: any = {}
  customerData: any = {}
  TarrifCalculation: any = {}
  TarrifData: any = {}
  changeDateForm: UntypedFormGroup;
  AdjustBillFrom: UntypedFormGroup;

  // updateRequestDetails:any
  BeneficiaryName: String
  BeneficiaryMobileNumber: any

  ReqEndDate: any
  ReqDate: any
  paymentmode: String
  PaymentTo: any
  EndDate: any
  Days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
  defualtDay: any
  name: String
  taskType: String
  CustomerDetails: any
  selectBeneficiary: String = 'No'
  page = 1
  UpdateRequestBtn: boolean = false
  CustID: any
  AuthorizedteamList: any = []
  EmployeeID: any;
  PartnerExecutiveID: any
  VendorID: any
  partnerData: any = []
  vendorIDData: any
  profileView: any = []
  SubSubServices: any = []
  public vendorUpdate: UntypedFormGroup
  public profileForm: UntypedFormGroup
  public CompleteTheJob: UntypedFormGroup
  public extendJob: UntypedFormGroup
  public confirmVendor: UntypedFormGroup
  public confirmVendornotonetime: UntypedFormGroup
  doc: any;
  discountPriceFlag:boolean=false;
  resultStartDate: any
  resultEndDate: any
  diffInDays: any
  vendorStatusbtn: any
  idProofAadhar = false
  idLicence = false
  idVoter = false
  inputLength: any
  inputValue: any
  discountAmountsListArr:any=[];
  IdNumber: any
  pUrl: any = false
  ExDoc: any
  getVendorName: any
  submitted = false
  ProfileDoc: any
  isVendorProfiles: any
  Doc: any
  ProfileID: any
  ResheduleDate: any
  RequestStatus: any
  EmpParmas: any
  Executives: any;
  StartDate: any
  ratingValue: any
  EndDateJob: any
  ActiveVendor: any
  ActiveVendorObj: any
  vendorProfileData: any = []
  Answer: any
  Comment: any
  complteJobEndDate: any
  requestObjData: any = []
  jobStartDateDropJob: any
  dropJobEndDate: any
  JobStartDate: any
  selctedvendorobj: any = {}
  confirmVendorbtn: boolean = false
  SelectedvendorsDetails: any = []
  AnvayaaPrice: boolean = false
  AnvayaaPriceinput: boolean = false
  discountValidationObj:{commentsLength:number,submitted?:boolean}={
    commentsLength:0
  }
  referalAmount: boolean = false
  referalPercentage: boolean = false
  subscription: Subscription;
  ReceiptNumber: any
  reciptenumber: boolean = false
  paymentType: String = ''
  type: any
  vendPrice: any
  anvayaaPercentage: any
  anvayavalue: any
  vendorValue: any
  noDays: any
  NoWorkingDays: any
  UploadBills: UntypedFormGroup
  UploadedBill: any = []
  uploadedbillUrl: any
  SubSubCategoryData: any = []
  selectedCategoryName: any
  landropdownSettings: IDropdownSettings;
  IDropdownSettings: any
  dropdownSettings: Object = {}
  selectedItems: Array<String> = []
  dropdownList: any = [];
  mindate = new Date();
  Placetime: any
  nurseoncalltext:any=[]
  hasData: boolean
  public nurseoncallsetting:any = {};
  minimumSellingPrice:number=0;

  disableDate() {
    return false;
  }
  public equipemtsetting: any = {};
  public medicalsetting: any = {};

  equipmenttext: any = []
  medicaltext: any = []
  constructor(private userservice: UsersService, private datePipe: DatePipe, private route: Router, private activatedRoute: ActivatedRoute, private formBuilder: UntypedFormBuilder, private DatePipe: DatePipe, private spinner: NgxSpinnerService) { }
  @ViewChild('fileUploader') fileUploader: ElementRef;
  ngOnInit(): void {
    // 
    this.discountValidationObj={
      submitted:false,
      commentsLength:0
    }
    this.userservice.languages().subscribe((languages) => {
      this.dropdownList = languages.data.Languages
    })

    this.spinner.show();
    this.RequestID = this.activatedRoute.snapshot.queryParamMap.get("RequestID");
    this.CustRecID = this.activatedRoute.snapshot.queryParamMap.get("CustRecID");
    this.type = this.activatedRoute.snapshot.queryParamMap.get("type");
    console.log(this.type)
    if (this.type == "VerifyBill") {
      this.jobsTab()
    }
    if (this.type == "cancelrequest") {
      this.requestDetailTab()
    }
   

    this.EmployeeID = localStorage.getItem('LoginEmployeeIDNew')
    this.viewRequestDetails();

    this.employeList();
    this.vendorUpdate = this.formBuilder.group({
      Status: [''],
      StatusRemarks: [''],
      StartDate: [''],
      Price: [''],
      PriceFor: [''],
      EndDate: [''],
      ActualDaysServed: ['']
    })
    // this.formatDate()

    this.changeDateForm = this.formBuilder.group({
      EndDate: ['', [Validators.required]]
    })
    this.AdjustBillFrom = this.formBuilder.group({
      Amount: ['', [Validators.required]]
    })

    const ctrls = this.Days.map((controls) => {
      this.formBuilder.control(false)

    })
    this.equipmenttext = [
      { key: 'OxygenConcentrator', value: 'OxygenConcentrator' },
      { key: 'OxygenCylinder', value: 'OxygenCylinder' },
      { key: 'BiPAP', value: 'BiPAP' },
      { key: 'CPAP', value: 'CPAP' },
      { key: 'Ventilator', value: 'Ventilator' },
      { key: 'Suction Machine', value: 'Suction Machine' },
      { key: 'DVT Pump', value: 'DVT Pump' },
      { key: 'Syringe Pump', value: 'Syringe Pump' },
      { key: 'Para-Monitor', value: 'Para-Monitor' },
      { key: 'Wheelchair', value: 'Wheelchair' },
      { key: 'Walker', value: 'Walker' },


    ]
    this.medicaltext = [
      { key: 'Suctioning', value: 'Suctioning' },
      { key: 'Tracheotomy', value: 'Tracheotomy' },
      { key: 'Colectomy', value: 'Colectomy' },
      { key: 'CPAP', value: 'CPAP' },
      { key: 'Wound Management', value: 'Wound Management' },
      { key: 'IM Injection', value: 'IM Injection' },
      { key: 'IV Injections', value: 'IV Injections' },
      { key: 'IV Saline', value: 'IV Saline' },
      { key: 'IV NS', value: 'IV NS' },
      { key: 'Catheterisation', value: 'Catheterisation' },


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
    // this.commentForDiscountAction=this.formBuilder.group({
    //   comments:['',Validators.required]
    // })

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

    this.defualtDay = this.Days
    this.updateRequestDetails = this.formBuilder.group({
      ServiceRequestType: [''],
      CustID: [''],
      RequestedDate: [''],
      RequestEndDate: [''],
      Note: [''],
      PaymentMode: [''],
      PaymentTo: [''],
      SubSubCategoryID: [''],
      SubCategoryID: [],
      ServiceID: [],
      SubSubCategoryName: [''],
      Days: this.formBuilder.array(ctrls),
      NewStatus: [''],
      Gender: [''],
      Languages: [''],
      PlacementTime: [''],
      Religion: [''],
      ServiceType: [''],
      Budget: [''],
      OnCallDetails: this.formBuilder.group({
        OrderType: [''],
        City: [''],
        MobileNumber: [''],
        AlternateMobileNumber: [''],
        Area: [''],
        Age: [],
        Mobility: [''],
        ServiceType: [''],
        FoodIntake: [''],
        ServiceRequired: [''],
        PriceInformed: [],
        ServicableDay: [''],
        NurseType: [''],
        Note: [''],
        DoYouWantNurseOnCall:[''],
        OnCallServiceRequired:[''],
      }),
      CareTaker: this.formBuilder.group({
        OrderType: [''],
        CareTakerType: [''],
        City: [''],
        MobileNumber: [''],
        AlternateMobileNumber: [''],
        Area: [''],
        Age: [],
        Mobility: [''],
        WeightOfThePatient: [],
        WashroomUsage: [''],
        FoodIntake: [''],
        Medication: [''],
        ExerciseActivity: [''],
        MedicalEquipmentAssistance: [''],
        ServiceRequired: [''],
        PricingQuoted: [''],
        PriceInformed: [],
        DutyHours: [''],
        ServiceDurationRequested: [''],
        Insulin: [''],
        InsulinText: [''],
        TypeOfInsulin: [''],
        Note: [''],
        ExerciseText: [''],
        NoOfPeopleToCook: [''],
        ResidenceType: [''],
        SpecifyMaidWork: [''],
        CookingType: [''],
        MedicalProcedure: [''],
        MedicationText: [''],
        TypeOfMedicalProcedure: [''],
        TypeOfEquipment: [''],
        EquipmentText: [''],
        MedicalProcedureText: [''],
        NurseType: [''],
        DoYouWantCook: [''],
        DoYouWantMaid: [''],
      }),
      DiagnosticService: this.formBuilder.group({
        OrderType: [''],
      //  NurseType: [''],
        City: [''],
        MobileNumber: [''],
        AlternateMobileNumber: [''],
        Area: [''],
        Age: [],
        TypeOfPathology: [''],
        PriceInformed: [],
        TypeOfRadiology: [''],
        Note: [''],
      })



    })


    this.UploadBills = this.formBuilder.group({
      'Amount': [''],
      'Bill': [''],
      'PaymentID': [''],
      Type: ['']

    })

    this.changeRequestDetails = this.formBuilder.group({
      date: [''],
      Comment: [''],
      Assigned_To_Partner: ['']
    })

    this.profileForm = this.formBuilder.group({
      IdNumber: ['',],
      IdType: [],
      Name: ['', [Validators.required]],
      VendorID: [''],
      PrimaryMobileNo: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])],
      ServiceID: [],
      VendorPrice: [''],
      MinimumPrice: [0],
      isItDiscountedPrice:['No'],
      DiscountedPrice:[''],
      AnvayaaPrice: [''],
      TariffType: [''],
      ReferralType: [''],
      AnvayaaReferralFee: [''],
      PaymentTo: [''],
    })

    const control1 = <UntypedFormControl>this.profileForm.get('ReferralType');
    const control2 = <UntypedFormControl>this.profileForm.get('AnvayaaReferralFee');


    this.subscription = control1.valueChanges.subscribe(value => {
      if (value == "Percentage") {
        control2.setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(2)])
      } else if (value == "Amount") {
        control2.setValidators([Validators.required, Validators.maxLength(4), Validators.minLength(3)])
      }

    })


    const vendorprice = <UntypedFormControl>this.profileForm.get('VendorPrice')
    const AnvayaaPrice = <UntypedFormControl>this.profileForm.get('AnvayaaPrice')

    this.subscription = vendorprice.valueChanges.subscribe(value => {
      this.vendPrice = value

    })

    this.subscription = AnvayaaPrice.valueChanges.subscribe(value => {
      if (value < this.vendPrice) {
        AnvayaaPrice.setValidators([Validators.required, Validators.min(this.vendPrice + 1), Validators.minLength(2)])
      }

    })

    this.informVendorNewJob = this.formBuilder.group({
      jobStartDate: ['']
    })
    this.CompleteTheJob = this.formBuilder.group({
      "RequestedDate": [''],
      "RequestID": [''],
      "Rating": [""],
      "Comments": [''],
      "Status": "Completed",
      "EndDate": [""]
    })
    this.dropJob = this.formBuilder.group({
      Assigned_To_Partner: [''],
      Comment: [''],
      EndDate: ['']
    })

    this.extendJob = this.formBuilder.group({
      EndDate: ['']

    })

    this.confirmVendor = this.formBuilder.group({
      VendorPrice: ['', Validators.min(100)],
      AnvayaaPrice: ['', Validators.min(100)],
      TariffType: [''],
      ReferralType: [''],
      AnvayaaReferralFee: [''],
      vendorID:['']

    })
    this.confirmVendornotonetime = this.formBuilder.group({

    })

  console.log(this.discountAmountsListArr,"data")
  
}
  onChangeMinimumPrice(value:boolean){
    this.discountPriceFlag=value;
    if(this.discountPriceFlag){
      this.profileForm.patchValue({isItDiscountedPrice:'Yes'})
    }else{
      this.profileForm.patchValue({isItDiscountedPrice:'No'})
    }
    this.profileForm.patchValue({DiscountedPrice:0})
  }
  onDiscountPriceApprove(requestID:string,status:string){
    
    this.spinner.show()
    const textareaValue = this.commentsForDiscountPrice.nativeElement.value;
    this.discountValidationObj={
      submitted:true,
      commentsLength:textareaValue.length,
    }
    if(this.discountValidationObj.commentsLength < 3 && this.discountValidationObj.submitted){
      this.spinner.hide()
      return;
    }      
      this.userservice.onApproveDiscountPrice({
        RequestID:requestID,Status:status,Reason:textareaValue
        }).subscribe((response)=>{
          if(response.code==='S001'){
            this.spinner.hide();
            alert(response.data);
          }else{
            this.spinner.hide();
            alert(response.data);
          }
        },(error) => {
          alert(error.error.data)
        })
    
    
  }
  onApproveBackDated(requestID: String) {
    this.spinner.show();
    
    this.userservice.ApproveBackDated({ RequestID: requestID,"Status":"Pending_Approval" }).subscribe((response) => {

      if (response.code == "S001") {
        alert(response.message);
        this.route.navigate(['/Dashboard/Task/MyTask'])
        this.spinner.hide();
      } else {
        alert(response.message);
        this.spinner.hide();

      }
    }, (err) => {
      this.spinner.hide();

      alert(err.error.data)
    })
    this.spinner.hide();
  }
  onCancelApprove(requestID: String) {
    this.spinner.show();
    //console.log(requestID,"Demo1");
    this.userservice.approveCancelRequest({ RequestID: requestID }).subscribe((response) => {
      //console.log(response,"Response")

      if (response.code == "S001") {
        alert(response.data);
        this.route.navigate(['/Dashboard/Task/MyTask'])
        this.spinner.hide();
      } else {
        alert(response.data);
        this.spinner.hide();

      }
    }, (err) => {
      alert(err.error.data)
    })
    this.spinner.hide();
  }

  onEndDateChange(paymentDetails: any) {
    this.spinner.show();
    if (!paymentDetails.CustomerData) {
      alert("CustomerDetails Not Available");
      return;
    }
    if (!paymentDetails.Payment) {
      alert("PaymentDetails Not Available");
      return;
    }

 const latest_date =this.datePipe.transform(this.changeDateForm.value.EndDate, 'dd-MM-yyyy');
    const requiredParamsForChangeDateObj: onDateChangeParams = {
      EndDate: latest_date,
      CustRecID: paymentDetails.CustomerData.CustRecID,
      PaymentID: paymentDetails.Payment.AnvayaaPaymentID
    };
    this.userservice.reGenerateBill(requiredParamsForChangeDateObj).subscribe((response) => {
      if (response.code == "S001") {
        this.spinner.hide();

        this.closebutton.nativeElement.click();
        alert(response.data)
        this.route.navigate(["Dashboard/Task/MyTask"])
      } else {
        alert(response.data);
        this.spinner.hide();
      }
    }, (err) => {
      alert(err.error.data);
      this.spinner.hide();
    })
  }




  onBillAmountAdjustment(paymentDetails: any) {
    this.spinner.show();
    // if(!paymentDetails.CustomerData){
    //   alert("CustomerDetails Not Available");
    //   return;
    // }
    // if(!paymentDetails.Payment){
    //   alert("PaymentDetails Not Available");
    //   return;
    // }
    const Amount = this.AdjustBillFrom.value.Amount
    const requiredParamsForChangeDateObj = {
      Amount: Amount,
      PaymentID: paymentDetails.Payment.AnvayaaPaymentID
    };
    this.userservice.AdjustDate(requiredParamsForChangeDateObj).subscribe((response) => {
      if (response.code == "S001") {
        this.spinner.hide();

        this.closebutton.nativeElement.click();
        alert(response.data)
        this.route.navigate(["Dashboard/Task/MyTask"])
      } else {
        alert(response.data);
        this.spinner.hide();
      }
    }, (err) => {
      alert(err.error.data);
      this.spinner.hide();
    })
  }


  uploadBill(event: any) {

    if (event.target.files.length > 0) {
      this.UploadedBill = event.target.files[0]

    }
  }

  uploadVenderBill(type: any) {

    const upload = new FormData()
    upload.append("Bill", this.UploadedBill);
    upload.append("PaymentID", this.requestDetailsObj.RequestDetails.JobPaymentDetails.Payment.AnvayaaPaymentID);
    upload.append("Type", type);
    upload.append("Amount", this.UploadBills.value.Amount);



    this.userservice.uploadVendorBill(upload).subscribe((Response) => {
      if (Response.code == "S001") {

        alert(Response.data)
        this.viewRequestDetails()

        this.spinner.hide()
      } else {
        alert(Response.data)
        this.spinner.hide()
      }
    }, (error) => {
      alert(error.error.data)
      this.spinner.hide()
    })

  }

  viewFile() {
    return window.location.href = this.uploadedbillUrl
  }
  get DaysArray() {
    return this.updateRequestDetails.get('Days') as UntypedFormArray
  }

  taskesTab() {

    this.tasksButton = true
    this.jobsAndBillsTabButton = false
    this.requestDetailsTabButton = false
    this.customerDetailsTabButtons = false
    this.ActivitesButton = false

    this.tasksTab = true
    this.jobsAndBillsTab = false
    this.requestDetailsTab = false
    this.customerDetailsTab = false
    this.Activites = false
  }


  recipetbox(event: any) {
    if (event.target.value != "PMS") {
      this.reciptenumber = true
    } else {
      this.reciptenumber = false
    }
  }

  login(form: any) {

    var bill = {
      "PaymentID": this.requestDetailsObj.RequestDetails.PaymentDetails.Payment.AnvayaaPaymentID,
      "PaymentMode": this.paymentType,
      "ReceiptNumber": this.ReceiptNumber,
      "CustRecID": this.requestDetailsObj.RequestDetails.CustRecID,

    }

    this.spinner.show();
    this.userservice.submitBills(bill).subscribe((billdata) => {


      if (billdata.code == "S001") {

        alert(billdata.data)
        this.route.navigate(["Dashboard/Task/MyTask"])
      } else {
        this.spinner.hide();
        alert(billdata.message)
      }
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })


  }


  VendorPricevalue(event: any) {
    this.vendorValue = event.target.value

  }


  CalculateComissionAmount(event: any) {

    // if (this.profileForm.value.ReferralType == "Amount" && this.profileForm.value.AnvayaaPrice && this.profileForm.value.AnvayaaPrice > this.profileForm.value.VendorPrice) {
    //   this.profileForm.value.AnvayaaReferralFee = this.profileForm.value.AnvayaaPrice - this.profileForm.value.VendorPrice;
    //   this.profileForm.patchValue({ "AnvayaaReferralFee": this.profileForm.value.AnvayaaReferralFee })
    // } else {
    //   this.profileForm.patchValue({ "AnvayaaReferralFee": 0 })
    // }
  }

  SelectSubSubCategory(data: any) {
    //console.log(data.target.value)


    for (let su in this.SubSubCategoryData) {
      if (this.SubSubCategoryData[su].CategoryID == data.target.value) {
        this.updateRequestDetails.patchValue({ "SubSubCategoryName": this.SubSubCategoryData[su].AliasName })
      }
    }
  }

  jobsTab() {

    this.tasksButton = false
    this.jobsAndBillsTabButton = true
    this.requestDetailsTabButton = false
    this.customerDetailsTabButtons = false
    this.ActivitesButton = false

    this.tasksTab = false
    this.jobsAndBillsTab = true
    this.requestDetailsTab = false
    this.customerDetailsTab = false
    this.Activites = false
  }
  requestDetailTab() {
    this.tasksButton = false
    this.jobsAndBillsTabButton = false
    this.requestDetailsTabButton = true


    this.customerDetailsTabButtons = false
    this.ActivitesButton = false
    this.tasksTab = false
    this.jobsAndBillsTab = false

    this.requestDetailsTab = true

    this.customerDetailsTab = false
    this.Activites = false

  }

  customerDetailTab() {

    this.tasksButton = false
    this.jobsAndBillsTabButton = false
    this.requestDetailsTabButton = false
    this.customerDetailsTabButtons = true
    this.ActivitesButton = false

    this.tasksTab = false
    this.jobsAndBillsTab = false
    this.requestDetailsTab = false
    this.customerDetailsTab = true
    this.Activites = false
  }

  ActiviteTab() {

    this.tasksButton = false
    this.jobsAndBillsTabButton = false
    this.requestDetailsTabButton = false
    this.customerDetailsTabButtons = false
    this.ActivitesButton = true

    this.tasksTab = false
    this.jobsAndBillsTab = false
    this.requestDetailsTab = false
    this.customerDetailsTab = false
    this.Activites = true
  }

  myTasks() {
    this.route.navigate(["Dashboard/Task/MyTask"])
  }


  viewRequestDetails() {
    this.spinner.show()

    this.userservice.viewRequestData(this.RequestID, this.CustRecID).subscribe((Response) => {

      if (Response.code == "S001") {
        this.spinner.hide()
        this.requestDetailsObj = Response.data;
        if (this.requestDetailsObj.RequestDetails && this.requestDetailsObj.RequestDetails.Owner == "SE") {
          this.getSubSubCategory(this.requestDetailsObj.RequestDetails)
        }
        if((this.requestDetailsObj.Request_Task).includes('DiscountPrice') && this.requestDetailsObj?.RequestDetails?.PartnerProfiles && this.requestDetailsObj?.RequestDetails?.PartnerProfiles.length > 0){
          this.discountAmountsListArr=this.requestDetailsObj?.RequestDetails?.PartnerProfiles.filter((obj:any)=>{return obj.DiscountedPrice > 0})
        };
        if(this.discountAmountsListArr.length > 0){
          this.discountAmountsListArr=this.discountAmountsListArr.map((profileObj:any)=>{
            const matchingProfile=this.requestDetailsObj?.RequestDetails?.VendorProfile.find((vendorProfileObj: { ProfileID: any; })=>vendorProfileObj.ProfileID===profileObj.ProfileID)
            if(matchingProfile){
              return {...profileObj,
                Name:matchingProfile.Name,
                'partnerData':matchingProfile.VendorData}
            }
          })
        }
        console.log(this.discountAmountsListArr,"final")
        this.getVendorsData()

        // this.uploadedbillUrl = Response.data.RequestDetails.JobPaymentDetails?.PaymentForDetails.HomeHelathServices.ReconsillationData.VendorBills.VendorBill
        // for(let i in Response.data.RequestDetails.JobPaymentDetails.PaymentForDetails.HomeHelathServices.ReconsillationData.VendorBills){

        if (Response.data.RequestDetails.JobPaymentDetails && Response.data.RequestDetails.JobPaymentDetails.PaymentForDetails.HomeHelathServices.ReconsillationData && Response.data.RequestDetails.JobPaymentDetails.PaymentForDetails.HomeHelathServices.ReconsillationData.VendorBills && Response.data.RequestDetails.JobPaymentDetails.PaymentForDetails.HomeHelathServices.ReconsillationData.VendorBills.VendorBill) {
          this.uploadedbillUrl = Response.data.RequestDetails.JobPaymentDetails.PaymentForDetails.HomeHelathServices.ReconsillationData.VendorBills.VendorBill
          //}

          // this.profileForm.patchValue({ "AnvayaaReferralFee": this.profileForm.value.AnvayaaReferralFee })



        }

        if (Response.data.RequestDetails.JobPaymentDetails && Response.data.RequestDetails.JobPaymentDetails.PaymentForDetails.HomeHelathServices.ReconsillationData && Response.data.RequestDetails.JobPaymentDetails.PaymentForDetails.HomeHelathServices.ReconsillationData.NetPayableVendorCharges) {
          this.UploadBills.patchValue({ "Amount": Response.data.RequestDetails.JobPaymentDetails.PaymentForDetails.HomeHelathServices.ReconsillationData.NetPayableVendorCharges })
        }


        this.requestObjData = this.requestDetailsObj.RequestDetails.ActiveVendors.slice(-1)


        if (this.requestDetailsObj.RequestDetails.ActiveVendors.length > 0) {

          this.informVendorNewJob.patchValue({ jobStartDate: this.DatePipe.transform((this.requestObjData[0].StartDate) * 1000, 'YYYY-MM-ddThh:mm') })
          this.vendorUpdate.patchValue({ "Price": this.requestObjData[0].AnvayaaPrice })
          this.vendorUpdate.patchValue({ "PriceFor": this.requestObjData[0].PriceFor })

        }
        if (this.requestDetailsObj.Request_Task.length < 1) {
          this.route.navigate(['/Dashboard/Task/MyTask'])
        }


        this.vendorProfileData = this.requestDetailsObj.RequestDetails.VendorProfile
        this.profileView = this.requestDetailsObj.RequestDetails.VendorProfile.filter((obj: any) => {

          return obj.Status == "Approved"
          //(obj.Status)

        })
        if (this.requestDetailsObj.RequestDetails.EmployeeID == undefined || this.requestDetailsObj.RequestDetails.EmployeeID == null || this.requestDetailsObj.RequestDetails.EmployeeID.length == 0) {
          this.GetEmployee(this.requestDetailsObj.RequestDetails.Owner, this.requestDetailsObj.RequestDetails.ServiceAreaID)
        }
        if (this.requestDetailsObj.RequestDetails.IsProfile == "No") {
          this.isVendorProfiles = true;
        } else {
          if (this.requestDetailsObj.RequestDetails.PartnerProfiles.length > 0) {
            this.isVendorProfiles = true;
          }
          else {
            this.isVendorProfiles = false;
          }

        }
        for (let i = 0; i < this.requestDetailsObj.CustomerDetails.Beneficiaries.length; i++) {
          if (this.requestDetailsObj.CustomerDetails.Beneficiaries[i].CustID == this.requestDetailsObj.RequestDetails.CustID) {

            this.BeneficiaryName = this.requestDetailsObj.CustomerDetails.Beneficiaries[i].Name
            this.BeneficiaryMobileNumber = this.requestDetailsObj.CustomerDetails.Beneficiaries[i].MobileNumber
            this.updateRequestDetails.patchValue({ "CustID": this.requestDetailsObj.CustomerDetails.Beneficiaries[i].CustID })
          }
        }
        if (Response.data) {
          this.updateRequestDetails.patchValue({ "ServiceRequestType": this.requestDetailsObj.RequestDetails.ServiceRequestType })
          this.updateRequestDetails.get('OnCallDetails')?.patchValue({ "ServiceType": this.requestDetailsObj.RequestDetails.ServiceType })

          this.updateRequestDetails.patchValue({ RequestedDate: this.DatePipe.transform((this.requestDetailsObj.RequestDetails.RequestedDate) * 1000, 'YYYY-MM-ddThh:mm') })

          if (this.requestDetailsObj.RequestDetails.ActiveVendors.length > 0) {
            this.CompleteTheJob.patchValue({ RequestedDate: this.DatePipe.transform((this.requestDetailsObj.RequestDetails.ActiveVendors.slice(-1)[0].StartDate) * 1000, 'YYYY-MM-ddThh:mm') })
            this.CompleteTheJob.patchValue({ EndDate: this.DatePipe.transform((this.requestDetailsObj.RequestDetails.ActiveVendors.slice(-1)[0].EndDate) * 1000, 'YYYY-MM-dd') })
          }
          if (this.requestDetailsObj.RequestEndDate != undefined) {
            this.updateRequestDetails.patchValue({ RequestEndDate: this.DatePipe.transform((this.requestDetailsObj.RequestDetails.RequestEndDate) * 1000, 'YYYY-MM-dd') })
          }
          if (this.updateRequestDetails.value.ServiceType=='Onetime'){
            this.requestDetailsObj.RequestDetails.RequestEndDate = this.requestDetailsObj.RequestDetails.RequestedDate
            this.updateRequestDetails.patchValue({ RequestEndDate: this.DatePipe.transform((this.requestDetailsObj.RequestDetails.RequestedDate) * 1000, 'YYYY-MM-dd') })
        
          }


          this.requestDetailsObj.RequestDetails.ServiceID = this.requestDetailsObj.RequestDetails.SubCategoryID;

          this.updateRequestDetails.patchValue({ ServiceID: this.requestDetailsObj.RequestDetails.SubCategoryID })
          this.updateRequestDetails.patchValue({ SubCategoryID: this.requestDetailsObj.RequestDetails.SubCategoryID })
          this.updateRequestDetails.patchValue({ PaymentMode: this.requestDetailsObj.RequestDetails.PaymentMode })
          this.updateRequestDetails.patchValue({ PaymentTo: this.requestDetailsObj.RequestDetails.PaymentTo })
          if (this.requestDetailsObj.RequestDetails.CareTaker) {
            this.updateRequestDetails.get('CareTaker')?.patchValue({ Note: this.requestDetailsObj.RequestDetails.CareTaker.Note })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ Gender: this.requestDetailsObj.RequestDetails.CareTaker.Gender })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ Languages: this.requestDetailsObj.RequestDetails.CareTaker.Languages })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ PlacementTime: this.requestDetailsObj.RequestDetails.CareTaker.PlacementTime })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ Religion: this.requestDetailsObj.RequestDetails.CareTaker.Religion })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ OrderType: this.requestDetailsObj.RequestDetails.CareTaker.OrderType })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ City: this.requestDetailsObj.RequestDetails.CareTaker.City })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ MobileNumber: this.requestDetailsObj.RequestDetails.CareTaker.MobileNumber })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ AlternateMobileNumber: this.requestDetailsObj.RequestDetails.CareTaker.AlternateMobileNumber })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ Area: this.requestDetailsObj.RequestDetails.CareTaker.Area })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ Age: this.requestDetailsObj.RequestDetails.CareTaker.Age })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ Mobility: this.requestDetailsObj.RequestDetails.CareTaker.Mobility })


            this.updateRequestDetails.get('CareTaker')?.patchValue({ WeightOfThePatient: this.requestDetailsObj.RequestDetails.CareTaker.WeightOfThePatient })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ WashroomUsage: this.requestDetailsObj.RequestDetails.CareTaker.WashroomUsage })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ FoodIntake: this.requestDetailsObj.RequestDetails.CareTaker.FoodIntake })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ Medication: this.requestDetailsObj.RequestDetails.CareTaker.Medication })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ ExerciseActivity: this.requestDetailsObj.RequestDetails.CareTaker.ExerciseActivity })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ MedicalEquipmentAssistance: this.requestDetailsObj.RequestDetails.CareTaker.MedicalEquipmentAssistance })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ ServiceRequired: this.requestDetailsObj.RequestDetails.CareTaker.ServiceRequired })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ PricingQuoted: this.requestDetailsObj.RequestDetails.CareTaker.PricingQuoted })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ PriceInformed: this.requestDetailsObj.RequestDetails.CareTaker.PriceInformed })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ DutyHours: this.requestDetailsObj.RequestDetails.CareTaker.DutyHours })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ ServiceDurationRequested: this.requestDetailsObj.RequestDetails.CareTaker.ServiceDurationRequested })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ Insulin: this.requestDetailsObj.RequestDetails.CareTaker.Insulin })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ InsulinText: this.requestDetailsObj.RequestDetails.CareTaker.InsulinText })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ TypeOfInsulin: this.requestDetailsObj.RequestDetails.CareTaker.TypeOfInsulin })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ ExerciseText: this.requestDetailsObj.RequestDetails.CareTaker.ExerciseText })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ NoOfPeopleToCook: this.requestDetailsObj.RequestDetails.CareTaker.NoOfPeopleToCook })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ ResidenceType: this.requestDetailsObj.RequestDetails.CareTaker.ResidenceType })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ SpecifyMaidWork: this.requestDetailsObj.RequestDetails.CareTaker.SpecifyMaidWork })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ CookingType: this.requestDetailsObj.RequestDetails.CareTaker.CookingType })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ EquipmentText: this.requestDetailsObj.RequestDetails.CareTaker.EquipmentText })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ TypeOfEquipment: this.requestDetailsObj.RequestDetails.CareTaker.TypeOfEquipment })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ MedicalProcedure: this.requestDetailsObj.RequestDetails.CareTaker.MedicalProcedure })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ TypeOfPathology: this.requestDetailsObj.RequestDetails.CareTaker.TypeOfPathology })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ TypeOfRadiology: this.requestDetailsObj.RequestDetails.CareTaker.TypeOfRadiology })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ ServicableDay: this.requestDetailsObj.RequestDetails.CareTaker.ServicableDay })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ TypeOfMedicalProcedure: this.requestDetailsObj.RequestDetails.CareTaker.TypeOfMedicalProcedure })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ MedicalProcedureText: this.requestDetailsObj.RequestDetails.CareTaker.MedicalProcedureText })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ MedicationText: this.requestDetailsObj.RequestDetails.CareTaker.MedicationText })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ NurseType: this.requestDetailsObj.RequestDetails.CareTaker.NurseType })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ DoYouWantMaid: this.requestDetailsObj.RequestDetails.CareTaker.DoYouWantMaid })
            this.updateRequestDetails.get('CareTaker')?.patchValue({ DoYouWantCook: this.requestDetailsObj.RequestDetails.CareTaker.DoYouWantCook })
            this.updateRequestDetails.patchValue({ CareTakerType: this.requestDetailsObj.RequestDetails.CareTaker.CareTakerType })

          }
          if (this.requestDetailsObj.RequestDetails.OnCallDetails) {
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ Note: this.requestDetailsObj.RequestDetails.OnCallDetails.Note })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ Gender: this.requestDetailsObj.RequestDetails.OnCallDetails.Gender })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ Languages: this.requestDetailsObj.RequestDetails.OnCallDetails.Languages })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ PlacementTime: this.requestDetailsObj.RequestDetails.OnCallDetails.PlacementTime })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ Religion: this.requestDetailsObj.RequestDetails.OnCallDetails.Religion })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ OrderType: this.requestDetailsObj.RequestDetails.OnCallDetails.OrderType })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ City: this.requestDetailsObj.RequestDetails.OnCallDetails.City })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ MobileNumber: this.requestDetailsObj.RequestDetails.OnCallDetails.MobileNumber })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ AlternateMobileNumber: this.requestDetailsObj.RequestDetails.OnCallDetails.AlternateMobileNumber })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ Area: this.requestDetailsObj.RequestDetails.OnCallDetails.Area })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ Age: this.requestDetailsObj.RequestDetails.OnCallDetails.Age })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ Mobility: this.requestDetailsObj.RequestDetails.OnCallDetails.Mobility })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ WeightOfThePatient: this.requestDetailsObj.RequestDetails.OnCallDetails.WeightOfThePatient })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ WashroomUsage: this.requestDetailsObj.RequestDetails.OnCallDetails.WashroomUsage })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ FoodIntake: this.requestDetailsObj.RequestDetails.OnCallDetails.FoodIntake })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ Medication: this.requestDetailsObj.RequestDetails.OnCallDetails.Medication })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ ExerciseActivity: this.requestDetailsObj.RequestDetails.OnCallDetails.ExerciseActivity })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ MedicalEquipmentAssistance: this.requestDetailsObj.RequestDetails.OnCallDetails.MedicalEquipmentAssistance })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ ServiceRequired: this.requestDetailsObj.RequestDetails.OnCallDetails.ServiceRequired })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ PricingQuoted: this.requestDetailsObj.RequestDetails.OnCallDetails.PricingQuoted })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ PriceInformed: this.requestDetailsObj.RequestDetails.OnCallDetails.PriceInformed })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ DutyHours: this.requestDetailsObj.RequestDetails.OnCallDetails.DutyHours })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ ServiceDurationRequested: this.requestDetailsObj.RequestDetails.OnCallDetails.ServiceDurationRequested })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ Insulin: this.requestDetailsObj.RequestDetails.OnCallDetails.Insulin })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ InsulinText: this.requestDetailsObj.RequestDetails.OnCallDetails.InsulinText })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ TypeOfInsulin: this.requestDetailsObj.RequestDetails.OnCallDetails.TypeOfInsulin })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ ExerciseText: this.requestDetailsObj.RequestDetails.OnCallDetails.ExerciseText })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ NoOfPeopleToCook: this.requestDetailsObj.RequestDetails.OnCallDetails.NoOfPeopleToCook })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ ResidenceType: this.requestDetailsObj.RequestDetails.OnCallDetails.ResidenceType })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ SpecifyMaidWork: this.requestDetailsObj.RequestDetails.OnCallDetails.SpecifyMaidWork })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ CookingType: this.requestDetailsObj.RequestDetails.OnCallDetails.CookingType })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ EquipmentText: this.requestDetailsObj.RequestDetails.OnCallDetails.EquipmentText })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ TypeOfEquipment: this.requestDetailsObj.RequestDetails.OnCallDetails.TypeOfEquipment })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ MedicalProcedure: this.requestDetailsObj.RequestDetails.OnCallDetails.MedicalProcedure })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ TypeOfPathology: this.requestDetailsObj.RequestDetails.OnCallDetails.TypeOfPathology })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ TypeOfRadiology: this.requestDetailsObj.RequestDetails.OnCallDetails.TypeOfRadiology })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ ServicableDay: this.requestDetailsObj.RequestDetails.OnCallDetails.ServicableDay })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ TypeOfMedicalProcedure: this.requestDetailsObj.RequestDetails.OnCallDetails.TypeOfMedicalProcedure })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ MedicalProcedureText: this.requestDetailsObj.RequestDetails.OnCallDetails.MedicalProcedureText })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ MedicationText: this.requestDetailsObj.RequestDetails.OnCallDetails.MedicationText })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ NurseType: this.requestDetailsObj.RequestDetails.OnCallDetails.NurseType })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ DoYouWantMaid: this.requestDetailsObj.RequestDetails.OnCallDetails.DoYouWantMaid })
            this.updateRequestDetails.get('OnCallDetails')?.patchValue({ DoYouWantCook: this.requestDetailsObj.RequestDetails.OnCallDetails.DoYouWantCook })
            this.updateRequestDetails.patchValue({ CareTakerType: this.requestDetailsObj.RequestDetails.OnCallDetails.CareTakerType })

          }
          if (this.requestDetailsObj.RequestDetails.DiagnosticService) {
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ Note: this.requestDetailsObj.RequestDetails.DiagnosticService.Note })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ Gender: this.requestDetailsObj.RequestDetails.DiagnosticService.Gender })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ Languages: this.requestDetailsObj.RequestDetails.DiagnosticService.Languages })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ PlacementTime: this.requestDetailsObj.RequestDetails.DiagnosticService.PlacementTime })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ Religion: this.requestDetailsObj.RequestDetails.DiagnosticService.Religion })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ OrderType: this.requestDetailsObj.RequestDetails.DiagnosticService.OrderType })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ City: this.requestDetailsObj.RequestDetails.DiagnosticService.City })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ MobileNumber: this.requestDetailsObj.RequestDetails.DiagnosticService.MobileNumber })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ AlternateMobileNumber: this.requestDetailsObj.RequestDetails.DiagnosticService.AlternateMobileNumber })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ Area: this.requestDetailsObj.RequestDetails.DiagnosticService.Area })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ Age: this.requestDetailsObj.RequestDetails.DiagnosticService.Age })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ Mobility: this.requestDetailsObj.RequestDetails.DiagnosticService.Mobility })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ WeightOfThePatient: this.requestDetailsObj.RequestDetails.DiagnosticService.WeightOfThePatient })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ WashroomUsage: this.requestDetailsObj.RequestDetails.DiagnosticService.WashroomUsage })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ FoodIntake: this.requestDetailsObj.RequestDetails.DiagnosticService.FoodIntake })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ Medication: this.requestDetailsObj.RequestDetails.DiagnosticService.Medication })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ ExerciseActivity: this.requestDetailsObj.RequestDetails.DiagnosticService.ExerciseActivity })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ MedicalEquipmentAssistance: this.requestDetailsObj.RequestDetails.DiagnosticService.MedicalEquipmentAssistance })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ ServiceRequired: this.requestDetailsObj.RequestDetails.DiagnosticService.ServiceRequired })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ PricingQuoted: this.requestDetailsObj.RequestDetails.DiagnosticService.PricingQuoted })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ PriceInformed: this.requestDetailsObj.RequestDetails.DiagnosticService.PriceInformed })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ DutyHours: this.requestDetailsObj.RequestDetails.DiagnosticService.DutyHours })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ ServiceDurationRequested: this.requestDetailsObj.RequestDetails.DiagnosticService.ServiceDurationRequested })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ Insulin: this.requestDetailsObj.RequestDetails.DiagnosticService.Insulin })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ InsulinText: this.requestDetailsObj.RequestDetails.DiagnosticService.InsulinText })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ TypeOfInsulin: this.requestDetailsObj.RequestDetails.DiagnosticService.TypeOfInsulin })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ ExerciseText: this.requestDetailsObj.RequestDetails.DiagnosticService.ExerciseText })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ NoOfPeopleToCook: this.requestDetailsObj.RequestDetails.DiagnosticService.NoOfPeopleToCook })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ ResidenceType: this.requestDetailsObj.RequestDetails.DiagnosticService.ResidenceType })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ SpecifyMaidWork: this.requestDetailsObj.RequestDetails.DiagnosticService.SpecifyMaidWork })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ CookingType: this.requestDetailsObj.RequestDetails.DiagnosticService.CookingType })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ EquipmentText: this.requestDetailsObj.RequestDetails.DiagnosticService.EquipmentText })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ TypeOfEquipment: this.requestDetailsObj.RequestDetails.DiagnosticService.TypeOfEquipment })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ MedicalProcedure: this.requestDetailsObj.RequestDetails.DiagnosticService.MedicalProcedure })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ TypeOfPathology: this.requestDetailsObj.RequestDetails.DiagnosticService.TypeOfPathology })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ TypeOfRadiology: this.requestDetailsObj.RequestDetails.DiagnosticService.TypeOfRadiology })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ ServicableDay: this.requestDetailsObj.RequestDetails.DiagnosticService.ServicableDay })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ TypeOfMedicalProcedure: this.requestDetailsObj.RequestDetails.DiagnosticService.TypeOfMedicalProcedure })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ MedicalProcedureText: this.requestDetailsObj.RequestDetails.DiagnosticService.MedicalProcedureText })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ MedicationText: this.requestDetailsObj.RequestDetails.DiagnosticService.MedicationText })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ NurseType: this.requestDetailsObj.RequestDetails.DiagnosticService.NurseType })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ DoYouWantMaid: this.requestDetailsObj.RequestDetails.DiagnosticService.DoYouWantMaid })
            this.updateRequestDetails.get('DiagnosticService')?.patchValue({ DoYouWantCook: this.requestDetailsObj.RequestDetails.DiagnosticService.DoYouWantCook })
            this.updateRequestDetails.patchValue({ CareTakerType: this.requestDetailsObj.RequestDetails.DiagnosticService.CareTakerType })

          }

        }

        this.ActiveVendor = this.requestDetailsObj.RequestDetails.ActiveVendors.filter((Obj: any) => {
          return Obj.Status != "Canceled"
        })
        this.ActiveVendorObj = this.ActiveVendor[0]
        //("vendorr", this.ActiveVendorObj)
      } else {
        alert(Response.message)
        this.spinner.hide()
      }

    }, (error) => {
      alert(error.error.message)
      this.spinner.hide()
    })

  }
  formData(days: any) {

    this.defualtDay = days;
    return this.Days.map((x: any) => days.indexOf(x) > -1)
  }
  GetEmployee(Owner: any, ServiceAreaID: any) {
    this.EmpParmas = {}
    if (Owner == "SE") {
      this.EmpParmas.Type = "CUSTOMERCAREEMPLOYEE";
    } else if (Owner == "CM") {
      this.EmpParmas.Type = "FieldEmployee";

    }
    this.EmpParmas.ServiceAreaID = ServiceAreaID;
    this.Executives = []
    this.userservice.GetEmployees(this.EmpParmas).subscribe((Response) => {
      this.spinner.show()
      if (Response.code == "S001") {
        //(Response.data)
        this.spinner.hide()
        this.Executives = Response.data


      } else {
        alert(Response.message)
        this.spinner.hide()
      }

    }, (error) => {
      alert(error.error.message)
      this.spinner.hide()
    })
  }
  customerDetails() {
    this.userservice.customerConfigurationDetails(this.CustRecID).subscribe((Response) => {
      if (Response.code = "S001") {
        this.customerData = Response.data

        if (this.customerData.Beneficiaries != null) {
          for (let i = 0; i < this.customerData.Beneficiaries.length; i++) {
            if (this.customerData.Beneficiaries[i].CustID == this.requestDetailsObj.CustID) {

              this.BeneficiaryName = this.customerData.Beneficiaries[i].Name
              this.BeneficiaryMobileNumber = this.customerData.Beneficiaries[i].MobileNumber

              //("1!!!!1", this.BeneficiaryName, this.BeneficiaryMobileNumber)
              this.updateRequestDetails.patchValue({ "CustID": this.customerData.Beneficiaries[i].CustID })
            }
          }
        }
      } else {
        alert(Response.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }
  DaysSelect(days: any) {
    let day = days.target.value
    if (days.target.checked === true) {

      this.daysData.push(day);

    }
    if (days.target.checked === false)
      for (var i = this.daysData.length - 1; i >= -1; i--) {
        if (this.daysData[i] === day) {
          this.daysData.splice(i, 1);
        }
      }
    // //(this.daysData)
  }

  getSubSubCategory(data: any) {
    this.selectedCategoryName = data.SubCategoryName;

    this.userservice.viewServiceDetails(data.CustRecID, data.SubCategoryID, data.ServiceAreaID).subscribe((Response) => {
      if (Response.code == "S001") {
        this.SubSubCategoryData = Response.data.SubSubCategory;
        // this.selectedCategoryName = Response.data.SubCategoryName;

      } else {
        this.SubSubCategoryData = []
        alert(Response.message)
      }

    }, (error) => {
      this.SubSubCategoryData = []
      alert(error.error.message)
    })
  }
  // 
  updateRequestDetailsData() {
    this.UpdateRequestBtn = true
    // if (this.updateRequestDetails.status == 'INVALID') {
    //   return
    // }
    //     console.log("verify",this.updateRequestDetails.value.OnCallDetails)
    // return
    let StartDate = this.updateRequestDetails.value.RequestedDate
    if (!moment(this.updateRequestDetails.value.RequestedDate, "DD-MM-YYYY", true).isValid()) {
      this.ReqDate = this.DatePipe.transform(this.updateRequestDetails.value.RequestedDate, 'dd-MM-YYYY')
    }
    if (!moment(this.updateRequestDetails.value.RequestedDate, "DD-MM-YYYY", true).isValid()) {
      this.ReqEndDate = this.DatePipe.transform(this.updateRequestDetails.value.RequestEndDate, 'dd-MM-YYYY')
    }
    if (!moment(this.updateRequestDetails.value.PlacementTime, "DD-MM-YYYY HH:mm", true).isValid()) {
      this.Placetime = this.DatePipe.transform(this.updateRequestDetails.value.PlacementTime, 'dd-MM-YYYY hh:mm')
    }
    this.updateRequestDetails.value.RequestID = this.RequestID
    this.updateRequestDetails.value.CustRecID = this.CustRecID
    this.updateRequestDetails.value.RequestedDate = this.ReqDate
    this.updateRequestDetails.value.RequestEndDate = this.ReqEndDate
    this.updateRequestDetails.value.PlacementTime = this.Placetime
    this.updateRequestDetails.value.Days = this.daysData
    this.updateRequestDetails.value.CustID = this.CustID
    this.updateRequestDetails.value.PaymentType = 'Offline'



    this.userservice.updateRequestDetails(this.updateRequestDetails.value).subscribe((Response) => {
      if (Response.code == "S001") {

        alert(Response.message)
        this.route.navigate(['/Dashboard/Task/MyTask'])
      } else {
        alert(Response.message)
      }

    }, (error) => {
      alert(error.error.message)
    })





  }
  paymentMode(type: any) {
    this.paymentmode = type.target.defaultValue
  }
  paymentTo(Payment: any) {
    this.PaymentTo = Payment.target.value
  }
  selectBeneficiaryID(CustID: any) {
    this.CustID = CustID.target.value
    //(this.CustID)
    //("CustID", this.CustID)
  }
  employeList() {
    this.userservice.employeList(this.EmployeeID).subscribe((cityResponce) => {
      this.AuthorizedteamList = cityResponce.data.MyTeamMembers
      //("employeeList",this.AuthorizedteamList)
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data);
    })
  }
  assignVendor(eventData: any) {
    this.spinner.show()
    this.PartnerExecutiveID = eventData.target.value
    this.userservice.assignVendor(this.RequestID, this.PartnerExecutiveID).subscribe((assignedVendorsData) => {

      if (assignedVendorsData.code == "S001") {
        this.spinner.hide()

        alert(assignedVendorsData.data)
        this.viewRequestDetails()
      }
      else {
        alert(assignedVendorsData.data)
      }


    }, function (error) {
      alert(error.error.data)
    })
  }
  InformVendorJob() {

    //(this.RequestID)

    this.userservice.InformVendor(this.RequestID).subscribe((Response) => {
      if (Response.code == "S001") {
        alert(Response.data)
        this.viewRequestDetails()
      } else {
        alert(Response.data)
      }
    }), (error: any) => {
      alert(error.error.data)
    }
  }

  rating(rating: any) {

    //("rating", rating.target.value)
  }

  vendorID(data: any) {
    this.minimumSellingPrice=0;
    this.VendorID = data.target.value
    this.vendorIDData = data.target.value
    this.discountPriceFlag=false;

    this.profileForm.patchValue({ TariffType:''})
    this.profileForm.patchValue({ MinimumPrice:null})
    this.profileForm.patchValue({ VendorID: this.VendorID })

    // this.SelectedvendorsDetails = this.partnerData.filter((obj: any) => {
    //   return obj.PartnerID == this.vendorIDData

    // })

   

   // this.SubSubServices=this.SelectedvendorsDetails[0].SubSubServices
    // profileForm.append("AnvayaaReferralFee", this.SelectedvendorsDetails[0].Services[0].AnvayaaCommission)



  }

  SubSubCategory(data: any) {
    // = data.target.value


    this.profileForm.patchValue({ ServiceID: data.target.value })

    this.GetPartnerPrice()



  }
  getVendorsData() {

    if(this.requestDetailsObj.RequestDetails.SubSubCategoryID ==undefined || this.requestDetailsObj.RequestDetails.SubSubCategoryID ==null || this.requestDetailsObj.RequestDetails.SubSubCategoryID.length==0){
      return
    }
    this.userservice.getVendors(this.requestDetailsObj.RequestDetails.SubSubCategoryID,this.requestDetailsObj.RequestDetails.ServiceAreaID, this.requestDetailsObj.RequestDetails.SubCategoryID, this.requestDetailsObj.RequestDetails.CategoryID).subscribe((VendorsList) => {
      if (VendorsList.code == "S001") {

        this.partnerData = VendorsList.data;
        // this.partnerData = VendorsList.data.filter((obj: any) => {

        //   if (obj.VendorDetails.Status == "Approved" || obj.VendorDetails.Status == "Dropped") {
        //     return obj
        //   }
        // })

      } else if (VendorsList.code == "S002") {
      } if (VendorsList.code == "ND01") {
       // this.route.navigate(['/Dashboard/Task/MyTask'])

      }
    }, (error) => {
      alert(error.error.data);
    })
  }
  profileActed(profileID: any, Status: any, ID: any,VendorData:any) {


    this.vendorIDData = ID
    this.userservice.profileActed(this.RequestID, profileID, Status, '').subscribe((Response) => {
      if (Response.code == "S001") {

        alert(Response.data)

        if (Status == 'Approved') {
          
          this.assignPartnerForRequest(VendorData)

          this.viewRequestDetails()

        }
        if (Status == 'Rejected') {
          window.location.reload()
        }

        // window.location.reload()

        // window.location.reload()


      } else {
        alert(Response.data)
        window.location.reload()
      }


    }, function (error: any) {
      alert(error.error.data)
    })
  }

  assignPartnerForRequest(VendorData:any) {

    console.log(VendorData)
    this.confirmVendorbtn = true
    if (this.confirmVendor.status == 'INVALID') {
      return;
    }

    if (this.AnvayaaPriceinput == false) {

      this.selctedvendorobj['RequestID'] = this.RequestID
      this.selctedvendorobj['VendorID'] = this.vendorIDData
      this.selctedvendorobj['AnvayaaPrice'] = this.confirmVendor.value.VendorPrice
      this.selctedvendorobj['VendorPrice'] = this.confirmVendor.value.VendorPrice
      this.selctedvendorobj['TariffType'] = VendorData.TariffType
      this.selctedvendorobj['ReferralType'] = VendorData.ReferralType
      this.selctedvendorobj['AnvayaaReferralFee'] = this.confirmVendor.value.AnvayaaReferralFee

    }

    if (this.AnvayaaPriceinput == true) {
      this.AnvayaaPrice = true
      this.selctedvendorobj['RequestID'] = this.RequestID
      this.selctedvendorobj['VendorID'] = this.vendorIDData
      this.selctedvendorobj['AnvayaaPrice'] = this.confirmVendor.value.AnvayaaPrice
      this.selctedvendorobj['VendorPrice'] = this.confirmVendor.value.VendorPrice
      this.selctedvendorobj['TariffType'] = VendorData.TariffType
      this.selctedvendorobj['ReferralType'] = VendorData.ReferralType
      this.selctedvendorobj['AnvayaaReferralFee'] = this.confirmVendor.value.AnvayaaReferralFee
    }


    //console.log(this.confirmVendor.value)
    this.spinner.show()
    this.userservice.assignVendorForRequest(this.selctedvendorobj).subscribe((requestData) => {

      if (requestData.code == "S001") {
        this.spinner.hide()
        alert(requestData.data)
        this.viewRequestDetails()

      } else {
        this.spinner.hide()
        alert(requestData.data)
      }
    }, (error) => {
      this.spinner.hide()
      alert(error.error.data)
    })


  }



  assignVendorForRequest() {

    
    this.confirmVendorbtn = true
    if (this.confirmVendor.status == 'INVALID') {
      return;
    }

    if (this.AnvayaaPriceinput == false) {

      this.selctedvendorobj['RequestID'] = this.RequestID
      this.selctedvendorobj['VendorID'] = this.vendorIDData
      this.selctedvendorobj['AnvayaaPrice'] = this.profileForm.value.VendorPrice
      this.selctedvendorobj['VendorPrice'] = this.profileForm.value.VendorPrice
      this.selctedvendorobj['TariffType'] = this.profileForm.value.TariffType
      this.selctedvendorobj['ReferralType'] = this.profileForm.value.ReferralType
      this.selctedvendorobj['AnvayaaReferralFee'] = this.profileForm.value.AnvayaaReferralFee
    //  this.profileForm
    }

    if (this.AnvayaaPriceinput == true) {
      this.AnvayaaPrice = true
      this.selctedvendorobj['RequestID'] = this.RequestID
      this.selctedvendorobj['VendorID'] = this.vendorIDData
      this.selctedvendorobj['AnvayaaPrice'] = this.profileForm.value.AnvayaaPrice
      this.selctedvendorobj['VendorPrice'] = this.profileForm.value.VendorPrice
      this.selctedvendorobj['TariffType'] = this.profileForm.value.TariffType
      this.selctedvendorobj['ReferralType'] = this.profileForm.value.ReferralType
      this.selctedvendorobj['AnvayaaReferralFee'] = this.profileForm.value.AnvayaaReferralFee

    }
    this.selctedvendorobj['AnvayaaPrice']=  this.selctedvendorobj['MinimumPrice'] = this.profileForm.value.MinimumPrice



    //console.log(this.confirmVendor.value)
    this.spinner.show()
    this.userservice.assignVendorForRequest(this.selctedvendorobj).subscribe((requestData) => {

      if (requestData.code == "S001") {
        this.spinner.hide()
        alert(requestData.data)
        this.viewRequestDetails()

      } else {
        this.spinner.hide()
        alert(requestData.data)
      }
    }, (error) => {
      this.spinner.hide()
      alert(error.error.data)
    })


  }
  showView(index: any) {
    //("!!!!",)
    this.doc = this.vendorProfileData[index].ProfileUrl
    //( "@@@@@@",this.profileView)
    //("docc",)
    window.open(this.doc, "_blank");
  }
  ViewBill(billdata: any) {
    var Pfbill = billdata.PaymentForDetails.HomeHelathServices.ProfromaInvoiceBill

    window.open(Pfbill, "_blank");

  }
  BillUpdatebyfinance(Type:any,PaymentData:any){
    
    var obj={
      Type:"",
      PaymentID:""
    }
    obj.Type = Type
    obj.PaymentID = PaymentData.Payment.AnvayaaPaymentID;

    this.spinner.show()
    this.userservice.UpdateBillRequest(obj).subscribe((Response) => {
      if (Response.code == "S001") {
        alert(Response.data)
        this.spinner.hide()
        location.reload()
      } else {
        alert(Response.data)
        this.spinner.hide()
      }
    }, (error) => {
      alert(error.error.data)
      this.spinner.hide()
    })

  }
  alertForJobs(data: any) {
    if (this.requestDetailsObj.RequestDetails.ActiveVendors[0].StartDate == null && this.vendorUpdate.value.Status == 'Job_Completed') {

      alert('please select job started status first');

      location.reload()
      return;
    }
    if (this.requestDetailsObj.RequestDetails.ActiveVendors[0].StartDate != null) {
      if (this.vendorUpdate.value.Status == 'Job_Cancelled' && this.requestDetailsObj.RequestDetails.ActiveVendors.AssignedVendor[0].EndDate == null) {
        alert('please update status to completed');
        // ($('#UpdateStatus') as any).modal('hide');

        location.reload()
        return;



      }
    }
  }
  endDate(endDate: any) {
    let da2 = new Date((this.requestDetailsObj.requestDetails.ActiveVendors[0].StartDate) * 1000);

    this.resultStartDate = this.datePipe.transform(da2, 'MM/dd/YYYY')


    this.resultEndDate = this.datePipe.transform(endDate.target.value, 'MM/dd/YYYY')
    const date1 = new Date(this.resultStartDate)
    const date2 = new Date(this.resultEndDate)
    let diff = date2.getTime() - date1.getTime()

    this.diffInDays = diff / (1000 * 3600 * 24)

    this.vendorUpdate.patchValue({ ActualDaysServed: this.diffInDays })
  }
  vendorStatusUpdate() {
    this.vendorStatusbtn = true
    //console.log(this.vendorUpdate.value.StartDate)
    if (this.vendorUpdate.value.StartDate == null || this.vendorUpdate.value.StartDate == undefined || this.vendorUpdate.value.StartDate.length == 0) {
      alert("Enter Start Date")
      return
    }
    if (this.vendorUpdate.value.Price == null || this.vendorUpdate.value.Price == undefined || this.vendorUpdate.value.Price.length == 0) {
      alert("Enter Amount")
      return
    }
    if (!moment(this.vendorUpdate.value.StartDate, "DD-MM-yyyy HH:mm", true).isValid()) {
      this.StartDate = this.DatePipe.transform(this.vendorUpdate.value.StartDate, 'dd-MM-yyyy HH:mm')
    }
    if (!moment(this.vendorUpdate.value.EndDate, "DD-MM-yyyy HH:mm", true).isValid()) {
      this.EndDate = this.DatePipe.transform(this.vendorUpdate.value.EndDate, 'dd-MM-yyyy HH:mm')
    }


    this.vendorUpdate.value.StartDate = this.StartDate;
    this.vendorUpdate.value.EndDate = this.EndDate;
    this.vendorUpdate.value.Status = "Scheduled";
    this.vendorUpdate.value.RequestID = this.RequestID;
    this.vendorUpdate.value.VendorID = this.requestDetailsObj.RequestDetails.ActiveVendors[0].VendorID;
    if (this.requestDetailsObj.RequestDetails.ActiveVendors[0].MinimumPrice && parseInt(this.vendorUpdate.value.Price) < this.requestDetailsObj.RequestDetails.ActiveVendors[0].MinimumPrice) {
      alert("Minimum Amount Should Be" + " " + this.requestDetailsObj.RequestDetails.ActiveVendors[0].MinimumPrice)
      return
    }


    if (this.vendorUpdate.value.Price) {
      var Maxvalue = (parseInt(this.requestDetailsObj.RequestDetails.ActiveVendors[0].MinimumPrice) * (1 + 1.000));

      var Maxvalueword = toWords.convert(parseInt(this.vendorUpdate.value.Price), { currency: true });
      if (parseInt(this.vendorUpdate.value.Price) > Maxvalue) {
        let text = "Do You want to continue with  Entered amount " + " " + Maxvalueword + " " + "(" + (parseInt(this.vendorUpdate.value.Price)) + ")" + " " + "which looks higher than expected?"

        if (confirm(text) == true) {
          text = "true";
        } else {
          text = "false";
          return
        }

      }
    }



    this.spinner.show()
    this.userservice.updateVendorStatus(this.vendorUpdate.value).subscribe((Response) => {
      if (Response.code == "S001") {
        alert(Response.data)
        this.spinner.hide()
        location.reload()
      } else {
        alert(Response.data)
        this.spinner.hide()
      }
    }, (error) => {
      alert(error.error.data)
      this.spinner.hide()
    })
  }

  SubmitToPartner() {
    //("------")
    this.spinner.show()
    this.userservice.submitProfiles(this.RequestID).subscribe((requestData) => {
      if (requestData.code == "S001") {
        this.spinner.hide()
        alert(requestData.data)

        this.viewRequestDetails();

        // this.router.navigate(['Dashboard/partner/partnersTask'])

      } else {
        this.spinner.hide()
        alert(requestData.data)
      }
    }, (error) => {
      this.spinner.hide()
      alert(error.error.data)
    })

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
  idInput(data: any) {
    this.inputLength = data.target.value.length
    this.inputValue = data.target.value

    if (this.inputLength == null) {
      this.pUrl = false
    }

    if (this.inputLength == "10" && (this.profileForm.value.IdType == "VoterID" || this.profileForm.value.IdType == "Licence")) {
      this.IdNumber = this.inputValue
      this.userservice.IdVerification(this.IdNumber,).subscribe((requestData) => {

        if (requestData.data.VendorDetails.Type == "Internal") {
          this.AnvayaaPriceinput = true
        }
        if (requestData.data.VendorDetails.Type == "External") {
          this.AnvayaaPriceinput = false
        }
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
      this.VendorID = ''
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


        if (idData.data.VendorDetails.Type == "Internal") {
          this.AnvayaaPriceinput = true

        }

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

  GetPartnerPrice() {
   

    this.TarrifCalculation.PartnerID=this.profileForm.value.VendorID
    this.TarrifCalculation.ServiceAreaID=this.requestDetailsObj.RequestDetails.ServiceAreaID
    this.TarrifCalculation.CategoryID=this.requestDetailsObj.RequestDetails.CategoryID
    this.TarrifCalculation.SubCategoryID=this.requestDetailsObj.RequestDetails.SubCategoryID
    this.TarrifCalculation.SubSubCategoryID=this.requestDetailsObj.RequestDetails.SubSubCategoryID;
    this.TarrifCalculation.TarrifType=this.profileForm.value.TariffType;
    if(this.profileForm.value.ReferralType =="Percentage"){
      this.TarrifCalculation.ReferralType="Referral_Percentage";
    }
    if (this.profileForm.value.ReferralType == "Amount") {
      this.TarrifCalculation.ReferralType = "Referral_Amount";
    }


    this.userservice.GetTarrifPriceforVendor(this.TarrifCalculation).subscribe((Response) => {
      if (Response.code == "S001") {
        this.TarrifData=Response.data
        this.discountPriceFlag=false;
        this.minimumSellingPrice=this.TarrifData.MinimumPrice;
        this.profileForm.patchValue({"VendorPrice":this.TarrifData.Tariff}) 
        if(this.TarrifData.ReferalType =="Referral_Percentage"){
          this.profileForm.patchValue({"AnvayaaReferralFee":this.TarrifData.ReferalFee}) 
          this.profileForm.patchValue({"MinimumPrice":this.TarrifData.MinimumPrice}) 
          this.profileForm.patchValue({"VendorPrice":this.TarrifData.VendorPrice}) 
          this.profileForm.patchValue({"ReferralType":this.TarrifData.ReferalType}) 
        }else{
          this.profileForm.patchValue({"AnvayaaReferralFee":0}) 
          this.profileForm.patchValue({"MinimumPrice":this.TarrifData.MinimumPrice}) 
          this.profileForm.patchValue({"VendorPrice":this.TarrifData.VendorPrice}) 
          this.profileForm.patchValue({"ReferralType":this.TarrifData.ReferalType}) 
        }
        // if(!this.TarrifData || this.TarrifData=== 0 ){
        //   this.hasData = false
        // }
        this.spinner.hide()
      } else {
        this.TarrifData = {}
        this.spinner.hide()
        // this.hasData = true
        alert(Response.data)
        this.route.navigate(['/Dashboard/Task/MyTask'])
      }
    }, (error) => {
      alert(error.error.data)
      this.spinner.hide()
    })


  }

  ReferralType(data: any) {
    this.profileForm.patchValue({ "TariffType": data.target.value })
    this.profileForm.patchValue({isItDiscountedPrice:'No'})
   
    this.GetPartnerPrice()

    if (data.target.value == "Percentage") {
      this.referalPercentage = true
      this.referalAmount = false

      this.profileForm.patchValue({ "AnvayaaReferralFee": this.SelectedvendorsDetails[0].Services[0].AnvayaaCommission })

    } else if (data.target.value == "Amount") {
      this.referalPercentage = false
      this.referalAmount = true
      this.profileForm.patchValue({ "AnvayaaReferralFee": "" })
    }



    // ReferralType
  }


  workingDays(event: any) {
    this.spinner.show()
    this.NoWorkingDays = event.target.value
    this.spinner.hide()

  }
  workingDaysbyPartner(event: any) {
    this.spinner.show()
    this.NoWorkingDays = event.target.value
    this.spinner.hide()

  }
  UpdateWorkingDays(data: any, type: any) {
    this.spinner.show()


    if (this.NoWorkingDays == null || this.NoWorkingDays == undefined) {
      this.NoWorkingDays = this.requestDetailsObj.ReconsillationDetials.PaymentForDetails.HomeHelathServices.ReconsillationData.ReconsillationFinalDays
    }
    var updateObj = {
      PaymentID: data.Payment.AnvayaaPaymentID,
      "Type": type,
      "Days": Number(this.NoWorkingDays)
    }
    this.userservice.reconcilation(updateObj).subscribe((Response) => {
      if (Response.code == "S001") {

        alert(Response.data)
        this.viewRequestDetails()

        this.spinner.hide()
      } else {
        alert(Response.data)
        this.spinner.hide()
      }
    }, (error) => {
      alert(error.error.data)
      this.spinner.hide()
    })
  }

  UpdateWorkingDaysByPartner(data: any, type: any) {
    this.spinner.show()


    if (this.NoWorkingDays == null || this.NoWorkingDays == undefined) {
      this.NoWorkingDays = this.requestDetailsObj.RequestDetails.JobPaymentDetails.PaymentForDetails.HomeHelathServices.ReconsillationData.ReconsillationFinalDays
    }
    var updateObj = {
      PaymentID: data.Payment.AnvayaaPaymentID,
      "Type": type,
      "Days": Number(this.NoWorkingDays)
    }
    this.userservice.reconcilation(updateObj).subscribe((Response) => {
      if (Response.code == "S001") {

        alert(Response.data)
        this.viewRequestDetails()

        this.spinner.hide()
      } else {
        alert(Response.data)
        this.spinner.hide()
      }
    }, (error) => {
      alert(error.error.data)
      this.spinner.hide()
    })
  }


  ApproveWorkingDays(data: any, type: any) {
    var approveObj = {
      PaymentID: data.Payment.AnvayaaPaymentID,
      "Type": type,
      "Days": Number(this.NoWorkingDays)
    }
    this.userservice.reconcilation(approveObj).subscribe((Response) => {
      if (Response.code == "S001") {
        this.spinner.hide()

        alert(Response.data)
        this.route.navigate(['Dashboard/Task/MyTask'])
        this.spinner.hide()
      } else {
        alert(Response.data)
        this.spinner.hide()
      }
    }, (error) => {
      alert(error.error.data)
      this.spinner.hide()
    })

  }
  ApproveWorkingDaysByPartner(data: any, type: any) {
    //console.log(data)
    var approveObj = {
      PaymentID: data.Payment.AnvayaaPaymentID,
      "Type": type,
      "Days": Number(this.NoWorkingDays)
    }
    this.userservice.reconcilation(approveObj).subscribe((Response) => {
      if (Response.code == "S001") {
        this.spinner.hide()

        alert(Response.data)
        this.route.navigate(['Dashboard/Task/MyTask'])
        this.spinner.hide()
      } else {
        alert(Response.data)
        this.spinner.hide()
      }
    }, (error) => {
      alert(error.error.data)
      this.spinner.hide()
    })

  }
  onuploadtaxFile(img: any) {
    if (img.target.files.length > 0) {
      this.ProfileDoc = img.target.files[0];
    }
  }
  existing() {
    return window.location.href = this.ExDoc

  }
  SubmitProfile() {
    this.submitted = true;
    if(this.discountPriceFlag && this.profileForm.value.DiscountedPrice > this.profileForm.value.MinimumPrice){
      return;

    }
    let profileData = new FormData()
    this.confirmVendorbtn = true

    this.fileUploader.nativeElement.value = null
    profileData.append("ProfileDoc", this.ProfileDoc);
    profileData.append("RequestID", this.RequestID)
    profileData.append("SubcategoryID", this.requestDetailsObj.RequestDetails.SubCategoryID)

    for(let key in this.profileForm.value){
      profileData.append(key, this.profileForm.value[key])

    }

    this.userservice.CreateVendorProfile(profileData).subscribe((requestData) => {
      if (requestData.code == "S001") {

        this.profileForm.reset({
          IdNumber: '',
          IdType: '',
          Name: '',
          VendorID: '',
          PrimaryMobileNo: '',
          ProfileDoc: '',
          MinimumPrice: 0,
          isItDiscountedPrice:'No',
          DiscountedPrice:0,
        })

        alert(requestData.data)
        this.viewRequestDetails()
        this.fileUploader.nativeElement.value = null
        this.profileForm.controls['IdType'].setErrors(null);
        this.profileForm.controls['IdNumber'].setErrors(null);
        this.profileForm.controls['Name'].setErrors(null);
        this.profileForm.controls['VendorID'].setErrors(null);
        this.profileForm.controls['PrimaryMobileNo'].setErrors(null);
        this.confirmVendorbtn = false
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
  fileView(index: any) {
    //(this.vendorProfileData)
    this.Doc = this.vendorProfileData[index].ProfileUrl
    return window.open(this.Doc, "_blank");
  }
  removeProfile(data: any) {
    this.ProfileID = data.ProfileID
    this.userservice.removeUplodedProfile(this.RequestID, this.ProfileID).subscribe((requestData) => { })
    window.location.reload();
  }

  ConfirmIfJobStart(Status: any) {
    this.RequestStatus = Status
    this.Answer = this.changeRequestDetails.value.Assigned_To_Partner
    this.Comment = this.changeRequestDetails.value.Comment

    if (!moment(this.changeRequestDetails.value.date, "DD-MM-yyyy HH:mm", true).isValid()) {
      this.ResheduleDate = this.DatePipe.transform(this.changeRequestDetails.value.date, 'dd-MM-yyyy hh:mm')
    }
    if (!moment(this.dropJob.value.EndDate, "DD-MM-yyyy", true).isValid()) {
      this.dropJobEndDate = this.DatePipe.transform(this.dropJob.value.EndDate, 'dd-MM-yyyy')
    }
    if (this.RequestStatus == 'Dropped') {
      this.Answer = this.dropJob.value.Assigned_To_Partner
      this.Comment = this.dropJob.value.Comment,
        this.EndDate = this.dropJobEndDate

      if (this.requestDetailsObj.RequestDetails.ActiveVendors.length > 0 && this.requestDetailsObj.RequestDetails.ActiveVendors.length != null) {

        this.jobStartDateDropJob = this.DatePipe.transform((this.requestDetailsObj.RequestDetails.ActiveVendors.slice(-1)[0].StartDate) * 1000, 'dd-MM-yyyy')

      }
    }
    let data = {
      "RequestID": this.RequestID,
      "StartDate": this.jobStartDateDropJob,
      "Status": this.RequestStatus,
      "Comments": this.Comment,
      "Assigned_To_Partner": "No",
      "EndDate": this.EndDate,

    }
   
    this.spinner.show()

    this.userservice.ConfirmIfJobStarted(data).subscribe((Response) => {
      if (Response.code == "S001") {
        alert(Response.data)
        this.spinner.hide()
        this.route.navigate(['Dashboard/Task/MyTask'])
      } else {
        alert(Response.data)
        this.spinner.hide()
      }
    }, (error) => {
      alert(error.error.data)
      this.spinner.hide()
    })
  }
  AssignSupport(EmployeeID: any) {
    let supportData = {
      "EmployeeID": EmployeeID.target.value,
      "RequestID": this.RequestID
    }
    //("EmployeeID", supportData)
    this.spinner.show()
    this.userservice.AssignSupportExecutive(supportData).subscribe((Response) => {

      if (Response.code == "S001") {
        this.spinner.hide()
        alert(Response.message)
        location.reload()
      } else {
        this.spinner.hide()
        alert(Response.message)
      }
    }, (error) => {
      this.spinner.hide()
      alert(error.error.message)
    })
  }

  ratings(rating: any) {
    this.ratingValue = rating.target.value


  }



  CheckOnCompletedJobs(status: any) {
    if (status == 'Completed') {
      this.complteJobEndDate = this.CompleteTheJob.value.EndDate
      this.JobStartDate = this.DatePipe.transform((this.requestDetailsObj.RequestDetails.ActiveVendors.slice(-1)[0].StartDate) * 1000, 'dd-MM-YYYY')
    }
    if (status == "InProgress") {
      this.complteJobEndDate = this.extendJob.value.EndDate
      this.JobStartDate = this.DatePipe.transform((this.requestDetailsObj.RequestDetails.ActiveVendors.slice(-1)[0].StartDate) * 1000, 'dd-MM-YYYY')


    }
    // if (!moment(this.complteJobEndDate, "DD-MM-YYYY ", true).isValid()) {
      this.EndDateJob = this.DatePipe.transform(this.extendJob.value.EndDate, 'dd-MM-yyyy')
    // }
   
    let CompletedJobObj = {
      "RequestID": this.RequestID,
      "Rating": this.ratingValue,
      "Comments": this.CompleteTheJob.value.Comments,
      "Status": status,
      "EndDate": this.EndDateJob,
      "StartDate": this.JobStartDate

    }

    this.spinner.show()
    this.userservice.CheckOnCompletedJobs(CompletedJobObj).subscribe((Response) => {
      if (Response.code == "S001") {
        alert(Response.data)
        this.spinner.hide()
        this.route.navigate(['/Dashboard/Task/MyTask'])
        location.reload()
      } else {
        alert(Response.data)
        this.spinner.hide()
      }
    }, (error) => {
      alert(error.error.data)
      this.spinner.hide()
    })
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
