import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerdashboardComponent } from './customerdashboard/customerdashboard.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { PdfViewerModule } from 'ng2-pdf-viewer'; // <- import PdfViewerModule


@NgModule({
  declarations: [
    CustomerdashboardComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,FormsModule,
    ReactiveFormsModule,
    // PdfViewerModule,
  ]
})
export class SixinonemoduleModule { }
