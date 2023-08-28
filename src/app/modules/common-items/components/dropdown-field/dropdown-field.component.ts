import {Component, Input, Output, EventEmitter} from '@angular/core';

// import * as EventEmitter from 'events';

@Component({
  selector: 'app-dropdown-field',
  templateUrl: './dropdown-field.component.html',
  styleUrls: ['./dropdown-field.component.scss']
})
export class DropdownFieldComponent {

  @Input() label: string;
  @Input() styleText: string;
  @Input() required = false;
  @Input() name: string;
  @Input() value: any = null;
  @Input() options: { name: string, value: any }[];
  @Input() readonly: boolean;
  @Input() defaultValue: any;
  @Input() defaultLabel: string;
  @Input() disabledDefaultOption: boolean = true;
  @Output() valueChange = new EventEmitter<any>();
  @Input() styleTextFG: string;

  // @Output() focusOut = new EventEmitter<any>();

  constructor() {
  }

  isItemSelected(itemValue: any) {
    return itemValue == this.value;
  }

  onOpenDropdown() {

  }

  onSelect(option) {
    this.value = option;
    this.onModelChange(option);
  }

  onBlur(event: any) {
    const {relatedTarget, isTrusted} = event;

    // Check if user clicks on "Suggestion"
    // if (relatedTarget && relatedTarget.classList && relatedTarget.classList.contains('dropdown-item')) {
    //   this.hidden = true;
    // }
    // else if (isTrusted) {
    //   // Fix null "relatedTarget" issue on iPhone/iPad real devices
    //   setTimeout(() => {
    //     this.focusOut.emit();
    //     this.hidden = false;
    //   }, 150);
    // }
    // else {
    //   this.focusOut.emit();
    //   this.hidden = false;
    // }
  }

  onClick(event: any) {
    // const text = $event.target.options[0].text;
    // $event.target.parentElement.querySelector('label').innertext = ('aaaaa');
    // $event.target.options[0].text = '';
  }

  onModelChange(event: any) {
    this.valueChange.emit(event.target.value);
  }
}
