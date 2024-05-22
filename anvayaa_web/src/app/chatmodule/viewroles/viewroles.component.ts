import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from '../../users.service'
import { NgxSpinnerService } from 'ngx-spinner';
// import { FormGroup } from '@angular/forms';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-viewroles',
  templateUrl: './viewroles.component.html',
  styleUrls: ['./viewroles.component.css']
})
export class ViewrolesComponent implements OnInit {
  rolesarray:any = []
  ChatRolesForm:UntypedFormGroup
  submit:boolean = false
  roleslistarray:any=[]
  roletype:any
  removeRoleID:any
  constructor(private formBuilder: UntypedFormBuilder,private userservice: UsersService,private Router: Router, private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.viewRoles()
    this.roleslist()
    this.ChatRolesForm = this.formBuilder.group({
      role:[''],
      name:['']
    })
    
  }

  roleslist(){

    this.spinner.show()
    this.userservice.viewchatroles().subscribe((Response) => {
      if (Response.code == "S001") {
        this.spinner.hide()
        this.roleslistarray = Response.data
       console.log("roles list",this.roleslistarray)
      } else {
        alert(Response.message)
        this.spinner.hide()
      }

    }, (error) => {
      alert(error.error.message)
      this.spinner.hide()
    })
  } 

  roleid(data:any){
    this.roletype = data.target.value
  }

viewRoles() {
    this.spinner.show()
    this.userservice.chatViewRoles().subscribe((Response) => {
      if (Response.code == "S001") {
        this.spinner.hide()
        this.rolesarray = Response.data

      } else {
        alert(Response.message)
        this.spinner.hide()
      }

    }, (error) => {
      alert(error.error.message)
      this.spinner.hide()
    })

  }

  confirmationToRemove(data:any){

           this.removeRoleID = data.role
  }

  submitrole(){
      this.submit = true

      if(this.ChatRolesForm.status ==='INVALID'){}else{

        this.ChatRolesForm.value.name = this.roletype
        this.spinner.show()
        this.userservice.createchatroles(this.ChatRolesForm.value).subscribe((Response) => {
          if (Response.code == "S001") {
            this.spinner.hide()
            alert("Role Created ")
            this.viewRoles()
            this.ChatRolesForm.reset()
          } else {
            alert(Response.data)
            this.spinner.hide()
          }
    
        }, (error) => {
          alert(error.error.data.details.role[0])
          this.spinner.hide()
        })

      }
       

  }

  removerole(){
    this.submit = true

  
     this.spinner.show()

     this.userservice.removechatrole(this.removeRoleID).subscribe((Response) => {
    if (Response.code == "S001") {
      this.spinner.hide()
      alert(Response.data.message)
      this.submit = true
      this.viewRoles()
  
    } else {
      alert(Response.data)
      this.spinner.hide()
    }

  }, (error) => {
    alert(error.error.data)
    this.spinner.hide()
  })
}
}
