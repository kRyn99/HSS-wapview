import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FloatingFieldComponent } from '../floating-field/floating-field.component';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent extends FloatingFieldComponent {

  @Input() placeholder = ' ';


  constructor(protected element: ElementRef<HTMLElement>) {
    super(element);
  }


}
