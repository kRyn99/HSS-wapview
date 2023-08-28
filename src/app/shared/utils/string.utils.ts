import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})


export class StringUtils {


    public static isFullSizeText(str: string) {
        return /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/.test(str);
    }

    public static trimData(str: any): string {
        if (str) {
            if (str.trim() !== '') {
                return str.trim();
            } else {
                return null;
            }
        }
        return null;
    }

    public static splitMinus(data: any) {
        if (!this.isEmpty(data)) {
            const result = [];
            result[0] = data[0];
            result[1] = data.length === 1 ? '' : data.slice(1, data.length);

            return result;
        }
        return [];
    }

    public static checkValidMinus(value): boolean {
        return value === 'ー' || value === '－' || value === '-';
    }

    public static checkCustomerId(value): boolean {

        if (!StringUtils.isEmpty(value)) {
            if (StringUtils.validNumberCanFullSize(value)) {
                return true;
            } else if (value.length === 2) {
                return StringUtils.checkValidMinus(value[0]) && (value[1] === '1' || value[1] === '１');
            }
        }

        return false;
    }

    public static validNumberCanFullSize = (value) => {
        return /^[0-9１２３４５６７８９０]*$/.test(value);
    }

    public static validPhonePattern = (value) => {
        return /^[0-9１２３４５６７８９０|(-|－)]*$/.test(value);
    }

    public static parseInt(data: any): number {

        const arr = new Array();
        arr[0] = '０';
        arr[1] = '１';
        arr[2] = '２';
        arr[3] = '３';
        arr[4] = '４';
        arr[5] = '５';
        arr[6] = '６';
        arr[7] = '７';
        arr[8] = '８';
        arr[9] = '９';

        let dataPass = '';
        data = data.toString();
        if (!StringUtils.isEmpty(data)) {
            const lengthData = data.length;

            if (lengthData > 0) {
                for (let i = 0; i < lengthData; i++) {
                    if (/^[１２３４５６７８９０]*$/.test(data[i])) {
                        for (let j = 0; j < arr.length; j++) {
                            if (data[i] === arr[j]) {
                                dataPass += j;
                                break;
                            }
                        }
                    } else {
                        if (i === 0 && this.checkValidMinus(data[0])) {
                            dataPass += '-';
                        } else {
                            dataPass += data[i];
                        }
                    }
                }
            }

        }

        return parseInt(dataPass, 10);
    }

    public static checkPatternNumberCanNagative = (data) => {
        const newData = StringUtils.splitMinus(data);
        return (StringUtils.numberCanNagative(newData[0]) && (/^[0-9１２３４５６７８９０]*$/.test(newData[1])));
    }

    public static validFullSizeNumber = (data) => {
        return /^[１２３４５６７８９０]*$/.test(data);
    }

    public static convertPhoneFullToHalfSize = (data) => {
        const arr = new Array();
        arr[0] = '０';
        arr[1] = '１';
        arr[2] = '２';
        arr[3] = '３';
        arr[4] = '４';
        arr[5] = '５';
        arr[6] = '６';
        arr[7] = '７';
        arr[8] = '８';
        arr[9] = '９';

        let dataPass = '';
        if (!StringUtils.isEmpty(data)) {
            const lengthData = data.length;
            if (lengthData > 0) {
                for (let i = 0; i < lengthData; i++) {
                    if (StringUtils.validFullSizeNumber(data[i])) {
                        for (let j = 0; j < arr.length; j++) {
                            if (data[i] === arr[j]) {
                                dataPass += j;
                                break;
                            }
                        }
                    } else if (StringUtils.checkValidMinus(data[i])) {
                        dataPass += '-';
                    } else {
                        dataPass += data[i];
                    }
                }
            }
        }

        return dataPass;
    }

    public static numberCanNagative = (value) => {
        return StringUtils.checkValidMinus(value) || /^[0-9１２３４５６７８９０]*$/.test(value);
    }

    // Check if data is empty.
    public static isEmpty(data: any): boolean {
        return data === null || data === undefined || data === '';
    }

    // check data not null
    public static checkValue = value => value != null && value !== undefined && value.toString() !== '';

    // check data is number or not
    public static checkNumberValue = value => StringUtils.checkValue(value) && /^-?\d+$/.test(value.toString());

    public static supres(str: string, total: number) {
        str = '\ ' + str;

        let res = str;

        if (str.length === total) {
            // do nothing.
        } else if (str.length > total) {
            res = 'over';
        } else {
            res = str.padStart((total - 1), ' ');
        }

        return res;
    }

    public static trimNameSearch(data) {
        let result = '';
        if (!StringUtils.isEmpty(data)) {
            data = data.trim();
            data = data.split(' ');
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < data.length; i++) {
                result += data[i].trim();
            }
        }

        return result;
    }


    /**
     * Phone Number remove hyphen.
     * @param data is data to remove hyphen.
     */
    public static phoneRemoveHyphen(data) {

        if (!StringUtils.isEmpty(data)) {
            data = data.toString();
            let check = false;

            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < data.length; i++) {
                if (StringUtils.checkValidMinus(data[i])) {
                    check = true;
                    break;
                }
            }

            if (check === true) {
                data = data.replace(/ー/g, '');
                data = data.replace(/－/g, '');
                data = data.replace(/-/g, '');
            }
        }

        return data;
    }

    public static convertBirthday(date) {
        let dataConvert = '';
        if (!StringUtils.isEmpty(date)) {
            const newDate = new Date(date);

            if (!StringUtils.isEmpty(newDate)) {
                const year = newDate.getFullYear();
                const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
                const day = (newDate.getDate()).toString().padStart(2, '0');

                dataConvert = year + '年 ' + month + '月 ' + day + '日';
            }
        }

        return dataConvert;
    }

    public static eventOnlyAllowBackSpaceAndDeleteKey(code) {
        if (code === 'Backspace' || code === 'Delete') {
            return true;
        }

        return false;
    }

    public static compareDate(date1: Date, date2: Date) {

        if (!StringUtils.isEmpty(date1) && !StringUtils.isEmpty(date2)) {
            const d1 = new Date(date1);
            const d2 = new Date(date2);

            // Check if the dates are equal
            const same = d1.getTime() === d2.getTime();
            if (same) {
                return 0;
            }

            // Check if the first is greater than second
            if (d1 > d2) {
                return 1;
            }

            // Check if the first is less than second
            if (d1 < d2) {
                return -1;
            }
        }

        return -2;
    }

    public static convertDecimalToNumber(data) {
        if (StringUtils.isEmpty(data)) {
            return data;
        } else {
            data = data.toString();
            return data.replace(/,/g, '');
        }
    }

    public static preventFullsizeChar(data) {
        data = StringUtils.convertDecimalToNumber(data);
        if (!StringUtils.isEmpty(data)) {
            data = data.toString();
            let result = '';

            if (!StringUtils.validNumberCanFullSize(data)) {
                for (const dt of data) {
                    if (StringUtils.validNumberCanFullSize(dt.toString())) {
                        result += dt;
                        if (result.length === 5) {
                            break;
                        }
                    } else {
                        break;
                    }
                }
            } else {
                for (const dt of data) {
                    result += dt;
                    if (result.length === 5) {
                        break;
                    }
                }
            }

            return result;
        }

        return data;
    }
}
