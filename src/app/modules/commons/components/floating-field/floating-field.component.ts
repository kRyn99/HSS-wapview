import { ElementRef, EventEmitter, Input, Output } from '@angular/core';

export abstract class FloatingFieldComponent {

	@Input() label: string;
	@Input() errmsg: string;
	@Input() errHidden = false;
	@Input() required = false;
	@Input() type = 'text';
	@Input() name: string;
	@Input() mask: any;
	@Input() value: any = null;
	@Input() maxlength: number;
	@Input() pattern: string;
	@Input() inputmode: string;
	@Input() clearEnabled = true;
	@Input() options: any;
	@Input() readonly: boolean;
	@Input() onlyNumber = true;
	@Input() fullText = false;
	@Output() valueChange = new EventEmitter<any>();
	@Output() focusOut = new EventEmitter<any>();
	@Input() styleText = null;

	clearVisible = false;
	clearClicked = false;

	constructor(protected element: ElementRef<HTMLElement>) {
	}

	onFocus() {
		this.clearVisible = true;
	}

	onPaste(event: ClipboardEvent) {
		// const { value } = event.target;
		event.preventDefault();
		this.value = event.clipboardData.getData('text/plain').replace(/ /g, '');
		this.valueChange.emit(this.value);
	}

	onBlur(event: any) {

		const { relatedTarget, isTrusted } = event;
		// Check if user clicks on "Clear" button
		if (relatedTarget && relatedTarget.classList && relatedTarget.classList.contains('clear-btn')) {
			this.value = null;
			this.setFocus();
		} else if (isTrusted) {
			// Fix null "relatedTarget" issue on iPhone/iPad real devices
			setTimeout(() => {
				this.focusOut.emit();
				this.clearVisible = false;
			}, 150);
		} else {
			this.focusOut.emit();
			this.clearVisible = false;
		}
	}

	onClear() {
		this.clearClicked = true;
		this.value = null;
		this.valueChange.emit(this.value);
	}

	onModelChange(value: any) {
		this.valueChange.emit(value);
	}

	setFocus() {
		const input = this.element.nativeElement.querySelector('input,textarea');
		if (input) {
			(input as HTMLElement).focus();
		}
	}
}
