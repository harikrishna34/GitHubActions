import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../users.service'
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';

@Component({
  selector: 'app-escalationinteraction',
  templateUrl: './escalationinteraction.component.html',
  styleUrls: ['./escalationinteraction.component.css']
})


export class EscalationinteractionComponent {
  constructor(private location: Location, private UsersService: UsersService, private router: Router, private activatedRoute: ActivatedRoute, private FormBuilder: UntypedFormBuilder, private spinner: NgxSpinnerService) { }

  showAddInteractionCard: boolean = false
  public Addnteraction: UntypedFormGroup;


  interactionStatus: any = []
  interactions: any = [{ name: "anil", notes: "customer in progresss", status: "progress" }, { name: "anil", notes: "customer in progresss", status: "progress" }]
  RequestID: any
  CustRecID: any
  interactiondetails: any
  insteractionList: any = []

  addinteractionbtn: boolean = false
  ngOnInit(): void {

    this.RequestID = this.activatedRoute.snapshot.queryParamMap.get("RequestID");
    this.CustRecID = this.activatedRoute.snapshot.queryParamMap.get("CustRecID");

    this.ViewRequestDetails();
    this.ViewInteractionStatus()


    this.Addnteraction = this.FormBuilder.group({

      Status: ['', [Validators.required]],
      Comment: ['', [Validators.required]]

    });
    

  }




  toggleAddInteractionCard() {
    if (this.showAddInteractionCard == true) {
      this.showAddInteractionCard = false

    } else {
      this.showAddInteractionCard = true

    }
  }
  onClickCancelButton(): void{
      // this.router.navigate(['/Dashboard/Escalation/ViewAllEscalations'])
      this.location.back();
  }
  ViewRequestDetails() {
    this.spinner.show()
    this.UsersService.viewRequestData(this.RequestID, this.CustRecID).subscribe((interactionDetails) => {
      if (interactionDetails.code == "S001") {
        this.spinner.hide()
        this.interactiondetails = interactionDetails.data
        this.insteractionList = interactionDetails?.data?.RequestDetails?.StatusTrack

        this.Addnteraction.patchValue({ 'Status': interactionDetails?.data?.RequestDetails?.Status })

        this.insteractionList.reverse();
      } else {
        this.spinner.hide()
        alert(interactionDetails.data)
      }
    }, function (error) {
      alert(error.error.data)
    })

  }

  ViewInteractionStatus() {
    this.UsersService.ViewInteractionStatus().subscribe((InteractionStatus) => {

      console.log("EEEE", InteractionStatus)
      if (InteractionStatus.code == "S001") {
        this.interactionStatus = InteractionStatus.data
      } else {
        alert(InteractionStatus.data)
      }
    }, function (error) {
      alert(error.error.data)
    })

  }
  saveInteraction() {

    this.addinteractionbtn = true
    this.spinner.show()
    const interactionObj = {
      "CustRecID": this.CustRecID,
      "RequestID": this.RequestID,
      "Comments": this.Addnteraction.value.Comment,
      "Status": this.Addnteraction.value.Status
    }
    if (this.Addnteraction.status === "INVALID") {
      this.spinner.hide()

    } else {
      this.UsersService.addCustomerInteraction(interactionObj).subscribe((InteractionStatus) => {

        if (InteractionStatus.code == "S001") {
          this.spinner.hide()
          this.interactionStatus = InteractionStatus.Customer
          alert(InteractionStatus.data)
          this.ViewRequestDetails();
          this.Addnteraction.value.Status = ''
          this.Addnteraction.value.Comment = ''

          this.showAddInteractionCard = false
          this.location.back();
        } else {
          this.spinner.hide()
          alert(InteractionStatus.data)
        }
      }, function (error) {
        alert(error.error.data)
      })
    }

    




    // addCustomerInteraction




  }
}
