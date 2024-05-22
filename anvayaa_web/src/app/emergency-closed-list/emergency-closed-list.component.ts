import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { UsersService } from '../users.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-emergency-closed-list',
  templateUrl: './emergency-closed-list.component.html',
  styleUrls: ['./emergency-closed-list.component.css']
})
export class EmergencyClosedListComponent implements OnInit {


  filterConditionsForm: UntypedFormGroup
  supportExecutives: any = [];
  careManagers:any=[];
  availbleCities:any=[]
  page:number=1;
  pageLimit=10;
  totalRecords:number;
  closedEmergencyList:any[]=[];
  constructor(private formBuilder:UntypedFormBuilder,
    private userServices:UsersService,
    private datePipe:DatePipe,
    private spinner:NgxSpinnerService) { }
  ngOnInit(): void{
    this.spinner.show();
    this.filterConditionsForm = this.formBuilder.group({
      startDate:[''],
      endDate: [''],
      supportExecutive: [''],
      careManager:[''],
      city:['']
    });


    this.getAllEmployeesList('CUSTOMERCAREEMPLOYEE');
    this.getAllEmployeesList('FieldEmployee');
    this.getAvailableCityDetails();
    this.onFetchClosedEmergencyData({...this.filterConditionsForm.value,...{pageNumber:this.page,pageLimit:this.pageLimit}});
    this.spinner.hide();

  }
  handleOnSearchClick(){
    this.spinner.show();
    if(this.filterConditionsForm.value.startDate){
      this.filterConditionsForm.value.startDate = this.datePipe.transform(this.filterConditionsForm.value.startDate,'dd-MM-YYYY');
    }
    if(this.filterConditionsForm.value.endDate){
      this.filterConditionsForm.value.endDate = this.datePipe.transform(this.filterConditionsForm.value.endDate,'dd-MM-YYYY');
    }
    this.onFetchClosedEmergencyData({...this.filterConditionsForm.value,...{pageNumber:this.page,pageLimit:this.pageLimit}});
    this.spinner.hide();
  }

  getAllEmployeesList(type:string):void{
    this.spinner.show();
    this.userServices.getAllEmployees({Type:type}).subscribe((response)=>{
      if(response.code == "S001"){
        if(response.data.length>0){
          if(type==='CUSTOMERCAREEMPLOYEE'){
            this.supportExecutives=response.data.map((employeeObj:any)=>{
              return {
                EmployeeID: employeeObj.EmployeeID,
                FullName: `${employeeObj.FirstName} ${employeeObj.LastName}`,
              }
            })
          }else if(type === 'FieldEmployee'){
            this.careManagers=response.data.map((employeeObj:any)=>{
              return {
                EmployeeID: employeeObj.EmployeeID,
                FullName: `${employeeObj.FirstName} ${employeeObj.LastName}`,
              }
            })
          }
        }
        else{
          this.spinner.hide();
          this.careManagers=[]
          this.supportExecutives=[];
        }
      }else{
        this.spinner.hide();
       alert(response.message?response.message:"Server Error")
      }
    },(error)=>{
      this.spinner.hide();
      alert(error.error.data)
    })
  }

  getAvailableCityDetails(){
    this.spinner.show();
    this.userServices.viewallcitiestable({}).subscribe(response=>{
      if(response.code == "S001"){
        this.availbleCities=response.data.map((citiesObj:any)=>{
          return { seviceAreaName:citiesObj.CityName,serviceAreaID:citiesObj.CityID}
        })
}      },(error)=>{
      this.spinner.hide();
      alert(error.error.data)
    })
  }


  onTableDataChange(event: any) {
    this.spinner.show();
    this.page = event;
    this.handleOnSearchClick();
    this.spinner.hide()
  }

  onFetchClosedEmergencyData(requiredParamsObj:any){
    this.spinner.show();
    this.userServices.closedEmergencyList(requiredParamsObj).subscribe(res => {
      if (res.code === 'S001') {
        this.closedEmergencyList = res.data.Doc;
        this.totalRecords=res.data.totalRecords
      }else{
        this.spinner.hide();
        alert(res.message)
      }
    },(error)=>{
      this.spinner.hide();
      alert(error.error.data)
    })
  }




}
