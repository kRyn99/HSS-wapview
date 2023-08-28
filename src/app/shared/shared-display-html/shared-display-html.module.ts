
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoordinateDirective} from './coordinate.directives';
import { NumbersOnlyDirective } from './only-number.directives';
import { SafeHtmlPipe } from '../utils/safeHtml.pipe';



@NgModule({
  declarations: [ SafeHtmlPipe, CoordinateDirective, NumbersOnlyDirective],
  exports: [ SafeHtmlPipe, CoordinateDirective, NumbersOnlyDirective],
  imports: [
    CommonModule
  ]
})
export class SharedDisplayHtmlModule { }
