import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UsersService } from '../../users.service'
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UntypedFormGroup, FormControl,FormGroup, UntypedFormBuilder, Validators, FormArray, Form,FormBuilder } from '@angular/forms';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';




@Component({
  selector: 'app-viewcustomerdetails',
  templateUrl: './viewcustomerdetails.component.html',
  styleUrls: ['./viewcustomerdetails.component.css']
})
export class ViewcustomerdetailsComponent implements OnInit {
  @ViewChild('employeeeedetails') employeeeedetails: any;
  @ViewChild('customerclose') customerclose: any;
  @ViewChild('memberboardingclose') memberboardingclose: any;
  @ViewChild('beneficiaryclose') beneficiaryclose: any;



  public AddCustomerRequirements!: UntypedFormGroup
  public ScheduleMemberOnBoarding!: UntypedFormGroup
  public AddingBeneficiaryone!: UntypedFormGroup
  public AddingBeneficiarytwo!: UntypedFormGroup

  public areamanagerForm!: FormGroup
  public additionalmembers!: FormGroup
  
  CustRecID: any
  customer: any 
  type: any
  employees: any =[]
  EmployeeID: string = ''
  EmpObj: any
  Empobj: any
  EmpObject: any
  caremanager: boolean = false
  backcaremanager: boolean = false
  SupportExecutive: boolean = false
  CustomerRequirements: boolean = false
  MemberOnBoarding: boolean = false
  Benficiary: boolean = false
  Benficiarytwo: boolean = false
  customerpress: boolean = false
  mbpress: boolean = false
  benpress: boolean = false
  bentwopress: boolean = false
  ReadMore: boolean = true
  BeneficiariesObj: any = {}
  skip: boolean = true
  showAge: any
  startdate = new Date();
  // DOB: any
  caremanagerData: any
  areamanagersobj:any=[];
  additonalmemsobj:any;
  addmemFormObjs:any={}
  //hiding info box
  visible: boolean = false
  info:any



	separateDialCode = true;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates];
  CountryName:boolean=true
  CityName:any
	// separateDialCode = false;
	// SearchCountryField = SearchCountryField;
	// CountryISO = CountryISO;
  // PhoneNumberFormat = PhoneNumberFormat;
	// preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  grID:any
  constructor(private userservice: UsersService, private datePipe: DatePipe, private route: Router, private snap: ActivatedRoute, private spinner: NgxSpinnerService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.CustRecID = this.snap.snapshot.queryParamMap.get("CustRecID");
    this.type = this.snap.snapshot.queryParamMap.get("type");
    this.customerdetails()
    this.areamanagerdetails()
    
    const guid = "gr"+this.CustRecID
    this.grID = guid.toLowerCase()
       console.log("hhhhh",this.grID)
    if (this.type == "AddCareManager") {
      this.caremanager = true
    } else {
      this.caremanager = false
    }
    if (this.type == "AddBackCareManager") {
      this.backcaremanager = true

    } else {
      this.backcaremanager = false
    }
    if (this.type == "Add_Care_Coordinator") {
      this.SupportExecutive = true

    } else {
      this.SupportExecutive = false
    }
    if (this.type == "AddCustomerRequirements") {
      this.CustomerRequirements = true

    } else {
      this.CustomerRequirements = false
    }
    if (this.type == "ScheduleMemberOnBoarding") {
      this.MemberOnBoarding = true

    } else {
      this.MemberOnBoarding = false
    }
    if (this.type == "AddBeneficiary") {
      this.Benficiary = true

    } else {
      this.Benficiary = false
    }


    //this.getallemployeesdetails()
    this.submittingCustomerrequirementsformbuilder()
    this.submittingmemberonboardingformbuilder()
    this.submittingbeneficiaryoneformbuilder()
    this.submittingbeneficiarytwoformbuilder()
    this.submittingareamanagerformbuilder()
    this.submittingadditionalformbuilder()


  }
  submittingCustomerrequirementsformbuilder() {
    this.AddCustomerRequirements = this.formBuilder.group({
      Type: ['', [Validators.required]],
      Comments: ['', [Validators.required]],
      CustRecID: ['', []],
    })
  }
  submittingmemberonboardingformbuilder() {
    this.ScheduleMemberOnBoarding = this.formBuilder.group({
      ScheduledDate: ['', [Validators.required]],
      CustRecID: ['', []],
      FieldEmployeeID: ['', [Validators.required]],
      BackUpFieldEmployeeID: ['', []],
      Note: ['', [Validators.required]],
    })
  }
  submittingbeneficiaryoneformbuilder() {
    this.AddingBeneficiaryone = this.formBuilder.group({
      Name: ['', [Validators.required]],
      Age: ['', []],
      DOB: ['', []],
      MobileNumber: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Landmark: ['', [Validators.required]],
      ProfileIndex: ['', []],
    })
  }
  submittingbeneficiarytwoformbuilder() {
    this.AddingBeneficiarytwo = this.formBuilder.group({
      Name: ['', [Validators.required]],
      Age: ['', []],
      DOB: ['', []],
      MobileNumber: ['', []],
      Gender: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      LandMark: ['', [Validators.required]],
      ProfileIndex: ['', [Validators.required]],
    })


  }

  submittingareamanagerformbuilder() {
    this.areamanagerForm = this.formBuilder.group({
      DedicatedFieldEmployeeID: [''],
    })


  }
  submittingadditionalformbuilder() {
    this.additionalmembers = this.formBuilder.group({
      FirstName: [''],
      LastName: [''],
      EmailID: ['',Validators.pattern('^[(a-z)(A-Z)(1-9)(.)]+@+[a-z]+.+[a-z]{2,}')],
      Type: [''],
      Status: [''],
      CountryCode: [''],
      CountryName: [''],
      MobileNumber: ['',[Validators.required]],
      CustRecID: [''],
    })


  }

  customerdetails() {
    this.spinner.show()
    this.userservice.modifieduserdetails({ "CustRecID": this.CustRecID }).subscribe((response) => {
      this.spinner.hide()
      this.customer = response.data
    
      console.log("em data edi aslla =>",this.customer?.AdditionalMembers[0]?.FirstName)

      this.customer = this.customer?.AdditionalMembers.filter((obj:any)=>{
        if(obj.Status == 'Active'){
         return obj
        }
     })

console.log("em iendi antav", this.customer)

      if (response.code == 'S001') {
        
      } else {
        alert(response.data)
        this.route.navigate(["Dashboard/Task/MyTask"])

      }
    }, (error) => {

      // this.spinner.hide()

      alert(error.error.data)
    })

  }
  getallemployeesdetails() {

    if (this.type == "AddCareManager" || this.type == "AddBackCareManager" || this.type == "ScheduleMemberOnBoarding") {
      this.Empobj = {
        "Type": "FieldEmployee",
        "ServiceAreaID": this.customer?.CustomerPackageObj?.ServiceAreaID,
        "CustRecID": this.CustRecID
      }
    } else if (this.type == "Add_Care_Coordinator") {
      this.Empobj = {
        "Type": "customercareemployee",
        "ServiceAreaID": this.customer?.CustomerPackageObj?.ServiceAreaID,
        "CustRecID": this.CustRecID
      }
    }


    this.userservice.getAllEmployees(this.Empobj).subscribe((response) => {
      

      if (response.code == 'S001') {
        if(this.type == "AddBackCareManager"){
          
          for(let emp in response.data){

            if(this.customer.DedicatedFieldEmployeeID != response.data[emp].EmployeeID){
              this.employees.push(response.data[emp])

            }
          }
          

        }else{
          this.employees = response.data

        }
        
      } else {
        alert(response.data)

      }
    }, (error) => {

      // this.spinner.hide()

      alert(error.error.data)
    })
  }
  saveempdetails() {



    if (this.EmployeeID.length == 0) {
      alert("Select Employee")
      return
    }

    if (this.type == "AddCareManager") {
      this.EmpObj = {
        "PlanSubscriptionAlerts": "true",
        "CustRecID": this.CustRecID,
        "DedicatedFieldEmployeeID": this.EmployeeID
      }
    } else if (this.type == "AddBackCareManager") {
      this.EmpObj = {
        "PlanSubscriptionAlerts": "true",
        "CustRecID": this.CustRecID,
        "BackUpFieldEmployeeID": this.EmployeeID
      }
    } else {
      this.EmpObj = {
        "PlanSubscriptionAlerts": "true",
        "CustRecID": this.CustRecID,
        "SupportExecutiveID": this.EmployeeID

      }

    }
    this.userservice.saveandupdatecaremanager(this.EmpObj).subscribe((HttpResponse) => {
      if (HttpResponse.code == 'S001') {
        alert(HttpResponse.data)
        this.route.navigate(["Dashboard/Task/MyTask"])

        this.employeeeedetails.nativeElement.click();
        this.customerdetails()
      } else {
        alert(HttpResponse.data)

      }
    }, (error) => {

      // this.spinner.hide()

      alert(error.error.data)
    })
  }
  addingtaskdetails(type: string) {
    this.type = type

  }
  savecustomerdetails() {
    this.customerpress = true
    this.AddCustomerRequirements.value.CustRecID = this.CustRecID

    if (this.AddCustomerRequirements.status == "INVALID") {
      return
    }


    this.userservice.AddCustomerRequirements(this.AddCustomerRequirements.value).subscribe((HttpResponse) => {
      if (HttpResponse.code == 'S001') {
        this.customerdetails()
        alert(HttpResponse.data)
        this.route.navigate(["Dashboard/Task/MyTask"])

        this.customerclose.nativeElement.click();
      } else {
        alert(HttpResponse.data)

      }
    }, (error) => {

      // this.spinner.hide()

      alert(error.error.data)
    })
    this.customerpress = false


    this.submittingCustomerrequirementsformbuilder()

  }
  savememberboarding() {
    this.mbpress = true


    this.ScheduleMemberOnBoarding.value.CustRecID = this.CustRecID

    if (this.ScheduleMemberOnBoarding.status == "INVALID") {
      return
    }

    this.userservice.HealthProfile(this.ScheduleMemberOnBoarding.value).subscribe((HttpResponse) => {
      if (HttpResponse.code == 'D003') {
        alert(HttpResponse.data)
        this.route.navigate(["Dashboard/Task/MyTask"])
        this.customerdetails()
        this.getallemployeesdetails()
}else if (HttpResponse.code == 'D002') {
        alert(HttpResponse.data)
        this.route.navigate(["Dashboard/Task/MyTask"])
        this.customerdetails()
        this.getallemployeesdetails()
 } else {
        alert(HttpResponse.data)
      }
    }, (error) => {

      // this.spinner.hide()

      alert(error.error.data)

    })
    this.mbpress = false
    this.submittingmemberonboardingformbuilder()
    this.memberboardingclose.nativeElement.click();


  }
  onclick() {
    this.benpress = true

    if (this.AddingBeneficiaryone.status == "INVALID") {
      alert("Enter Details")
      return
    }



    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visible = !this.visible

    // this.benpress = false

    this.bentwopress = false

    this.submittingbeneficiarytwoformbuilder()
    if (this.AddingBeneficiarytwo.value.Name.length < 0 || this.AddingBeneficiarytwo.value.Gender.length < 0 || this.AddingBeneficiarytwo.value.MobileNumber.length < 0 || this.AddingBeneficiarytwo.value.Age.length < 0 || this.AddingBeneficiarytwo.value.DOB.length < 0) {
      this.skip = false

    } else {
      //console.log("Skip&Save")
      this.skip = true


    }


  }
  savebeneficiary() {

    this.BeneficiariesObj.first = {}
    this.BeneficiariesObj.first = this.AddingBeneficiaryone.value

    if (this.skip == false) {
      this.BeneficiariesObj.second = {}
      this.BeneficiariesObj.second = this.AddingBeneficiarytwo.value
if(this.AddingBeneficiarytwo.value.MobileNumber.length == 0){
this.AddingBeneficiarytwo.value.MobileNumber = this.AddingBeneficiaryone.value.MobileNumber
}

    }

    this.userservice.beneficiarydetails({ "BeneficiariesObj": this.BeneficiariesObj, "CustRecID": this.CustRecID }).subscribe((HttpResponse) => {

      if (HttpResponse.code == 'D001') {
        this.customerdetails()
        this.beneficiaryclose.nativeElement.click();

        alert(HttpResponse.data)

      } else {
        alert(HttpResponse.data)

      }
    }, (error) => {

      // this.spinner.hide()

      alert(error.error.data)

    })

  }
  secondarybeneficiarycheck() {

    if (this.AddingBeneficiarytwo.value.Name.length > 0 || this.AddingBeneficiarytwo.value.Gender.length > 0 || this.AddingBeneficiarytwo.value.MobileNumber.length > 0 || this.AddingBeneficiarytwo.value.Age.length > 0 || this.AddingBeneficiarytwo.value.DOB.length > 0) {
      this.skip = false
      if (this.AddingBeneficiarytwo.value.DOB) {
        const convertAge = new Date(this.AddingBeneficiarytwo.value.DOB);
        const timeDiff = Math.abs(Date.now() - convertAge.getTime());
        this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
        this.AddingBeneficiarytwo.patchValue({ Age: this.showAge })

      }
      return
    } else {
      this.skip = true


    }
    //console.log("ee", this.skip)
  }
  dateofbirthoneben() {

    if (this.AddingBeneficiaryone.value.DOB) {
      const convertAge = new Date(this.AddingBeneficiaryone.value.DOB);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      this.AddingBeneficiaryone.patchValue({ Age: this.showAge })

    }
    return


  }
  areamanagerdetails() {
    this.userservice.getAllEmployees({"Type":"FieldEmployee"}).subscribe((response) => {

      if (response.code == 'S001') {
        console.log("areamanagers",response.data)
        this.caremanagerData = response.data
      } else {
        alert(response.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }  
  submitareamanager(){
    this.areamanagersobj.push(this.areamanagerForm.value)
    console.log(this.areamanagersobj,"ooo")

    console.log(this.areamanagerForm.value,"aaa")
  }
  submitadditionalmembers(){

    this.addmemFormObjs = { 
      'CustRecID':this.CustRecID,
      'FirstName':this.additionalmembers.value.FirstName,
      'LastName':this.additionalmembers.value.LastName,
      'EmailID':this.additionalmembers.value.EmailID,
      'Status':"Active",
      'CountryName':this.additionalmembers.value.CountryName,
      'Type':this.additionalmembers.value.Type,
      'CountryCode':this.additionalmembers.value.CountryCode?.dialCode,
      'MobileNumber':this.additionalmembers.value.CountryCode?.number,
    }
 
    console.log(this.addmemFormObjs)
    this.addmemFormObjs["CountryName"]="India";
    
    this.userservice.additinalmemberstochat(this. addmemFormObjs).subscribe((response) => {
      if (response.code == 'S001') {
        console.log("additionalmems",response.data)
        this.additonalmemsobj = response.data
      }
      else if (response.code == 'S002'){
        alert(response.message)
      } else {
        alert(response.data)
      }
    }, (error) => {
      alert(error.error.message)
    })
  }  
  onCountryChange(contry:any){
    console.log(contry,"country")
    this.additionalmembers.patchValue({CountryName: contry.name});

    // console.log(this.additionalmembers.controls['CountryCode'])
    // console.log(this.additionalmembers.controls['CountryName'].value=contry.Name)
    // console.log(this.additionalmembers.setValue({'CountryName':contry.name}))
    // console.log(this.additionalmembers.controls['CountryName'].value)
    this.CountryName=false

    this.info=''    
    
  // if(contry.dialCode ){

  //  this.CountryName=true

   

  // }
  }


  addtochat(Customer:any){

   const customer =  {
      "Type":Customer.Type,
      "EmployeeID":Customer.AdditionalMemberID,
      "guid":this.grID
  }
       console.log("selected Customer to add to chat",customer)
       this.userservice.updateChatGroupMember(customer).subscribe((response) => {
        if (response.code == 'S001') {
            alert(response.data)
        }
        else if (response.code == 'S002'){
          alert(response.message)
        } else {
          alert(response.data)
        }
      }, (error) => {
        alert(error.error.message)
      })
  }
}


