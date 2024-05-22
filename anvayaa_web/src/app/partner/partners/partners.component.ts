import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Route } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from '../../users.service';
// import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
  partnersData: any = []
  term:any
  Assign:any
  spounserDetails: any = []
  date: any;
  requestDate: any
  createdDates: any = []
  requestDates: any = []

  taskdata: any
  taskcount: any = []
  Assignbtn: any = false
  EmployeeID: any
  userFilter: any
  searchValue: any;
  // _filterText: any
  filterText:string | undefined
  filterdata: any = []
  citydata: any = []
  teamList: any = []
  custmoreName: any = false

  profilestab:any = true
  billstab:any = false
  searchKey:any
  PartnerExecutiveID:any
  
  requestsTable:any = true
  NodataTable:any = false

  constructor(private userservice: UsersService, private router: Router, private route: ActivatedRoute, private formBuilder: UntypedFormBuilder,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.cityApiData()
    this.EmployeeID = localStorage.getItem('LoginEmployeeIDNew')
   
    this.partnersTasksCount();
    this.taskdata = 'All'
    this.partnersAllData()

    this.employeList()
    this.spinner.hide();
  }
  radiobutton(data: any) {
    this.spinner.show();
    this.taskdata = data.target.value

    this.partnersAllData()
  }
  partnersTasksCount() {
    this.userservice.partnersTaskCount().subscribe((partnersTaskCount) => {
      if (partnersTaskCount.code == "S001") {
        this.spinner.hide();
        this.taskcount = partnersTaskCount.data
      } else {
        this.spinner.hide();
        alert(partnersTaskCount.data)
      }

    },(error)=>{
      this.spinner.hide();
      alert(error.error.data)
    })
  }

   viewProfileTab(){
    this.profilestab = true
    this.billstab=false
   }

   viewBills(){
    this.billstab=true
    this.profilestab = false

   }
    
  partnersAllData() {
    if (this.taskdata == 'Assigned') {
      this.Assignbtn = false
    }
    if (this.taskdata == 'All') {
      this.Assignbtn = false
    }
    this.filterdata = []
    this.userservice.partnersData(this.taskdata, "").subscribe((PartnersAllData) => {
      if (PartnersAllData.code == "S001") {
        
        this.partnersData = PartnersAllData.data;
        this.filterdata = this.partnersData
        console.log("filterdata",this.filterdata)
        this.requestsTable = true
      this.NodataTable = false

        this.spinner.hide();
      } else {
        this.spinner.hide();
        alert(PartnersAllData.data)
      }
    },  (error)=>{
      this.spinner.hide();
      this.requestsTable = false
      this.NodataTable = true
      alert(error.error.data)
    }
    )
  }


  assignVendor(RequestID: any,eventData:any) {
    
  
    
    this.PartnerExecutiveID = eventData.target.value


    this.userservice.assignVendor(RequestID,this.PartnerExecutiveID).subscribe((assignedVendorsData) => {

      if (assignedVendorsData.code == "S001") {
        alert(assignedVendorsData.data)
        location.reload();
        this.partnersAllData()

      }
      else {
        alert(assignedVendorsData.data)
      }


    }, function (error) {
      alert(error.error.data)
    })
  }
  partnerDashBoard() {
    this.router.navigate(['/partner/partnersDashBoard'])
  }
  requestDetails(RequestID: any,CustRecID:any,PartnerExecutiveID:any) {
      
  
    
    this.router.navigate(['Dashboard/partner/requestDetails'], { queryParams: { "RequestID": RequestID, "CustRecID": CustRecID } })
  }

  filterByServiceName(filterTerm: String) {
    
    if (this.partnersData.length === 0 || this.filterText === '') {
      return this.partnersData
    }

    else {
      let filt = this.partnersData.filter((service: any) => {
        return (
          service.RequestID.toLocaleLowerCase().match(filterTerm.toLocaleLowerCase()) ||
          service.CustomerDetails.Name.toLocaleLowerCase().match(filterTerm.toLocaleLowerCase()) ||
          service.CustomerDetails.BeneficiaryDetails.Name.toLocaleLowerCase().match(filterTerm.toLocaleLowerCase())
        )

      })
      this.filterdata = filt
    }

  }
  

  cityApiData() {
    this.userservice.cityApi().subscribe((cityresponce) => {

      if (cityresponce.code == "S001") {
        this.citydata = cityresponce.data
      } else {
        this.spinner.hide();
        alert(cityresponce.data)
      }

    }, (error)=>{
      this.spinner.hide();
      alert(error.error.data)
    })
  }

  oncityselect(cityid: any) {
    this.filterdata = []
    this.userservice.partnersData("All", cityid.target.value).subscribe((cityResponce) => {
      if (cityResponce.code == "S001") {
        this.filterdata = cityResponce.data

      } else {
        alert(cityResponce.data)
      }
    }, function (error) {
      alert(error.error.data)
    })

  }

  employeList() {
    this.userservice.employeList(this.EmployeeID).subscribe((cityResponce) => {
      this.teamList = cityResponce.data.MyTeamMembers
      this.spinner.hide();
    },(error)=>{
      this.spinner.hide();
      alert(error.error.data);
    })
  }

  


   

}
