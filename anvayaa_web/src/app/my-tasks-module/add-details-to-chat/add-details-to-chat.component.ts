import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import {FormGroup,FormControl,UntypedFormBuilder,Validators,FormArray,} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from 'src/app/users.service';
@Component({
  selector: 'app-add-details-to-chat',
  templateUrl: './add-details-to-chat.component.html',
  styleUrls: ['./add-details-to-chat.component.css']
})
export class AddDetailsToChatComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    private userservice: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder) { }

  customerDetails:any;
  Type:any='';
  roleName:string='';
  CustRecID:any='';
  employeeList:any=[];
  changeFlag:boolean=false;
  employeeID:string;
  sales:any=[]
  ngOnInit(): void {
    this.spinner.show();
    this.CustRecID = this.route.snapshot.queryParamMap.get('CustRecID');
    const type = this.route.snapshot.queryParamMap.get('type');
    // this.getAllEmployees()
    switch(type){
      case 'supportexecutive':
          this.Type='Support Executive';
          this.roleName='customercareemployee'
          break;
      case 'caremanager':
          this.Type='Care Manager'
          this.roleName='FieldEmployee'
          break;
      case 'backupcaremanager':
            this.Type='Back Up Care Manager'
            this.roleName='FieldEmployee'
            break;
      case 'manager':
          this.Type='Managers'
          this.roleName='operationalmanager'
          break;
        }
        this.userservice.customerConfigurationDetails(this.CustRecID).subscribe((data)=>{
          if(data.code==="S001"){
            this.customerDetails=data.data;
            console.log("customerDetails",this.customerDetails)
            const paramsForEmployeeList:{Type?:string , ServiceAreaID?:string, CustRecID?:string}={};
            paramsForEmployeeList.Type=this.roleName;
            if(type =="supportexecutive"){
              this.employeeID=this.customerDetails.SupportExecutiveDetails.EmployeeID;
            }
            if(type =="caremanager"){
              this.employeeID=this.customerDetails.DedicatedFieldEmployeeDetails.EmployeeID;
            }
            if(type =="backupcaremanager"){
              this.employeeID=this.customerDetails.BackUpFieldEmployeeDetails.EmployeeID;
            }
            paramsForEmployeeList.ServiceAreaID=this.customerDetails?.PackageDetails?.ServiceAreaID;
            paramsForEmployeeList.CustRecID=this.CustRecID;
              console.log('params for api',paramsForEmployeeList)

            
            this.userservice.getAllEmployees(paramsForEmployeeList).subscribe((employeesData)=>{
              if (employeesData && data.code==="S001" ){
                this.spinner.hide();
                this.employeeList=employeesData.data  
                console.log("employess list ",this.employeeList)
              }
            },(error)=>{
              this.spinner.hide();
              alert(error.error.data)
            })
            const Sales:{Type?:string , ServiceAreaID?:string, CustRecID?:string}={};
            Sales.ServiceAreaID=this.customerDetails?.PackageDetails?.ServiceAreaID;
            Sales.CustRecID=this.CustRecID;
            Sales.Type='FRONT OFFICE/SALES';
            this.userservice.getAllEmployees(Sales).subscribe((employeesData)=>{
              if (employeesData && data.code==="S001" ){
                this.spinner.hide();
                this.sales=employeesData.data  
              }
            },(error)=>{
              this.spinner.hide();
              alert(error.error.data)
            })
            this.spinner.hide();
          }else{
            this.spinner.hide();
            alert(data.data)
          }

        },(error)=>{
          this.spinner.hide();
          alert(error.error.data)
        });     
  }
  handleChangeEmployeeeClick(){
    this.changeFlag=!this.changeFlag
  }
  handleChangeEmployeee(event:any){
    this.employeeID=event.target.value;
  }

  SalesID:any
  handleChangeSalesEmployeee(event:any){
     console.log("salesID ",event.target.value)
     this.SalesID = event.target.value

  }
  handleSubmit(){
    this.spinner.show()
   
  
    const paramsForUpdateEmployee:{Type:string,EmployeeID:string,guid:string}={
      
      Type:this.Type==='Support Executive'?'SE':'CM',
      EmployeeID:this.employeeID,
      guid:this.customerDetails.CometChatGroupDetails.guid
    };
    if(this.Type =="Back Up Care Manager"){
      paramsForUpdateEmployee.Type="BCM"
    }

        
    this.userservice.updateEmployeeToChatGroup(paramsForUpdateEmployee).subscribe((updatedData)=>{
      if(updatedData.code==="S001"){
        this.spinner.hide();
        alert(updatedData.data);
        this.router.navigate(['/Dashboard/Task/MyTask'])
      }else{
        this.spinner.hide();
        alert(updatedData.data)
      }
    },(error)=>{
      this.spinner.hide();
      alert(error.error.data)
    })
  }
  handleCityManagerSubmit(){
    this.spinner.show();
    const paramsForCreateChat:{CustRecID: string,CityManagerID: string,GroupName: string,SalesExecutiveID:string}={
          CustRecID:this.CustRecID,
          CityManagerID:this.employeeID,
          GroupName:this.customerDetails.Name,
          SalesExecutiveID:this.SalesID
    }


    this.userservice.createCometChatGroup(paramsForCreateChat).subscribe((createChatData)=>{
      if(createChatData.code==="S001"){
        this.spinner.hide();
        alert(createChatData.data);
        this.router.navigate(['/Dashboard/Task/MyTask'])
      }else{
        this.spinner.hide();
        alert(createChatData.data)
      }
    },(error)=>{
      this.spinner.hide();
      alert(error.error.data)
    })
  }

  // getAllEmployees(){
  //   this.spinner.show()
  //   this.userservice.salesTeam().subscribe((updatedData)=>{
  //     if(updatedData.code==="S001"){
  //       this.spinner.hide();
  //       console.log("dataof all aemployeees",updatedData)
  //     }else{
  //       this.spinner.hide();
  //       alert(updatedData.data)
  //     }
  //   },(error)=>{
  //     this.spinner.hide();
  //     alert(error.error.data)
  //   })
  // }
}
