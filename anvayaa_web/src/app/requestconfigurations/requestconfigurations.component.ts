import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service'
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, UntypedFormArray, Form } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { invalid } from 'moment';

@Component({
  selector: 'app-requestconfigurations',
  templateUrl: './requestconfigurations.component.html',
  styleUrls: ['./requestconfigurations.component.css']
})
export class RequestconfigurationsComponent implements OnInit {
  dropdownList: string;
  selectedItems: any = [];
  dropdownSettings: IDropdownSettings;
  item_id: any
  IDropdownSettings: any
  dataOfTasks: any = []
  roles: any = []
  Permission!: UntypedFormGroup
  Roles!: UntypedFormArray
  // values: any = []
  authorizationTable: any = []
  roleData: any
  updateButton: any = false
  submit: any = true
  filterdata: any
  UpdateRoles: any = []
  press: any = false
  TypeOfTasks:any=[]
  constructor(private userservice: UsersService, private formBuilder: UntypedFormBuilder, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {


this.rolesData()
    this.authorizaationsData()


    this.Permission = this.formBuilder.group({
      "TasksType": ['', [Validators.required]],
      "Roles": ['']
    })


    this.dropdownSettings = {
      singleSelection: false,
      idField: 'RoleID',
      textField: 'Role',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 6,
      allowSearchFilter: true
    };



  }

  reqcreatePermission() {
    this.press = true
    
    if(this.Permission.status=="INVALID"){
      return
    }
    
    let values = []
    if (this.Permission.value.Roles.length > 0) {
      values = this.Permission.value.Roles.map((role: any) => role.RoleID)
    }



    this.spinner.show()



    this.userservice.reqcreateAuthorization(this.Permission.value.TasksType,values).subscribe((requestData:any) => {

      if (requestData.code == "S000") {
  
        alert(requestData.message)
        this.spinner.hide()
        this.Permission.reset()
        this.authorizaationsData()
      } else {
        this.spinner.hide()
        alert(requestData.message)

      }
    }), (error: any) => {
      this.spinner.hide()
      alert(error.error.message);

      this.Permission.reset()

    };
    this.spinner.hide()

  }

  existingTableData(data: any) {
    this.submit = false
    this.updateButton = true

    this.spinner.show()


    this.UpdateRoles = data.Roles.filter((Roles: any) => {
      return Roles.Status != "InActive"
    })

    this.Permission.patchValue({ TasksType: data.TaskType })
    this.Permission.patchValue({ Roles: this.UpdateRoles })
    this.spinner.hide()
  }



  authorizaationsData() {
    this.spinner.show()
    this.userservice.reqAuthorizationsView().subscribe((requestData:any) => {


      if (requestData.code == "S001") {
        this.authorizationTable = requestData.data
        this.spinner.hide()
      }
    }), (error: any) => {
      this.spinner.hide()
      alert(error.error.data);
    };
  }

  rolesData() {
    this.spinner.show()
    this.userservice.roles().subscribe((requestData:any) => {

      if (requestData.code == "S001") {

        this.roles = requestData.data
        this.TypeOfTasks = requestData.requestConfigTaskTypes
        this.spinner.hide()

      }
    }), (error: any) => {
      this.spinner.hide()

      alert(error.error.data);
    };
  }

  getEligibleRoles(roles: any) {
    return roles.filter((role: any) => role.Status !== 'InActive').map((eRole: any) => eRole.RoleAliasName).join(',')
}



}
