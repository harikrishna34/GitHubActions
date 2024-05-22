import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from 'src/app/users.service';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form } from '@angular/forms';
@Component({
  selector: 'app-pwd-attachments',
  templateUrl: './pwd-attachments.component.html',
  styleUrls: ['./pwd-attachments.component.css']
})
export class PWDAttachmentsComponent implements OnInit {
  CustRecID: any
  CustID: any
  taxIMG: any
  uploadForm: boolean = false
  upload: boolean = false
  attachmentarray:any = []
  Type:any
  reportDate:any
  today :any= new Date()
  constructor(private userService: UsersService, private route: Router, private router: ActivatedRoute, private spinner: NgxSpinnerService, private formBuilder: UntypedFormBuilder,private datePipe: DatePipe) { }

  attachmentsForm: UntypedFormGroup
  nodata:boolean = false
  ngOnInit(): void {

    this.CustRecID = this.router.snapshot.queryParamMap.get("CustRecID")
    this.CustID = this.router.snapshot.queryParamMap.get("CustID")
    this.Type =  this.router.snapshot.queryParamMap.get("Type")

    this.getallattachments()

    this.attachmentsForm = this.formBuilder.group({
      ReportDate: [''],
      Note: [''],
      Type: [''],
      CustID: this.CustID,
      CustRecID: this.CustRecID,
      File: ['']
    })

     
      
    
  }

  openUpload() {
    this.uploadForm = !this.uploadForm
  }

  attachment(file: any) {

    if (file.target.files.length > 0) {
      this.taxIMG = file.target.files[0];
      console.log(this.taxIMG);
    }

  }

  getallattachments(){
    this.userService.dementiaAttachments(this.CustRecID,this.CustID).subscribe((data) => {

      if (data.code == "S001") {

          this.attachmentarray = data.data
          if(this.attachmentarray.length == '0'){
               this.nodata = true
          }
        // this.attachmentsForm.reset()
        this.uploadForm = false
        
        this.spinner.hide();
      }
      if (data.code == "S002") {
        alert(data.data);
        this.spinner.hide();
      }
    }, (error) => {
      alert(error.error.data)
    })
  }

  addattachment(){

    console.log("dddd")

    this.upload =true

    if (this.attachmentsForm.status == 'INVALID') {
        return
    }else{
      this.spinner.show()

       

      let attachment = new FormData()

      this.reportDate = this.datePipe.transform( this.attachmentsForm.value.ReportDate, 'dd/MM/yyyy')

      attachment.append('File', this.taxIMG)
      attachment.append('CustRecID', this.CustRecID)
      attachment.append('CustID', this.CustID)
      attachment.append('Type', this.attachmentsForm.value.Type)
      attachment.append('Note', this.attachmentsForm.value.Note)
      attachment.append('ReportDate', this.reportDate)

      this.userService.dementiaAddAttachments(attachment).subscribe((data) => {


        if (data.code == "S001") {
          this.attachmentsForm.reset()
          this.uploadForm = false
          alert(data.data)
          this.spinner.hide();
          this.getallattachments()
        }
        if (data.code == "S002") {
          alert(data.data);
          this.spinner.hide();
        }
      }, (error) => {
        alert(error.error.data)
        this.spinner.hide();
      })


    }
  }

  documetn(att:any){

       console.log("111111",att.Attachments[0].Link)
       return window.location.href = att.Attachments[0].Link
  }

}
