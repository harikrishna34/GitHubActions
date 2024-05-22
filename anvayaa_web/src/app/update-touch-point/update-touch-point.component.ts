import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UsersService } from '../users.service'
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, FormControl, FormArrayName, Validators,FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SwPush } from "@angular/service-worker";

@Component({
  selector: 'app-update-touch-point',
  templateUrl: './update-touch-point.component.html',
  styleUrls: ['./update-touch-point.component.css']
})
export class UpdateTouchPointComponent implements OnInit{
  ViewCCdbArray:any
  CustRecID: any
  StatusName: string = '';
  Message: string = '';
  SpokeWithWhom: string = '';
  StatusID: string=''
  updateForm: FormGroup;
  ExpID:any
  fpress: any = false
  activeBeneficiaries:any;

  constructor(private userservice: UsersService, private route: Router, private snap: ActivatedRoute, private spinner: NgxSpinnerService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.ExpID = this.snap.snapshot.queryParamMap.get("EmpCusExperienceId");
    this.CustRecID = this.snap.snapshot.queryParamMap.get("CustRecID");
    this.createForm();
    this.CustomerConfigData()
  }
  createForm() {
    this.updateForm = this.formBuilder.group({
      StatusID: ['', Validators.required],
      StatusName: ['', Validators.required],
      Message: ['', Validators.required],
      SpokeWithWhom: ['', Validators.required]
    });
  }

  CustomerArray:any = []
  CustomerConfigData(){
    this.userservice.UpdateCustomerConfigData({"CustRecID":this.CustRecID}).subscribe((response:any) => {
      if (response.code == 'S001') {
      this.ViewCCdbArray = response.data;
      console.log("jjjjjjjjjjjjjjjjjjjyyyyyyyyy",this.ViewCCdbArray)
      this.activeBeneficiaries = this.ViewCCdbArray.Beneficiaries?.filter((detail:any)=>{
        if(detail.Status !== 'InActive'){
         return detail
        }  
     })
        const SponserObj:any = {
            'Name':this.ViewCCdbArray.Name,
            'CustID':this.ViewCCdbArray.CustRecID
            
        }

        this.ViewCCdbArray.Beneficiaries.push(SponserObj)
      



      this.CustRecID = this.ViewCCdbArray.CustRecID;
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
  
  saveChanges() {
    this.fpress = true
    if (this.updateForm.status == "INVALID") {
      return
    }else{

      const payload = this.updateForm.value;
      payload.CustRecID= this.CustRecID;
      this.updateConfigData(payload);
    }
  }

  updateConfigData(payload: any) {
    this.userservice.updateEmpCustomerExpConfigStatus(payload).subscribe((response:any) => {
      if (response.code == 'S001') {
        alert(response.data)
        this.route.navigate(['/Dashboard/Task/MyTask'])
        // Reload the page after displaying the alert
      } else if (response.code == 'S002') {
        alert(response.data);
      } else {
        alert(response.data);
      }
    }, (error) => {
      alert(error.error.data);
    });
  }
  closeInteraction(){
    this.userservice.closeInteractionCustomerConfigData({"EmpCusExperienceId":this.ExpID}).subscribe((response:any) => {
      if (response.code == 'S001') {
        alert(response.message)
        this.route.navigate(['/Dashboard/Task/MyTask'])
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
  updateStatusName(event: Event) {
    const target = event.target as HTMLSelectElement;
    const statusID = target.value;
    if (statusID === 'AKCAFBD000000') {
        this.updateForm.patchValue({
            StatusName: 'ISSUE'
        });
    } else if (statusID === 'AKCE0000') {
        this.updateForm.patchValue({
            StatusName: 'ALL OK'
        });
    }
  }
  
}
