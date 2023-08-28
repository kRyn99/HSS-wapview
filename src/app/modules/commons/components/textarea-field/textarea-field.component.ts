import { Component, ElementRef, Input } from '@angular/core';
import { FloatingFieldComponent } from '../floating-field/floating-field.component';

@Component({
  selector: 'app-textarea-field',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.scss']
})
export class TextareaFieldComponent extends FloatingFieldComponent {

  @Input() rows: number = 2;

  characterCount: number = 0;

  constructor(protected element: ElementRef<HTMLElement>) {
    super(element);
  }

  onModelChange(value: string) {
    this.characterCount = value.length;
    this.valueChange.emit(value);
  }

  omitSpecialChars(event: any) {
    // let k = event.charCode;
    // return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  onClear() {
    super.onClear();
    this.characterCount = 0;
  }

}
