import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UsersService } from '../users.service'
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, FormControl, FormArrayName, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SwPush } from "@angular/service-worker";
import * as moment from 'moment';


@Component({
  selector: 'app-emrreportsdetails',
  templateUrl: './emrreportsdetails.component.html',
  styleUrls: ['./emrreportsdetails.component.css']
})
export class EmrreportsdetailsComponent implements OnInit{
  ViewemrdetailsArray:any=[]
  CustRecID: any
  @ViewChild('closebutton',{static:false}) closebutton:any;

  public reports!: UntypedFormGroup
  constructor(private userservice: UsersService, private route: Router, private snap: ActivatedRoute, private spinner: NgxSpinnerService, private formBuilder: UntypedFormBuilder,private datePipe: DatePipe) { }
  addprofilebtn: boolean = false
  users: any = []
  imageUrl: any
  profileImages: any = []
  files: any = []
  accept = '*'
  PrescriptionImageFiles: any = []
  ReportTypes: any = []
  ReportNames: any = []
  RecordTypeID: any
  RecordType: any
  RecordNameID: any
  RecordNames: any = {}
  ReqDate: any
  photo: any = []
  newslide: any = []
  slides: any = []
  updateBtn: boolean = false
  HealthRecordmsg: any
  code: any
  ReportNamID:any
  details:any
  StartDate:any
  EndDate:any
  viewBtn:any
 public  ViewHealthRecordsByDate!:UntypedFormGroup
  electronichealthrecords: any = []
  CustID: any
  ngOnInit(): void {
    this.CustRecID = this.snap.snapshot.queryParamMap.get("CustRecID");
    this.EMRdetails()
    this.viewuserDetails()
    this.getReports()
    this.viewHealthRecord()
    // this.imageUrl = '../../assets/images/default-user_512.png'
    this.reports = this.formBuilder.group({
      img: [''],
      img1: [''],
      ReportGeneratedDate: [''],
      RecordType: [''],
      RecordName: [''],
      Description: [''],
      CustID: [''],
      PrescriptionImageFiles: ['']

    })

    this.ViewHealthRecordsByDate=this.formBuilder.group({
      EndDate:[''],
      StartDate:['']
    })
  }
  EMRdetails() {
    this.userservice.ComprehensivecustomersData(this.CustRecID,"EMR").subscribe((response) => {
      this.ViewemrdetailsArray = response.data
      console.log("ViewCCdbArray", response.data)
      if (response.code == 'S001') {
        // alert(response.data)
      }
      else if (response.code == 'S002') {
        alert(response.data)
      } else {
        alert(response.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }

  addhealthreports() {


    if (this.addprofilebtn == false) {
      this.addprofilebtn = true
      return
    }
    if (this.addprofilebtn == true) {
      this.addprofilebtn = false
      return
    }



  }
  data(data: any) {
    this.reports.value.img

    this.reports.patchValue({ 'img1': data.target.files.name })
  }

  viewuserDetails() {
    this.spinner.show()
    this.userservice.viewUsers().subscribe((Response) => {
      if (Response.code == "S001") {
        this.spinner.hide()

        this.users = Response.data.customer.Beneficiaries
      } else {
        this.spinner.hide()
        alert(Response.data)
      }
    },
      (error) => {
        this.spinner.hide()
        alert(error.error.data)
      })
  }


  selectReport(event: any) {
if(event.target.files.length>4){
  alert("Only four files at a time")
  return
}
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.photo.push(event.target.files[i])
        var reader = new FileReader()
        reader.onload = (event: any) => {

          this.PrescriptionImageFiles.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
        // this.PrescriptionImageFiles= event.target.files[i]
      }
    }

  }

  removeImage(index: any) {


    if (this.PrescriptionImageFiles.length == '0') {
      this.PrescriptionImageFiles = '';
    }
    else {
      this.PrescriptionImageFiles.splice(index, 1);
    }
  }


  getReports() {
    this.userservice.getReportstype().subscribe((ReportDetails: any) => {
      if (ReportDetails.code == "S001") {
        this.ReportTypes = ReportDetails.data
      } else {
        alert(ReportDetails.data)
      }
    }, (error: any) => {
      alert(error.error.data)
    })
  }


  ReportTypesData(data: any) {
    for (let i = 0; i < this.ReportTypes.length; i++) {
      if (data.target.value == this.ReportTypes[i].ReportTypeID) {
        this.RecordTypeID = this.ReportTypes[i].ReportTypeID
        this.RecordType = this.ReportTypes[i].AliasName
        this.ReportNames = this.ReportTypes[i].ReportNameDetails
        this.ReportTypesDataSearch(this.RecordTypeID,"first" )

      }
    }


  }
  GetReportNameID(nameID: any) {
    for (let i = 0; i < this.ReportNames.length; i++) {
      if (nameID.target.value == this.ReportNames[i].ReportNameID) {
        this.RecordNames = this.ReportNames[i]
        
      console.log( this.RecordNames)
      this.ReportTypesDataSearch(this.RecordNames,"Second")
      }
    }
  }



  uploadHealthRecordDetails() {


    this.updateBtn = true


    console.log(this.reports.status)

    if (this.reports.status == 'INVALID') {
      return;
    }
    if (this.CustID == undefined || this.CustID == null || this.CustID == '') {
      alert("CustID required please click on image")
      return;
    }
    if (!moment(this.reports.value.ReportGeneratedDate, "DD-MM-YYYY ", true).isValid()) {
      this.ReqDate = this.datePipe.transform(this.reports.value.ReportGeneratedDate, 'dd-MM-YYYY')
    }

    const UploadProfile = new FormData()

    UploadProfile.append('ReportGeneratedDate', this.ReqDate)
    UploadProfile.append('RecordTypeID', this.RecordTypeID)
    UploadProfile.append('RecordType', this.RecordType,)
    UploadProfile.append('RecordNameID', this.RecordNames.ReportNameID,)
    UploadProfile.append('RecordName', this.RecordNames.Name,)
    UploadProfile.append('Description', this.reports.value.Description)
    UploadProfile.append('CustID', this.CustID)
    for (let i = 0; i < this.photo.length; i++) {
      UploadProfile.append('PrescriptionImageFiles' + "" + [i], this.photo[i])
    }
    this.userservice.uploadhealthrecords(UploadProfile).subscribe((Response: any) => {
      if (Response.code == 'HR01') {
        alert(Response.data)
        this.viewHealthRecord()

      } else {
        alert(Response.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }
  custID(data: any) {
    this.CustID = data.CustID
  }



  viewHealthRecord() {
    this.userservice.viewHealthRecords().subscribe((Response: any) => {
      if (Response.code == 'S001') {
        this.electronichealthrecords = Response.data.recordsdata
        this.rearrangeData(Response.data.recordsdata);

      } else {
        alert(Response.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }

  rearrangeData(inputdata: any) {
    for (let ind in this.electronichealthrecords) {
      var tempImageData = []
      if (this.electronichealthrecords[ind].HealthRecordImageURLS != null) {
        for (let i = 0; i < this.electronichealthrecords[ind].HealthRecordImageURLS.length; i++) {
          if (i == 0) {
            tempImageData[0] = { "ImageUrl": this.electronichealthrecords[ind].HealthRecordImageURLS[i], "Status": "Active" }
          } else {
            tempImageData[i] = { "ImageUrl": this.electronichealthrecords[ind].HealthRecordImageURLS[i], "Status": "InActive" }
          }
        }
        this.electronichealthrecords[ind].HealthRecordImageURLS = tempImageData;

      }


    }

  }

  presprictionView(image: any, index: any, HealthRecordID: any) {


    for (let ind in this.electronichealthrecords) {
      if (this.electronichealthrecords[ind].HealthRecordID == HealthRecordID) {
        for (let i = 0; i < this.electronichealthrecords[ind].HealthRecordImageURLS.length; i++) {
          if (i == index) {
            this.electronichealthrecords[ind].HealthRecordImageURLS[i].Status = "Active";
          } else {
            this.electronichealthrecords[ind].HealthRecordImageURLS[i].Status = "InActive";
          }
        }

      }
    }

  }



  healthreportview(slides: any) {
    // $("#emr").modal("show");
console.log("!@",slides)

    console.log("!!!!", slides)
  
    // this.closebutton.nativeElement.open()
    this.newslide = slides[0].ImageUrl;
    this.slides = slides;



  }
  presprictiondetailView(slide: any, slides: any) {
    if (slide) {
      this.newslide = slide.ImageUrl;
      console.log(" line js ", this.newslide);

    } else {
      this.newslide = slides;
    }
  };


  ReportTypesDataSearch(RecordTypeID: any,cnd:any) {
    


    console.log(cnd)
    if (cnd == 'Dates') {
      this.viewBtn=true

      if(this.ViewHealthRecordsByDate.status=="INVALID"){
        return;
      }
      if (!moment(this.ViewHealthRecordsByDate.value.StartDate, "DD-MM-YYYY ", true).isValid()) {
        this.StartDate = this.datePipe.transform(this.ViewHealthRecordsByDate.value.StartDate, 'dd-MM-YYYY')
      }
      if (!moment(this.ViewHealthRecordsByDate.value.EndDate, "DD-MM-YYYY ", true).isValid()) {
        this.EndDate = this.datePipe.transform(this.ViewHealthRecordsByDate.value.EndDate, 'dd-MM-YYYY')
      }
      this.details = {
        StartDate: this.StartDate,
        EndDate:this.EndDate
}

      
    
    }
   if(cnd=="first"){
    
    console.log("!!@")
    this.details = {

      RecordTypeID:RecordTypeID
    }
    console.log(this.details)
   }

   if(cnd=="Second"){
    this.details = {
      RecordTypeID: RecordTypeID.ReportTypeID      ,
      RecordNameID:RecordTypeID.ReportNameID
    }
   }
   

    console.log(RecordTypeID)
    this.userservice.searchHealthRecords(this.details).subscribe((Response: any) => {
      this.code = Response.code
      if (Response.code == "S001") {
        this.electronichealthrecords = Response.data.recordsdata
        this.rearrangeData(Response.data.recordsdata);
        console.log(Response.data)
      } else {
        console.log(Response.data)
        this.electronichealthrecords = []

        this.HealthRecordmsg = Response.data
      }
    }, (error) => {
      alert(error.error.data)
    })
  }

  dataNew(data:any){
console.log("!@!@",data.target.value)
this.ReportNamID=data.target.value
// this.ReportTypesDataSearch(this.ReportNamID)
  }


}
