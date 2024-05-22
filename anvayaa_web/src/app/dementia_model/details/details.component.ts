import { Component, OnInit,ViewChild } from '@angular/core';
import { UsersService } from '../../users.service'
import { FormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form } from '@angular/forms';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { first, retryWhen } from 'rxjs';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DatePipe } from '@angular/common'
import * as moment from 'moment';
import { conforms } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
// import { Console } from 'console';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  
  @ViewChild('WellbeingFormClose') WellbeingFormClose: any;

  CustRecID: any
  CustID: any
  FeedbackID:String=""
  Customerdata: any = {}
  Demographics: any = {}
  Other_Conditions: any = {}
  Physical_impairmentData: any = []
  GeneralAbilities: any = {}
  Biography: any = {}
  Personal_Life: any = {}
  Favourite_foods:any = []
  Dietary_Habits:any = {}
  Stages:any=[]
  DementiaQuestions:any=[]
  WellBeingForms:any=[]
  WellBeingFormData:any={}
  ComletedRequests:any=[]
  RequestID:any;
  constructor(private userservice: UsersService, private router: Router, private route: ActivatedRoute, private formBuilder: UntypedFormBuilder, private DatePipe: DatePipe, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.CustRecID = this.route.snapshot.queryParamMap.get("CustRecID")
    this.CustID = this.route.snapshot.queryParamMap.get("CustID")
   
    this.dementiaQuestions()
    this.viewdementiadata()
  }

  dementiaStages(){
    this.userservice.dementiaStages().subscribe((response) => {
      if(response.code =="S001"){
        this.Stages = response.data;
      }else{
        this.Stages = []
      }
    })

  }

  dementiaQuestions() {

    this.userservice.dementiaQuestions("General_Abilities").subscribe((response) => {

      if(response.code =="S001"){
        this.DementiaQuestions = response.data;
      }else{
        this.DementiaQuestions = []
      }
      
    })
  }



  viewdementiadata() {


    this.userservice.dementiaInitialAssesmentData(this.CustRecID, this.CustID).subscribe((response) => {
      if (response.code == "S001") {
        this.Customerdata = response.data;
        this.Demographics = this.Customerdata?.Demographics[0];
        this.Other_Conditions = this.Customerdata?.MedicalHistory[0].Other_Conditions;
        this.Physical_impairmentData = this.Customerdata?.MedicalHistory[0]?.Physical_Impairment?.Physical_impairmentData;
        this.GeneralAbilities = this.Customerdata?.GeneralAbilities[0];
        this.Biography = this.Customerdata?.Biography[0];
        this.Personal_Life = this.Customerdata?.Biography[0].Personal_Life;
        this.Favourite_foods = this.Customerdata?.Biography[0].Dietary_Habits.Favourite_foods
        this.Dietary_Habits = this.Customerdata?.Biography[0].Dietary_Habits.Timings_of_meals

     
        var Impaired=[{"Level":"0","Label":"Not Impaired"},{"Level":"1","Label":"Low"},{"Level":"2","Label":"Medium"},{"Level":"3","Label":"High"}]
        for (let i = 0; i < this.Physical_impairmentData.length; i++) {
          for(let im in Impaired){
            if(Impaired[im].Level ==this.Physical_impairmentData[i].MaxApplicableLevel){
              this.Physical_impairmentData[i].Level = Impaired[im].Label;
            }
          }
        }

        for (let i = 0; i < this.DementiaQuestions.length; i++) {
          this.DementiaQuestions[i].Answer = ''
          this.DementiaQuestions[i].Comment = ''
  
          for (let j = 0; j < this.GeneralAbilities.length; j++) {
           if(this.GeneralAbilities[j].QuestionID == this.DementiaQuestions[i].QuestionID){
            this.GeneralAbilities[i].Question =this.DementiaQuestions[i].Question
           }
          }
        }
      }
    



    }, (error) => {
      alert(error.error.data)
    })

  }

  feedback(){

    this.userservice.wellbeingfrom(this.CustRecID, this.CustID).subscribe((response) => {
      if (response.code == "S001") {
        this.WellBeingForms=response.data;
      }else{
        this.WellBeingForms=[];
      }

    }, (error) => {
      alert(error.error.data)
    })

  }

  
  Requests(){

    this.userservice.DemetiaRequests(this.CustRecID, this.CustID).subscribe((response) => {
      if (response.code == "S001") {
        this.ComletedRequests=response.data;
      }else{
        this.ComletedRequests=[];
      }

    }, (error) => {
      alert(error.error.data)
    })

  }

  ViewRequest(RequestID:any,CustID:1){


    this.router.navigate(['/Dashboard/dementia/DementiaRequest'],{ queryParams: {RequestID :RequestID,CustID:CustID} } );
    return

    this.RequestID=RequestID;
    this.CustID=CustID

    this.userservice.ViewDemenitaRequest({"RequestID":this.RequestID,"CustID":this.CustID}).subscribe((response) => {
      if (response.code == "S001") {
        console.log(response.data)
        //this.WellbeingFormClose.nativeElement.click();

      }else{
       // this.WellBeingForms=[];
      }

    }, (error) => {
      alert(error.error.data)
    })

  }

  viewfeedback(FeedbackID:any){

    this.FeedbackID=FeedbackID;

    this.userservice.ViewWellbeingfrom(this.FeedbackID).subscribe((response) => {
      if (response.code == "S001") {
        this.WellBeingFormData=response.data;
        //this.WellbeingFormClose.nativeElement.click();

      }else{
       // this.WellBeingForms=[];
      }

    }, (error) => {
      alert(error.error.data)
    })

  }

}
