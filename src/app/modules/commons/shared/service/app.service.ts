import { Injectable } from '@angular/core';
import { UrlConstants } from '@app/shared/contants/url.constants';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { OverlayService } from '@app/modules/commons/shared/service/overlay.service';
import { BaseService } from '@app/modules/commons/shared/service/base.service';
import { data } from 'jquery';

@Injectable({
    providedIn: 'root'
})
export class AppService extends BaseService {

    constructor(
        protected http: HttpClient,
        protected translate: TranslateService,
        protected overlay: OverlayService
    ) {
        super(http, translate, overlay);
    }

    checkAcount(body: any, onSuccess: (data: any) => any) {
        const data1 = {
            status: 200
        }
        const reponse = {
            data: data1
        }
        return onSuccess(data1);
        return this.post(UrlConstants.SEND_TOKEN, body, null, null, onSuccess);
    }
    getInfoSender(body: any, onSuccess: (data: any) => any) {
        // return this.post(UrlConstants.MOCHA_CHECH_FONE, body, null, null, onSuccess);
    }
}
