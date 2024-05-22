import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from '../../users.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form } from '@angular/forms';

@Component({
  selector: 'app-partner-revenue',
  templateUrl: './partner-revenue.component.html',
  styleUrls: ['./partner-revenue.component.css']
})
export class PartnerRevenueComponent implements OnInit {
  RevenueRecords: any
  File: any

  UpdateStatusForm!: UntypedFormGroup
  public billUpdate!: UntypedFormGroup;
  invoiceID: any;

  @ViewChild('fileUploader') fileUploader: ElementRef;

  constructor(private spinner: NgxSpinnerService, private userService: UsersService, private route: Router, private activatedRoute: ActivatedRoute, private FormBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {


    this.billUpdate = this.FormBuilder.group({
      ActualDaysServed: ['']
    })

    this.spinner.show()
    this.userService.PartnerRevenueRecords().subscribe((respoonse) => {
      if (respoonse.code == "PD01") {
        this.spinner.hide();
        alert("You Don't Have a Permission")
        return;
      }
      if (respoonse.code == "S001") {
        this.spinner.hide();
        this.RevenueRecords = respoonse.data.Records;
      } else {
        this.spinner.hide();
        alert(respoonse.data)
        return;
      }


    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })
  }

  update() {
    this.route.navigate(['/revenue/updateRevenue'])
  }

  onUpadteClick(revenueRecord: any) {
    this.spinner.show();
    this.invoiceID = revenueRecord.InvoiceID;
    this.spinner.hide();
  }
  onuploadtaxFile(img: any) {
    if (img.target.files.length > 0) {
      this.File = img.target.files[0];
    }
  }

  uploadBill() {
    this.spinner.show();
    this.fileUploader.nativeElement.value = null
    let billUpdate = new FormData()
    billUpdate.append("File", this.File);
    billUpdate.append("InvoiceID", this.invoiceID);
    billUpdate.append("ActualDaysServed", this.billUpdate.value.ActualDaysServed);


    this.userService.UpdatePartnerRevenueRecord(billUpdate).subscribe((requestData) => {
      if (requestData.code == "S001") {
        this.spinner.hide();
        alert(requestData.data)
      } else {
        this.spinner.hide();
        alert(requestData.data)
        this.fileUploader.nativeElement.value = null
      }
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
      this.fileUploader.nativeElement.value = null
    })
  }

}
