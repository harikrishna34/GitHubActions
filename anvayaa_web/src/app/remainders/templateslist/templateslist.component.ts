import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from '../../users.service'
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { invalid } from 'moment';

@Component({
  selector: 'app-templateslist',
  templateUrl: './templateslist.component.html',
  styleUrls: ['./templateslist.component.css']
})
export class TemplateslistComponent implements OnInit {
  public Templates!:UntypedFormGroup
  templatelistarray:any = []
  permremove:string

  constructor( private router: Router, private route: ActivatedRoute, private userservice: UsersService, private formBuilder: UntypedFormBuilder, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.createtemplate()
  }

  templatecreation(){
    this.router.navigate(['Dashboard/settings/templatecreation'])
  }
  createtemplate(){
    
    this.userservice.remaindercreatetemp({}).subscribe((details)=>{
      if (details.code == 'S001') {
    this.templatelistarray = details.data
    // console.log('list',this.templatelistarray)
      } else {
        alert(details.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }
  removetempbtn(Tempid:any){
    // console.log(Tempid)
    this.userservice.remainderlistremovebtn({"TemplateID":Tempid}).subscribe((details)=>{
      if (details.code == 'S001') {
        alert(details.data)
        this.createtemplate()
      } else {
        alert(details.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }
  permissionremove(permremove:any){
   this.permremove = permremove
  // console.log(this.permremove)
  }  

}
