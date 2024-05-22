import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReplaceUnderscorePipe} from './replace-underScore-pipe';
import { DatafilterPipe } from './datafilter.pipe';
import { InsertSpacePipe } from './insert-space.pipe'

@NgModule({
  declarations: [ReplaceUnderscorePipe, DatafilterPipe, InsertSpacePipe],
  imports: [
    CommonModule,
  ],
  exports:[ReplaceUnderscorePipe,
           DatafilterPipe,
           InsertSpacePipe       
          ]
})
export class CustomPipeModule { }
