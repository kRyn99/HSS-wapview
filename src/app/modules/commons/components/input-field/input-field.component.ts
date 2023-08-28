import { Component, EventEmitter, Input, Output, ElementRef } from '@angular/core';
import { FloatingFieldComponent } from '../floating-field/floating-field.component';
import { InputFieldService } from '@app/modules/commons/shared/service/input-field.service';
import { settings } from '@app/setting';
import { isStrEmpty, makeShortName, isTrim } from '@app/modules/commons/shared/utils/utils';

@Component({
	selector: 'app-input-field',
	templateUrl: './input-field.component.html',
	styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent extends FloatingFieldComponent {


	constructor(
		protected element: ElementRef<HTMLElement>,
		private inputFieldService: InputFieldService) {
		super(element);
	}
	onKeyUp(event) {
		// const key = String.fromCharCode(!event.charCode ? event.which : event.charCode).trim();
		if (this.value !== null) {
			this.value = this.value.trimLeft();
		}
	}
	onKeyPressOnlyNumber(event) {

		// if (this.styleText === '' || this.styleText === null) {
		// 	const ASCIICode = (event.which) ? event.which : event.keyCode;
		// 	if (this.onlyNumber.toString() === 'true') {
		// 		if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
		// 			return false;
		// 			event.preventDefault();
		// 		}
		// 		return true;
		// 	}
		// 	else {
		// 		if ((ASCIICode > 47 && ASCIICode < 58) || (ASCIICode > 96 && ASCIICode < 123) || (ASCIICode > 64 && ASCIICode < 91))
		// 			return true;
		// 		return false;
		// 	}
		// } else if (this.styleText === 'FullTextNoSpecialCharacters') {
		// 	const key = String.fromCharCode(!event.charCode ? event.which : event.charCode).trim();
		// 	if (this.inputFieldService.checkFullTextNoSpecialCharacters(key, localStorage.getItem('lang')) === false) {
		// 		event.preventDefault();
		// 		return true;
		// 	}

		// }
		// else if (this.styleText === 'FullTextNoHTml') {
		// 	const regex = '<>';
		// 	const key = String.fromCharCode(!event.charCode ? event.which : event.charCode).trim();
		// 	if (key !== '' && regex.indexOf(key) >= 0) {
		// 		event.preventDefault();
		// 		return false;
		// 	}
		// }
	}

	onBeforeInput(event) {
		const numberAndLatinCharRegex = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
		const numberRegex = '0123456789';
		const specialRegex = '!”#$%&’()*+,-./:;<=>?@[\]^_`{|}~"\'₫”';
		const htmlRegex = '<>';
		if (event.inputType === 'insertText') {
			if (this.styleText === '' || this.styleText === null) {
				if (this.onlyNumber.toString() === 'true') {
					if (numberRegex.indexOf(event.data) !== -1) {
						return true;
					}
					else return false;
				}
				else {
					if (numberAndLatinCharRegex.indexOf(event.data) !== -1)
						return true;
					else return false;
				}
			}
			else if (this.styleText === 'FullTextNoSpecialCharacters') {
				if (specialRegex.indexOf(event.data) !== -1)
					return false;
				else return true;
			}
			else if (this.styleText === 'FullTextNoHTml') {
				if (htmlRegex.indexOf(event.data) !== - 1)
					return false;
				else return true;
			}
		}
		else {
			return true;
		}
	}

	onPaste(event: ClipboardEvent) {
		const value = event.clipboardData.getData('text/plain').replace(/ /g, '').trim();
		if (this.styleText === '' || this.styleText === null) {
			if (this.onlyNumber.toString() === 'true') {
				const keys = value.split('');
				const regixNumber = '1234567890';
				keys.forEach(obj => {
					if (regixNumber.indexOf(obj.trim()) < 0) {
						event.preventDefault();
						return;
					}
				});
			}
			else {
				const keys = value.split('');
				const regixNumberAndLatinChar = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
				keys.forEach(obj => {
					if (regixNumberAndLatinChar.indexOf(obj.trim()) < 0) {
						event.preventDefault();
						return;
					}
				});
			}
		}
		else if (this.styleText === 'phoneNumberFormat') {

			if (isStrEmpty(value) || !settings.formatPhoneNumberRegex.test(value)) {
				event.preventDefault();
			}
		} else if (this.styleText === 'FullTextNoSpecialCharacters' || this.styleText === 'FullTextNoHTml') {
			const keys = value.split('');
			keys.forEach(obj => {
				if (this.inputFieldService.checkFullTextNoSpecialCharacters(obj.trim(), localStorage.getItem('lang')) === false) {
					event.preventDefault();
					return;
				}
			});
		}
	}


}
