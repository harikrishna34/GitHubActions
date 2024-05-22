import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from '../../users.service'
import { NgxSpinnerService } from 'ngx-spinner';
// import { FormGroup } from '@angular/forms';
import { FormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-viewallusers',
  templateUrl: './viewallusers.component.html',
  styleUrls: ['./viewallusers.component.css']
})
export class ViewallusersComponent implements OnInit {
  usersarray:any= []
  UserUid:any
  constructor(private formBuilder: UntypedFormBuilder,private userservice: UsersService,private Router: Router, private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    this.viewusers()
  }


  viewusers() {
    this.spinner.show()
    var role 
    this.userservice.chatusers().subscribe((Response) => {
      if (Response.code == "S001") {
        this.spinner.hide()
        this.usersarray = Response.data
      } else {
        alert(Response.message)
        this.spinner.hide()
      }

    }, (error) => {
      alert(error.error.message)
      this.spinner.hide()
    })

  }
  removeUserModel(data:any){
   
     this.UserUid = data.uid

  }
  removeusers() {
    this.spinner.show()
    var param = {"permanent":false}
    this.userservice.removechatuser(this.UserUid,param).subscribe((Response) => {
      if (Response.code == "S001") {

        alert(Response.data.message)
        this.spinner.hide()
        this.viewusers()
      } else {
        alert(Response.message)
        this.spinner.hide()
      }

    }, (error) => {
      alert(error.error.message)
      this.spinner.hide()
    })

  }
}
