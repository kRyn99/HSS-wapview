import { Injectable } from '@angular/core';
import { UrlConstants } from '@app/shared/contants/url.constants';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@app/modules/commons/shared/service/base.service';
import { TranslateService } from '@ngx-translate/core';
import { OverlayService } from '@app/modules/commons/shared/service/overlay.service';

@Injectable({
    providedIn: 'root'
})
export class InputFieldService {
    checkFullTextNoSpecialCharacters(key, lang) {
        const regex = '!”#$%&’()*+,-./:;<=>?@[\]^_`{|}~"\'₫”';
        if (key !== '' && regex.indexOf(key) >= 0) {
            return false;
        } else {
            return true;
        }

        // if (lang === 'en' || lang === 'vn') {
        //     let regex = '123456789';
        //     regex += 'à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|a';
        //     regex += 'è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|e';
        //     regex += 'ì|í|ị|ỉ|ĩ|i';
        //     regex += 'ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|o';
        //     regex += 'ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|u';
        //     regex += 'ỳ|ý|ỵ|ỷ|ỹ|y';
        //     regex += 'đ|d';
        //     regex += 'À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ|A';
        //     regex += 'È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ|E';
        //     regex += 'Ì|Í|Ị|Ỉ|Ĩ|I';
        //     regex += 'Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ|O';
        //     regex += 'Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ|U';
        //     regex += 'Ỳ|Ý|Ỵ|Ỷ|Ỹ|Y';
        //     regex += 'Đ|D';
        //     regex += ' ';
        //     regex += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        //     regex += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase();
        //     regex = regex.replace(/|/g, '');
        //     if (regex.indexOf(key) < 0) {
        //         return false;
        //     } else {
        //         return true;
        //     }
        // } else {
        //     const regex = '!”#$%&’()*+,-./:;<=>?@[\]^_`{|}~';
        //     if (regex.indexOf(key) >= 0) {
        //         return false;
        //     } else {
        //         return true;
        //     }
        // }

    }
    checkCurrencyField(key, lang) {
        const regex = ',123456789';
        if (key !== '' && regex.indexOf(key) < 0) {
            return false;
        } else {
            return true;
        }


    }
}