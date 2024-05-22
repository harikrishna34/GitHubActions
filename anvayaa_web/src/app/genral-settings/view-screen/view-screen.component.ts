import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service'
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, UntypedFormArray, Form } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-view-screen',
  templateUrl: './view-screen.component.html',
  styleUrls: ['./view-screen.component.css']
})
export class ViewScreenComponent implements OnInit {
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
  constructor(private userservice: UsersService, private formBuilder: UntypedFormBuilder, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {



    this.tasksData()
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

  createPermission() {
    this.press = true

    
    if(this.Permission.status=="INVALID"){
      return
    }                                              

    let values = []
    if (this.Permission.value.Roles.length > 0) {
      values = this.Permission.value.Roles.map((role: any) => role.RoleID)
    }



    this.spinner.show()



    this.userservice.createAuthorization(this.Permission.value.TasksType,values).subscribe((requestData) => {
    

      if (requestData.code == "S001") {
        // this.roles = requestData.data

        alert(requestData.data)
        this.spinner.hide()
        this.Permission.reset()
        this.authorizaationsData()
      } else {
        this.spinner.hide()
        alert(requestData.data)
        this.Permission.reset()
        this.authorizaationsData()
      }
    }), (error: any) => {
      this.spinner.hide()
      alert(error.error.data);

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

  updateRole() {
    this.press = true

    if(this.Permission.status=="INVALID"){
      return
    } 

    let roles = []
    if (this.Permission.value.Roles.length > 0) {
      roles = this.Permission.value.Roles.map((role: any) => role.RoleID)
    }


this.spinner.show()
    this.userservice.updateAuthorization(this.Permission.value.TasksType, roles).subscribe((requestData) => {

      if (requestData.code == "S001") {
        // this.roles = requestData.data
        alert(requestData.data)

        this.spinner.hide()
        this.Permission.reset()
        this.authorizaationsData();
        this.submit = true;
        this.updateButton = false;

        // location.reload()
      } else {
        alert(requestData.data)
        this.Permission.reset()
        this.spinner.hide();


      }
    }), (error: any) => {
      this.spinner.hide();
      alert(error.error.data);
      this.Permission.reset()

    };


  }

  authorizaationsData() {
    this.spinner.show()
    this.userservice.AuthorizationsView().subscribe((requestData) => {


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
    this.userservice.roles().subscribe((requestData) => {

      if (requestData.code == "S001") {

        this.roles = requestData.data
        this.spinner.hide()

      }
    }), (error: any) => {
      this.spinner.hide()

      alert(error.error.data);
    };
  }

  getEligibleRoles(roles: any) {
    return roles.filter((role: any) => role.Status !== 'InActive').map((eRole: any) => eRole.Role).join(',')
  }

  tasksData() {

    this.spinner.show()
    this.userservice.dataOfTasksConfiguration().subscribe((requestData) => {

      if (requestData.code == "S001") {
        this.dataOfTasks = requestData.data
        this.spinner.hide()

      }
    }), (error: any) => {
      this.spinner.hide()

      alert(error.error.data);
    };
  }

}
