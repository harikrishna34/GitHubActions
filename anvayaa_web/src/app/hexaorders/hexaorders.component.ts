import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { UsersService } from '../users.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  FormArray,
  FormControl,
  FormArrayName,
  Validators,
} from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-hexaorders',
  templateUrl: './hexaorders.component.html',
  styleUrls: ['./hexaorders.component.css'],
})
export class HexaordersComponent implements OnInit {
  ViewOrderDetails: any;
  CustRecID: any;
  OrderId: any;
  viewStatusTrackDetails: any;
  lastStatusValue: any;
  lastStatus: any;
  lastElementIndex: any;
  UpdateOrderPress: boolean = false;
  previousStatus: any;
  public UpdateStatusForm!: UntypedFormGroup;
  statuses: string[] = ['Ordered', 'Confirmed', 'Out for Delivery', 'Delivered']; // Initial statuses
  public counts = ["Ordered","Confirmed","OutForDelivery","Delivered"];
  orderStatus : any
  activeIndex:any
  whiteListStage:any
  IncomingStatus:any
  // public orderStatus = "In Progress"
  constructor(
    private userservice: UsersService,
    private route: Router,
    private snap: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private formBuilder: UntypedFormBuilder,

  ) {}
  // this.previousStatus = null;
  ngOnInit(): void {
    this.CustRecID = this.snap.snapshot.queryParamMap.get('CustRecID');
    this.OrderId = this.snap.snapshot.queryParamMap.get('OrderId');
    this.IncomingStatus = this.snap.snapshot.queryParamMap.get('Status');
    this.activeIndex = this.counts.indexOf(this.IncomingStatus)
    console.log("stausparams",this.activeIndex)
    this.viewHexaProductOrderDetails();
    this.updateOrder();
    this.viewStatusTrack();
  }
  viewHexaProductOrderDetails() {
    this.userservice.orderDetails(this.OrderId).subscribe(
      (response: any) => {
        if (response.code == 'S001') {
          this.ViewOrderDetails = response.data;
        } else if (response.code == 'S002') {
          alert(response.data);
        } else {
          alert(response.data);
        }
      },
      (error) => {
        alert(error.error.data);
      },
    );
  }
  viewStatusTrack() {
    this.orderStatus = this.lastStatusValue
    this.userservice.hexaOrderStatusTrack(this.OrderId).subscribe(
      (response: any) => {
        if (response.code == 'S001') {
          this.viewStatusTrackDetails = response.data.StatusTrack;
          if (this.viewStatusTrackDetails.length > 0) {
            this.lastElementIndex = this.viewStatusTrackDetails.length - 1;
            this.lastStatus = this.viewStatusTrackDetails[this.lastElementIndex];
            this.lastStatusValue = this.lastStatus?.Status;
          }
          this.UpdateStatusForm.patchValue({ status: this.lastStatus?.Status });
          this.viewHexaProductOrderDetails();
        } else if (response.code == 'S002') {
          alert(response.data);
        } else {
          alert(response.data);
        }
      },
      (error) => {
        alert(error.error.data);
      },
    );



  }
  updateOrder() {
    this.UpdateStatusForm = this.formBuilder.group({
      status: ['', [Validators.required]],
      requestID: this.OrderId,
      Comments: ['', [Validators.required]],
    });
  }
  updateOrderDetails() {
    this.UpdateOrderPress = true;
    if (this.UpdateStatusForm.valid) {
      var status = this.UpdateStatusForm.value;

      this.activeIndex = this.counts.indexOf(this.UpdateStatusForm?.value?.status)
    }
    this.userservice
      .updateOrder({
        requestID: this.OrderId,
        Comments: this.UpdateStatusForm.value.Comments,
        status: this.UpdateStatusForm.value.status,
      })
      .subscribe(
        (response: any) => {
          if (response.code == 'S001') {
            alert('The request was updated successfully');
            this.route.navigate(['Dashboard/Task/MyTask']);
          } else if (response.code == 'S002') {
            alert(response.data);
          } else {
            response.code == 'P013'
            alert(response.message)
          }
        },
        (error) => {},
      );
  }
//   isStatusUpdated(status: any): boolean {
//     if (this.previousStatus !== status?.Status) {
//         this.previousStatus = status?.Status;
//         return true;
//     }
//     return false;
// }


isStatusActive(data:any){

}

  getStatusColor(status: string): string {
    return status === 'Delivered' ? 'purple' : 'gray'; // Updated color for "Delivered"
  }
}

