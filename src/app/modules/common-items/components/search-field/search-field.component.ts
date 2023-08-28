import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent {

  @Input() label: string;
	@Input() errmsg: string;
	@Input() errHidden = false;
	@Input() required = false;
	@Input() name: string;
	@Input() value: any = '';
	@Input() placeholder: string;
	@Input() type: string = 'text';
	@Input() maxlength: number;
	@Input() pattern: string;
	@Input() styleText: string;
	@Input() readonly: boolean;
	@Output() valueChange = new EventEmitter<any>();
	@Output() focusOut = new EventEmitter<any>();
	@Output() search = new EventEmitter<any>();

	constructor() { }

	ngOnInit() {
	}

	handleSearch() {
    this.valueChange.emit(this.value);
  }

	valueChangeEvent() {
		this.valueChange.emit(this.value);
	}

}
