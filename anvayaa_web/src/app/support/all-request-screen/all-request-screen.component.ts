import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { UsersService } from '../../users.service'
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form } from '@angular/forms';
import { ignoreElements } from 'rxjs';
import { ReturnStatement } from '@angular/compiler';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

import { typeOf } from 'mathjs';
import { Moment } from 'moment';
import * as moment from 'moment';
// declare var moment: any;
@Component({
  selector: 'app-all-request-screen',
  templateUrl: './all-request-screen.component.html',
  styleUrls: ['./all-request-screen.component.css']
})
export class AllRequestScreenComponent implements OnInit {
  moment: any
  reqID: any;
  CustRecID: any
  vendorData: any
  ProfileID: any = []
  doc: any
  profileView: any
  serviceType: any
  requestDetailsData: any
  vendorName: any
  vendorID: any
  PriceFor: any
  vendorStatusbtn: any = false
  public vendorUpdate!: UntypedFormGroup;
  public dropJob: UntypedFormGroup
  public CompleteTheJob: UntypedFormGroup
  public extendJob: UntypedFormGroup
  vendorIDData: any
  vendorStatus: any = 'No'
  minDate = new Date();
  resultStartDate: any
  resultEndDate: any
  dt1: any;
  dt2: any;
  diffInDays: any
  jobStart: any = 'No'
  profileData: any = []
  Status: any
  RequestStatus: any
  Answer: any
  Comment: any
  EndDate: any
  completeJobBtn: any
  AssignedVendorDate: any
  ReqDate: any
  ratingValue: any
  complteJobEndDate: any
  EndDateJob: any
  CM: any
  StartDate: String
  DropJobEndDate: any
  JobStartDate: any
  JobStartDateNew: any
  constructor(private Router: Router, private route: ActivatedRoute, private UsersService: UsersService, private FormBuilder: UntypedFormBuilder, private datePipe: DatePipe, private spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this.vendorUpdate = this.FormBuilder.group({
      Status: [''],
      StatusRemarks: [''],
      StartDate: [''],
      Price: [''],
      PriceFor: [''],
      EndDate: [''],
      ActualDaysServed: ['']
    })
    this.extendJob = this.FormBuilder.group({
      EndDate: ['']

    })
    this.reqID = this.route.snapshot.queryParamMap.get("RequestID")
    this.CustRecID = this.route.snapshot.queryParamMap.get("CustRecID")
    this.Status = this.route.snapshot.queryParamMap.get("Status")
    this.requestDetails()


    this.CompleteTheJob = this.FormBuilder.group({
      // RequestedDate:[''],
      StartDate: [''],
      JobEndDate: [''],
      Comments: ['']

    })
    this.dropJob = this.FormBuilder.group({
      EndDate: [''],
      Assigned_To_Partner: [''],
      Comments: [''],
      StartDate: ['']

    })
  }
  backbtn() {
    this.Router.navigate(['Dashboard/support/employeeRequest'])
  }

  requestDetails() {
    this.spinner.show()
    this.UsersService.RequestDetails(this.reqID, this.CustRecID).subscribe((requestData) => {

      if (requestData.code == "S001") {
        this.spinner.hide()
        this.requestDetailsData = requestData.data
        this.CM = this.requestDetailsData.Owner
        if (this.requestDetailsData.AssignedVendor.length > 0) {
          for (let i = 0; i < this.requestDetailsData.AssignedVendor.length; i++) {
            if (this.requestDetailsData.AssignedVendor[i].Status == "Job_Started") {

              if (this.requestDetailsData.AssignedVendor.length > 0 && this.requestDetailsData.AssignedVendor != null) {

                if (this.requestDetailsData.AssignedVendor.slice(-1)[0].StartDate != null) {


                  this.CompleteTheJob.patchValue({ StartDate: this.datePipe.transform((this.requestDetailsData.AssignedVendor.slice(-1)[0].StartDate) * 1000, 'YYYY-MM-ddThh:mm') })

                }

                console.log(this.requestDetailsData.AssignedVendor.slice(-1)[0].EndDate)
                if (this.requestDetailsData.AssignedVendor.slice(-1)[0].EndDate != null) {
                  this.CompleteTheJob.patchValue({ JobEndDate: this.datePipe.transform((this.requestDetailsData.AssignedVendor.slice(-1)[0].EndDate) * 1000, 'YYYY-MM-dd') })
                }
              }

            }
          }
        }


        if (this.requestDetailsData.AssignedVendor.length > 0) {
          if (this.requestDetailsData.AssignedVendor.length >= 1) {
            this.jobStart = 'Yes'

            let da2 = new Date((this.requestDetailsData.AssignedVendor[0].StartDate) * 1000);

            this.resultStartDate = this.datePipe.transform(da2, 'MM/dd/YYYY')
            this.vendorUpdate.patchValue({ 'Status': this.requestDetailsData.AssignedVendor[0].Status })

            this.vendorUpdate.patchValue({ 'Price': this.requestDetailsData.AssignedVendor[0].Price })
            this.vendorUpdate.patchValue({ 'PriceFor': this.requestDetailsData.AssignedVendor[0].PriceFor })
            this.vendorUpdate.patchValue({ 'StartDate': this.resultStartDate })

          }
        }

        this.serviceType = this.requestDetailsData.ServiceType
        this.vendorData = this.requestDetailsData.VendorProfile.filter(function (el: any) {

          return el.Status != "Cancelled";

        })
        for (let i = 0; i < this.requestDetailsData.VendorProfile.length; i++) {

          let obj: any
          obj = this.requestDetailsData.VendorProfile[i];
          if (obj.Status == 'Approved') {
            this.vendorStatus = 'Yes'
          }

        }
        if (this.requestDetailsData.ServiceType == 'Onetime' && requestData.data.AssignedVendor.length >= 1) {
          for (let i = 0; i < requestData.data.AssignedVendor.length; i++) {
            this.vendorIDData = requestData.data.AssignedVendor[i].VendorID
            this.vendorName = requestData.data.AssignedVendor[i].VendorName
          }
        }
        this.profileView = requestData.data.VendorProfile
      } else {
        alert(requestData.data)
      }
    }, function (error) {
      alert(error.error.data)
    })
  }
  profileActed(profileID: any, Status: any, ID: any) {
    this.vendorIDData = ID
    //("iiii", this.vendorIDData, Status)
    this.UsersService.profileActed(this.reqID, profileID, Status, '').subscribe((Response) => {
      if (Response.code == "S001") {

        alert(Response.data)

        if (Status == 'Approved') {
          this.assignVendorForRequest()

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


    }, function (error) {
      alert(error.error.data)
    })
  }
  showView(index: any) {

    this.doc = this.profileView[index].ProfileUrl
    //("this.doc",this.doc)

    window.open(this.doc, "_blank");
  }
  assignVendorForRequest() {
    //("assignvennn")
    // this.reqID = this.route.snapshot.queryParamMap.get("RequestID")

    //(this.vendorIDData, this.reqID)
    this.reqID = this.requestDetailsData.RequestID
    this.UsersService.assignVendorForRequest("this.reqID, this.vendorIDData").subscribe((Response) => {
      // this.vendorStatus = 'No'

      //(Response.data)
      //("assignvennn")
      if (Response.code == "S001") {
        // this.vendorStatus = 'Yes'
        alert(Response.data)
        window.location.reload()

      } else {
        alert(Response.data)
        window.location.reload()
      }
    }, function (error) {
      alert(error.error.data)
    })
  }
  vendorStatusUpdate() {
    this.vendorStatusbtn = true

    let da1 = new Date(this.vendorUpdate.value.StartDate);
    let selectedDate = new Date(da1.getTime());
    let result = this.datePipe.transform(selectedDate, 'dd/MM/YYYY HH:mm')
    this.vendorUpdate.value.StartDate = result


    if (this.vendorUpdate.value.EndDate != '') {
      let da2 = new Date(this.vendorUpdate.value.EndDate);
      let selectedEndDate = new Date(da2.getTime());
      let result2 = this.datePipe.transform(selectedEndDate, 'dd/MM/YYYY')
      this.vendorUpdate.value.EndDate = result2
      //(result2)
    }
    //(this.vendorUpdate.status)

    this.vendorUpdate.value.RequestID = this.reqID
    this.vendorUpdate.value.VendorID = this.requestDetailsData.AssignedVendor[0].VendorID





    this.UsersService.updateVendorStatus(this.vendorUpdate.value).subscribe((Response) => {
      if (Response.code == "S001") {
        alert(Response.data)
        window.location.reload()
      } else {
        alert(Response.data)
        // window.location.reload()
      }
    }, function (error) {
      alert(error.error.data)
    })
  }
  endDate(endDate: any) {
    let da2 = new Date((this.requestDetailsData.AssignedVendor[0].StartDate) * 1000);
    // //(da2);
    // let selectedEndDate = new Date(da2.getTime());
    this.resultStartDate = this.datePipe.transform(da2, 'MM/dd/YYYY')

    //(this.resultStartDate, "Start Date Db")
    // let sEndDate = new Date(endDate.target.value.getTime());
    this.resultEndDate = this.datePipe.transform(endDate.target.value, 'MM/dd/YYYY')
    //(this.resultEndDate, "End Date")
    const date1 = new Date(this.resultStartDate)
    const date2 = new Date(this.resultEndDate)
    let diff = date2.getTime() - date1.getTime()

    this.diffInDays = diff / (1000 * 3600 * 24)

    this.vendorUpdate.patchValue({ ActualDaysServed: this.diffInDays })
  }
  alertForJobs(data: any) {
    if (this.requestDetailsData.AssignedVendor[0].StartDate == null && this.vendorUpdate.value.Status == 'Job_Completed') {
      //(this.vendorUpdate.value.Status, "vvvv")
      alert('please select job started status first');
      // ($('#UpdateStatus') as any).modal('hide');
      location.reload()
      return;
    }
    if (this.requestDetailsData.AssignedVendor[0].StartDate != null) {
      if (this.vendorUpdate.value.Status == 'Job_Cancelled' && this.requestDetailsData.AssignedVendor[0].EndDate == null) {
        alert('please update status to completed');
        // ($('#UpdateStatus') as any).modal('hide');

        location.reload()
        return;



      }
    }
  }
  ConfirmIfJobStart(Status: any) {


    // console.log("StartDate",this.datePipe.transform((this.requestDetailsData.AssignedVendor.slice(-1)[0].StartDate)*1000, 'dd-MM-YYYY'))


    this.RequestStatus = Status
    this.Answer = this.dropJob.value.Assigned_To_Partner
    this.Comment = this.dropJob.value.Comment

    if (!moment(this.dropJob.value.EndDate, "DD-MM-YYYY", true).isValid()) {
      this.DropJobEndDate = this.datePipe.transform(this.dropJob.value.EndDate, 'dd-MM-YYYY')
    }
    if (this.RequestStatus == 'Dropped') {
      this.Answer = this.dropJob.value.Assigned_To_Partner
      this.Comment = this.dropJob.value.Comments,
        this.EndDate = this.DropJobEndDate,
        this.JobStartDate = this.datePipe.transform((this.requestDetailsData.AssignedVendor.slice(-1)[0].StartDate) * 1000, 'dd-MM-YYYY')


    }

    let data = {
      "RequestID": this.reqID,
      "Status": this.RequestStatus,
      "Comments": this.Comment,
      "Assigned_To_Partner": "No",
      "EndDate": this.EndDate,
      "StartDate": this.JobStartDate
    }

    this.spinner.show()
    this.UsersService.ConfirmIfJobStarted(data).subscribe((Response) => {
      if (Response.code == "S001") {
        alert(Response.data)
        this.spinner.hide()
        this.Router.navigate(['Dashboard/support/employeeRequest'])
      } else {
        alert(Response.data)
        this.spinner.hide()
      }
    }, (error) => {
      alert(error.error.data)
      this.spinner.hide()
    })
  }
  CheckOnCompletedJobs(status: any) {
    if (status == 'Completed') {
      this.complteJobEndDate = this.CompleteTheJob.value.JobEndDate
      this.JobStartDateNew = this.datePipe.transform((this.requestDetailsData.AssignedVendor.slice(-1)[0].StartDate) * 1000, 'dd-MM-YYYY')
    }
    if (status == "InProgress") {
      this.complteJobEndDate = this.extendJob.value.EndDate
      this.JobStartDateNew = this.datePipe.transform((this.requestDetailsData.AssignedVendor.slice(-1)[0].StartDate) * 1000, 'dd-MM-YYYY')


    }
    if (!moment(this.complteJobEndDate, "DD-MM-YYYY ", true).isValid()) {
      this.EndDateJob = this.datePipe.transform(this.complteJobEndDate, 'dd-MM-YYYY ')
    }
    let CompletedJobObj = {
      "RequestID": this.reqID,
      "Rating": this.ratingValue,
      "Comments": this.CompleteTheJob.value.Comments,
      "Status": status,
      "EndDate": this.EndDateJob,
      "StartDate": this.JobStartDateNew

    }
    this.spinner.show()
    this.UsersService.CheckOnCompletedJobs(CompletedJobObj).subscribe((Response) => {
      if (Response.code == "S001") {
        alert(Response.data)
        this.spinner.hide()
        this.Router.navigate(['Dashboard/support/employeeRequest'])
      } else {
        this.spinner.hide()
        alert(Response.data)
      }
    }, (error) => {
      this.spinner.hide()
      alert(error.error.data)
    })
  }
  ratings(rating: any) {
    this.ratingValue = rating.target.value


  }
}
