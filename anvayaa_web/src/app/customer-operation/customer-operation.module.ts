import { NgModule,Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDetailesScreenComponent } from './customer-detailes-screen/customer-detailes-screen.component';
import { BrowserModule } from '@angular/platform-browser'
import { CustomerOperationsComponent } from './customer-operations/customer-operations.component';
import { DatePipe } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormGroup ,FormBuilder} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderByPipe } from '../order-by-pipe';
import { PlandetailsComponent } from './plandetails/plandetails.component';


@NgModule({
  declarations: [
    CustomerDetailesScreenComponent,
    CustomerOperationsComponent,
    OrderByPipe,
    PlandetailsComponent

  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
 
  ],
  providers: [Pipe, DatePipe],
})
export class CustomerOperationModule { }
