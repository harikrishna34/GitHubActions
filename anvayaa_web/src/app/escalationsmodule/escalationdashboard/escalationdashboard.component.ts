import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from '../../users.service'
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form, AbstractControl, ValidatorFn } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-escalationdashboard',
  templateUrl: './escalationdashboard.component.html',
  styleUrls: ['./escalationdashboard.component.css']
})
export class EscalationdashboardComponent implements OnInit {
  create: boolean = false
  creatEscalationForm: UntypedFormGroup
  CategoriesList: any = []
  SubCategoriesList: any = []
  SubCategoriesArray: any = []
  CustomersList: any = []
  TatObj: any = []
  submit: boolean = false
  ServiceID: any
  EscalationID:any
  Escalations: any = []
  dashboarddata: any
  EscalationDetails: any
  filterData: any = {}
  statusArray: any = []
  servicearray: any = []
  servicefinalarray = []
  areaArray: any = []
  updateButton: boolean = false
  createButton: boolean = true
  escalationstatus: boolean = false
  Empobj:any
  CustRecID:any
  ServiceAreaID:any
  employees:any =[]
  ticketcreated :boolean = false
   ticketCreatedID:any
   totalTicketCount:any
   dashboard:boolean = true
  constructor(private userservice: UsersService, private route: Router, private activatedRoute: ActivatedRoute, private formBuilder: UntypedFormBuilder, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this. getEmployees()
    this.escalations()
    this.dashboardData({})

    this.viewAllEscalation()
    this.allcustomers()

    this.creatEscalationForm = this.formBuilder.group({
      "CustRecID": [''],
      "SubCategoryID": [''],
      "CategoryID": [''],
      "TAT": [''],
      "Comments": [''],
      "Status": "Created",
      "ServiceAreaID": [''],
      "Owner": [''],
    })
  }

  category() {
    this.route.navigate(['Dashboard/escalation/catrgory'])
  }

  createesc() {
    this.create = !this.create
    this.escalationstatus = false
    this.createButton = true
    this.ticketcreated = false

    if(this.create == true){
    this.dashboard = false
       
    }else{
    this.dashboard = true

    }
  }

  viewAllEscalation() {

    this.spinner.show()
    this.userservice.viewAllEscalationMasters().subscribe((data) => {
      if (data.code == "S001") {
    
        this.CategoriesList = data.data.Categories
        if(this.CategoriesList.length == ''){
          alert("Categories Not Found Please Create Categories")
        }
        this.SubCategoriesList = data.data.SubCategories
        this.spinner.hide();
      }
      if (data.code == "S002") {
        alert(data.data);
        this.spinner.hide();
      }
    }, (error) => {
      alert(error.error.data)
      this.spinner.hide();
    })
  }


  escalations() {

    this.spinner.show()
    this.userservice.viewAllEscalation().subscribe((data) => {
      if (data.code == "S001") {
        this.Escalations = data.data


        this.spinner.hide();
      }
      if (data.code == "S002") {
        alert(data.data);
        this.spinner.hide();
      }
    }, (error) => {
      alert(error.error.data)
      this.spinner.hide();
    })


  }

  allcustomers() {

    this.userservice.customerlist().subscribe((userlist) => {
      if (userlist.code == "S001") {
        this.CustomersList = userlist.data;

        this.spinner.hide();

      } else if (userlist.code == "PD01") {
        alert(userlist.data)
        this.spinner.hide();

      } else {
        this.spinner.hide();
        alert(userlist.message)


      }
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })
  }


  selectedcategory(event: any) {

    let id = event.target.value
    this.SubCategoriesArray = this.SubCategoriesList.filter((data: any) => {
      if (data.TypeID == id) {
        return data
      }
    })

    if (this.SubCategoriesArray.length == '') {
      alert("No SubCategory Found")
    }

  }

  selectedtat(event: any) {
    let ID = event.target.value
    this.TatObj = this.SubCategoriesArray.filter((data: any) => {
      if (data.ID == ID) {
        return data.TAT
      }
    })

  }
  servicearea(event: any) {
    let custID = event.target.value

    for (let i = 0; i < this.CustomersList.length; i++) {
      if (this.CustomersList[i].CustRecID == custID) {
        this.ServiceID = this.CustomersList[i].CustomerPackage.ServiceAreaID
      }
    }

  }

  changeOwner(event:any){

       let ticketOwner = event.target.value

         this.ticketCreatedID = ticketOwner

  }

  creatEscalations() {
    this.submit = true
    if (this.creatEscalationForm.status == 'INVALID') {
      return
    } else {

      this.spinner.show()
      this.creatEscalationForm.value.TAT = this.TatObj[0].TAT.Time
      this.creatEscalationForm.value.ServiceAreaID = this.ServiceID
      delete this.creatEscalationForm.value.Owner

      this.userservice.createEscalation(this.creatEscalationForm.value).subscribe((data) => {
        if (data.code == "S001") {
          this.create = false
          this.creatEscalationForm.reset()
          alert(data.message)
          this.spinner.hide();
          this.dashboardData(data)

        } else if (data.code == "PD01") {
          alert(data.data)
          this.spinner.hide();

        } else {
          this.spinner.hide();
          alert(data.message)
        }
      }, (error) => {
        this.spinner.hide();
        alert(error.error.data)
      })

    }

  }


  dashboardData(data: any) {

    let filtertype = data.target?.value
  
     if(filtertype == ''){
      this.filterData = {
        "Status": this.statusArray,
        "ServiceAreaID": this.areaArray
      }
     }
    if (filtertype != "Created" && filtertype != "InProgress" && filtertype != "Completed") {
      
       if(this.areaArray != null ){
        this.areaArray = []
      this.areaArray.push(filtertype)
       }else{
      this.areaArray.push(filtertype)
       }
    }
    
    if (filtertype == "Created" || filtertype == "InProgress" || filtertype == "Completed") {
    
       if(this.statusArray != null){
        this.statusArray = [] 
        this.statusArray.push(filtertype)        
       }else{   
        this.statusArray.push(filtertype)
       }
    }

    this.filterData = {
      "Status": this.statusArray,
      "ServiceAreaID": this.areaArray
    }



    this.spinner.show();
    this.userservice.escalationDashboardData(this.filterData).subscribe((data) => {
      if (data.code == "S001") {

        
        this.dashboarddata = data.data
        this.totalTicketCount = this.dashboarddata.CreatedCount + this.dashboarddata.InProgressCount + this.dashboarddata.CompletedCount
        for (let servicarea of this.dashboarddata.EscalationsList) {
          this.servicearray.push(servicarea.ServiceAreaDetails)
          this.servicearray = this.servicearray.filter((test: any, index: any, array: any) =>
            index === array.findIndex((findTest: any) =>
              findTest.CityID === test.CityID
            )
          );
        }
        
         this.getEmployees()       


        this.spinner.hide();

      } else if (data.code == "PD01") {
        alert(data.data)
        this.spinner.hide();

      } else {
        this.spinner.hide();
        alert(data.message)
      }
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })

    

  }

 

  updateEscParams(parms: any) {

    this.create = true
    this.updateButton = true
    this.escalationstatus = true
    this.createButton = false
    this.ticketcreated = true
   this.CustRecID = parms.CustRecID
   this.ServiceAreaID = parms.ServiceAreaID
 //  this.getEmployees()

    if(this.create == true){
      this.dashboard = false
         
      }else{
      this.dashboard = true
  
      }
    this.SubCategoriesArray = this.SubCategoriesList.filter((data: any) => {

      if (data.TypeID == parms.CategoryID) {
        return data
      }
    })


    this.EscalationID = parms.EscalationID
    this.creatEscalationForm.patchValue({ CustRecID: parms.CustRecID })
    this.creatEscalationForm.patchValue({ CategoryID: parms.CategoryID })
    this.creatEscalationForm.patchValue({ SubCategoryID: parms.SubCategoryID })
    this.creatEscalationForm.patchValue({ TAT: parms.TAT })
    this.creatEscalationForm.patchValue({ Status: "Created" })
    this.creatEscalationForm.patchValue({ Comments: parms.Comments })
    this.creatEscalationForm.patchValue({ ServiceAreaID: parms.ServiceAreaID })
    this.creatEscalationForm.patchValue({ Owner: parms.Owner })

  }


  getEmployees(){

    this.userservice.employeesdetails().subscribe((employeeData) => {
      if (employeeData.code == "S001") {

          this.employees = employeeData.data
        this.spinner.hide()
      }
      else {
        this.spinner.hide();
        alert(employeeData.data)

      }
    }, (error) => {
      this.spinner.hide()
      alert(error.error.data)

    }
    )
  }

  UpdateEscalation() {
    this.submit = true
    if (this.creatEscalationForm.status == 'INVALID') {
      return
    } else {

      this.spinner.show()
      this.creatEscalationForm.value.TAT = this.TatObj[0]?.TAT?.Time
      this.creatEscalationForm.value.ServiceAreaID = this.ServiceID
      this.creatEscalationForm.value.EscalationID = this.EscalationID
      this.creatEscalationForm.value.Owner = this.ticketCreatedID
      this.spinner.show();
     
      this.userservice.updateEscalation(this.creatEscalationForm.value).subscribe((data) => {
        if (data.code == "S001") {
          alert(data.message)
          this.create = false
          this.updateButton = false
          this.escalationstatus = false
          this.createButton = true
          this.ticketcreated = false
          this.dashboardData(data)
          this.dashboard = true
          this.spinner.hide();


        } else if (data.code == "PD01") {
          alert(data.data)
          this.spinner.hide();

        } else {
          this.spinner.hide();
          alert(data.message)
        }
      }, (error) => {
        this.spinner.hide();
        alert(error.error.data)
      })

    }

  }
  viewescalationsboard(EscalationID: any) {
    this.spinner.show()
    this.userservice.viewEscalation(EscalationID).subscribe((Esalation) => {
      if (Esalation.code == "S001") {
        this.EscalationDetails = Esalation.data[0];

        this.spinner.hide();

      } else if (Esalation.code == "PD01") {
        alert(Esalation.data)
        this.spinner.hide();

      } else {
        this.spinner.hide();
        alert(Esalation.message)
      }
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })

  }


}
