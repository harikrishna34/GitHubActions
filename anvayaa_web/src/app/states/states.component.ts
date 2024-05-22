import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from '../users.service'
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { invalid } from 'moment';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit {
  public LocationList!: UntypedFormGroup
  public LocationcityList!: UntypedFormGroup
  LocationListType: any = []
  LocationcityListType: any = []
  press: boolean = false
  locationlistarray: any = []
  locationcitylistarray: any = []
  permremovestate: any={}
  create: boolean = true
  permremovecity: string
  createcity: boolean = true
  citypress: boolean = false


  constructor(private router: Router, private route: ActivatedRoute, private userservice: UsersService, private formBuilder: UntypedFormBuilder, private spinner: NgxSpinnerService) { 
 
  }

  ngOnInit(): void {
    this.stateloc()
   this.formbuilder()
   this.cityformbuilder()
   this.citytablestatelist()
   this.tablestatelist()
   this.citydropdownstatelist()


  }
  formbuilder(){
    this.LocationList = this.formBuilder.group({
      selectstate: ['', [Validators.required]],
      StateID: [''],
      Status: [''],
      StateName: ['', [Validators.required]],
      StateCode: ['', [Validators.required]],
      AliseName: ['', [Validators.required]],
      Type: ['', [Validators.required]],
      GST: ['', [Validators.required]],
      CGST: ['', [Validators.required]],
      SGST: ['', [Validators.required]],
      IGST: ['', [Validators.required]],
    })
  }
  cityformbuilder(){
    this.LocationcityList = this.formBuilder.group({
      // selectstatecity: ['', [Validators.required]],
      CityName: ['', [Validators.required]],
      CityShortName:['', [Validators.required]],
      Franchise: ['No', [Validators.required]],
      // RevenueDetails:['', [Validators.required]],
      Status: ['Active', [Validators.required]],
      Type:['', [Validators.required]],
      StateID: ['', [Validators.required]],
      CityID: ['', []],
      // AliseName: ['', [Validators.required]],
      // CityCode:  ['', [Validators.required]],
  


    })
  }
  stateloc() {
    this.userservice.statelist().subscribe((requestData: any) => {
      this.LocationListType = requestData.data
      // console.log(requestData)
    })
  }
  creatstate() {
    // console.log("vvvvvvvvvvv",this.LocationList.controls['AliseName'].status == 'INVALID' )
    this.press = true

    if (this.LocationList.status == "INVALID") {
      return
    }
    if(this.LocationList.value.IGST == 0 && (this.LocationList.value.CGST != this.LocationList.value.SGST)){
      alert("CGST & SGST must be equal")
      return
    }else if(this.LocationList.value.IGST > 0 && (this.LocationList.value.CGST !=0 || this.LocationList.value.SGST !=0)){
      alert("CGST & SGST must be 0")
      return
    }
    // console.log(this.LocationList.value)
    if(this.LocationList.value.GST == "true" || this.LocationList.value.GST == true){
      this.LocationList.value.GST = true
    }else{
      this.LocationList.value.GST = false
    }

    if (this.create == true) {
      this.userservice.creatingstate(this.LocationList.value).subscribe((details) => {
        if (details.code == 'S001') {
          alert(details.data)

          this.tablestatelist()
           this.press = false
          this.formbuilder()
        
        }else if(details.code == 'S002'){
          alert(details.data)
        } else {
          alert(details.data)
        }
      }, (error) => {
        alert(error.error.msg)
      })
}else{
      this.userservice.removetablestate(this.LocationList.value).subscribe((details) => {
        if (details.code == 'S001') {
          alert(details.data)
          this.tablestatelist()
          this.press = false
          this.formbuilder()

        } else {
          alert(details.data)
        }
      }, (error) => {
        alert(error.error.msg)
      })

    }


  }
  selectedstate(data: any) {
    console.log(data.target.value)
    for (let i in this.LocationListType) {
      // console.log(this.LocationListType[i])
      if (data.target.value == this.LocationListType[i].name) {
        // console.log(this.LocationListType[i])
        this.LocationList.patchValue({ StateName: this.LocationListType[i].name })
        this.LocationList.patchValue({ AliseName: this.LocationListType[i].name })
        this.LocationList.patchValue({ Type: this.LocationListType[i].type })
        this.LocationList.patchValue({ StateCode: this.LocationListType[i].code })
      }
    }

  }

  tablestatelist() {
    this.userservice.activestatelist().subscribe((details) => {
      if (details.code == 'S001') {
        this.locationlistarray = details.data
        // console.log(details.data)
      } else if (details.code == 'S002'){
           alert(details.msg)
      } else {
        alert(details.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }
  removetablestatelist() {


    this.userservice.removetablestate({ "StateID": this.permremovestate.StateID, "Status": "InActive" }).subscribe((details) => {
      if (details.code == 'S001') {
        alert(details.data)

        this.tablestatelist()
      } else {
        alert(details.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }
  permissionremovestate(permremovestate: any) {
    console.log(permremovestate)
    this.permremovestate = permremovestate

  }
  updatestatelist(list: any) {
    this.create = false
    this.LocationList.patchValue({ Status: list.Status })
    this.LocationList.patchValue({ StateID: list.StateID })
    this.LocationList.patchValue({ StateName: list.StateName })
    this.LocationList.patchValue({ selectstate: list.StateName })
    this.LocationList.patchValue({ StateCode: list.StateCode })
    this.LocationList.patchValue({ AliseName: list.AliseName })
    if (list.GST == true) {
      list.GST = "true"
    } else {
      list.GST = "false"
    }
    this.LocationList.patchValue({ Type: list.Type })
    this.LocationList.patchValue({ GST: list.GST })
    this.LocationList.patchValue({ CGST: list.CGST })
    this.LocationList.patchValue({ SGST: list.SGST })
    this.LocationList.patchValue({ IGST: list.IGST })

  }
  checkgst(){
    if(this.LocationList.value.GST == "false"){
      this.LocationList.patchValue({ CGST: 0 })
      this.LocationList.patchValue({ SGST: 0 })
      this.LocationList.patchValue({ IGST: 0 })
  
    }else if(this.LocationList.value.GST == "true" ){ 
      console.log(this.LocationList.value.CGST)
      // if(this.LocationList.value.CGST != 0){
      //   console.log("1")
      //   this.LocationList.patchValue({ CGST: 9 })
      // }
      // if(this.LocationList.value.SGST != 0){
      //   this.LocationList.patchValue({ SGST: 9 })
      // }
      // if(this.LocationList.value.IGST == 0){
      //   this.LocationList.patchValue({ IGST: 0 })
      // }
      if(this.LocationList.value.IGST == 0 && (this.LocationList.value.CGST != this.LocationList.value.SGST)){
        alert("CGST & SGST must be equal")
        return
      }else if(this.LocationList.value.IGST > 0 && (this.LocationList.value.CGST !=0 || this.LocationList.value.SGST !=0)){
        alert("CGST & SGST must be 0")
        return
      }



    }
    // console.log(this.LocationList.value)
  }
  citydropdownstatelist() {
    this.userservice.activestatelist().subscribe((requestData: any) => {
        
      if (requestData.code == 'S002'){
        alert(requestData.msg)
   }
      this.LocationcityListType = requestData.data
      // console.log(requestData)


  
    })
   

}
submitcityform() {


  console.log("111",this.citypress,this.LocationcityList.status)
  this.citypress = true

  if(this.LocationcityList.status=="INVALID"){
    return
  }


  if (this.createcity == false) {
    this.userservice.updateviewallcitiestable(this.LocationcityList.value).subscribe((details) => {
      
      if (details.code == 'S001') {
        alert(details.data)
        this.citytablestatelist()
        this.citypress = false
        this.cityformbuilder()
      
      }else if(details.code == 'S002'){
        alert(details.message)
      } else {
        alert(details.message)
      }
    }, (error) => {
      alert(error.error.data)
    })
}else{
  this.userservice.creatingcity(this.LocationcityList.value).subscribe((details) => {
    if (details.code == 'S001') {
      alert(details.data)
      this.citytablestatelist()
      this.citypress = false
      this.cityformbuilder()
     
    } else {
      alert(details.message)
    }
  }, (error) => {
    alert(error.error.data)
  })
}
}
citytablestatelist() {
  this.userservice.viewallcitiestable('').subscribe((details) => {
    if (details.code == 'S001') {
      this.locationcitylistarray = details.data
      // console.log(details.data)
    } else {
      alert(details.data)
    }
  }, (error) => {
    alert(error.error.data)
  })
}
permissionremovecity(permremovecity: any) {
  console.log(permremovecity)
  this.permremovecity = permremovecity

}
updatecitylist(list:any){
  this.createcity = false
  this.LocationcityList.patchValue({ StateID: list.StateID })
  this.LocationcityList.patchValue({ CityName: list.CityName })
  this.LocationcityList.patchValue({ CityShortName: list.CityShortName })
  this.LocationcityList.patchValue({ Type: list.Type })
  this.LocationcityList.patchValue({ CityID: list.CityID })

  
  console.log(this.LocationcityList.value)

}

selectedcity(data: any) {
  console.log(data.target.value)
  for (let i in this.LocationcityListType) {
    // console.log(this.LocationcityListType[i])
    if (data.target.value == this.LocationcityListType[i].selectstatecity) {
      // console.log(this.LocationcityListType[i])
      this.LocationcityList.patchValue({ StateName: this.LocationcityListType[i].selectstatecity })
      this.LocationcityList.patchValue({ Type: this.LocationcityListType[i].CityType })
     
    }
  }
}
}
