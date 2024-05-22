import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { SwPush } from "@angular/service-worker";



@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-emergency-list',
  templateUrl: './emergency-list.component.html',
  styleUrls: ['./emergency-list.component.css']

})

export class EmergencyListComponent implements OnInit {
  List: any = [];
  token: any
  sortBy: string = 'Status';
  sortOrder: string = 'asc';
  // yes
  btn: any
  act: any;
  data: any
  click: boolean = false;
  confirmData: any = {}
  RequestID: any;
  emergencyDataList: any = [];
  customizeddata: any = [];
  CancelRequest: UntypedFormGroup
  EmpId: any
  FromCall: any
  ExcutiveName: any
  callingSvg:boolean = true
  callStatus1:any
  callStatus2:any
  NotificationDetails:any
  constructor(private _swPush: SwPush,private userservice: UsersService, private router: Router, private route: ActivatedRoute, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.emergencyList()
    this.EmpId = localStorage.getItem('LoginEmployeeIDNew')
    this.employeeData()
    this.CancelRequest = this.formBuilder.group({
      "note": ''
    });
    //  setInterval(() => {
    //   this.emergencyList();
    //  }, 10000);
    //  window.location.reload();
    this._swPush.messages.subscribe((message: any) => {
      this.NotificationDetails = message
      if(this.NotificationDetails.notification.customData.Details?.callResponse.Status2 == 'CANCEL'||this.NotificationDetails.notification.customData.Details?.callResponse.Status2 == 'ANSWER'||this.NotificationDetails.notification.customData.Details?.callResponse.Status2 == 'BUSY'){
        // this.CallingBox = false

        this.callStatus1 = this.NotificationDetails.notification.customData.Details?.callResponse.Status1
        this.callStatus2 = this.NotificationDetails.notification.customData.Details?.callResponse.Status2
        this.callingSvg = false

      }
    }
    )
  }

  handleClosedEmergencyList(){
    this.router.navigate(["/Dashboard/emergencyclosedlist"])

  }




  //new functionality implimantation 

  // this is for login person details 
  employeeData() {
    this.userservice.individualEmployeeDetails(this.EmpId).subscribe((response: any) => {
      if (response.code == "S001") {

        this.FromCall = response.data[0].ContactNumber
        this.ExcutiveName = response.data[0].FirstName + ' ' + response.data[0].LastName
        console.log("call from numb", this.ExcutiveName)

      } else if (response.code == "PD01") {
        alert(response.data)
      } else {
        alert(response.message)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }

  acceptRequest(emeList: any) {
    console.log("ddd", emeList)


    this.RequestID = emeList.RequestID
    let acceptReequestObj = {
      "AcceptedPersonID": this.EmpId,
      "AcceptedPersonName": this.ExcutiveName,
      "MobileNumber": this.FromCall,
      "RequestID": emeList.RequestID,
      "Status": 'Support Executive Accepted',
      "Comments": '',
      "Type": "SPOCDetails",
      "Role": "Support"

    }

    this.updateEmergrncyStatus(acceptReequestObj)
  }


  updateEmergrncyStatus(Update: any) {

    this.userservice.emergencyStatusUpdate(Update).subscribe((statusUpdate: any) => {
      if (statusUpdate.code == "S001") {
        let url = `/Dashboard/Emergency/emergencyCustomerData?RequestID=${this.RequestID}`;
        window.open(url, '_blank');
        this.emergencyList()



      } else if (statusUpdate.code == "PD01") {
        alert(statusUpdate.data)
      } else {
        alert(statusUpdate.message)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }

  CustomerRelatedDetails:any
  SupportAccepted: any
  requestedCustomer: any
  emergencyList() {

    this.userservice.emergencyList().subscribe(emergencyListData => {
      if (emergencyListData.code == "S001") {

        this.emergencyDataList = emergencyListData.data
        // this.CustomerRelatedDetails = emergencyListData.data.CustomerRelatedDetails
       

        this.emergencyDataList.map((listData: any) => {
          listData.displayAccept = false;
      
          if (listData.EmergencyTeam.length > 0) {

            for (var list in listData.EmergencyTeam) {
              if (listData.EmergencyTeam[list].Role == 'Support') {
                listData.displayAccept = true;

              }
            }
          }

          const beneficiaryDetailsFilter = listData.CustomerDetails.Beneficiaries.filter((data: any) => {
            return listData.CustID === data.CustID
          })
          listData.BeneficiaryData = beneficiaryDetailsFilter[0]
        });
        this.emergencyDataList = this.emergencyDataList.filter((data: any) => {
          const obj = {
            'Name': data.CustomerDetails.Name,
            'CustID': data.CustomerDetails.CustRecID,
            'MobileNumber': data.CustomerDetails.MobileNumber
          }
          data.CustomerDetails.Beneficiaries.push(obj)
          return data
        })
        this.emergencyDataList = this.emergencyDataList.map((data: any) => {
          const requestedCustomer = data.CustomerDetails.Beneficiaries.find((obj: any) => data.CustID === obj.CustID);
          if (requestedCustomer) {
            data.CustomerRequest = requestedCustomer; // Assuming 'req' is a property in 'data'
          }
          return data;
        });



           console.log("hdhfhfdshhfds",this.emergencyDataList)


      }

    })
  }
  callingNumber: any
  callingDetails: any
  RId: any
  calliModel(emeList: any) {
    this.callingNumber = emeList?.CustomerRequest?.MobileNumber
    this.callingDetails = emeList
    this.RId = emeList.RequestID
    this.CustomerRelatedDetails = emeList.CustomerRelatedDetails
    let Obj: any = {
      'RequestID': emeList.RequestID,
      'toPhoneNumber': emeList?.CustomerRequest?.MobileNumber,
      "CustRecID": emeList?.CustRecID,
      "RequestName": 'Emergency',
      'Type': "Request"
    }
    this.userservice.EmergencyCalling(Obj).subscribe(callingResponse => {
      if (callingResponse.code == 'S001') {

      }
      if (callingResponse.code == 'ND01') {

      }
    })
  }

  customerDetails(data: any) {

    this.router.navigate(["/Dashboard/Emergency/emergencyCustomerData"], {
      queryParams: {
        RequestID: data.RequestID,
        CustRecID: data.CustRecID,
        CategoryID: data.CategoryID,
        SubCategoryID: data.SubCategoryID,
        CustID: data.CustID,
      }
    })

  }
  acceptEmergency(data: any, value: any) {
    if (value == "confirm") {
      if (this.confirmData.ApprovalStatus = true) {
      }
    } else {
      this.confirmData.ApprovalStatus = false;
    }
    this.confirmData.RequestID = data.RequestID
    if (confirm("are you sure want to update")) {
      this.userservice.emegencyAccept(this.confirmData).subscribe(emergencyList => {
        if (emergencyList.ApprovalStatus == true) {
          emergencyList.ApprovalStatus = false
        }
        else {
          emergencyList.ApprovalStatus == true
        }
        if (emergencyList.code == 'S001') {
          alert("Request updated successfully")
          window.location.reload();
          this.router.navigate(["/emergencyCustomerData"])
        }
        if (emergencyList.code == 'ND01') {
          alert("Request details not found")
          window.location.reload();
        }
      })
    }
  }

  CancelRequestDetails: any
  RequestStatusUpdate(requestDetails: any) {
    this.CancelRequestDetails = requestDetails
  }








  UpdateRequest(status: any) {
    //  var RequestObj = {
    //   'RequestID': this.CancelRequestDetails?.RequestID,
    //   'CustRecID': this.CancelRequestDetails?.CustRecID,
    //   'CustID': this.CancelRequestDetails?.CustID,
    //   'Status': '',
    //   'Comments': ''
    //  }

    let updatedcontactlist = {
      "CustID": this.CancelRequestDetails?.CustID,
      "CategoryID": this.CancelRequestDetails?.CategoryID,
      "RequestID": this.CancelRequestDetails?.RequestID,
      "Status": '',
      "SubCategoryID": this.CancelRequestDetails?.SubCategoryID,
      "Flag": "Active",
      "Note": '',
      "CustRecID": this.CancelRequestDetails.CustRecID
    }

    if (status == 'Cancel') {
      updatedcontactlist.Status = 'Cancelled'
      updatedcontactlist.Note = this.CancelRequest.value.note
    } else if (status == 'accept') {

      updatedcontactlist.Status = 'CareManagerAccepted',
        updatedcontactlist.Note = 'CareManagerAccepted'

    }

    this.userservice.cocntactedlistupdate(updatedcontactlist).subscribe((response) => {
      // this.spinner.hide()

      if (response.code == 'S001') {
        alert(response.data)
        this.emergencyList()
        this.CancelRequest.reset()
      } else {
        alert(response.data)
      }
    }, (error) => {
      // this.spinner.hide()
      alert(error.error.data)
    })

    //  this.userservice.UpdateEmergencyStatus(updatedcontactlist).subscribe((response) => {
    //   if (response.code == "S001") {

    //     alert(response.data)
    //     this.emergencyList()
    //     this.CancelRequest.reset()
    //   } else {
    //     alert(response.data)
    //   }
    // }, ((error) => {
    // }))


  }
  UpdatesRequests(status: any) {

    var RequestObjs = {
      'RequestID': this.callingDetails?.RequestID || '',
      'CustRecID': this.callingDetails?.CustRecID || '',
      'CustID': this.callingDetails?.CustID || '',
      'Status': '',
      'Comments': ''
    };

    if (status == 'Cancel') {
      RequestObjs.Status = 'Cancelled';
      RequestObjs.Comments = this.CancelRequest.value.note;
    } else if (status == 'accept') {
      RequestObjs.Status = 'CareManagerAccepted';
      RequestObjs.Comments = 'CareManagerAccepted';
    }


    this.userservice.UpdateEmergencyStatus(RequestObjs).subscribe((response) => {
      if (response.code == "S002") {
        alert(response.data);
        this.emergencyList();
        this.CancelRequest.reset();
      } else {
        alert(response.data);
      }
    }, (error) => {
      // Handle error
    });



  }
  handleRequestViewClick(data: any) {
    // this.router.navigate(["/Dashboard/Emergency/emergencyCustomerData"],{ queryParams: {  "RequestID":data.RequestID ,"CustRecID":data.CustRecID,"CustID":data.CustID}})

    let url = `/Dashboard/Emergency/emergencyCustomerData?RequestID=${data.RequestID}&CustRecID=${data.CustRecID}&CustID=${data.CustID}`;

    window.open(url, '_blank');
    // this.router.navigate(["/Dashboard/viewemergencyrequestdetails"],{ queryParams: {  "RequestID":data.RequestID ,"CustRecID":data.CustRecID} })
  }

  callNumber(event: any) {
    this.callingNumber = event
    let Obj: any = {
      'RequestID': this.RId,
      'toPhoneNumber': this.callingNumber,
      "CustRecID": this.callingDetails?.CustRecID,
      "RequestName": 'Emergency',
      'Type': "Request"
    }
    this.userservice.EmergencyCalling(Obj).subscribe(callingResponse => {
      if (callingResponse.code == 'S001') {

      }
      if (callingResponse.code == 'ND01') {

      }
    })
  }
  sortdetails(column: string) {
    if (this.sortBy === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortOrder = 'asc';
    }
    this.performSorting();
  }

  ToNumber: any
  callinInitiating(toPhoneNumber: number, contactPerson: string) {

    this.ToNumber = toPhoneNumber
    const ContactDetailObject = {
      "RequestID": this.RId,
      // "fromPhoneNumber": '9494632236',
      "fromPhoneNumber": this.FromCall,
      "toPhoneNumber": toPhoneNumber,
      // "toPhoneNumber": '9390054999',
      "contactPerson": contactPerson,
      "CallType": "Emergency"
    }

    this.callingFunction(ContactDetailObject)

  }



  callRecordID:any
  CallingBox:boolean = false
  callingFunction(obj:any) {

    this.userservice.EmergencyCalling(obj).subscribe((statusUpdate: any) => {
      if (statusUpdate.code == "S001") {
        
        this.CallingBox = true
        this.callRecordID = statusUpdate.data.CallID
     
        if(this.callRecordID != undefined || this.callRecordID != null){
          this.callResponses()
        }

      } else if (statusUpdate.code == "PD01") {
        alert(statusUpdate.data)
      } else {
        alert(statusUpdate.message)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }

  callResponses(){

    this.userservice.kaleraCallId(this.callRecordID).subscribe((statusUpdate: any) => {
      if (statusUpdate.code == "S001") {
      } else if (statusUpdate.code == "PD01") {
        alert(statusUpdate.data)
      } else {
        alert(statusUpdate.message)
      }
    }, (error) => {
      alert(error.error.data)
    }) 


  }

  performSorting() {
    if (this.sortBy && this.sortOrder) {
      this.emergencyDataList.sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => {
        const valA = a[this.sortBy];
        const valB = b[this.sortBy];
        if (valA < valB) return this.sortOrder === 'asc' ? -1 : 1;
        else if (valA > valB) return this.sortOrder === 'asc' ? 1 : -1;
        else return 0;
      });
    }
  }

};