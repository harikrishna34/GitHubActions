import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../users.service'
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators,AbstractControl } from '@angular/forms';
import { SwPush } from "@angular/service-worker";


interface PMSData{
  [key:string]:any
}

@Component({
  selector: 'app-comprehensivepms',
  templateUrl: './comprehensivepms.component.html',
  styleUrls: ['./comprehensivepms.component.css']
})

export class ComprehensivepmsComponent implements OnInit {
  @ViewChild('addMoneyModal')  addMoneyModal:any;

  pmsData: PMSData = {};
  custRecID:string|null='';
  rowsToShow: number = 10000 ;
  addMoneyForm:FormGroup;
  paymentMode=['Cash','Cheque','Wiretransfer'];
  addMoneySubmit:boolean=false;
  currentPage: number = 10;

  constructor(private _swPush: SwPush, private snap: ActivatedRoute,private userservice: UsersService, private datePipe: DatePipe, private route: Router , private spinner: NgxSpinnerService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.custRecID = this.snap.snapshot.queryParamMap.get('CustRecID');
    this.onAddMoneyFormLoad()
    this.loadData(this.custRecID,this.currentPage);
  }
  get addMoneyFormValues(): { [key: string]: AbstractControl } {
    return this.addMoneyForm.controls;
  }

  transactionLength:any = []
  loadData(custRecID:string|null,pageSize:number) {
    if(custRecID){
      // this.spinner.show();
      this.userservice.pmsdetailsatcomprehensive(custRecID,pageSize).subscribe((response:any) => {
        if (response.code == 'S001') {
          this.pmsData=response.data
          this.pmsData['Transactions'].sort((a: any, b: any) => {
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
          });
        }
        else if (response.code == 'ND01') {
          alert(response.data.message)
        } else {
          alert(response.data.message)
        }
      }, (error:any) => {
        alert(error.error.message)
      })
    }
  }
  showMore() {
    // this.currentPage++;
    this.currentPage += 10;
    this.loadData(this.custRecID, this.currentPage);
  }
  onAddMoneyFormLoad(){
    this.addMoneyForm=this.formBuilder.group({
      Amount:['',[Validators.required]],
      EmergencyAmount:['',[Validators.required]],
      PaymentMode:['',[Validators.required]],
      PaymentType:['Offline',[Validators.required]],
      TransactionAmountLimit:[0,[Validators.required]],
      BalanceAmount:[+`${this.pmsData['BalanceAmount']}`,[Validators.required]]
    })
  }

getColorForRow(paymentStatus: string): string {
  switch (paymentStatus) {
      case 'Approved':
          return 'green';
      case 'NotApproved':
          return 'orange';
      case 'Canceled':
          return 'red';
      default:
          return 'black';
  }
}

navigatetoTransactiondetails(data:any){
  let CID = data.CustRecID;
  // this.route.navigate(['Dashboard/CustomerDashboard/viewTransactiondetails'],{ queryParams:{CustRecID:CID} } )
}

  onAddMoneySubmit(){
    this.addMoneySubmit=true;
    if(this.addMoneyForm.invalid){
      return ;
    }
    const requiredParms={...this.addMoneyForm.value};
    requiredParms.CustRecID=this.custRecID;
    this.userservice.addMoneyToVirtualAccount(requiredParms)['subscribe']((response:{[key:string]:any})=>{
      if(response['code']==='S001'){
        this.addMoneyModal.nativeElement.click();
        alert('Transaction Successful');
      }else{
        alert(response['data']);
      }
    },(error:any) => {
      alert(error.error.data)
    })
  }
}
