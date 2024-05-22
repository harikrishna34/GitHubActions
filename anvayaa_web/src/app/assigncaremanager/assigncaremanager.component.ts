import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from 'src/app/users.service';
import {  UntypedFormGroup, FormControl,FormGroup, UntypedFormBuilder, Validators, FormArray, Form,FormBuilder  } from '@angular/forms';


@Component({
  selector: 'app-assigncaremanager',
  templateUrl: './assigncaremanager.component.html',
  styleUrls: ['./assigncaremanager.component.css']
})
export class AssigncaremanagerComponent {
  RequestID: any
  CustRecID: any
  requestObjData: any = []
  ActiveVendor: any
  ActiveVendorObj: any
  BeneficiaryName: String
  requestDetailsObj: any = {};
  caremanagerData: any
  caremanagerdata:any
  caremanagerdatatobind:any={};
  public areamanagerForm!: FormGroup


  constructor(private userservice: UsersService, private route: Router,private activatedRoute: ActivatedRoute,private spinner: NgxSpinnerService,private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    this.RequestID = this.activatedRoute.snapshot.queryParamMap.get("RequestID");
    this.CustRecID = this.activatedRoute.snapshot.queryParamMap.get("CustRecID");

    this.viewRequestDetails()
   
    
  }
  // submittingareamanagerformbuilder() {
  //   this.areamanagerForm = this.formBuilder.group({
  //     FieldEmployeeID: [''],
  //   })
  // }
  myTasks(){
    this.route.navigate(["Dashboard/Task/MyTask"])
  }
  viewRequestDetails() {
    this.spinner.show()

    this.userservice.viewRequestData(this.RequestID, this.CustRecID).subscribe((Response) => {

      if (Response.code == "S001") {
        this.spinner.hide()
        this.requestDetailsObj = Response.data;
        this.caremanagerdatatobind = Response.data;
        console.log("caremanagerdatatobind",this.caremanagerdatatobind)
       
        for (let i = 0; i < this.requestDetailsObj.CustomerDetails.Beneficiaries.length; i++) {
          if (this.requestDetailsObj.CustomerDetails.Beneficiaries[i].CustID == this.requestDetailsObj.RequestDetails.CustID) {
            this.BeneficiaryName = this.requestDetailsObj.CustomerDetails.Beneficiaries[i].Name
          }
        }
        this.areamanagerdetails()

        this.requestObjData = this.requestDetailsObj.RequestDetails.ActiveVendors.slice(-1)
        this.ActiveVendor = this.requestDetailsObj.RequestDetails.ActiveVendors.filter((Obj: any) => {
          return Obj.Status != "Canceled"
        })
        this.ActiveVendorObj = this.ActiveVendor[0]
      }
    })

  }

  areamanagerdetails() {
    this.userservice.getAllEmployees({"Type":"FieldEmployee",ServiceAreaID:this.requestDetailsObj?.RequestDetails?.ServiceAreaID,CustRecID:this.CustRecID}).subscribe((Response) => {

      if (Response.code == 'S001') {
        console.log("areamanagers",Response.data)
        this.caremanagerdata = Response.data
      } else {
        alert(Response.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }  
  onCareManagerSelected(EmployeeID: any){
    let caremanagerData = {
      "EmployeeID": EmployeeID.target.value,
      "RequestID": this.RequestID
    }
    this.userservice.AssignCareManager(caremanagerData).subscribe((Response) => {

      if (Response.code == "S001") {
        this.spinner.hide()
        alert(Response.message)
    this.route.navigate(["Dashboard/Task/MyTask"])
      } else {
        this.spinner.hide()
        alert(Response.message)
    this.route.navigate(["Dashboard/Task/MyTask"])

      }
    }, (error) => {
      this.spinner.hide()
      alert(error.error.message)

    })
  }
  }

