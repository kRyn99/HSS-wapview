import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-input-field',
	templateUrl: './input-field.component.html',
	styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements OnInit {

	@Input() label: string;
	@Input() labelLink: string;
	@Input() errmsg: string;
	@Input() errHidden = false;
	@Input() required = false;
	@Input() name: string;
	@Input() value: any = '';
	@Input() type: string = 'text';
	@Input() placeholder: string;
	@Input() styleText: string;
	@Input() maxlength: number;
	@Input() pattern: string;
	@Input() readonly: boolean;
	@Input() message: string;
	@Input() messageStyle: string;
	@Output() valueChange = new EventEmitter<any>();
	@Output() focusOut = new EventEmitter<any>();
	@Input() styleTextFG: string;

	constructor() { }

	ngOnInit() {
	}

	valueChangeEvent() {
		this.valueChange.emit(this.value);
	}

}
