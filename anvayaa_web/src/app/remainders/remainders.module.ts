import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TemplatesComponent } from './templates/templates.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateRemaindersComponent } from './create-remainders/create-remainders.component';
import { ViewRemindersComponent } from './view-reminders/view-reminders.component';
import { TemplateslistComponent} from './templateslist/templateslist.component'


@NgModule({
  declarations: [
    TemplatesComponent,
    CreateRemaindersComponent,
    ViewRemindersComponent,
    TemplateslistComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ]
})
export class RemaindersModule { }
