import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, FormControl, FormArrayName, Validators } from '@angular/forms';
import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-ongoingrequests',
  templateUrl: './ongoingrequests.component.html',
  styleUrls: ['./ongoingrequests.component.css']
})
export class OngoingrequestsComponent implements OnInit {
  [x: string]: any;
  ongoinglist: any = []
  public pirceUpdateForm: UntypedFormGroup
  vendorprice: boolean = true
  inputValue: any
  indexx: any
  sno: any
  indexvalue: any
  details: any = []
  showfield: boolean = true
  nodata:boolean = false
  IsPriceToAnvayaa: any
  AnvayaaPrice: any
  VendorPrice: any
  TarrifType:any
  priceForm: any = {}
  constructor(private userservice: UsersService, private route: Router, private snap: ActivatedRoute, private spinner: NgxSpinnerService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {

    this.ongoingJobList()

  }



  ongoingJobList() {

    this.spinner.show();
    this.userservice.ongoingJobsData().subscribe((joblist) => {

      if (joblist.code == "S001") {
        this.ongoinglist = joblist.data
        this.spinner.hide();
      }else if(joblist.code == "PD01"){
        alert(joblist.data)
        this.spinner.hide();
        
      }else if(joblist.code == "S002"){
        this.nodata = true
         this.spinner.hide();
        
      }else{
        this.nodata = false
        this.spinner.hide();
        alert(joblist.message)
      }
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })
  }



  data(data: any, sno: any) {
    this.inputValue = data.target.value
    this.indexvalue = sno
  }



  ongoingUpdate(form: any, list: any) {


    form.RequestID = list.RequestID
    if (form.IsPriceToAnvayaa == "No") {
      form.AnvayaaPrice = form.VendorPrice
    }

  
    this.userservice.updateOngoingJobs(form).subscribe((updateData) => {

      if (updateData.code == "S001") {

        alert(updateData.data)
        this.ongoingJobList()
      } else {
        this.spinner.hide();
        alert(updateData.message)
      }
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })

  }


}
