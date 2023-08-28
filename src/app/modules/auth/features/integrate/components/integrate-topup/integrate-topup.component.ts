import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {AccountService} from '@app/modules/auth/service/account.service';
import {MessagePopupComponent} from '@app/modules/common-items/components/message-popup/message-popup.component';
import {getIsdn} from '@app/shared/utils/data.utils';

@Component({
    selector: 'app-integrate-topup',
    templateUrl: './integrate-topup.component.html',
    styleUrls: ['./integrate-topup.component.scss']
})
export class IntegrateTopupComponent implements OnInit {
    msisdn: string;
    backRoute: string;

    constructor(
        private route: ActivatedRoute,
        private modalService: NgbModal,
        private router: Router,
        private translateService: TranslateService,
        private accountService: AccountService
    ) {
        localStorage.removeItem('lang');
        this.route.queryParams.subscribe(params => {
            let language = 'la';
            if (params.lang && (params.lang === 'la' || params.lang === 'vi' || params.lang === 'en' || params.lang === 'zh')) {
                language = params.lang;
            }
            this.translateService.use(language);
            localStorage.setItem('lang', language);
            if (params.msisdn) {
                this.msisdn = params.msisdn;
            }
            if (params.backRoute) {
                this.backRoute = params.backRoute;
            }
        });
    }

    ngOnInit(): void {
        if (this.backRoute === undefined || this.backRoute === null || this.backRoute.toString() === '') {
            const modalRefError = this.modalService.open(MessagePopupComponent, {
                size: 'sm',
                backdrop: 'static',
                keyboard: false,
                centered: true
            });
            modalRefError.componentInstance.type = 'fail';
            modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
            modalRefError.componentInstance.message = this.translateService.instant(`COMMON.MISSING_PARAMETER`) + '. backRoute';
            modalRefError.componentInstance.closeIcon = false;
            // modalRefError.result.then(() => {
            //     if ( this.backRoute !== undefined && this.backRoute !== null && this.backRoute.toString() !== ''){
            //         window.location.replace(this.backRoute);
            //     }
            // }, () => {});
        } else {
            if (this.msisdn !== undefined && this.msisdn !== null && this.msisdn.toString() !== ''){
                this.msisdn = this.msisdn.trim();
                if (!/^\+?[0-9]+$/gi.test(this.msisdn)) {
                    const modalRefError = this.modalService.open(MessagePopupComponent, {
                        size: 'sm',
                        backdrop: 'static',
                        keyboard: false,
                        centered: true
                    });
                    modalRefError.componentInstance.type = 'fail';
                    modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
                    modalRefError.componentInstance.message = this.translateService.instant(`TOP_UP.MESSAGE.PHONE_INVALID`);
                    modalRefError.componentInstance.closeIcon = false;
                    modalRefError.result.then(() => {
                        window.open(this.backRoute, '_self');
                    }, () => {
                    });
                } else if (this.msisdn.length > 15 || this.msisdn.length < 8) {
                    const modalRefError = this.modalService.open(MessagePopupComponent, {
                        size: 'sm',
                        backdrop: 'static',
                        keyboard: false,
                        centered: true
                    });
                    modalRefError.componentInstance.type = 'fail';
                    modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
                    modalRefError.componentInstance.message = this.translateService.instant(`TOP_UP.MESSAGE.PHONE_INVALID_LENGTH`);
                    modalRefError.componentInstance.closeIcon = false;
                    modalRefError.result.then(() => {
                        window.open(this.backRoute, '_self');
                    }, () => {
                    });
                } else {
                    localStorage.setItem('isdn', getIsdn(this.msisdn));
                    localStorage.removeItem('user');
                    this.accountService.userSubject.next(null);
                    localStorage.setItem('backApp', this.backRoute);
                    localStorage.removeItem('hideIcon');
                    this.router.navigate(['integrate-top-up']);
                }
            }else{
                localStorage.removeItem('isdn');
                const modalRefError = this.modalService.open(MessagePopupComponent, {
                    size: 'sm',
                    backdrop: 'static',
                    keyboard: false,
                    centered: true
                });
                modalRefError.componentInstance.type = 'fail';
                modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
                modalRefError.componentInstance.message = this.translateService.instant(`TOP_UP.MESSAGE.PHONE_NOT_NULL`);
                modalRefError.componentInstance.closeIcon = false;
                modalRefError.result.then(() => {
                    if ( this.backRoute !== undefined && this.backRoute !== null && this.backRoute.toString() !== ''){
                        window.open(this.backRoute, '_self');
                    }
                }, () => {});
            }
        }
    }

}
