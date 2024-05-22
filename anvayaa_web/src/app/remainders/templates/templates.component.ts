import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from '../../users.service'
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { invalid } from 'moment';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
 
  public Remainders!:UntypedFormGroup
  CategoryType: any = []
  TemplateAttributes: any = []
  public TempMessage = '';
  public variable = '';
  isNextDisabled=true
  constructor(private router: Router, private route: ActivatedRoute,private userservice: UsersService, private formBuilder: UntypedFormBuilder, private spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this.remtemp()
    // this.Savechanges()
     this.Remainders = this.formBuilder.group({
      CategoryID: ['', [Validators.required]],
      TemplateName: ['', [Validators.required]],
      Message:['',[Validators.required]],
      TemplateAttributes:['',]
     
    })
    this.Remainders.valueChanges.subscribe((v) => {
      this.isNextDisabled = !this.Remainders.valid;
 });
}
  remtemp() {
    this.userservice.remaindertemplate().subscribe((requestData: any) => {
      this.CategoryType = requestData.data
    })
  }
  Savechanges(){
    console.log(this.Remainders.value.Message)
    if(this.variable.length ==0){
      alert("Enter Attribute")
      return
    }
    this.TempMessage =this.Remainders.value.Message + '{{' + this.variable + '}}';  
    this.Remainders.patchValue({Message:this.TempMessage})
    this.TemplateAttributes.push(this.variable);
    this.variable = '';
  }
   submittemplate(){
    console.log(this.Remainders.value)
    this.Remainders.value.TemplateAttributes = this.TemplateAttributes
        
    if(this.TemplateAttributes.length ==0){
      alert("Enter Message with Attribute")
      return 
    }
    this.userservice.remaindersubmittemp( this.Remainders.value).subscribe((details)=>{
      console.log('SSSSS',details)
      if (details.code == 'S001') {
        this.router.navigate(['Dashboard/settings/viewtemplates'])
       alert(details.data)
      } else {
        alert(details.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }
  backbtn(){
    this.router.navigate(['Dashboard/settings/viewtemplates'])
  }
  get TemplateName(){
    return this.Remainders.get('TemplateName');
  }
  get CategoryID(){
    return this.Remainders.get('CategoryID');
  }
  get Message(){
    return this.Remainders.get('Message');
  }
  
  spaceremove(data:any){

     if ((data.which > 31 && data.which < 48 ) || (data.which > 57 && data.which < 65) || (data.which > 90 && data.which < 97) ||  (data.which > 122 && data.which < 127) ) {
      data.target.value.preventDefault();
    }
  }


}




