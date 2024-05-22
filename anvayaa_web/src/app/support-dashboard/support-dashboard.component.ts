import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-support-dashboard',
  templateUrl: './support-dashboard.component.html',
  styleUrls: ['./support-dashboard.component.css']
})
export class SupportDashboardComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private userService: UsersService, private route: Router, private activatedRoute: ActivatedRoute) { }

  screen: any;
  SupportDashBoardData: any = {};
  ActiveRequests: any = [];
  Calls: any = [];
  Employees: any;
  ServiceAreas: any;
  MemberActiveScreen: any = false;
  FamilyActiveScreen: any = false;
  RequestActiveScreen: any = false;
  CallsActiveScreen: any = false;
  PartnerActiveScreen: any = false;
  CityID: any;
  PermissionDeniedBtn:any=true;

  PartnerDashBoardData: any = [];
  CallsDashBoardData: any = [];
  ActiveRequestsDashBoardData: any = [];
  FamiliesDashBoardData: any = [];
  MembersDashBoardData: any = [];
  params: any = {};


  ngOnInit(): void {
    this.spinner.show();
    this.route.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: {},
        replaceUrl: true,
      });
    this.userService.supportDashBoard({
      "ServiceAreaID": "All",
      "EmployeeID": "All"
    }).subscribe((supportDashBoardData) => {
      if (supportDashBoardData.code == "PD01") {
        alert("You Don't Have a Permission")
        return;
      }
      if (supportDashBoardData.code == "S001") {
        this.PermissionDeniedBtn=false;

        this.SupportDashBoardData = supportDashBoardData.data;
        this.ActiveRequests = this.SupportDashBoardData.ActiveRequests;
        this.Calls = this.SupportDashBoardData.Calls
        this.Employees = this.SupportDashBoardData.Reportees
        this.ServiceAreas = this.SupportDashBoardData.ServiceAreas;
        return;
      }

    },function (error) {
      alert(error.error.data)
    })

    this.spinner.hide();
  }
  onMembers() {
    this.spinner.show();

    this.MemberActiveScreen = true; this.FamilyActiveScreen = false;
    this.RequestActiveScreen = false; this.CallsActiveScreen = false; this.PartnerActiveScreen = false;
    this.screen = "TotalActiveCustomers";
    this.params.GridType = "TotalActiveCustomers",
      this.params.EmployeeID = "All";
    if (this.CityID == undefined) {
      this.params.ServiceAreaID = "All"
    }
    else {
      this.params.ServiceAreaID = this.CityID;
    }

    this.userService.supportDasshBoardTypeData(this.params).subscribe((membersDashBoardData) => {
      if (membersDashBoardData.code == "S001") {
        this.spinner.hide();
        this.MembersDashBoardData = membersDashBoardData.data;
      } else {
        this.spinner.hide();
        this.MembersDashBoardData = [];
      }

    },function (error) {
      alert(error.error.data)
    })
  }


  onFamilies() {
    console.log(this.CityID)
    this.spinner.show();
    this.MemberActiveScreen = false; this.FamilyActiveScreen = true;
    this.RequestActiveScreen = false; this.CallsActiveScreen = false; this.PartnerActiveScreen = false;

    this.screen = "AssignedFamilies";
    this.params.GridType = "AssignedFamilies",
      this.params.EmployeeID = "All";
    if (this.CityID == undefined) {
      this.params.ServiceAreaID = "All"
    }
    else {
      this.params.ServiceAreaID = this.CityID;
    }
    this.userService.supportDasshBoardTypeData(this.params).subscribe((familiesDashBoardData) => {
      console.log(familiesDashBoardData);
      if (familiesDashBoardData.code == "S001") {
        this.spinner.hide();
        this.FamiliesDashBoardData = familiesDashBoardData.data;
        // console.log(this.FamiliesDashBoardData);
      } else {


        this.FamiliesDashBoardData = [];
        this.spinner.hide();
      }
    },function (error) {
      alert(error.error.data)
    })
  }

  onRequests() {
    this.spinner.show();
    this.MemberActiveScreen = false; this.FamilyActiveScreen = false;
    this.RequestActiveScreen = true; this.CallsActiveScreen = false; this.PartnerActiveScreen = false;

    this.screen = "ActiveRequests";
    this.params.GridType = "ActiveRequests",
      this.params.EmployeeID = "All";
    if (this.CityID == undefined) {
      this.params.ServiceAreaID = "All"
    }
    else {
      this.params.ServiceAreaID = this.CityID;
    }

    this.userService.supportDasshBoardTypeData(this.params).subscribe((activeRequestsDashBoardData) => {
      if (activeRequestsDashBoardData.code == "S001") {
        this.spinner.hide();

        this.ActiveRequestsDashBoardData = activeRequestsDashBoardData.data;
      }
      else {
        this.spinner.hide();

        this.ActiveRequestsDashBoardData = [];
      }

    },function (error) {
      alert(error.error.data)
    })


  }

  onCalls() {
    this.spinner.show();
    this.MemberActiveScreen = false; this.FamilyActiveScreen = false;
    this.RequestActiveScreen = false; this.CallsActiveScreen = true; this.PartnerActiveScreen = false;

    this.screen = "Calls";
    this.params.GridType = "Calls",
      this.params.EmployeeID = "All";
    if (this.CityID == undefined) {
      this.params.ServiceAreaID = "All"
    }
    else {
      this.params.ServiceAreaID = this.CityID;
    }
    this.userService.supportDasshBoardTypeData(this.params).subscribe((callsDashBoardTypeData) => {
      if (callsDashBoardTypeData.code == "S001") {
        this.spinner.hide();

        this.CallsDashBoardData = callsDashBoardTypeData.data;
        // console.log(this.CallsDashBoardData)
      }
      else {
        this.spinner.hide();

        this.CallsDashBoardData = [];
      }
    },function (error) {
      alert(error.error.data)
    })
  }

  onPartners() {
    this.spinner.show();
    this.MemberActiveScreen = false; this.FamilyActiveScreen = false;
    this.RequestActiveScreen = false; this.CallsActiveScreen = false; this.PartnerActiveScreen = true;

    this.screen = "Partners";
    this.params.GridType = "Partners",
      this.params.EmployeeID = "All";
    if (this.CityID == undefined) {
      this.params.ServiceAreaID = "All"
    }
    else {
      this.params.ServiceAreaID = this.CityID;
    }
    this.userService.supportDasshBoardTypeData(this.params).subscribe((dashBoardTypeData) => {
      if (dashBoardTypeData.code == "S001") {
        this.spinner.hide();
        this.PartnerDashBoardData = dashBoardTypeData.data;
      }
      else {
        this.spinner.hide();

        this.PartnerDashBoardData = [];
      }
      console.log(dashBoardTypeData);
    },function (error) {
      alert(error.error.data)
    })
  }



  onEmployeeSelection(myEmployee: any) {
    // console.log(myEmployee);

  }
  onCitySelection(myCity: any) {
    this.CityID = myCity;
    this.spinner.show();
    if (myCity == "") {
      this.spinner.hide();
      return;
    } else {
      this.userService.supportDashBoard({
        "ServiceAreaID": myCity,
        "EmployeeID": "All"
      }).subscribe((supportDashBoardData) => {
        if (supportDashBoardData.code == "S001") {
          this.SupportDashBoardData = supportDashBoardData.data;
          this.ActiveRequests = this.SupportDashBoardData.ActiveRequests
          this.Calls = this.SupportDashBoardData.Calls
          this.Employees = this.SupportDashBoardData.Reportees
          this.spinner.hide();
        }
        else {

          if (supportDashBoardData.code == "ND01") {
            this.ActiveRequests = []
            this.Calls = []
            this.SupportDashBoardData.TotalActiveCustomers_Count = 0;
            this.SupportDashBoardData.AssignedCustomers_Count = 0;
            this.SupportDashBoardData.ActiveRequests_Count = 0;
            this.SupportDashBoardData.Calls_Count = 0;
            this.SupportDashBoardData.Partners_Count = 0;
          }
          else {
            alert(supportDashBoardData.data)
            this.spinner.hide();
            return;
          }

        }

      },function (error) {
        alert(error.error.data)
      })
      if (this.screen == "TotalActiveCustomers") {
        this.onMembers();
      }
      if (this.screen == "AssignedFamilies") {
        this.onFamilies();
      }
      if (this.screen == "ActiveRequests") {
        this.onRequests();
      }
      if (this.screen == "Calls") {
        this.onCalls();
      }
      if (this.screen == "Partners") {
        this.onPartners();
      }
      this.spinner.hide();
    }
    this.route.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { City: this.CityID },
        replaceUrl: true,
      });
    this.spinner.hide();
  }
}
