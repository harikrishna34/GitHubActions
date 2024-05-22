import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-asers-request',
  templateUrl: './asers-request.component.html',
  styleUrls: ['./asers-request.component.css']
})
export class AsersRequestComponent {
  RequestID: any
  CustRecID: any
  requestObjData: any = []
  ActiveVendor: any
  ActiveVendorObj: any
  BeneficiaryName: String
  requestDetailsObj: any = {};
  comments: string = ''; 
  selectedStatus: string = '';
  constructor(private userservice: UsersService, private route: Router,private activatedRoute: ActivatedRoute,private spinner: NgxSpinnerService) { }
  
  ngOnInit(): void {
    this.RequestID = this.activatedRoute.snapshot.queryParamMap.get("RequestID");
    this.CustRecID = this.activatedRoute.snapshot.queryParamMap.get("CustRecID");
    this.viewRequestDetails();
  }
  myTasks() {
    this.route.navigate(["Dashboard/Task/MyTask"])
  }

  viewRequestDetails() {
    this.spinner.show()

    this.userservice.viewRequestData(this.RequestID, this.CustRecID).subscribe((Response) => {

      if (Response.code == "S001") {
        this.spinner.hide()
        this.requestDetailsObj = Response.data;
        console.log("requestDetailsObj11",this.requestDetailsObj)
        for (let i = 0; i < this.requestDetailsObj.CustomerDetails.Beneficiaries.length; i++) {
          if (this.requestDetailsObj.CustomerDetails.Beneficiaries[i].CustID == this.requestDetailsObj.RequestDetails.CustID) {
            this.BeneficiaryName = this.requestDetailsObj.CustomerDetails.Beneficiaries[i].Name
          }
        }
        this.requestObjData = this.requestDetailsObj.RequestDetails.ActiveVendors.slice(-1)
        this.ActiveVendor = this.requestDetailsObj.RequestDetails.ActiveVendors.filter((Obj: any) => {
          return Obj.Status != "Canceled"
        })
        this.ActiveVendorObj = this.ActiveVendor[0]
      }
    })
  }

  resetFields() {
    // Resetting fields to initial/default values or empty strings
    this.comments = '';
    this.selectedStatus = '';
}

  updateAserRequest() {
    this.spinner.show();
    const RequestID = this.activatedRoute.snapshot.queryParamMap.get("RequestID") || '';
    const Status = this.selectedStatus;
    const Comments = this.comments;

    this.userservice.updateAserRequest(RequestID, Status, Comments).subscribe(
        (Response) => {
          this.spinner.hide()
            if (Response.code == "S001") {
                alert(Response.data);
                this.resetFields();
            } else {
              this.spinner.hide()
                alert(Response.data);
                window.location.reload();
            }
        },
        (error: any) => {
          this.spinner.hide()
            alert(error.error.data);
        }
    );
}

}
