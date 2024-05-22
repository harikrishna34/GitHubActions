import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UsersService } from '../users.service'
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, FormControl, FormArrayName, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SwPush } from "@angular/service-worker";

@Component({
  selector: 'app-close-tickets',
  templateUrl: './close-tickets.component.html',
  styleUrls: ['./close-tickets.component.css']
})
export class CloseTicketsComponent implements OnInit{
  ViewCCdbArray:any
  CustRecID: any 
  sortBy: any
  sortOrder:any
  selectedData:any
  constructor(private userservice: UsersService, private route: Router, private snap: ActivatedRoute, private spinner: NgxSpinnerService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.CustRecID = this.snap.snapshot.queryParamMap.get("CustRecID");
    this.viewCloseTickets()
  }
  viewCloseTickets() {
    this.userservice.ComprehensivecustomersData(this.CustRecID,"Closedtickets").subscribe((response) => {
      this.ViewCCdbArray = response.data
      console.log("ViewCCdbArray", response.data)
      if (response.code == 'S001') {
        // alert(response.data)
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

 updateCloseTicket(escalationData: any){
  this.route.navigate(['Dashboard/Escalation/EscalationInteraction'], { queryParams: { RequestID: escalationData.RequestID, CustRecID: escalationData.CustRecID } })

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
  showStatusTrack(data: any) {
    this.selectedData = data;
  }
}
