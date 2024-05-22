import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service'
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { invalid } from 'moment';


@Component({
  selector: 'app-escalation',
  templateUrl: './escalation.component.html',
  styleUrls: ['./escalation.component.css']
})
export class EscalationComponent {
  constructor(private userservice: UsersService, private router: Router, private route: ActivatedRoute, private FormBuilder: UntypedFormBuilder, private spinner: NgxSpinnerService) { }



  customerEscalationsData: any;
  DashboardDataType: any = ''
  escalationDataBasedOnRange: any = []
  escalationDetailsBasedOnType: any = []
  ReportsForm: UntypedFormGroup
  escalationDataBasedOnDate: UntypedFormGroup

  // Variables for sorting
  sortBy: string = 'RequestID'; // Default sorting column
  sortOrder: string = 'asc'; // Default sorting order
  // Define arrays for service types and statuses
  serviceTypes: { name: string, statuses: string[] }[] = [
    { name: 'ServiceType1', statuses: ['Open', 'InProgress', 'Resolved', 'Closed'] },
    { name: 'ServiceType2', statuses: ['Open', 'InProgress', 'Resolved', 'Closed'] },
    // Add more service types along with their associated statuses
  ];

  selectedServiceType: string = ''; // Variable to store selected service type
  selectedStatuses: string[] = []; // Array to store selected statuses

  Type: any;

  showtable: boolean = false
  ngOnInit(): void {
    this.EscalationDashboardCounts()

    this.filterData()
    this.CustomerEscalationByStatus("All")


  }
  filterData() {
    this.escalationDataBasedOnDate = this.FormBuilder.group({
      'StartDate': ['', [Validators.required]],
      'EndDate': ['', [Validators.required]],
      'Type': ['', [Validators.required]],
    })
  }
  EscalationDashboardCounts() {
    this.spinner.show();
    this.userservice.EscalationDashboardCounts().subscribe(CustomerEscalationDashboardCount => {
      if (CustomerEscalationDashboardCount.code == "S001") {
        this.customerEscalationsData = CustomerEscalationDashboardCount.data
        this.spinner.hide();

      } else {
        this.spinner.hide();
        alert(CustomerEscalationDashboardCount.data)
      }
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })

  }




  ToCreate() {
    this.router.navigate(['/Dashboard/Escalation/CreateEscalation'])
  }

  // CustomerEscalationByStatus

  CustomerEscalationByStatus(Type: any) {

    this.showtable = true
    this.Type = Type
    this.DashboardDataType = Type

    if (Type == "In_Progress") {
      this.DashboardDataType = "InProgress"
    }
    this.spinner.show();

    this.userservice.CustomerEscalationByStatus(Type).subscribe(CustomerEscalationBasedOnType => {
      if (CustomerEscalationBasedOnType.code == "S001") {
        this.escalationDetailsBasedOnType = CustomerEscalationBasedOnType.data
        this.spinner.hide();

      } else {
        this.spinner.hide();
        this.escalationDetailsBasedOnType=[];
        // alert(CustomerEscalationBasedOnType.data)
        console.log('----', CustomerEscalationBasedOnType.data )
      }
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })

  }


  // escaltionDataBasedOnDate(){


  // this.spinner.show()
  // this.escalationDataBasedOnDate.value['Type']=this.Type
  // console.log("######@@@@",this.escalationDataBasedOnDate.value)






  // }
  onCancelButtonClick(): void{
    this.router.navigate(['/Dashboard/Task/MyTask'])
  }


  escaltionDataBasedOnDate() {
    this.spinner.show();
    this.escalationDataBasedOnDate.value['Type'] = this.Type
    this.userservice.escalationDataBasedOnRange(this.escalationDataBasedOnDate.value).subscribe(CustomerEscalationBasedOnDate => {
      console.log("#####", CustomerEscalationBasedOnDate)
      if (CustomerEscalationBasedOnDate.code == "S001") {
        this.escalationDetailsBasedOnType = CustomerEscalationBasedOnDate.data
        this.spinner.hide();

      } else {
        this.spinner.hide();
        alert(CustomerEscalationBasedOnDate.data)
      }
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })

  }


  ToUpdatePage(escalationData: any) {


    console.log("DDD", escalationData)
    // this.router.navigate(['Dashboard/Escalation/EscalationInteraction'], { queryParams: { RequestID: escalationData.RequestID, CustRecID: escalationData.CustRecID } })
    this.router.navigate(['Dashboard/Escalation/EscalationInteraction'], { queryParams: { RequestID: escalationData.RequestID, CustRecID: escalationData.CustRecID } })

  }

  sortData(column: string) {
    if (this.sortBy === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortOrder = 'asc';
    }
    this.performSorting();
  }
  performSorting() {
    if (this.sortBy && this.sortOrder) {
      this.escalationDetailsBasedOnType.sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => {
        const valA = a[this.sortBy];
        const valB = b[this.sortBy];
        if (valA < valB) return this.sortOrder === 'asc' ? -1 : 1;
        else if (valA > valB) return this.sortOrder === 'asc' ? 1 : -1;
        else return 0;
      });
    }
  }

  reloadScreen(){
    this.CustomerEscalationByStatus("All")
  }

}
