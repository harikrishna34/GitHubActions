import { Component, OnInit } from '@angular/core';
import { Token } from '@angular/compiler';
import { Router, Routes } from '@angular/router';
import { UsersService } from '../users.service';
import { EmergencyListComponent } from '../emergency-list/emergency-list.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CometChat } from '@cometchat-pro/chat';
import { CometChatUIKit } from '@cometchat/chat-uikit-angular';
import { COMETCHAT_CONSTANTS } from '../common/CONSTS';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  token: any;
  FranchiseID: any;
  ShowPassword: boolean = false;
  UserID: any = '';
  OTPLogin: boolean = false;
  OTPResponse: any;
  HideMobileNumber: boolean = false;
  OTPPayload: any = {};

  constructor(
    private userservice: UsersService,
    private route: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('x-fiftyaccess-token');

    if (this.token == null) {
    } else {
      this.route.navigate(['Dashboard/Task/MyTask']);
    }
  }

  loginresponse: any;

  formSubmit(loginobj: any) {
    loginobj.Type = 'employee';
    loginobj.UserID = this.UserID;
    this.spinner.show();
    this.userservice.userlogin(loginobj).subscribe(
      (loginresponse) => {
        this.spinner.hide();
        this.loginresponse = loginresponse;
        if (this.loginresponse.code == 'S001') {
          localStorage.setItem(
            'x-fiftyaccess-token',
            loginresponse.data['x-fiftyaccess-token']
          );
          this.token = localStorage.getItem('x-fiftyaccess-token');
          localStorage.setItem(
            'FranchiseID',
            loginresponse.data.UserData.Data['FranchiseID']
          );
          localStorage.setItem(
            'LoginEmployeeIDNew',
            loginresponse.data.UserData.Data['EmployeeID']
          );
          localStorage.setItem(
            'UserFirstName',
            loginresponse.data.UserData.Data['FirstName']
          );
          localStorage.setItem(
            'UserLastName',
            loginresponse.data.UserData.Data['LastName']
          );
          this.FranchiseID = localStorage.getItem('FranchiseID');
          var UID =
            loginresponse.data.UserData.Data['EmployeeID'].toLowerCase();

          console.log(UID);

           this.CometChatLogin(UID);

          this.route.navigate(['Dashboard/Task/MyTask']);

          // checkUserLogIn();
        } else {
          alert(this.loginresponse.data);
        }
      },
      (error) => {
        this.spinner.hide();
        alert(error.error.data);
      }
    );
  }

  CometChatLogin(UID: string) {
    console.log(UID)
    CometChatUIKit.login({
      uid: UID,
      authToken: COMETCHAT_CONSTANTS.AUTH_KEY,
    }).then(
      (user) => {
        console.log('comet chat Login Successful:', { user });
        // this.route.navigate(['Dashboard/Task/MyTask']);
      },
      (error) => {
        console.log('comet chat Login failed with exception:', { error });
        //localStorage.removeItem('x-fiftyaccess-token');
      //  this.route.navigate(['/login']);
      }
    );
  }
  ProceedforPassword(loginobj: any) {
    this.ShowPassword = true;
    this.UserID = loginobj.UserID;
    this.HideMobileNumber = true;
  }
  RequestForOTP(loginobj: any) {
    console.log(loginobj);

    loginobj.Type = 'employee';
    this.spinner.show();
    loginobj.MobileNumber = loginobj.UserID;
    this.UserID = loginobj.UserID;
    this.userservice.userlogin(loginobj).subscribe(
      (Response) => {
        this.spinner.hide();
        this.OTPResponse = Response;
        this.OTPLogin = true;
        this.HideMobileNumber = true;

        // if (this.loginresponse.code == "S001") {

        //   localStorage.setItem('x-fiftyaccess-token', loginresponse.data['x-fiftyaccess-token'])
        //   this.token = localStorage.getItem('x-fiftyaccess-token')
        //   localStorage.setItem('FranchiseID', loginresponse.data.UserData.Data['FranchiseID'])
        //   localStorage.setItem("LoginEmployeeIDNew",loginresponse.data.UserData.Data['EmployeeID'])
        //   localStorage.setItem("UserFirstName",loginresponse.data.UserData.Data['FirstName'])
        //   localStorage.setItem("UserLastName",loginresponse.data.UserData.Data['LastName'])
        //   this.FranchiseID = localStorage.getItem('FranchiseID')
        //   this.route.navigate(["Dashboard/Task/MyTask"]);

        // } else {
        //   alert(this.loginresponse.data)
        // }
      },
      (error) => {
        this.spinner.hide();
        alert(error.error.data);
      }
    );
  }
  backtologin() {
    this.ShowPassword = true;
    this.OTPLogin = false;
    this.UserID = '';
  }
  OTPLoginfn(loginobj: any) {
    console.log(this.OTPResponse);
    this.OTPPayload.OTPCode = loginobj.OTPCode;
    this.OTPPayload.OTPRecID = this.OTPResponse.OTPRecID;

    this.OTPPayload.EmployeeID = this.OTPResponse.EmployeeID;
    this.OTPPayload.MobileNumber = this.UserID;
    this.OTPPayload.Type = 'employee';
    this.spinner.show();
    this.userservice.userwithotplogin(this.OTPPayload).subscribe(
      (loginresponse) => {
        this.spinner.hide();
        this.loginresponse = loginresponse;
        if (this.loginresponse.code == 'S001') {
          localStorage.setItem(
            'x-fiftyaccess-token',
            loginresponse.data['x-fiftyaccess-token']
          );
          this.token = localStorage.getItem('x-fiftyaccess-token');
          localStorage.setItem(
            'FranchiseID',
            loginresponse.data.UserData.Data['FranchiseID']
          );
          localStorage.setItem(
            'LoginEmployeeIDNew',
            loginresponse.data.UserData.Data['EmployeeID']
          );
          localStorage.setItem(
            'UserFirstName',
            loginresponse.data.UserData.Data['FirstName']
          );
          localStorage.setItem(
            'UserLastName',
            loginresponse.data.UserData.Data['LastName']
          );
          this.FranchiseID = localStorage.getItem('FranchiseID');
          this.route.navigate(['Dashboard/Task/MyTask']);
        } else {
          alert(this.loginresponse.data);
        }
      },
      (error) => {
        this.spinner.hide();
        alert(error.error.data);
      }
    );
  }
}
