import { Component, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { FloatingFieldComponent } from '../floating-field/floating-field.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-input-otp',
	templateUrl: './input-otp.component.html',
	styleUrls: ['./input-otp.component.scss']
})
export class InputOtpComponent extends FloatingFieldComponent implements OnInit {

	@Output() parentResend: EventEmitter<any> = new EventEmitter();


	title = this.translate.instant('COMMON.OTP_TITLE');
	notification = this.translate.instant('COMMON.OTP_MESSAGE');
	noReceived = this.translate.instant('SIGN_UP.OTP_NO_RECEIVED');
	resend = this.translate.instant('COMMON.OTP_RESEND');
	close = this.translate.instant('COMMON.CLOSE');
	confirm = this.translate.instant('COMMON.CONFIRM');
	timeExpires = this.translate.instant('ERROR.TIME_EXPIRES');

	errmsg: string;
	maxlength = 10;
	confirmDisabled = true;
	resendDisabled = true;
	inputOtpDisabled = false;
	timer = 60;
	value: string;
	placeholderInput = 'OTP';
	constructor(protected element: ElementRef<HTMLElement>, private translate: TranslateService) {
		super(element);
	}
	ngOnInit(): void {
		this.countdown();
	}
	onKeypress(event) {
		const ASCIICode = (event.which) ? event.which : event.keyCode
		if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
			return false;
		return true;
	}
	onclick() {
		this.label = this.title;
	}
	onResend() {
		this.resendDisabled = true;
		this.inputOtpDisabled = false;
		this.placeholderInput = 'OTP';
		this.value = null;
		this.timer = 60;
		this.countdown();
		this.parentResend.emit();
	}
	countdown(): void {
		const time = setInterval(() => {
			this.timer--;
			if (this.timer === 0) {
				clearInterval(time);
				this.onDisble();
			};
		}, 1000)
	}
	onDisble() {
		this.confirmDisabled = this.value == null || this.timer === 0;
		if (this.timer === 0) {
			this.resendDisabled = false;
			this.inputOtpDisabled = true;
			this.placeholderInput = this.timeExpires;
			this.label = this.timeExpires;
			this.value = '';

		}
	}
}
