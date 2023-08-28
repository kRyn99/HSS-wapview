import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-input-password',
	templateUrl: './input-password.component.html',
	styleUrls: ['./input-password.component.scss']
})
export class InputPasswordComponent implements OnInit {

	@Input() label: string;
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
	hiddenPassword: boolean = true;

	constructor() { }

	ngOnInit() {
	}

	togglePassword() {
		this.hiddenPassword = !this.hiddenPassword;
	}

	valueChangeEvent() {
		this.valueChange.emit(this.value);
	}
}
