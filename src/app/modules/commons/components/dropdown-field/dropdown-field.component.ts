import { Component, ElementRef, Input, OnInit, Output } from '@angular/core';
import * as EventEmitter from 'events';
import { data } from 'jquery';
import { FloatingFieldComponent } from '../floating-field/floating-field.component';

@Component({
  selector: 'app-dropdown-field',
  templateUrl: './dropdown-field.component.html',
  styleUrls: ['./dropdown-field.component.scss']
})
export class DropdownFieldComponent extends FloatingFieldComponent {

  hidden = true;
  labelDisplay = false;
  constructor(protected element: ElementRef<HTMLElement>) {
    super(element);
  }
  onOpenDropdown() {
    this.hidden = !this.hidden;
  }
  onSelect(option) {
    this.value = option;
    this.hidden = true;
    this.onModelChange(option);

  }
  onBlur(event: any) {
    this.hidden = true;

    const { relatedTarget, isTrusted } = event;

    // Check if user clicks on "Suggestion"
    if (relatedTarget && relatedTarget.classList && relatedTarget.classList.contains('dropdown-item')) {
      this.hidden = true;
    }
    else if (isTrusted) {
      // Fix null "relatedTarget" issue on iPhone/iPad real devices
      setTimeout(() => {
        this.focusOut.emit();
        this.hidden = false;
      }, 150);
    }
    else {
      this.focusOut.emit();
      this.hidden = false;
    }
  }
  onClick($event: any) {
    // const text = $event.target.options[0].text;
    // $event.target.parentElement.querySelector('label').innertext = ('aaaaa');
    this.labelDisplay = true;
    // $event.target.options[0].text = '';
  }
  onModelChange($event: any) {
    this.valueChange.emit($event.target.value);
  }
}
