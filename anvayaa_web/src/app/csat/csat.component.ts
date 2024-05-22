import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { UsersService } from '../users.service'
import { Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common'
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, UntypedFormArray,AbstractControl } from '@angular/forms';
import * as moment from 'moment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-csat',
  templateUrl: './csat.component.html',
  styleUrls: ['./csat.component.css']
})
export class CsatComponent implements OnInit {
  Csat: UntypedFormGroup;
  Options:any = []
  optionstab:boolean = false
 
  constructor(private location: Location, private userservice: UsersService, private route: Router, private spinner: NgxSpinnerService, private Router: Router, private UsersService: UsersService, private FormBuilder: UntypedFormBuilder, private DatePipe: DatePipe) { }

  ngOnInit(): void {
    this.Csat = this.FormBuilder.group({
      QuestionName: [''],
      QuestionType: [''],
      QuestionText: [''],
      QuestionFor: [''],
      Frequency: [''],
      IsRating: [''],
      Options: [''],
      phones: this.FormBuilder.array([
        this.FormBuilder.control(null)
      ])
    })
  }
  savecsat(){

    this.Csat.value.Options=this.Options
    console.log("sss",this.Csat.value)
    
    this.userservice.savecsatques().subscribe((response) => {
      if (response.code == "S001") {
        // this.Csat.value.Options=this.Options
        alert(response.data)
        this.spinner.hide();

      } else {
        this.spinner.hide();
        alert(response.data)
      }
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })
  }
  answers(data:any){
console.log("answers",data.target.value)
this.Options.push({"Answer":data.target.value})
  }
  addnew(): void {
    (this.Csat.get('phones') as UntypedFormArray).push(
      this.FormBuilder.control(null)
    );

    console.log("super bava",this.Csat.get('phones'))
  }

  remove(index:any) {
    (this.Csat.get('phones') as UntypedFormArray).removeAt(index);
  }

  getPhonesFormControls(): AbstractControl[] {

  
    return (<UntypedFormArray> this.Csat.get('phones')).controls
  }
  options(data:any){
    console.log("options kavali",data.target.value)
    if(data.target.value == 'Radio' || data.target.value == 'CheckBox'){
      this.optionstab = true
    }else{
      this.optionstab = false
    }


  }
}
