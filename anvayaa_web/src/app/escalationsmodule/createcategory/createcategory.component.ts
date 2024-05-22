import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from '../../users.service'
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form, AbstractControl, ValidatorFn } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-createcategory',
  templateUrl: './createcategory.component.html',
  styleUrls: ['./createcategory.component.css']
})
export class CreatecategoryComponent implements OnInit {
  categoryForm:UntypedFormGroup
  subCat:boolean = false
  submit :boolean = false
  Subscription:Subscription
  CategoriesList:any = []
  SubCategoriesList:any = []
  submitbutton :boolean = true
  updateButton:boolean = false
  subcatogery:boolean = false
  constructor(private userservice: UsersService,private route: Router, private activatedRoute: ActivatedRoute, private formBuilder: UntypedFormBuilder,  private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
   
     this.viewAllEscalation()


    this.categoryForm = this.formBuilder.group({

      "Type": ['',[Validators.required]],
      "Name":['',[Validators.required]],
      "TypeID":[''],
      "ID":[''],
      "TAT":this.formBuilder.group({
        "Type": ['',[Validators.required]],
        "Time": ['',[Validators.required]]
      })
    })

     


  }

  viewAllEscalation(){
    
    this.spinner.show()
    this.userservice.viewAllEscalationMasters().subscribe((data) => {
      if (data.code == "S001") {
        this.CategoriesList = data.data.Categories
        this.SubCategoriesList = data.data.SubCategories
        this.spinner.hide();
      }
      if (data.code == "S002") {
        alert(data.data);
        this.spinner.hide();
      }
    }, (error) => {
      alert(error.error.data)
      this.spinner.hide();
    })
  }



  subcategories(data:any){
    let category = data.target.value 
    if(category == 'SubCategory'){
        this.subCat = true
    }else{
      this.subCat = false
    }
  }

  back(){

    this.route.navigate(['Dashboard/escalation/dashboard'])
  }

  creatmaster(){
    
     this.submit = true
    if (this.subCat == true && this.categoryForm.value.TypeID == "") {
      this.subcatogery = true
    } else {
      this.subcatogery = false  
    }
     if(this.categoryForm.status == 'INVALID'){

     }else{
      this.spinner.show();
      delete this.categoryForm.value.ID

      

      this.userservice.createEscalationCategory(this.categoryForm.value).subscribe((data) => {
       if (data.code == "S001") {
         alert(data.message)
         this.subCat = false
         this.viewAllEscalation()
         this.categoryForm.reset()
         this.spinner.hide();

       }
       if (data.code == "S002") {
         alert(data.data);
         this.spinner.hide();
       }
     }, (error) => {
       alert(error.error.data)
       this.spinner.hide();
     })

     }
   
  }

  editCategory(obj:any){
    this.submitbutton = false
    this.updateButton = true
    if (obj.Type == 'SubCategory') {
      this.subCat = true
    } else {
      this.subCat = false
    }
    this.categoryForm.patchValue({ Type: obj.Type })
    this.categoryForm.patchValue({ TypeID: obj.TypeID })
    this.categoryForm.patchValue({ ID: obj.ID })
    this.categoryForm.patchValue({ Name: obj.Name })
    this.categoryForm?.get('TAT')?.patchValue({ Type: obj.TAT.Type })
    this.categoryForm?.get('TAT')?.patchValue({ Time: obj.TAT.Time })

  }

   checkNumberFieldLength(elem:any){

    
    if (elem.target.value.length > 1) {
            elem.target.value = elem.target.value.slice(0,1); 
        }
    }

    valueCheck(event:any){
   
      console.log("fff",event.target.value)
      if(event.target.value < 0 || event.target.value === '-'){
        alert(" Please Don't Enter Negitive Values & Special Charecters")
     }

    }

  updatemaster(){
    this.submitbutton = true
    this.updateButton = false

    this.submit = true
    if(this.categoryForm.status == 'INVALID'){
       console.log("update Invalid",this.categoryForm.value)
    }else{
     this.spinner.show();
     this.userservice.updateEscalationMasters(this.categoryForm.value).subscribe((data) => {
      if (data.code == "S001") {
        alert(data.message)
        this.viewAllEscalation()
        this.spinner.hide();
        this.categoryForm.reset()

      }
      if (data.code == "S002") {
        alert(data.data);
        this.spinner.hide();
      }
    }, (error) => {
      alert(error.error.data)
      this.spinner.hide();
      this.submitbutton = true
    this.updateButton = false
    })

    }


  }

}
