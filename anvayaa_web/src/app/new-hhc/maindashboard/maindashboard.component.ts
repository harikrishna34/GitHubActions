import { Component, ViewChild,CUSTOM_ELEMENTS_SCHEMA ,ElementRef } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrls: ['./maindashboard.component.css'],
})
export class MaindashboardComponent {
  @ViewChild('createLeadsClose') createleadsClose: any;
  @ViewChild('ApproveModalClose') approveCloseBtn: any;


  creatNewLead: UntypedFormGroup;
  updatingform: UntypedFormGroup;
  addPaginationForm: UntypedFormGroup;
  filterConditionForm:UntypedFormGroup;
  Counts: any;
  craeteLeadsSubmit: boolean = false;
  leadType: any = [];
  onGoingRequestsData:any=[];
  paymentToReceiveData:any=[];
  viewLeads: any;
  addPaginationToTable: any;
  pageSize:number=10;
  type:string='Leads'
  allEmployeesData:any=[];
  allServiceAreas:any=[];
  allServices:any=[];
  allSubSubServices:any=[];
  leadids:any
  constructor(
    private datePipe:DatePipe,
    private spinner: NgxSpinnerService,
    private userservice: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.creatlead();
    this.getDashboardCount();
    this.filterConditionFormInitialLoad();
    this.viewLeadsData({pageNumber:1,pageLimit:this.pageSize,...this.filterConditionForm.value});
    this.getAllServiceAreas();
    this.getAllEmployees();
    this.getAllServices();
    this.getAllSubServices()
    this.updatingform = this.formBuilder.group({
      Status: [''],
      Comments: ['kkkkkkkkkkkkkkkkkkkk'],

    })
  }
  handleOnGoingRequestsClick(){
    this.type='OngoingRequests'
    this.userservice.viewOnGoingrequests({pageNumber:1,pageLimit:this.pageSize,...this.filterConditionForm.value}).subscribe((res:any)=>{
      this.onGoingRequestsData=res
    },(err)=>{
      alert(err.data.data)
    })
  }
  handleLeadClick(){
    this.type='Leads'
    this.viewLeadsData({pageNumber:1,pageLimit:this.pageSize,...this.filterConditionForm.value});
  }
  handlePaymentToReceiveClick(){
    this.spinner.show();
    this.type='PaymentToReceive'
    this.handlePaymentToreceiveAPI({pageNumber:1,pageLimit:this.pageSize,...this.filterConditionForm.value});
    this.spinner.hide();
  }
  creatlead() {
    this.creatNewLead = this.formBuilder.group({
      Name: ['', Validators.required],
      EmailID: ['', [Validators.required, Validators.email]],
      MobileNumber: ['', Validators.required],
      Source: ['', Validators.required],
      Type: ['', Validators.required],
      Comments: [''],
      Status: 'Open',
    });
  }
   

  filterConditionFormInitialLoad(){
    this.filterConditionForm = this.formBuilder.group({
      StartDate:[''],
      EndDate:[''],
      Status:[''],
      EmployeeID:[''],
      CityID:[''],
      AliasName:[''],
      SubSubCategoryName:['']    
    })
  }
  addPagination(){
    this.addPaginationForm = this.formBuilder.group({
      StartDate: '',
      EndDate: '',
      Status: '',
      pageLimit: '',
      pageNumber: ''
    })
  }
  onStartDateModified(){
    this.filterConditionForm.value.StartDate=this.datePipe.transform(this.filterConditionForm.value.StartDate, 'dd-MM-yyyy');
    this.handleFiltersChange()
  }
  onEndDateModified(){
    this.filterConditionForm.value.EndDate=this.datePipe.transform(this.filterConditionForm.value.EndDate, 'dd-MM-yyyy');
    this.handleFiltersChange()
  }
  getDashboardCount() {
    this.spinner.show();
    this.userservice.getHHCDashBoardCount().subscribe(
      (plan: any) => {
        this.spinner.hide();
        this.Counts = plan.data;
      },
      (error) => {
        if (error.status === 404) {
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      },
    );
  }
  updateNewLead() {
    this.craeteLeadsSubmit = true;
    if (this.creatNewLead.valid) {
      this.spinner.show();
      this.userservice.creatLead(this.creatNewLead.value).subscribe(
        (plan: any) => {
          this.spinner.hide();
          this.Counts = plan.data;
          alert(plan.message);
          this.createleadsClose.nativeElement.Click();

        },
        (error) => {
          if (error.status === 404) {
            this.spinner.hide();
          } else {
            this.spinner.hide();
          }
        },
      );
    } else {
      this.createleadsClose.nativeElement.Click();

    }
    this.createleadsClose.nativeElement.Click();

  }
  onLeadsDataChange(event: any) {
    this.spinner.show();
    this.viewLeadsData({pageNumber:event,pageLimit:this.pageSize,...this.filterConditionForm.value})
    this.spinner.hide()
  }
  onOnGoingRequestsDataChange(event: any) {
    this.spinner.show();
    this.userservice.viewOnGoingrequests({pageNumber:event,pageLimit:this.pageSize,...this.filterConditionForm.value}).subscribe((res:any)=>{
      this.onGoingRequestsData=res
    },(err)=>{
      alert(err.data.data)
    })
    this.spinner.hide()
  }
  onPaymentToReceiveDataChange(event: any) {
    this.spinner.show();
    this.handlePaymentToreceiveAPI({pageNumber:event,pageLimit:this.pageSize,...this.filterConditionForm.value})
    this.spinner.hide()
  }
  viewLeadsData(Obj:any) {
    this.spinner.show();
    this.userservice.viewLeads(Obj).subscribe(
      (response: any) => {
        this.viewLeads = response;
        if (response.code == 'S001') {
        } else if (response.code == 'S002') {
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      },
      (error) => {
        alert(error.error.data);
      },
    );
  }
  getStatusColor(status: string): string {
    switch (status) {
      case 'Open':
        return 'green';
      case 'Processing':
        return 'orange';
      case 'Close':
        return 'red';
      default:
        return 'inherit'; // Default color
    }
  }
  updateLead() {
    this.spinner.show();
    const leadsupdate = {
      "LeadID": this.leadids,
    
      "Comments":this.updatingform.value.Comments,
     
      "Status":this.updatingform.value.Status
    }

    this.userservice.updateLead(leadsupdate).subscribe(
      (response: any) => {
        alert(response.message)
        this.approveCloseBtn.nativeElement.click();
        // this.viewLeadsData({pageNumber:event,pageLimit:this.pageSize,...this.filterConditionForm.value})
        window.location.reload();
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
      this.approveCloseBtn.nativeElement.click();

  }
  handlePaymentToreceiveAPI(params:any){
    this.userservice.viewNotApprovedHHCBills(params).subscribe((res)=>{
      this.paymentToReceiveData=res
    }, (error) => {
      // Handle error response (status code 404 or other errors)
      if (error.status === 404) {
        this.spinner.hide();
        alert(error.error.message)
        // Handle 404 Not Found error
      } else {
        this.spinner.hide();
        // Handle other errors
      }
    })
  }

  getAllServices(){
    this.userservice.getAllServices().subscribe((res:any)=>{
      this.allServices=res.data
    },(err)=>{
        alert(err.data.data)
      })
  }
  getAllSubServices(){
    this.userservice.getAllSubServices().subscribe((res:any)=>{
      this.allSubSubServices=res.data

    },(err)=>{
        alert(err.data.data)
      })
  }
  getAllEmployees(){
    this.userservice.employeesdetails().subscribe((response: any) => {
      this.allEmployeesData=response.data
    },(err)=>{
      alert(err.data.data);
    });
  }
  getAllServiceAreas(){
    this.userservice.cityApi().subscribe((res: any) =>{
      this.allServiceAreas=res.data;
    },(err)=>{
      alert(err.data.data)
    })
  }
  handleFiltersChange(){
    if(this.type==='Leads'){
      this.viewLeadsData({pageNumber:1,pageLimit:this.pageSize,...this.filterConditionForm.value})
    }else if(this.type === "OngoingRequests"){
      this.userservice.viewOnGoingrequests({pageNumber:1,pageLimit:this.pageSize,...this.filterConditionForm.value}).subscribe((res:any)=>{
        this.onGoingRequestsData=res
      },(err)=>{
        alert(err.data.data)
      })
    }else if(this.type === "PaymentToReceive"){
      this.handlePaymentToreceiveAPI({pageNumber:1,pageLimit:this.pageSize,...this.filterConditionForm.value})
    }
  }



  patchvaluestoupdateleads(leadid:any){
    this.leadids=leadid.LeadID
    this.updatingform.patchValue({ Status:leadid?.Status })
    this.updatingform.patchValue({ Comments:leadid?.Comments })
  }
}
