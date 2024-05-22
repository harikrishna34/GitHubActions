import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/users.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { UntypedFormGroup, UntypedFormBuilder, AbstractControl, Validators, ValidatorFn, FormControl } from '@angular/forms';

import { response } from 'express';
@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css'],
})
export class ViewRequestComponent implements OnInit {
  @ViewChild('editDataModalClose') closebutton: any;
  @ViewChild('rejectModalClose') rejectCloseBtn: any;
  @ViewChild('ApproveModalClose') approveCloseBtn: any;

  items: any = [
    {
      title: 'Customer Details',
    },
    {
      title: 'Request Details',
    },
    {
      title: 'Payment Details',
    },
  ];
  paymentOptions: any = [
    {
      label: 'Link',
      url: '../../../assets/images/link.png',
    },
    {
      label: 'QR',
      url: '../../../assets/images/QRcode.png',
    },
    {
      label: 'PMS',
      url: '../../../assets/images/pms.png',
    },
    {
      label: 'Cash',
      url: '../../../assets/images/cash.png',
    },
  ];
  commonOptions: any = {
    Yes: 'Yes',
    No: 'No',
  };
  allCities: any;
  requestID: string = '';
  StartDate: string = '';
  EndDate: string = '';
  TarrifType: string = '';
  paymentId: string = '';
  task: string | null = '';
  requestDetails: any = {};
  commonOptionsArr: string[] = Object.values(this.commonOptions);
  public requestForm: UntypedFormGroup;
  public JobForm: UntypedFormGroup;
  public PayLaterForm: UntypedFormGroup;
  submitted: boolean = false;
  assigneCareManager: UntypedFormGroup;
  changePriceForm: UntypedFormGroup;
  extendOrDropJobs: UntypedFormGroup;
  approveOrRejectPartnerPriceForm: UntypedFormGroup;
  CareManagerList: any[] = [];
  AcceptedProfile: any = {};
  paymentDetails: any = {};
  steps: any[] = [];
  Tarrifs: any;
  tarrifobj: any;
  SelectedPayment: any;
  ReceiptNumber: any;
  press: boolean = false;
  arpress: boolean = false;
  myForm!: UntypedFormGroup;
  dropdownSettings: Object = {} // for language multiselect 
  dropdownList: any[] = []
  IframImgConsentForm: any
  addStaffForm: UntypedFormGroup

  subcategoryControl: FormControl
  GDAdocInput: boolean = false
  NurseDocInput: boolean = false
  npress: boolean;
  reqId: any;
  NoWorkingDays: any;
  formPress : boolean = false;

  constructor(private router: ActivatedRoute, private usersServices: UsersService, private route: Router, private spinner: NgxSpinnerService, private datePipe: DatePipe, private formBuilder: UntypedFormBuilder) { }
  ngOnInit(): void {
    this.spinner.show();




    this.jobFormload()
    const paymentID = this.router.snapshot.queryParamMap.get("AnvayaaPaymentID"); // reading the requestid from url
    this.paymentId = paymentID ? paymentID : ""
    this.reqId = this.router.snapshot.queryParamMap.get("RequestID"); // reading the requestid from url
    this.task = this.router.snapshot.queryParamMap.get("Task"); // reading the task from url
    this.requestID = this.reqId !== null ? this.reqId : ""

    this.requestFormLoad();
    this.AppOrRejPartnerPriceform()
    this.careManagerListFunction()
    this.assignCareManagerForm()
    this.paylaterFormFunction()
    this.changePriceFormFunction()
    this.extendOrDropJobForm()
    this.myForm = this.formBuilder.group({
      Comments: ['', [Validators.required]], // Default value for textarea
    });










    // this.subcategoryControl.valueChanges.subscribe(value => {
    //   const inputControl = this.addStaffForm.get('inputFieldName');
    //   if (value === 'requiredValue') {
    //     inputControl.enable();
    //   } else {
    //     inputControl.disable();
    //   }
    // });



    if (this.reqId && this.task === "Accepted_Profile") {
      this.AcceptedProfiles(this.reqId)
    }
    // get the request details from the api
    this.usersServices.viewRequest(this.requestID).subscribe(async (data: any) => {
      this.spinner.hide();
      this.requestDetails = data.data // assin=gning the fetched request details
      this.IframImgConsentForm = this.requestDetails?.Attachment[0]?.Image
      if (this.paymentId && (this.task == "Verify_bill" || this.task=="VerifyJobDetails")) {
        this.getPaymentDetails(this.paymentId)
      }
      const customerDetails: any = [
        {
          title: 'Name',
          value: data.data.Name,
          key: '../../../assets/images/personIcon.png',
        },
        {
          title: 'ContactNumber',
          value: data.data.ContactNumber,
          key: '../../../assets/images/mobileNumberIcon.png',
        },
        {
          title: 'EmailID',
          value: data.data.EmailID,
          key: '../../../assets/images/mailicon.png',
        },
        {
          title: ':Customer Type',
          value: data.data.EmailID,
          key: '../../../assets/images/customerType.png',
        },
        {
          title: ':Customer Package',
          value: data.data.EmailID,
          key: '../../../assets/images/customerPackage.png',
        }
      ]
      const requestDetails: any = [
        {
          title: 'Category',
          value: data.data.SubCategoryName,
          key: '../../../assets/images/category.png',
        },
        {
          title: 'SubCategory',
          value: data.data.SubSubCategoryName,
          key: '../../../assets/images/subcategory.png',
        },
        {
          title: 'RequestStatus',
          value: data.data.Status,
          key: '../../../assets/images/requestStatus.png',
        },
      ];
      const paymentDetails: any = [
        {
          title: 'PaymentMode',
          value: this.paymentDetails?.Payment?.PaymentMode,
          key: '../../../assets/images/paymentMode.png',
        },
        {
          title: 'PaymentType',
          value: this.paymentDetails?.Payment?.PaymentType,
          key: '../../../assets/images/paymentType.png',
        },
        {
          title: 'PaymentStatus',
          value: this.paymentDetails?.Payment?.PaymentStatus,
          key: '../../../assets/images/paymentStatus.png',
        },
      ];
      // declaring  and assing values to this object for showing the details in main card of request Details
      this.items[0].details = customerDetails;
      this.items[1].details = requestDetails;
      this.items[2].details = paymentDetails;

      //assigning existing request details with form values
      for (let key in data.data.CareTaker) {
        this.requestForm.patchValue({ [key]: data.data.CareTaker[key] });
      }
    },
      (error) => {
        this.spinner.hide();
        alert(error.data.data);
      },
    );
    this.spinner.hide();
  }

  showQualification: boolean = false
  GDAinput: boolean = false
  changeofService() {

  }

  viewRequest() {
    this.spinner.show();

    this.usersServices.viewRequest(this.requestID).subscribe(
      async (data: any) => {
        this.spinner.hide();
        this.requestDetails = data.data; // assin=gning the fetched request details
  
         const customerDetails: any = [
          {
            title: 'Name',
            value: data.data.Name,
            key: '../../../assets/images/personIcon.png',
          },
          {
            title: 'ContactNumber',
            value: data.data.ContactNumber,
            key: '../../../assets/images/mobileNumberIcon.png',
          },
          {
            title: 'EmailID',
            value: data.data.EmailID,
            key: '../../../assets/images/mailicon.png',
          },
          {
            title: ':Customer Type',
            value: data.data.EmailID,
            key: '../../../assets/images/customerType.png',
          },
          {
            title: ':Customer Package',
            value: data.data.EmailID,
            key: '../../../assets/images/customerPackage.png',
          },
        ];
        const requestDetails: any = [
          {
            title: 'Category',
            value: data.data.SubCategoryName,
            key: '../../../assets/images/category.png',
          },
          {
            title: 'SubCategory',
            value: data.data.SubSubCategoryName,
            key: '../../../assets/images/subcategory.png',
          },
          {
            title: 'RequestStatus',
            value: data.data.Status,
            key: '../../../assets/images/requestStatus.png',
          },
        ];
        const paymentDetails: any = [
          {
            title: 'PaymentMode',
            value: this.paymentDetails?.Payment?.PaymentMode,
            key: '../../../assets/images/paymentMode.png',
          },
          {
            title: 'PaymentType',
            value: this.paymentDetails?.Payment?.PaymentType,
            key: '../../../assets/images/paymentType.png',
          },
          {
            title: 'PaymentStatus',
            value: this.paymentDetails?.Payment?.PaymentStatus,
            key: '../../../assets/images/paymentStatus.png',
          },
        ];
        // declaring  and assing values to this object for showing the details in main card of request Details
        this.items[0].details = customerDetails;
        this.items[1].details = requestDetails;
        this.items[2].details = paymentDetails;

        //assigning existing request details with form values
        for (let key in data.data.CareTaker) {
          this.requestForm.patchValue({ [key]: data.data.CareTaker[key] });
        }
      },
      (error) => {
        this.spinner.hide();
        alert(error.error.data);
      },
    );
  }






  // this function for serevices for add staff Dropdown 







  jobFormload() {
    this.JobForm = this.formBuilder.group({
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      TarrifType: ['', Validators.required],
    });
  }

  paylaterFormFunction() {
    this.PayLaterForm = this.formBuilder.group({
      AnvayaaPaymentID: '',
      Date: ['', Validators.required],
      Comments: ['', Validators.required],
    });
  }

  changePriceFormFunction() {
    this.changePriceForm = this.formBuilder.group({
      RequestID: '',
      PartnerPrice: ['', Validators.required],
      TariffType: ['', Validators.required],
      CommissionType: ['', Validators.required],
    });
  }

  assignCareManagerForm() {
    this.assigneCareManager = this.formBuilder.group({
      RequestID: this.requestDetails.RequestID,
      EmployeeID: '',
      PlacementTime: '',
    });
  }

  extendOrDropJobForm() {
    this.extendOrDropJobs = this.formBuilder.group({
      RequestID: this.reqId,
      Status: ['', Validators.required],
      Comments: ['', Validators.required],
    });
  }

  AppOrRejPartnerPriceform() {
    this.approveOrRejectPartnerPriceForm = this.formBuilder.group({
      RequestID: this.reqId,
      Status: '',
      Comments: '',
    });
  }

  // this function is for getting care manager for request
  careManagerListFunction() {
    let EmpParmas: any = {};
    EmpParmas.Type = 'FieldEmployee';
    EmpParmas.ServiceAreaID = this.requestDetails.ServiceAreaID;

    this.usersServices.GetEmployees(EmpParmas).subscribe(
      (empDetails: any) => {
        // Handle successful response (status code 200)
        this.CareManagerList = empDetails.data;
      },
      (error) => {
        // Handle error response (status code 404 or other errors)
        if (error.status === 404) {
          // Handle 404 Not Found error
          alert(error.error.message);
        } else {
          // Handle other errors
          alert(error.error.message);
        }
      },
    );
  }



  SubmitJobDetails: boolean = false;
  SubmitTarrif() {
    this.spinner.show()
    this.SubmitJobDetails = true;


    if (this.JobForm.status === 'INVALID') {
      this.spinner.hide()
      return
    }

    if (this.JobForm.valid) {
      if (!moment(this.JobForm.value.StartDate, 'DD-MM-YYYY HH:mm', true).isValid()) {

      }

      if (
        !moment(this.JobForm.value.EndDate, 'DD-MM-YYYY HH:mm', true).isValid()
      ) {

      }
      for (let tar in this.Tarrifs) {
        if (this.JobForm.value.TarrifType == this.Tarrifs[tar].TarrifType) {
          this.tarrifobj = this.Tarrifs[tar];
        }
      }
      let jobPayload = {
        RequestID: this.requestDetails.RequestID,
        CustRecID: this.requestDetails.CustRecID,
        ServiceAreaID: this.requestDetails.ServiceAreaID,
        PartnerID: this.AcceptedProfile.PartnerID,
        SubCategoryID: this.requestDetails.SubCategoryID,
        CategoryID: this.requestDetails.CategoryID,
        SubSubCategoryID: this.requestDetails.SubSubCategoryID,
        CurrencyType: 'INR',
        MinimumPrice: this.tarrifobj.MinimumPrice,
        Price: this.tarrifobj.MinimumPrice,
        PriceFor: this.tarrifobj.TarrifType,
        StartDate: this.datePipe.transform(
          this.JobForm.value.StartDate,
          'dd-MM-yyyy',
        ),
        ReferralType: this.JobForm.value.TarrifType,
        AnvayaaCommission: this.tarrifobj.ReferalFee,
        EndDate: this.datePipe.transform(
          this.JobForm.value.EndDate,
          'dd-MM-yyyy',
        ),
        Comment: 'Job Started',
        VendorPrice: this.tarrifobj.VendorPrice,
      };

      this.usersServices.AssignJob(jobPayload).subscribe(
        (res: any) => {
          this.spinner.hide()
          alert(res.message);

          this.route.navigate(['Dashboard/Task/MyTask']);
        },
        (error) => {
          this.spinner.hide();
          alert(error.message);
        },
      );
    }
  }
  submitCareManager() {

    this.spinner.show()
    this.press = true;


    if (this.assigneCareManager.status == "INVALID") {
      return
    }
    let Placetime;
    if (
      !moment(
        this.assigneCareManager.value.PlacementTime,
        'DD-MM-YYYY HH:mm',
        true,
      ).isValid()
    ) {
      Placetime = this.datePipe.transform(
        this.assigneCareManager.value.PlacementTime,
        'dd-MM-yyyy hh:mm',
      );
    }
    this.assigneCareManager.value.PlacementTime = Placetime;
    this.assigneCareManager.value.RequestID = this.requestDetails.RequestID;

    this.usersServices
      .caremanagmentreplacment(this.assigneCareManager.value)
      .subscribe(
        (empDetails: any) => {
          // Handle successful response (status code 200)
          // this.CareManagerList = empDetails.data
          this.spinner.hide()

          alert(empDetails.message);
          this.route.navigate(['Dashboard/Task/MyTask']);
        },
        (error) => {
          this.spinner.hide()
          // Handle error response (status code 404 or other errors)
          if (error.status === 404) {
            // Handle 404 Not Found error
            alert(error.error.message);
          } else if (error.status === 401) {
            // Handle Unauthorized error
            alert('Unauthorized access');
          } else if (error.status === 500) {
            // Handle Internal Server Error
            alert('Internal Server Error occurred');
          } else {
            // Handle other errors
            alert(error.error.message);
          }
        },
      );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.requestForm.controls;
  }
  requestFormLoad() {
    // declaring the form for edit the request Details
    return (this.requestForm = this.formBuilder.group({
      Gender: ['', [Validators.required]],
      // Area:['',[ Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
      Age: [1, [Validators.required, Validators.min(3), Validators.max(120)]],
      // MobileNumber:['',[ Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
      Mobility: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ],
      ],
      // WeightOfThePatient:['',[ Validators.required,Validators.minLength(1),Validators.maxLength(200)]]
      WeightOfThePatient: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+$')],
      ], //this.maxWeightValidator(200)
      WashroomUsage: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ],
      ],
      FoodIntake: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ],
      ],
      Medication: ['', [Validators.required]],
      ExerciseActivity: ['', [Validators.required]],
      MedicalEquipmentAssistance: ['', [Validators.required]],
      ServiceRequired: ['', [Validators.required]],
      PricingQuoted: ['', [Validators.required]],
      PriceInformed: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ],
      ],
      DutyHours: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ],
      ],
      ServiceDurationRequested: [0, [Validators.required, Validators.min(1)]],
      Insulin: ['', [Validators.required]],
      DoYouWantCook: ['', [Validators.required]],
      DoYouWantMaid: ['', [Validators.required]],
      Note: ['', [Validators.required, Validators.minLength(3)]],
    }));
  }
  // maxWeightValidator(arg0: number): any {
  //   throw new Error('Method not implemented.');
  // }

  getPaymentDetails(paymentId: string) {
    this.usersServices.viewPaymentDetails(paymentId).subscribe(
      (res: any) => {
        this.requestDetails.paymentDetails = res.data;
        this.paymentDetails = res.data;
      },
      (error) => {
        this.spinner.hide();
        alert(error.message);
      },
    );
  }

  addJobPress: boolean = false

  AddJob() {
    this.addJobPress = true
       let payload = {
      ServiceAreaID: this.requestDetails.ServiceAreaID,
      PartnerID: this.AcceptedProfile.PartnerID,
      SubCategoryID: this.requestDetails.SubCategoryID,
      CategoryID: this.requestDetails.CategoryID,
      SubSubCategoryID: this.requestDetails.SubSubCategoryID,
    };
    this.usersServices.PartnerTarrif(payload).subscribe(
      (res: any) => {
        this.Tarrifs = res.data;
      },
      (error) => {
        this.spinner.hide();
        alert(error.message);
      },
    );
  }

  AcceptedProfiles(requestID: string) {
    this.usersServices.AcceptedProfiles(requestID).subscribe(
      (res: any) => {
        this.AcceptedProfile = res.data;
      },
      (error) => {
        this.spinner.hide();
        alert(error.message);
      },
    );
  }

  onEditSubmit() {
    this.submitted = true;

    if (this.requestForm.invalid) {
      return;
    }
    const paramsForUpdateRequest: any = {};
    paramsForUpdateRequest.RequestID = this.requestDetails.RequestID;
    paramsForUpdateRequest.CustRecID = this.requestDetails.CustRecID;
    paramsForUpdateRequest.SubCategoryID = this.requestDetails.SubCategoryID;
    paramsForUpdateRequest.SubSubCategoryID =
      this.requestDetails.SubSubCategoryID;
    paramsForUpdateRequest.RequestedDate = this.datePipe.transform(
      this.requestDetails.RequestedDate * 1000,
      'dd-MM-YYYY',
    ); // converting the unix timestamp into specific format DD-MM-YYYY
    paramsForUpdateRequest.PlacementTime = this.datePipe.transform(
      this.requestDetails.PlacementTime * 1000,
      'dd-MM-YYYY',
    ); // converting the unix timestamp into specific format DD-MM-YYYY
    paramsForUpdateRequest.careTaker = { ...this.requestForm.value }; // assigning form values to care taker key
    paramsForUpdateRequest.Note = 'Test';
    paramsForUpdateRequest.Status = this.requestDetails.Status;
    paramsForUpdateRequest.Gender = this.requestForm.value.Gender;

    //update  Request details api integration
    this.usersServices.updateRequest(paramsForUpdateRequest).subscribe(
      (res) => {
        alert('Your Request has been Updated Successfully');
        this.route.navigate(['Dashboard/viewrequest'], {
          queryParams: {
            RequestID: this.requestDetails.RequestID,
            Task: 'Search_Profile',
          },
        });
        this.viewRequest();
        this.task = 'Search_Profile';
        this.closebutton.nativeElement.click();
        // window.location.reload();
      },
      (err) => {
        this.spinner.hide();
        alert(err.error.message ? err.error.message : err.data.data);
      },
    );
  }
  onEditClick(): void {
    this.usersServices.cityApi().subscribe(
      (res: any) => {
        this.allCities = res.data;
      },
      (err) => {
        alert(err.data.data);
      },
    );
  }
  onInvoiceClick() {
    window.open(
      this.requestDetails.paymentDetails?.PaymentForDetails?.HomeHelathServices
        .ProfromaInvoiceBill,
    );
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
      this.NoWorkingDays = this.requestDetails?.paymentDetails?.PaymentForDetails.HomeHelathServices.ReconsillationData.ReconsillationFinalDays
    }
    var updateObj = {
      PaymentID: this.paymentId,
      "Type": type,
      "Days": Number(this.NoWorkingDays)
    }
  //  return
    this.usersServices.reconcilation(updateObj).subscribe((Response) => {
      if (Response.code == "S001") {

        alert(Response.data)
        //this.viewRequestDetails()

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
      this.NoWorkingDays = this.requestDetails?.paymentDetails?.PaymentForDetails.HomeHelathServices.ReconsillationData.ReconsillationFinalDays
    }
    var updateObj = {
      PaymentID: data.Payment.AnvayaaPaymentID,
      "Type": type,
      "Days": Number(this.NoWorkingDays)
    }
   
    this.usersServices.reconcilation(updateObj).subscribe((Response) => {
      if (Response.code == "S001") {

        alert(Response.data)
        //this.viewRequestDetails()

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
      PaymentID: this.paymentId,
      "Type": type,
      "Days": Number(this.NoWorkingDays)
    }
    this.usersServices.reconcilation(approveObj).subscribe((Response) => {
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

  // this is for selction of payment div

  selectedIndex: number = -1; // Initialize selected index to -1

  selectPaymentCard(index: number) {
    this.selectedIndex = index; // Set the selected index
  }
  selectPaymentOption(paymentOptionObj: any) {
    this.SelectedPayment = paymentOptionObj.label;
  }

  MakePayment() {

    this.spinner.show()
    if (this.SelectedPayment == undefined) {
      alert('Select Payment Mode');
      return;
    }
    if (this.ReceiptNumber == undefined && this.SelectedPayment == 'Cash') {
      alert('Enter Receipt Number');
      return;
    }
    let PaymentPayoad = {
      PaymentMode: this.SelectedPayment,
      CustRecID: this.requestDetails.CustRecID,
      PaymentID: this.paymentId,
      ReceiptNumber: this.ReceiptNumber,
    };
    this.usersServices.submitBills(PaymentPayoad).subscribe(
      (res) => {
        this.spinner.hide()
        alert('Your Payment has been Updated Successfully');
        this.route.navigate(['Dashboard/Task/MyTask']);


      },
      (err) => {
        this.spinner.hide();
        alert(err.error.data);
        alert(err.error.message ? err.error.message : err.data.data);
      },
    );
  }
  Approve(data: any) {
    this.arpress = true;

    if (this.myForm.status == 'INVALID') {
      return;
    } else {
    
      let acceptPayoad = {
        Status: data,
        RequestID: this.requestDetails.RequestID,
        Comments: this.myForm.value.Comments,
      };
      this.usersServices.approveandrejectconsentform(acceptPayoad).subscribe(
        (response: any) => {
          alert(response.message);
          this.route.navigate(['Dashboard/Task/MyTask']);
        },
        (error: any) => {
          // Handle error response (status code 404 or other errors)
          if (error.status === 404) {
            alert(error.error.message);
            this.spinner.hide();
            // Handle 404 Not Found error
          } else {
            this.spinner.hide();
            // Handle other errors
          }
        },
      );
      this.approveCloseBtn.nativeElement.click();
    }
  }
  Reject(datareject: any) {
    this.arpress = true;

    if (this.myForm.status == 'INVALID') {
      return;
    } else {
      let rejectPayoad = {
        Status: datareject,
        RequestID: this.requestDetails.RequestID,
        Comments: this.myForm.value.Comments,
      };
      this.usersServices.approveandrejectconsentform(rejectPayoad).subscribe(
        (response: any) => {
          alert(response.message);
          this.route.navigate(['Dashboard/Task/MyTask']);
        },
        (error: any) => {
          // Handle error response (status code 404 or other errors)
          if (error.status === 404) {
            alert(error.error.message);
            this.spinner.hide();
            // Handle 404 Not Found error
          } else {
            this.spinner.hide();
            // Handle other errors
          }
        },
      );
      this.rejectCloseBtn.nativeElement.click();
    }
  }
  submitPaylater: boolean = false;
  submitPayLater() {
    this.submitPaylater = true;
    if (this.PayLaterForm.valid) {
      this.PayLaterForm.value.AnvayaaPaymentID = this.paymentId;
      this.spinner.show();
      this.usersServices.Updatepaylater(this.PayLaterForm.value).subscribe(
        (response: any) => {
          alert(response.message);
          this.route.navigate(['Dashboard/Task/MyTask']);
        },
        (error) => {
          // Handle error response (status code 404 or other errors)
          if (error.status === 404) {
            this.spinner.hide();
            // Handle 404 Not Found error
            alert(error.error.message);
          } else {
            this.spinner.hide();
            // Handle other errors
          }
        },
      );
    }
  }

  changePriceSubmit: boolean = false;
  submitChangePrice() {
    this.changePriceSubmit = true;
    if (this.changePriceForm.valid) {
      this.changePriceForm.value.RequestID = this.requestID;
      this.spinner.show();
      this.usersServices.changePriceV2(this.changePriceForm.value).subscribe(
        (response: any) => {
          this.spinner.hide();
          alert(response.message);
          this.route.navigate(['Dashboard/Task/MyTask']);
        },
        (error) => {
          // Handle error response (status code 404 or other errors)
          if (error.status === 404) {
            this.spinner.hide();
            // Handle 404 Not Found error
            alert(error.error.message);
          } else {
            this.spinner.hide();
            // Handle other errors
          }
        },
      );
    }
  }
  extendOrDrop() {
    this.formPress = true

    if (this.extendOrDropJobs.invalid) {
      return;
    }
    this.spinner.show();
    this.usersServices.extendOrDropStaff(this.extendOrDropJobs.value).subscribe(
      (response: any) => {
        this.spinner.hide();
        alert(response.message);
        this.route.navigate(['Dashboard/Task/MyTask'])
      },
      (error) => {
        // Handle error response (status code 404 or other errors)
        if (error.status === 404) {
          this.spinner.hide();
          // Handle 404 Not Found error
          alert(error.error.message);
        } else {
          this.spinner.hide();
          // Handle other errors
        }
      },
    );
  }

  ApproveOrRejectPricePartner() {
    this.npress = true;
  
    const dataforapprove = {
      RequestID: this.requestDetails.RequestID,
      Status: this.approveOrRejectPartnerPriceForm.value.Status,
      Comments: this.approveOrRejectPartnerPriceForm.value.Comments,
    }
    this.spinner.show();
    this.usersServices
      .approveOrRejectPartnerPrice(dataforapprove)
      .subscribe(
        (response: any) => {
          this.spinner.hide();
          alert(response.message);
        },
        (error) => {
          // Handle error response (status code 404 or other errors)
          if (error.status === 404) {
            this.spinner.hide();
            // Handle 404 Not Found error
            alert(error.error.message);
          } else {
            this.spinner.hide();
            // Handle other errors
          }
        },
      );
  }
  isInvalidAge(): boolean {
    const age = this.f['Age'].value;
    return age !== null && (isNaN(age) || age < 18 || age > 120);
  }

}
