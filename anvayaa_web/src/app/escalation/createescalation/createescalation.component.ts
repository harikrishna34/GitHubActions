import { Component } from '@angular/core';
import { UsersService } from '../../users.service'
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import {
  UntypedFormGroup,
  FormControl,
  UntypedFormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
@Component({
  selector: 'app-createescalation',
  templateUrl: './createescalation.component.html',
  styleUrls: ['./createescalation.component.css']
})

export class CreateescalationComponent {
  constructor(private UsersService: UsersService, private router: Router, private spinner: NgxSpinnerService, private FormBuilder: UntypedFormBuilder) { }

  public CustomerEscalationsForm: UntypedFormGroup;
  ngOnInit(): void {

    this.customerDetails()
    this.ViewEscalationTypes()
    this.ViewEscalationDepartment()
    this.CustomerEscalationsForm = this.FormBuilder.group({
      CustomerID: ['', []],
      Issue: ['', [Validators.required]],
      Comment: ['', [Validators.required]],
      Department: ['', [Validators.required]],
      RelatedTo: ['', [Validators.required]]

    })
  }

  CustomerDetails: any = []
  keyword: any = ''
  CustRecID: any;
  customerDetailscard: boolean = false
  creatCustomerButton: boolean = false
  escalationsTypes: any = []
  CreateEscalationbtn: boolean = false
  EscalationObject: any = {}
  escalationsDepartment: any = []
  customerDetailsData: any = {}

  Related: any = ["Customer", "Internal"]

  selectEvent(data: any) {
    this.CustRecID = data.CustRecID
    this.customerDetailsData = data

    console.log("fff", this.CustRecID)
  }
   isInternal(): boolean {
     const relatedToControl = this.CustomerEscalationsForm.get('RelatedTo');
     return relatedToControl?.value === 'Customer';
    }

isCustomerRelated(): boolean{
   const relatedToControl = this.CustomerEscalationsForm.get('RelatedTo');
  return relatedToControl?.value === 'Customer';
}

  customerDetails() {
    this.keyword = 'Name'
    this.UsersService.CustomerDetailsData().subscribe((customerDetails) => {
      if (customerDetails.code == "S001") {
        this.CustomerDetails = customerDetails.data
      } else {
        alert(customerDetails.data)
      }
    }, function (error) {
      alert(error.error.data)
    })

  }
  onChangeSearch(data: any) {

    console.log("data", data)
    this.customerDetailsData = {}
    if (data == undefined || data.length < 3) {
      return
    }


    this.keyword = null
    if (!isNaN(data) == false) {
      this.keyword = "Name"
    } else {
      this.keyword = "MobileNumber"
    }


    this.UsersService.SearchUserWithKey({ data }).subscribe((customerDetails) => {

      this.CustomerDetails = []
      if (customerDetails.code == "S001") {
        this.CustomerDetails = customerDetails.data
      } else {
        alert(customerDetails.data)
      }
    }, function (error) {
      alert(error.error.data)
    })

    this.creatCustomerButton = false
    for (let i = 0; i < this.CustomerDetails.length; i++) {
      if (data != this.CustomerDetails[i].Name) {
        this.creatCustomerButton = true
      } else {
        if (data.length == "") {
          this.creatCustomerButton = false

        }
      }
    }

  }
  onFocused(data: any) {

    console.log("data", data)
    this.CustomerDetails = false
    this.customerDetailsData = {}

  }




  ViewEscalationTypes() {
    this.UsersService.ViewEscalationTypes().subscribe((escalationsTypes) => {

      console.log("escalationsTypes", escalationsTypes)
      if (escalationsTypes.code == "S001") {
        this.escalationsTypes = escalationsTypes.data
      } else {
        alert(escalationsTypes.data)
      }
    }, function (error) {
      alert(error.error.data)
    })

  }
  SaveEscalation() {
    this.CreateEscalationbtn = true

    this.spinner.show()
    if (this.CustomerEscalationsForm.status === "INVALID") {
      this.spinner.hide()

    } else {
      this.EscalationObject['CustRecID'] = this.CustomerEscalationsForm.value.CustomerID.CustRecID
      this.EscalationObject['Issue'] = this.CustomerEscalationsForm.value.Issue
      this.EscalationObject['Comments'] = this.CustomerEscalationsForm.value.Comment
      this.EscalationObject['Department'] = this.CustomerEscalationsForm.value.Department
      this.EscalationObject['RelatedTo'] = this.CustomerEscalationsForm.value.RelatedTo
      this.UsersService.createCustomerEscalation(this.EscalationObject).subscribe((CustoemerEscalationData) => {
        if (CustoemerEscalationData.code == "S001") {
          this.spinner.hide()
          alert(CustoemerEscalationData.message)
          this.router.navigate(['/Dashboard/Escalation/ViewAllEscalations'])
        } else {
          alert(CustoemerEscalationData.data)
        }

      })
    }
    console.log('Form Values:', this.CustomerEscalationsForm.value)
  }

  cancelButton() {
    this.router.navigate(['/Dashboard/Escalation/ViewAllEscalations'])

  }

  ViewEscalationDepartment() {
    this.UsersService.ViewEscalationDepartment().subscribe((escalationsTypes) => {

      console.log("escalationsTypes", escalationsTypes)
      if (escalationsTypes.code == "S001") {
        this.escalationsDepartment = escalationsTypes.data
      } else {
        alert(escalationsTypes.data)
      }
    }, function (error) {
      alert(error.error.data)
    })

  }

}
