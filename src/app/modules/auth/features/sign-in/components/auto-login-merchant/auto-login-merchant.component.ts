import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {AccountService} from '@app/modules/auth/service/account.service';
import {Subscription} from 'rxjs';
import {environment} from '@env/environment';
import {first} from 'rxjs/operators';
import {MessagePopupComponent} from '@app/modules/common-items/components/message-popup/message-popup.component';
import {getBrowserNameAndVersion} from '@app/shared/utils/data.utils';

@Component({
  selector: 'app-auto-login-merchant',
  templateUrl: './auto-login-merchant.component.html',
  styleUrls: ['./auto-login-merchant.component.scss']
})
export class AutoLoginMerchantComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  uuid: string;
  token: string;
  msisdn: string;
  user: any;

  constructor(
      private route: ActivatedRoute,
      private modalService: NgbModal,
      private router: Router,
      private translateService: TranslateService,
      private accountService: AccountService
  ) {
    this.route.queryParams.subscribe(params => {
      if (params.uuid) {
        this.uuid = params.uuid;
      }
      if (params.token) {
        this.token = params.token;
      }
      let language = 'la';
      if (params.lang) {
        language = params.lang;
      }
      this.translateService.use(language);
      localStorage.setItem('lang', language);
    });
  }

  ngOnInit(): void {
    if (this.uuid === undefined || this.uuid === null || this.uuid.toString() === ''
        || this.token === undefined || this.token === null || this.token.toString() === '') {
      const modalRefError = this.modalService.open(MessagePopupComponent, {
        size: 'sm',
        backdrop: 'static',
        keyboard: false,
        centered: true
      });
      modalRefError.componentInstance.type = 'fail';
      modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
      modalRefError.componentInstance.message = this.translateService.instant(`COMMON.MISSING_PARAMETER`);
      modalRefError.componentInstance.closeIcon = false;
      // modalRefError.result.then(() => {
      //   this.router.navigate(['history/upoint-history-view'], {});
      // }, () => {
      // });
    } else {
      // const loginFromLaoAppDTO = {
      //   userName: environment.UID_SYSTEM.USER_NAME_DEFAULT,
      //   password: environment.UID_SYSTEM.KEY_PASS_DEFAULT,
      //   msisdn: '+8562099794518'
      // }
      // const check = this.accountService.checkMerchantByIsdn(loginFromLaoAppDTO)
      //     .pipe(first())
      //     .subscribe(data => {
      //           if (data.errorCode === '0') {
      //             // this.autoLoginForMerchant();
      //           } else {
      //             // show error
      //             const modalRefError = this.modalService.open(MessagePopupComponent, {
      //               size: 'sm',
      //               backdrop: 'static',
      //               keyboard: false,
      //               centered: true
      //             });
      //             modalRefError.componentInstance.type = 'fail';
      //             modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
      //             modalRefError.componentInstance.message = data.description;
      //             modalRefError.componentInstance.closeIcon = false;
      //           }
      //         },
      //         error => {
      //           // show error neu exception
      //           const modalRefError = this.modalService.open(MessagePopupComponent, {
      //             size: 'sm',
      //             backdrop: 'static',
      //             keyboard: false,
      //             centered: true
      //           });
      //           modalRefError.componentInstance.type = 'fail';
      //           modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
      //           modalRefError.componentInstance.message = this.translateService.instant(`COMMON.ERROR_SERVICE`);
      //           modalRefError.componentInstance.closeIcon = false;
      //         });
      // this.subscriptions.push(check);
      localStorage.removeItem('user');
      this.accountService.userSubject.next(null);
      this.getMsisdnFromLaoApp();
    }
  }

  signIn() {
    const loginDefault = this.accountService.login(environment.UID_SYSTEM.USER_NAME_DEFAULT, environment.UID_SYSTEM.KEY_PASS_DEFAULT, null, 'loginWithPassword',this.msisdn)
        .pipe(first())
        .subscribe(
            data => {
              if (data.errorCode === '0') {
                this.autoLoginForMerchant();
              } else {
                // show error
                const modalRef = this.modalService.open(MessagePopupComponent, {
                  size: 'sm',
                  backdrop: 'static',
                  keyboard: false,
                  centered: true
                });
                modalRef.componentInstance.type = 'fail';
                modalRef.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
                modalRef.componentInstance.message = data.description;
                modalRef.componentInstance.closeIcon = false;
              }
            },
            error => {
              // show error neu exception
              const modalRefError = this.modalService.open(MessagePopupComponent, {
                size: 'sm',
                backdrop: 'static',
                keyboard: false,
                centered: true
              });
              modalRefError.componentInstance.type = 'fail';
              modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
              modalRefError.componentInstance.message = this.translateService.instant(`COMMON.ERROR_SERVICE`);
              modalRefError.componentInstance.closeIcon = false;
            }
        );
    this.subscriptions.push(loginDefault);
  }

  getMsisdnFromLaoApp() {
    const loginFromLaoAppDTO = {
      uuid: this.uuid,
      userName: environment.UID_SYSTEM.USER_NAME_DEFAULT,
      password: environment.UID_SYSTEM.KEY_PASS_DEFAULT
    }
    const getMsisdn = this.accountService.getMsisdnFromLaoApp(loginFromLaoAppDTO)
        .pipe(first())
        .subscribe(data => {
              if (data.errorCode === '0') {
                this.msisdn = data.data.msisdn;
                this.signIn();
              } else {
                // show error
                const modalRefError = this.modalService.open(MessagePopupComponent, {
                  size: 'sm',
                  backdrop: 'static',
                  keyboard: false,
                  centered: true
                });
                modalRefError.componentInstance.type = 'fail';
                modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
                modalRefError.componentInstance.message = data.description;
                modalRefError.componentInstance.closeIcon = false;
                this.accountService.clearCookie();
              }
            },
            error => {
              // show error neu exception
              const modalRefError = this.modalService.open(MessagePopupComponent, {
                size: 'sm',
                backdrop: 'static',
                keyboard: false,
                centered: true
              });
              modalRefError.componentInstance.type = 'fail';
              modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
              modalRefError.componentInstance.message = this.translateService.instant(`COMMON.ERROR_SERVICE`);
              modalRefError.componentInstance.closeIcon = false;
              this.accountService.clearCookie();
            });
    this.subscriptions.push(getMsisdn);
  }

  autoLoginForMerchant() {
    const loginFromLaoAppDTO = {
      token: this.token,
      userBrowser: getBrowserNameAndVersion().name
    }
    const autoLoginMer = this.accountService.autoLoginForMerchant(loginFromLaoAppDTO)
        .pipe(first())
        .subscribe(data => {
              if (data.errorCode === '0') {
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem('hideIcon', 'true');
                localStorage.removeItem('backApp');
                this.accountService.userSubject.next(data);
                this.router.navigate(['/home']);
              } else {
                // show error
                const modalRefError = this.modalService.open(MessagePopupComponent, {
                  size: 'sm',
                  backdrop: 'static',
                  keyboard: false,
                  centered: true
                });
                modalRefError.componentInstance.type = 'fail';
                modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
                modalRefError.componentInstance.message = data.description;
                modalRefError.componentInstance.closeIcon = false;
                this.accountService.clearCookie();
              }
            },
            error => {
              // show error neu exception
              const modalRefError = this.modalService.open(MessagePopupComponent, {
                size: 'sm',
                backdrop: 'static',
                keyboard: false,
                centered: true
              });
              modalRefError.componentInstance.type = 'fail';
              modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
              modalRefError.componentInstance.message = this.translateService.instant(`COMMON.ERROR_SERVICE`);
              modalRefError.componentInstance.closeIcon = false;
              this.accountService.clearCookie();
            });
    this.subscriptions.push(autoLoginMer);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}
