import { Component, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PickerPopupComponent } from '../picker-popup/picker-popup.component';
import { OverlayService } from '@app/modules/commons/shared/service/overlay.service';
import { TranslateService } from '@ngx-translate/core';
import {FloatingFieldComponent} from '../../../../commons/components/floating-field/floating-field.component';

@Component({
	selector: 'app-input-field-calenda',
	templateUrl: './input-field-calenda.component.html',
	styleUrls: ['./input-field-calenda.component.scss']
})
export class InputFieldCalendaComponent extends FloatingFieldComponent implements OnInit {
	constructor(protected element: ElementRef<HTMLElement>,
		private modalService: NgbModal,
		protected translate: TranslateService,
		protected overlay: OverlayService) {
		super(element);
	}
	ngOnInit(): void {

	}
	openCalenda() {

		const modalRef = this.modalService.open(PickerPopupComponent, { size: 'md', centered: true, backdrop: 'static', keyboard: false });
		if (this.value == null || this.value === '' || this.value === undefined) {
			const date = new Date();
			modalRef.componentInstance.curentTime = date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() - 14);
		} else {
			const date = new Date();

			const birth = new Date(this.value.split('/')[1] + '/'
				+ this.value.split('/')[0] + '/'
				+ this.value.split('/')[2]);
			if (birth.getFullYear() + 14 > date.getFullYear()) {
				modalRef.componentInstance.curentTime = date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() - 14);
			}
			if (birth.getFullYear() + 70 < date.getFullYear()) {
				modalRef.componentInstance.curentTime = date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() - 14);
			}
			modalRef.componentInstance.curentTime = this.value;

		}

		modalRef.componentInstance.passEntry.subscribe(value1 => {
			const date = new Date();
			const birth = new Date(value1.split('/')[1] + '/'
				+ value1.split('/')[0] + '/'
				+ value1.split('/')[2]);
			if (birth.getFullYear() + 14 > date.getFullYear()) {
				// this.overlay.alert(this.translate.instant('ERROR.NOTE'), this.translate.instant('SIGN_UP.INVALID_BIRTH'));
				return false;
			}
			if (birth.getFullYear() + 70 < date.getFullYear()) {
				// this.overlay.alert(this.translate.instant('ERROR.NOTE'), this.translate.instant('SIGN_UP.INVALID_BIRTH'));
				return false;
			}
			this.value = value1;
			this.onModelChange(value1);
		});

	}

}
