import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { COMMON_CONFIG } from '@app/shared/contants/common-constants';
import { environment } from '@env/environment';
import { BsDatepickerConfig, BsDatepickerViewMode, BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
	selector: 'app-input-datepicker',
	templateUrl: './input-datepicker.component.html',
	styleUrls: ['./input-datepicker.component.scss']
})
export class InputDatepickerComponent implements OnInit {

	@Input() label: string;
	@Input() errmsg: string;
	@Input() errHidden = false;
	@Input() required = false;
	@Input() name: string;
	@Input() value: any;
	@Input() placeholder: string;
	@Input() maxlength: number;
	@Input() pattern: string;
	@Input() readonly: boolean;
	@Output() valueChange = new EventEmitter<any>();
	@Output() focusOut = new EventEmitter<any>();

	minMode: BsDatepickerViewMode = 'day'; // change for month:year
	bsConfig: Partial<BsDatepickerConfig>;

	constructor(private bsLocaleService: BsLocaleService) {
		// let lang = localStorage.getItem(COMMON_CONFIG.KEY.LOCALIZATION);
		// if (!lang) {
		// 	lang = environment.defaultLang;
		// }
		// this.bsLocaleService.use(lang);
	}

	ngOnInit() {
		this.bsConfig = Object.assign({}, {
			minMode: this.minMode
		});
	}

	handleSelectDate() {
		this.valueChange.emit(this.value);
	}
}
