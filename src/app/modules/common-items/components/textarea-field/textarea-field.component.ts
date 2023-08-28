import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-textarea-field',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.scss']
})
export class TextareaFieldComponent implements OnInit {

  @Input() label: string;
	@Input() labelLink: string;
	@Input() errmsg: string;
	@Input() errHidden = false;
	@Input() required = false;
	@Input() name: string;
	@Input() value: any = '';
	@Input() placeholder: string;
	@Input() maxlength: number;
	@Input() pattern: string;
	@Input() readonly: boolean;
	@Output() valueChange = new EventEmitter<any>();
	@Output() focusOut = new EventEmitter<any>();

	constructor() { }

	ngOnInit() {
	}

	valueChangeEvent() {
		this.valueChange.emit(this.value);
	}

}
