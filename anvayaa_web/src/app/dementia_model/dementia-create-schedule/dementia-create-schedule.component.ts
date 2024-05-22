import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { UsersService } from 'src/app/users.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-dementia-create-schedule',
  templateUrl: './dementia-create-schedule.component.html',
  styleUrls: ['./dementia-create-schedule.component.css']
})
export class DementiaCreateScheduleComponent implements OnInit {
  CustRecID:any;
  ppDate:string="30-09-2022 19:34"
  CustomerDetails:any={};
  CreateScheduleParams:any={
    ScheduledDate:true,
    CustID:true,
    CustRecID:true,
    FieldEmployeeID:true
    
  };
  minDate=new Date();
  careSpecialists:any;
  constructor(private datePipe: DatePipe,private router:Router,private activatedRoute:ActivatedRoute,private userService:UsersService,private spinner:NgxSpinnerService) { }
  ngOnInit(): void {
    this.spinner.show();
    this.CustRecID=this.activatedRoute.snapshot.queryParamMap.get("CustRecID");
    this.CreateScheduleParams.CustRecID=this.CustRecID;
    this.userService.customerConfigurationDetails(this.CustRecID).subscribe((response)=>{
      if(response.code=="S001"){
        this.CustomerDetails=response.data;
        this.spinner.hide();
      }else{
        alert(response.data)
      }
      this.spinner.hide();

    },(error)=>{
      alert(error.error.data);
    })
    this.userService.getAllEmployees({CustRecID:this.CustRecID,Status:"Active"}).subscribe((employeesData)=>{
      
      this.spinner.show();
      
      if(employeesData.code="S001"){
        this.careSpecialists=employeesData.data;
        this.spinner.hide();
      }else{
        this.spinner.hide();
        return;
      }
    },(error)=>{
      alert(error.error.data)
    })
    this.spinner.hide();
  }
  onBackBtnClick(){
    this.spinner.show();
    this.router.navigate(['/Dashboard/dementia/dementiaAllCustomers']);
    this.spinner.hide();
  }

  onScheduleSubmit(){   
    for( let k in this.CreateScheduleParams){
      if(this.CreateScheduleParams[k]==undefined||this.CreateScheduleParams[k]==null||this.CreateScheduleParams[k]==""||this.CreateScheduleParams[k]==true){
        if(k=="ScheduledDate"){
          alert("Please Enter Schedule Datee");
          return;
        }
        if(k=="CustID"){
          alert("Please Select Beneficiary");
          return;
        }
        if(k=="FieldEmployeeID"){
          alert("Please Select Care Specialist");
          return;
        }
        return;
      }
    }
    // console.log(this.CreateScheduleParams);
    this.userService.createDementiaSchedule(this.CreateScheduleParams).subscribe((scheduled)=>{
      if(scheduled.code=="S001"){
        alert(scheduled.message);
        this.router.navigate(['/Dashboard/dementia/dementiaSchedule']);
      }else{
        alert(scheduled.message);
      }
      
    },(error)=>{
      alert(error.error.data)
    })
  }

  onBeneficiarySelection(ben:any){
    this.spinner.show();
    this.CreateScheduleParams.CustID=ben.target.value;
    this.spinner.hide();

  }
  onCareSpecialistSelection(careSpecialist:any){
    this.spinner.show();
    this.CreateScheduleParams.FieldEmployeeID=careSpecialist.target.value;
    this.spinner.hide();
  }

  onDatePick(time:any){
    
    let da1=new Date(time.target.value); console.log(da1);
    let selectedDate=new Date(da1.getTime());
    // console.log(selectedDate);
    let result=this.datePipe.transform(selectedDate,'dd-MM-YYYY HH:mm')
    // console.log("$$$$$$$",result);
    // console.log("@@@",da1.getTime())
    // console.log("&&&&&&",new Date(da1.getTime()));
    // this.spinner.show();
    // let p1=new Date(time.target.value);
    // let month=('0'+(p1.getMonth()+1)).slice(-2)
    // let date=p1.getDate()+"-"+month+"-"+p1.getFullYear()+" "+p1.getHours()+":"+p1.getMinutes();
    // console.log("Date")
    this.CreateScheduleParams.ScheduledDate=result;
    
  }

}
