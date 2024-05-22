import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from '../users.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form } from '@angular/forms';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {
  Permissions: any = []
  Roles: any = []
  Modules: any = []
  Channel_Partners: any = [];
  PrivilegesArray: any = [];
  privilegeSettings: any = {};
  responseObj: any = {};
  update: any = false;
  create: any = true;
  isRole: boolean = false;
  public createPermissionForm!: UntypedFormGroup;
  constructor(private spinner: NgxSpinnerService, private userService: UsersService, private route: Router, private activatedRoute: ActivatedRoute, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.userService.getRolesModules().subscribe((response) => {
      if (response.code == "PD01") {
        alert("You Don't Have a Permission")
        return;
      }
      if (response.code == "S001") {
        this.Roles = response.data.roles;
        this.PrivilegesArray = response.data.privileges;
        this.Modules = response.data.modules
      }
    }, function (error) {
      alert(error.error.data)
    });

    this.permissionData();
    this.userService.getChannelPartners().subscribe((response) => {
      if (response.code == "PD01") {
        alert("You Don't Have a Permission")
        return;
      }
      if (response.code == "S001") {
        this.Channel_Partners = response.data;
      }
    }, function (error) {
      alert(error.error.data)
    });
    this.createPermissionForm = this.formBuilder.group({
      RoleID: ['',  Validators.required],
      Module: ['',  Validators.required],
      Role: ["",  Validators.required],
      PermissionID:[''],
      ChannelPartnerID: [''],
      Privileges: ['', Validators.required],
      ChannelPartners: this.formBuilder.group({
        ChannelPartnerID: [''],
        ChannelPartnerName: [''],
        Privileges: ['', Validators.required]
      })
    })

    this.privilegeSettings = {
      singleSelection: false,
      idField: 'PrivilegeID',
      textField: 'Privilege',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All'
    };

  }


  permissionData() {
    this.userService.Permissions().subscribe((respoonse) => {
      if (respoonse.code == "PD01") {
        alert("You Don't Have a Permission")
        return;
      }
      if (respoonse.code == "S001") {
        this.Permissions = respoonse.data;
      }
    }, function (error) {
      alert(error.error.data)
    });
  }

  roleSelection(stage: any) {
    let index = this.Roles.findIndex((role: any) => role.RoleID === this.createPermissionForm.value.RoleID);
    this.createPermissionForm.value.Role = this.Roles[index]["Role"];
    this.createPermissionForm.patchValue({ Role: this.Roles[index]["Role"] })
  }
  channelSelection(stage: any) {
    console.log(stage)
    let index = this.Channel_Partners.findIndex((channel: any) => channel.ChannelID === this.createPermissionForm.value.ChannelPartners.ChannelPartnerID);
    // this.createPermissionForm.value["ChannelPartners"]["ChannelPartnerName"] = this.Channel_Partners[index].Name;
    this.createPermissionForm.get("ChannelPartners")?.patchValue({ ChannelPartnerName: this.Channel_Partners[index].Name });
  }

  updatePermisiion(permission: any) {
    console.log(permission)
    this.update = true;
    this.create = false;
    this.createPermissionForm.patchValue({ PermissionID: permission.PermissionID })
    this.createPermissionForm.patchValue({ ChannelPartnerID: permission.ChannelPartners[0].ChannelPartnerID })
    this.createPermissionForm.patchValue({ RoleID: permission.RoleID });
    this.createPermissionForm.patchValue({ Module: permission.Module });
    this.createPermissionForm.get("ChannelPartners")?.patchValue({ ChannelPartnerID: permission.ChannelPartners[0].ChannelPartnerID });
    this.createPermissionForm.get("ChannelPartners")?.patchValue({ Privileges: permission.ChannelPartners[0].Privileges });
  }

  updatePermisiionApi() {
    let Obj = this.createPermissionForm.value.ChannelPartners;
    delete this.createPermissionForm.value.ChannelPartners;
    this.createPermissionForm.value.ChannelPartners = [];
    this.createPermissionForm.value.ChannelPartners.push(Obj)

    this.createPermissionForm.patchValue({ Privileges: this.createPermissionForm.value.ChannelPartners[0].Privileges })

    this.userService.updatePermission(this.createPermissionForm.value).subscribe((assignedVendorsData) => {
      if (assignedVendorsData.code == "S001") {
        alert(assignedVendorsData.data)
        this.cancelPermission();
        this.permissionData();
      } else {
        alert(assignedVendorsData.data)
      }
    }, function (error) {
      alert(error.error.data)
    })
  }

  create_Permisiion() {
    this.update = false;
    this.create = true;
  }
  cancelPermission() {
    this.createPermissionForm.patchValue({ RoleID: '' });
    this.createPermissionForm.patchValue({ Module: '' });
    this.createPermissionForm.get("ChannelPartners")?.patchValue({ ChannelPartnerID: '' });
    this.createPermissionForm.get("ChannelPartners")?.patchValue({ Privileges: [] });
  }

  createPermission() {
    let Obj = this.createPermissionForm.value.ChannelPartners;
    delete this.createPermissionForm.value.ChannelPartners;
    this.createPermissionForm.value.ChannelPartners = [];
    this.createPermissionForm.value.ChannelPartners.push(Obj)

    this.userService.createPermission(this.createPermissionForm.value).subscribe((assignedVendorsData) => {
      if (assignedVendorsData.code == "S001") {
        alert(assignedVendorsData.data)
        this.cancelPermission();
        this.permissionData();
      } else {
        alert(assignedVendorsData.data)
      }
    }, function (error) {
      alert(error.error.data)
    })
  }
}