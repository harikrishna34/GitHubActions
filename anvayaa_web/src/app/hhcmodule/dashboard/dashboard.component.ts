import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service'
import { HttpClient, HttpResponse, HttpHeaders, HttpParams ,HttpRequest,HttpHandler,HttpEvent,HttpInterceptor, HttpErrorResponse} from '@angular/common/http'
import {ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardCounts :any
  DataList:any = []
  tableSizes: any = [3, 6, 9, 12];
  NoDataTemplate:boolean = false
  DataFilterForm:UntypedFormGroup
  DashboardDataType:any
  Cities:any=[]
  RequestsTableType:boolean = false
  financetable:boolean =false
  params:any = new HttpParams();
  ReportsForm:UntypedFormGroup
  tablesDiv:boolean 
  backdatedRequest:UntypedFormGroup
  constructor(private userservice: UsersService, private route: Router, private spinner: NgxSpinnerService, private Router: Router, private UsersService: UsersService, private FormBuilder: UntypedFormBuilder,private datePipe: DatePipe ) { }
  ngOnInit(): void {
    this.dashboardCount()
    this.filterData()
    this.AllCities()
    this.backdatedRequestForm()
    this.reportsFormFunc()
  }
   filterData(){
    this.DataFilterForm = this.FormBuilder.group({
      'StartDate':'',
      'EndDate':'',
      'Type':'',
      'CityID':''
    })
  }

  backdatedRequestForm(){
    this.backdatedRequest= this.FormBuilder.group({
      'StartDate':'',
      'EndDate':'',
    })
  }

  reportsFormFunc(){
       this.ReportsForm = this.FormBuilder.group({
            "StartDate":'',
            "EndDate":''
       })
  }

  //dashboard count 
    dashboardCount(){
      this.spinner.show()
      this.userservice.hhcDashBoardCounts().subscribe((count) =>{      
        if(count.code == "S001"){
          this.dashboardCounts = count.data
          this.spinner.hide();
        }else if(count.code == "PD01"){
          alert(count.data)
          this.spinner.hide();
        } else{
          this.spinner.hide();
          alert(count.message)
        }
      },(error)=>{
        this.spinner.hide();
        alert(error.error.data)
      })
    }
    deletebills(data:any){
      console.log(data)
    
      this.spinner.show()


      this.userservice.deletebills({"RequestID":data.RequestID,"AnvayaaPaymentID":data.PaymentID}).subscribe((response) =>{   
        
        this.dashboardCount()
        this.dasboardCustomData(this.DashboardDataType)
        if(response.code == "S001"){
          alert(response.data)
          //this.dashboardCounts = response.data
        
          this.spinner.hide();
        }else if(response.code == "PD01"){
          alert(response.data)
          this.spinner.hide();
        } else{
          this.spinner.hide();
          alert(response.message)
        }
      },(error)=>{
        this.spinner.hide();
        alert(error.error.data)
      })
    }

    

    // filter function on search button 
    dashBoardevent(){
    this.dasboardCustomData(this.DashboardDataType)
    }

    // main fuction to call main dashboard values 
    dasboardCustomData(type:any){
      this.tablesDiv = true
      this.reportTab = false
      this.NoDataTemplate = true
      this.DataList = []
      if(type != this.DashboardDataType){
        this.DataFilterForm.reset()
      }
      this.DashboardDataType = type
      if(type == 'Pendingrequets'||type == 'AllRequests'){
        this.RequestsTableType = true
        this.financetable = false
      }else  if(type == 'HHCBills'||type == 'Reconciliation'||type == 'Refunds'){
        this.financetable =true
        this.RequestsTableType = false
      } 
       this.DataFilterForm.value.Type =this.DashboardDataType 
      this.spinner.show()
      this.userservice.hhcDashboardData(this.DataFilterForm.value).subscribe((response) =>{  
        if(response.code == "S001"){
            this.DataList = response.data
          this.spinner.hide();
          
        }else if(response.code == "PD01"){
          this.spinner.hide();
        } else if(response.code == "ND01"){
          this.DataFilterForm.reset()
          this.spinner.hide();
          alert(response.data)
        }else if(response.code == "S002"){
          this.spinner.hide();
          alert(response.data)
        }
      },(error)=>{
        this.spinner.hide();
        alert(error.error.data)
      })
    }
    /// calling all cities in this function 
    AllCities(){
      this.spinner.show()
      this.userservice.cityApi().subscribe((response) =>{      
        if(response.code == "S001"){
          this.Cities= response.data
          this.spinner.hide();
        }else if(response.code == "PD01"){
          alert(response.data)
          this.spinner.hide();
        } else{
          this.spinner.hide();
          alert(response.message)
        }
      },(error)=>{
        this.spinner.hide();
        alert(error.error.data)
      })
    }
  /// below function is for remove duplicates in query params 
     eliminateDuplicateQueryParams(url: string): string {
      const urlParts = url.split('?');
      if (urlParts.length === 2) {
        const baseUrl = urlParts[0];
        const queryParams = urlParts[1].split('&');
        const uniqueParams = new Map<string, string>();
    
        queryParams.forEach((param) => {
          const [key, value] = param.split('=');
          uniqueParams.set(key, value);
        });
    
        const uniqueQueryParams = Array.from(uniqueParams, ([key, value]) => `${key}=${value}`);
        return `${baseUrl}?${uniqueQueryParams.join('&')}`;
      }
      return url;
    }
    link:any
    downloadRequests(){
      this.DataFilterForm.value.Type =this.DashboardDataType
      let formData = this.DataFilterForm.value
      for (const key in formData) {
        if (formData.hasOwnProperty(key) && formData[key]) {
          this.params = this.params.append(key, formData[key]);
        }
      }
      if(this.DashboardDataType ==  'Pendingrequets'||this.DashboardDataType == 'AllRequests'){
      this. link = this.userservice.HostURL+'/api/hhcdashboard/downloadRequests'
      }else if(this.DashboardDataType == 'HHCBills'||this.DashboardDataType == 'Reconciliation'||this.DashboardDataType == 'Refunds'){
        this. link = this.userservice.HostURL+'/api/hhcdashboard/downloadHomehealthcare'
      }
      const url = `${this.link}?${this.params.toString()}`;
      const originalUrl = url
      const cleanedUrl = this.eliminateDuplicateQueryParams(originalUrl);
      window.open(cleanedUrl)

      this.DataFilterForm.reset()
      this.DataFilterForm.value.Type =this.DashboardDataType
    }
 
     reportTab:boolean = false
    reportsTab(){
       this.reportTab = true
       this.tablesDiv = false
    }

      downloadReportSbmit:boolean = false
    downloadReports(){
      this.downloadReportSbmit=true   

      if (this.ReportsForm.status == 'INVALID'){

      }else{

        this.ReportsForm.value.StartDate = this.datePipe.transform(this.ReportsForm.value.StartDate, 'dd-MM-yyyy')
        this.ReportsForm.value.EndDate = this.datePipe.transform(this.ReportsForm.value.EndDate, 'dd-MM-yyyy')
        this.ReportsForm.value.EmployeeID=localStorage.getItem('LoginEmployeeIDNew')

        let formData = this.ReportsForm.value
        for (const key in formData) {
          if (formData.hasOwnProperty(key) && formData[key]) {
            this.params = this.params.append(key, formData[key]);
          }
        }
        

        
        this. link = this.userservice.HostURL+'/api/hhcdashboard/downloadAllPendingPayments'
        
        const url = `${this.link}?${this.params.toString()}`;
        const originalUrl = url
        const cleanedUrl = this.eliminateDuplicateQueryParams(originalUrl);
        window.open(cleanedUrl)

      }
      
       
    }

     downloadBackdatedReportSbmit: boolean = false;
    downloadBackdatedRequest(){
      console.log("data print",this.backdatedRequest.value) 
      this.downloadBackdatedReportSbmit=true
      if (this.backdatedRequest.status == 'INVALID'){

      }
      else{
        this.backdatedRequest.value.StartDate = this.datePipe.transform(this.backdatedRequest.value.StartDate, 'dd-MM-yyyy')
        this.backdatedRequest.value.EndDate = this.datePipe.transform(this.backdatedRequest.value.EndDate, 'dd-MM-yyyy')
        // this.backdatedRequest.value.EmployeeID=localStorage.getItem('LoginEmployeeIDNew')
      this.link = this.userservice.HostURL+'/api/reports/backdatedRequests'
        
      let formData = this.backdatedRequest.value
      for (const key in formData) {
        if (formData.hasOwnProperty(key) && formData[key]) {
          this.params = this.params.append(key, formData[key]);
        }
      }

        const url = `${this.link}?${this.params.toString()}`;
        const originalUrl = url
        const cleanedUrl = this.eliminateDuplicateQueryParams(originalUrl);
        window.open(cleanedUrl)
      }
      
    }
  }
