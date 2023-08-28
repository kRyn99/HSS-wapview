import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { retry } from 'rxjs/operators';
import { OverlayService } from '@app/modules/commons/shared/service/overlay.service';
import { isStrEmpty } from '../utils/utils';
import { isDevMode } from '@angular/core';
import { MessageService } from '@app/shared/service/message.service';

export class BaseService {
    constructor(
        protected http: HttpClient,
        protected translate: TranslateService,
        protected overlay: OverlayService,
        // protected messageService: MessageService,


    ) { }

    post(url: string, body: any, alertTitle: string, options: any, onSuccess: (data: any) => any) {
        this.overlay.startRequest();
        body.lang = localStorage.getItem('lang');
        const httpOptions = {
            headers: {},
        };
        // withCredentials: true,
        return this.http.post(url, body, httpOptions || {},)
            .subscribe(
                (response: any) => this.handleResponse(response, alertTitle, onSuccess),
                (error) => this.handleError(error, alertTitle)
            );
    }

    put(url: string, body: any, alertTitle: string, options: any, onSuccess: (data: any) => any) {
        this.overlay.startRequest();
        body.lang = localStorage.getItem('lang');
        return this.http.put(url, body, options || {})
            .pipe()
            .subscribe(
                (response: any) => this.handleResponse(response, alertTitle, onSuccess),
                (error) => this.handleError(error, alertTitle)
            );
    }
    protected handleResponseForGet(response: any, alertTitle: string) {
        this.overlay.finishRequest();

        switch (response.status) {
            case 200:
                break;
            default:
                if (response.result.responseDescription === undefined || response.result.responseDescription === null) {
                    // this.overlay.alert(this.translate.instant('ERROR.NOTE'), response.message);
                } else {
                    // this.overlay.alert(this.translate.instant('ERROR.NOTE'), response.result.responseDescription);
                }
                break;
        }
    }

    protected handleResponse(response: any, alertTitle: string, onSuccess: (data: any) => any) {
        this.overlay.finishRequest();

        try {
            switch (response.status) {

                case 500:
                    if (response.result.responseDescription === undefined || response.result.responseDescription === null) {
                        // this.overlay.alert(this.translate.instant('ERROR.NOTE'), response.message);
                    } else {
                        // this.overlay.alert(this.translate.instant('ERROR.NOTE'), response.result.responseDescription);
                    }
                    break;
                // case 400:
                //     if (response.result.responseDescription === undefined || response.result.responseDescription === null) {
                //         this.overlay.alert(this.translate.instant('ERROR.NOTE'), response.message);
                //     } else if (response.message === undefined || response.message === null) {
                //         this.overlay.alert(this.translate.instant('ERROR.NOTE'), response.result.responseDescription);
                //     } else {
                //         this.overlay.alert(this.translate.instant('ERROR.NOTE'), this.translate.instant('ERROR.NOTE_400'));
                //     }
                case 400:
                    if (response.result.responseDescription !== undefined && response.result.responseDescription !== null
                        && response.result.responseDescription !== ''
                    ) {
                        // this.overlay.alert(this.translate.instant('ERROR.NOTE'), response.result.responseDescription);
                    }
                    else if (response.message !== undefined && response.message !== null && response.message !== '') {
                        // this.overlay.alert(this.translate.instant('ERROR.NOTE'), response.message);
                    } else {
                        // this.overlay.alert(this.translate.instant('ERROR.NOTE'), this.translate.instant('ERROR.NOTE_400'));
                    }
                    break;
                case 403:
                    if (response.result.responseDescription === undefined || response.result.responseDescription === null) {
                        // this.overlay.alert(this.translate.instant('ERROR.NOTE'), response.message);
                    } else {
                        // this.overlay.alert(this.translate.instant('ERROR.NOTE'), response.result.responseDescription);
                    }
                    break;
                case 404:
                    if (response.result.responseDescription === undefined || response.result.responseDescription === null) {
                        // this.overlay.alert(this.translate.instant('ERROR.NOTE'), response.message);
                    } else {
                        // this.overlay.alert(this.translate.instant('ERROR.NOTE'), response.result.responseDescription);
                    }
                    break;
                case 409:
                    if (response.result.responseDescription === undefined || response.result.responseDescription === null) {
                        // this.overlay.alert(this.translate.instant('ERROR.NOTE'), response.message);
                    } else {
                        // this.overlay.alert(this.translate.instant('ERROR.NOTE'), response.result.responseDescription);
                    }
                    break;

                // case 992:
                //     this.overlay.alertRedirect(this.translate.instant('ERROR.NOTE'), response.message);
                //     break;
                // case 991:
                //     this.overlay.alertNoRedirect(this.translate.instant('ERROR.NOTE'), response.message);
                //     break;
                // case 990:
                //     break;
                case 200:
                    if (response.result === null) {
                        response.result = [];
                    }
                    // onSuccess(response);
                    break;
                case 990:
                    if (response.result === null) {
                        response.result = [];
                    }
                    break;
                case 991:
                    if (response.result === null) {
                        response.result = [];
                    }
                    break;
                case 992:
                    if (response.result === null) {
                        response.result = [];
                    }
                    break;
                default:
                    if (alertTitle != null) {
                    }
                    break;
            }
            onSuccess(response);
        } catch (exception) {
            if (isDevMode()) {
                console.error(exception);
            }
            const message = this.translate.instant('ERROR.PARSER');
            // this.overlay.alert(this.translate.instant('ERROR.NOTE'), message);
        }
    }

    protected handleResponseMocha(response: any, alertTitle: string, onSuccess: (data: any) => any) {
        this.overlay.finishRequest();

        try {
            switch (response.status) {
                case 500:
                    if (response.result.responseDescription === undefined || response.result.responseDescription === null) {
                        // this.overlay.alert(this.translate.instant('ERROR.NOTE'), response.message);
                    } else {
                        // this.overlay.alert(this.translate.instant('ERROR.NOTE'), response.result.responseDescription);
                    }
                    break;
                default:
                    if (alertTitle != null) {
                        // this.overlay.alert(this.translate.instant('ERROR.NOTE'), this.translate.instant('ERROR.OTHER'));
                    }
                    break;
            }
            onSuccess(response);
        } catch (exception) {
            if (isDevMode()) {
                console.error(exception);
            }
            const message = this.translate.instant('ERROR.PARSER');
            // this.overlay.alert(this.translate.instant('ERROR.NOTE'), message);
        }
    }


    protected translateError(error: any) {
        const { status } = error;
        let message = this.translate.instant(`ERROR.${status}`);
        if (isStrEmpty(message)) {
            message = this.translate.instant(`ERROR.OTHER`);
        }
        return { status, message, error };
    }
    protected handleError(error: any, alertTitle: string) {

        this.overlay.finishRequest();
        const errorMessage = error.error;
        if (error.status === 400) {
            // this.overlay.alert(this.translate.instant('ERROR.NOTE'), this.translate.instant(errorMessage.message));
        }
        else {
            if (alertTitle !== null) {
                switch (errorMessage.status) {
                    default:
                        // this.overlay.alert(this.translate.instant('ERROR.NOTE'), this.translate.instant('ERROR.OTHER'), 'nonImg');
                        break;
                }
            }
        }
    }
}
