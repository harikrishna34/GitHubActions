import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, FormControl, FormArrayName, Validators } from '@angular/forms';


@Component({
  selector: 'app-visits-ulitilized',
  templateUrl: './visits-ulitilized.component.html',
  styleUrls: ['./visits-ulitilized.component.css']
})
export class VisitsUlitilizedComponent implements OnInit {
  ViewCCdbArray: any[] = [];
  Type:any
  CustRecID: any;
  sortBy: any;
  sortOrder: any;
  endDate: string;
  startDate: string;
  escalationDataBasedOnDate: UntypedFormGroup

  constructor(
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private FormBuilder: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.CustRecID = this.route.snapshot.queryParamMap.get("CustRecID");
    this.Type = this.route.snapshot.queryParamMap.get("type");

    this.viewVisitsUtilised();
    // this.dashBoardevent()
  }

  filterData() {
    this.escalationDataBasedOnDate = this.FormBuilder.group({
      'StartDate': ['', [Validators.required]],
      'EndDate': ['', [Validators.required]],
      'Type': ['', [Validators.required]],
    })
  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  viewVisitsUtilised() {
    console.log(this.Type)
    this.spinner.show();
    const customeObj:any = {
       'CustRecID':this.CustRecID,
       'type': this.Type,
       'StartDate':this.startDate,
       'EndDate':this.endDate
    }
    console.log('123456789',this.Type)
    this.userService.viewVisistsData(customeObj)
      .subscribe(
        (response) => {
          console.log("#####", response);
          if (response.code === 'S001') {
            this.ViewCCdbArray = response.data;
            this.spinner.hide();
          } else {
            this.spinner.hide();
            alert(response.data);
          }
        },
        (error) => {
          this.spinner.hide();
          alert(error.error.data);
        }
      );
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
      this.ViewCCdbArray.sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => {
        const valA = a[this.sortBy];
        const valB = b[this.sortBy];
        if (valA < valB) return this.sortOrder === 'asc' ? -1 : 1;
        else if (valA > valB) return this.sortOrder === 'asc' ? 1 : -1;
        else return 0;
      });
    }
  }

  dashBoardevent() {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
  
    const filteredData = this.ViewCCdbArray.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });
  
    filteredData.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });
  
    this.ViewCCdbArray = filteredData;
    this. viewVisitsUtilised()
  }
  

}
