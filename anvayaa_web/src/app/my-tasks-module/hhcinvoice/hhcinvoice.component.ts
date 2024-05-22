import {
  Component,
  NgModule,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { UsersService } from '../../users.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  FormGroup,
  FormControl,
  UntypedFormBuilder,
  Validators,
  FormArray,
  UntypedFormGroup,
} from '@angular/forms';
import { values } from 'lodash';

@Component({
  selector: 'app-hhcinvoice',
  templateUrl: './hhcinvoice.component.html',
  styleUrls: ['./hhcinvoice.component.css'],
})
export class HHCInvoiceComponent implements OnInit {
  @ViewChild('myModal') myModal: ElementRef;
  @ViewChild('cancelPaymentCloseBtn') cancelPaymentCloseBtn: ElementRef;

  PartnerID: any;
  PartnerPayments: any = []
  PartnerPaymentDetails: any
  public ApprovePartnerInvoiceForm!: UntypedFormGroup;
  isChecked = false;
  PaymentIDDetails: any;
  PaymentRequestId: any;
  invoiceDetailsToApprove: any;
  paymentInvoicePayload: any;
  approvedStatus = 'Approved';
  rejectStatus = 'Reject';
  comments: any;
  vendor: any;
  agent: any;
  assignTo: any;
  checkboxChecked: boolean = false;
  commetsPress: boolean = false;

  paymentArray: any = [];
  modal: any
  constructor(
    private spinner: NgxSpinnerService,
    private userservice: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.PartnerID = this.route.snapshot.queryParamMap.get('PartnerID');
    this.viewPartnerPayment()
    this.ApprovePartnerInvoiceForm = this.formBuilder.group({
      Comments: ['', [Validators.required]],
      AssignTO: ['', [Validators.required]],
    });
  }

  viewPartnerPayment() {
    this.spinner.show()
    console.log("###", this.PartnerPayments)
    this.PartnerPayments = []
    this.userservice
      .ViewPartnerPayment({ PartnerID: this.PartnerID })
      .subscribe((response) => {

        if (response.code == 'S001') {
          this.PartnerPayments = response.data;
          this.PartnerPaymentDetails = this.PartnerPayments[0];
          this.spinner.hide();
        } else {
          alert(response.data);
          this.spinner.hide();
        }
      },

        (error: any) => {
          if (this.PartnerPayments.length < 1) {
            this.router.navigate(["Dashboard/Task/MyTask"])
            this.spinner.hide();
          } else {
            alert(error.error.data);
            this.spinner.hide();
          }

        })
  }
  updateInvoicePayment() {
    this.paymentInvoicePayload = {
      Status: this.approvedStatus,
      paymetDetails: this.paymentArray,
    };
    this.approvePartnerInvoiceDetails();
  }
  rejectPaymentDeatils() {
    this.commetsPress = true;
    if (this.ApprovePartnerInvoiceForm.valid) {
      this.paymentInvoicePayload = {
        Status: this.rejectStatus,
        paymetDetails: this.paymentArray,
        comments: this.ApprovePartnerInvoiceForm.value.Comments,
        assignTo: this.ApprovePartnerInvoiceForm.value.AssignTO,
      };
      this.approvePartnerInvoiceDetails();
    }
  }

  openModal() {
    this.modal = document.getElementById('myModal');
    this.modal.style.display = 'block';
  }

  resetModal() {
    this.ApprovePartnerInvoiceForm.reset();
    this.commetsPress = false
  }

  myTasks() {
    this.router.navigate(["Dashboard/Task/MyTask"])
  }

  changeDetails(data: any, checkbox: any) {
    let empObj = {
      PaymentID: data.Payment.AnvayaaPaymentID,
      RequestID: data.PaymentForDetails.HomeHelathServices.RequestID,
    };
    if (checkbox.checked) {
      this.paymentArray.push(empObj);
    } else {
      var index = this.paymentArray.findIndex((item: { PaymentID: any; RequestID: any; }) => item.PaymentID === empObj.PaymentID && item.RequestID === empObj.RequestID);
      if (index > -1) {
        this.paymentArray.splice(index, 1);
      }
    }
  }



  approvePartnerInvoiceDetails() {

    this.spinner.show()
    this.userservice
      .approvePartnerInvoicePayment(this.paymentInvoicePayload)
      .subscribe(
        (response: any) => {
          if (response.code == 'S001') {
            alert('Updated Successfully');
            this.cancelPaymentCloseBtn.nativeElement.click();

            this.viewPartnerPayment()
            this.spinner.hide()
            // window.location.reload()
          } else {
            alert(response.data);
            this.spinner.hide();
          }
        },
        (error: any) => {
          alert(error.error.message);
          this.spinner.hide();
        },
      );
  }
}
