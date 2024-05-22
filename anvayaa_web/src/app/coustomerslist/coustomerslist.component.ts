import { Component, OnInit,ViewChild } from '@angular/core';
import { UsersService } from'../users.service';
import {ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form } from '@angular/forms';


@Component({
  selector: 'app-coustomerslist',
  templateUrl: './coustomerslist.component.html',
  styleUrls: ['./coustomerslist.component.css']
})
export class CoustomerslistComponent implements OnInit {
  @ViewChild('Benclose') Benclose: any;


  count:any;
  CustomerID:any
  list:any;
  asereScreen:any
  CustRecID:any
  inputFieldsdata:any
  step:number=1;
  token: any;
  nodatatemp:boolean = false;
  beneficiariesArray:any = []
  RecordID:any
  InputDrop:boolean=true
  constructor(private formBuilder: UntypedFormBuilder,private userservice:UsersService,private route:Router,private snap:ActivatedRoute, private spinner:NgxSpinnerService) {}

 public beneficiarysixinone:UntypedFormGroup

  ngOnInit(): void {
    this.spinner.show();
    this.submitbeneficairyforsixinone()
    this.token = localStorage.getItem('x-fiftyaccess-token')
    this.userservice.customerlist().subscribe((userlist) =>{      
      if(userlist.code == "S001"){
        this.list=userlist.data;
      
        this.spinner.hide();

      }else if(userlist.code == "PD01"){
        alert(userlist.data)
        this.spinner.hide();
        
      } else{
        this.spinner.hide();
        alert(userlist.message)
       

      }
    },(error)=>{
      this.spinner.hide();
      alert(error.error.data)
    })
   

  }
 
   configpage(data:any){
     
    console.log(data)
    this.route.navigate(["/configform"],{ queryParams: {CustRecID :data.CustRecID,step:1} })

   }

   detailspage(data:any){

    console.log(data),
    this.route.navigate(["/customerdetails"],{ queryParams: {CustRecID :data.CustRecID} })

   }

   aserseScreen(data:any){
     
    this.route.navigate(["/Aserse"],{queryParams: {CustRecID :data.CustRecID}})
   }


   ConfigurationForm(data:any){

    this.route.navigate(["/updateConfigurationForm"],{ queryParams: {step:this.step,CustRecID :data.CustRecID} })
   }

   watchDetails(data:any){

    console.log("watch details ",data)
    this.route.navigate(["Dashboard/asers/customerdetailsview"],{ queryParams: {CustRecID :data.CustRecID} })

   }

   remainders(data:any){
    this.route.navigate(["/Dashboard/remainders/viewRemainders"],{ queryParams: {CustRecID :data.CustRecID} })
      
   }


submitbeneficairyforsixinone() {
  this.beneficiarysixinone = this.formBuilder.group({
    beneficiaries: ['', [Validators.required]],
 
  })
}
findbeneficiaries(data:any){
console.log("ppp",data)
this.RecordID = data.CustRecID 
if(data.Beneficiaries.length!=0){
  this.nodatatemp = false
  this.InputDrop = true
  console.log("surya",this.beneficiariesArray)
  this.userservice.viewUserDetails({CustRecID:data.CustRecID}).subscribe((response) =>{      
    if(response.code == "S001"){
   console.log('ccccc',response.data.customer.Beneficiaries)
   this.beneficiariesArray=response.data.customer.Beneficiaries
      this.spinner.hide();

    } else{
      this.spinner.hide();
      alert(response.data)
     

    }
  },(error)=>{
    this.spinner.hide();
    alert(error.error.data)
  })
 
}else{
  this.nodatatemp = true
 this.InputDrop = false
}
  
}


sixinonemodule(){
//  this.submitbeneficairyforsixinone()
 this.Benclose.nativeElement.click();
 
  this.route.navigate(["/Dashboard/sixinoneModule/sixinonecustomerdashboard"],{ queryParams: {CustID :this.beneficiarysixinone.value.beneficiaries,CustRecID:this.RecordID}}
)


}
}
