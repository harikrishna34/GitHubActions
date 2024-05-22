import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTaskComponent } from './my-task/my-task.component';
import { CompilitionScreenComponent } from './compilition-screen/compilition-screen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { CustomPipeModule } from '../CustomPipes/CustomPipes.module';
import { ViewcustomerdetailsComponent } from './viewcustomerdetails/viewcustomerdetails.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AddDetailsToChatComponent } from './add-details-to-chat/add-details-to-chat.component';
import { SearchProfileComponent } from './search-profile/search-profile.component';
import { RollbackComponent } from './rollback/rollback.component';
import { HHCInvoiceComponent } from './hhcinvoice/hhcinvoice.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { AsersRequestComponent } from './asers-request/asers-request.component';







@NgModule({
  declarations: [
    MyTaskComponent,
    CompilitionScreenComponent,
    ViewcustomerdetailsComponent,
    AddDetailsToChatComponent,
    SearchProfileComponent,
    

    RollbackComponent,
            HHCInvoiceComponent,
            AsersRequestComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule ,
    CustomPipeModule,
    NgxIntlTelInputModule,

  ]
})
export class MyTasksModuleModule { }
