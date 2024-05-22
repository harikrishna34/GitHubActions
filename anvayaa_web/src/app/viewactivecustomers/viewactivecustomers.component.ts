import { Component, OnInit, Pipe } from '@angular/core';

import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from '../users.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormlyTemplate } from '@ngx-formly/core/lib/components/formly.template';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';

import * as moment from 'moment';

@Component({
  selector: 'app-viewactivecustomers',
  templateUrl: './viewactivecustomers.component.html',
  styleUrls: ['./viewactivecustomers.component.css']
})
export class ViewactivecustomersComponent implements OnInit {
  profileData: any = []
  profileDatas: any = []
  name: string
  NodataTable: boolean = false
  emplist: any = []
  filteredsupportName: any
  filesdata: any = []
  proData: any = []
  proDatas: any = []
  public SearchForm: UntypedFormGroup;
  cityData: any
  caremanagerData: any
  supportData: any
  searchText = '';
  p:any;
//  a:any
  // Limit:10;
  // pageNumber:1;

  constructor(private UsersService: UsersService, private Router: Router, private spinner: NgxSpinnerService, private FormBuilder: UntypedFormBuilder, private DatePipe: DatePipe) { }

  ngOnInit(): void {

    this.cityDetails()
    this.caremanagerDetails()
    this.supportDetails()
   
    
    this.SearchForm = this.FormBuilder.group({
      CityID: ['', Validators.required],
      DedicatedFieldEmployeeID: ['', Validators.required],
      SupportExecutiveID: ['', Validators.required],
      Status: ['', Validators.required],
    })
  }

  cleardata() {
    this.profileData = []
  }
  cleardatas() {
    this.profileDatas = []
  }


  FormObjs:any={}
  
  activecustomerRequests(...data:any) {
    console.log(data?.Limit);
    if(typeof data[0]==="object"){
      data=data[0]
    };
    console.log(data,"Initial");
    this.NodataTable = false;
    this.spinner.show()
    this.profileData = []

      this. FormObjs = { 
          'ServiceAreaID':this.SearchForm.value.CityID,
          'DedicatedFieldEmployeeID':this.SearchForm.value.DedicatedFieldEmployeeID,
          'SupportExecutiveID':this.SearchForm.value.SupportExecutiveID,
          'Status':this.SearchForm.value.Status,
          'Limit':!data?.Limit?10:data.Limit,
          'pageNumber':!data?.pageNumber?1:data.pageNumber,
        }
      

    this.UsersService.getactivecustomers(this.FormObjs).subscribe((response) => {

      this.spinner.hide()
      if (response.code == "S001") {
        this.profileData = response.data
        // this.proData = response.data
        this.SearchForm.reset()
        this.spinner.hide()
        // this.employeesdetails()
      }
      else {
        this.NodataTable = true;
        this.SearchForm.reset()
        this.spinner.hide();
        alert(response.data)
      }
    }, (error) => {
      this.spinner.hide()
      this.NodataTable = true
      alert(error.error.data);
      this.SearchForm.reset()
      

    }
    )
  }
  myfamilyRequests(...data:any){
    console.log(data?.Limit);
    if(typeof data[0]==="object"){
      data=data[0]
    };
    console.log(data,"Initial");

    this.NodataTable= false;
    this.spinner.show()
    this.profileDatas = []

      this. FormObjs = { 
          'ServiceAreaID':this.SearchForm.value.CityID,
          'DedicatedFieldEmployeeID':this.SearchForm.value.DedicatedFieldEmployeeID,
          'SupportExecutiveID':this.SearchForm.value.SupportExecutiveID,
          'Status':this.SearchForm.value.Status,
          'Limit':!data?.Limit?10:data.Limit,
          'pageNumber':!data?.pageNumber?1:data.pageNumber,
        }
      console.log(this.FormObjs,"ssssss")

    this.UsersService.getmyfam(this.FormObjs).subscribe((response) => {

      this.spinner.hide()
      if (response.code == "S001") {
        this.profileDatas = response.data
        console.log("length",this.profileDatas)
        // this.proDatas = response.data
        // console.log("enti edi asalla",this.proDatas)
        this.SearchForm.reset()
        this.spinner.hide()
        // this.employeesdetails()
      }
      else {
        this.NodataTable = true;
        this.SearchForm.reset()
        this.spinner.hide();
        alert(response.data)
      }
    }, (error) => {
      this.spinner.hide()
      this.NodataTable = true
      alert(error.error.data);
      this.SearchForm.reset()
      

    }
    )
  }
  cityDetails() {
    this.UsersService.cityApi().subscribe((response) => {

      if (response.code == 'S001') {
        console.log("city",response.data)
        this.cityData = response.data
      } else {
        alert(response.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }  
  supportDetails() { 
    this.UsersService.getAllEmployees({"Type":"CustomerCareEmployee"}).subscribe((response) => {
      if (response.code == 'S001') {
        console.log("support",response.data)
        this.supportData = response.data
       
      } else {
        alert(response.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }
  caremanagerDetails() {
    this.UsersService.getAllEmployees({"Type":"FieldEmployee"}).subscribe((response) => {

      if (response.code == 'S001') {
        console.log("caremanager",response.data)
        this.caremanagerData = response.data
         
      } else {
        alert(response.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }
  
// data.component.ts
// ...

// prevPage() {
//   if (this.FormObjs.pageNumber > 1) {
//     this.FormObjs.pageNumber--;
//     this.myfamilyRequests();
//   }
// }

// nextPage() {
//   // if (this.FormObjs.pageNumber > 1) {
//   //   this.FormObjs.pageNumber++
//   //   this.myfamilyRequests();
//   // }
//   this.FormObjs.pageNumber++;
//   this.myfamilyRequests();
// }
handlePageNumber(e:any){
console.log("My Page change",e)
  const paramsForFamilyRequests:any={};
  paramsForFamilyRequests.pageNumber=e;
  paramsForFamilyRequests.Limit="10";
  this.myfamilyRequests(paramsForFamilyRequests);
}
details(data:any,type: any){
  this.Router.navigate(['Dashboard/Task/customerdetails'] , { queryParams: { CustRecID: data.CustRecID,type} })
  
}

}
