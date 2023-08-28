import { Injectable } from '@angular/core';
import { UrlConstants } from '@app/shared/contants/url.constants';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@app/modules/commons/shared/service/base.service';
import { TranslateService } from '@ngx-translate/core';
import { OverlayService } from '@app/modules/commons/shared/service/overlay.service';

@Injectable({
    providedIn: 'root'
})
export class PinOtpService extends BaseService {

    constructor(
        protected http: HttpClient,
        protected translate: TranslateService,
        protected overlay: OverlayService
    ) {
        super(http, translate, overlay);
    }

    checkPin(body: any, onSuccess: (data: any) => any) {
        const alertTitle = this.translate.instant('COMMON.INVALID_PIN');
        return this.post(UrlConstants.COMMON_CHECK_PIN, body, alertTitle, null, onSuccess);
    }

    resendOtp(body: any, onSuccess: (data: any) => any) {
        const alertTitle = this.translate.instant('COMMON.OTP_RESEND');
        return this.post(UrlConstants.COMMON_RESEND_OTP, body, alertTitle, null, onSuccess);
    }
}
