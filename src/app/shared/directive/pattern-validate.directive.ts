import { Directive, HostListener, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[appPattern]'
})
export class PatternDirective implements OnInit {

    constructor() { }
    @Input() appPattern: any;
    private valueInput: any;
    private min: number;
    private max: number;
    private minLength: number;
    private maxLength: number;


    @Output() private returnData: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        this.min = this.appPattern && this.appPattern.min ? this.appPattern.min : Number.MIN_SAFE_INTEGER || -(2 ** 53) + 1;
        this.max = this.appPattern && this.appPattern.max ? this.appPattern.max : Number.MAX_SAFE_INTEGER || 2 ** 53 - 1;
        this.minLength = this.appPattern && this.appPattern.minLength ? this.appPattern.minLength : -1;
        this.maxLength = this.appPattern && this.appPattern.maxLength ? this.appPattern.minLength : Number.MAX_SAFE_INTEGER || 2 ** 53 - 1;
    }

    @HostListener('keyup', ['$event'])
    @HostListener('drop', ['$event'])
    @HostListener('paste', ['$event'])
    checkValidateData = (event: any): void => {
        //   event.stopPropagation();
        //   event.preventDefault();
        const value = event.target.value;

        if (value && this.checkValidData(value) && this.checkValidValueData(value)) {
            this.valueInput = value;
        } else {
            this.valueInput = this.getValidData(value);
        }
        event.target.value = this.valueInput;
        this.returnData.emit(this.valueInput);
    }

    checkValidData = (data) => this.appPattern.pattern ? new RegExp(this.appPattern.pattern, 'i').test(data.toString()) : true;

    checkValidValueData = (data) => {
        let res = true;
        if (this.checkNumber(data)) {
            const dataNumber = parseInt(data, 10);
            if (dataNumber > this.min && dataNumber < this.max) {
                res = true;
            } else {
                res = false;
            }
        } else {
            if (data.length > this.minLength && data.length < this.maxLength) {
                res = true;
            } else {
                res = false;
            }
        }

        return res;
    }

    getValidData = (data) => {
        let dataValid = data.toString();

        if (this.appPattern && this.appPattern.pattern) {
            const patt = new RegExp(this.appPattern.pattern, 'i');
            dataValid = dataValid.split('').filter(v => patt.test(v)).join('');
        }

        /**
         * check number value
         */
        if (this.appPattern && this.appPattern.min && this.checkNumber(this.appPattern.min)
            && this.checkNumber(data)) {
            if (parseInt(data, 10) < parseInt(this.appPattern.min, 10)) {
                dataValid = dataValid.substring(0, this.appPattern.min.toString().length);
                dataValid = parseInt(dataValid, 10) < parseInt(this.appPattern.min, 10) ?
                    dataValid.substring(0, dataValid.length - 1) : dataValid;
            }
        }
        if (this.appPattern && this.appPattern.max && this.checkNumber(this.appPattern.max)
            && this.checkNumber(data)) {

            if (parseInt(data, 10) > parseInt(this.appPattern.max, 10)) {
                dataValid = dataValid.substring(0, this.appPattern.max.toString().length);

                dataValid = parseInt(dataValid, 10) > parseInt(this.appPattern.max, 10) ?
                    dataValid.substring(0, dataValid.length - 1) : dataValid;
            }

        }
        /**
         * check String value
         */
        if (this.appPattern && this.appPattern.maxLength) {
            if (data.toString().length > this.appPattern.maxLength) {
                dataValid = dataValid.substring(0, parseInt(this.appPattern.maxLength, 10));
            }
        }

        if (dataValid === data.toString()) {
            return '';
        }

        return dataValid;
    }

    checkNumber = (data) => data && /^-?\d+(?:\.\d+)?$/.test(data.toString());
}
