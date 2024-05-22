import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute,Router,Routes} from '@angular/router';

import { FormControl, FormControlName, FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  

  CustomerID:any;
  data:any = {}


  constructor(private userservice: UsersService, private route: ActivatedRoute) { }

  ngOnInit(): void {


    this.CustomerID = this.route.snapshot.queryParamMap.get("CustRecID")
        console.log('custID',this.CustomerID)

  //     this.userservice.configrationDetails( this.CustomerID).subscribe(Details=>{

  //       console.log("details of cutomer",this.data)

  //       console.log(Details)
  // })

}
}
