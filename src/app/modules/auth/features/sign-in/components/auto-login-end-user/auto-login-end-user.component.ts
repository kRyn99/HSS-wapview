import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessagePopupComponent} from '@app/modules/common-items/components/message-popup/message-popup.component';
import {first} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '@env/environment';
import {AccountService} from '@app/modules/auth/service/account.service';
import {DataUtilities, getIsdn} from '@app/shared/utils/data.utils';

@Component({
  selector: 'app-auto-login-end-user',
  templateUrl: './auto-login-end-user.component.html',
  styleUrls: ['./auto-login-end-user.component.scss']
})
export class AutoLoginEndUserComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  uuid: string;
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
      let language = 'la';
      if (params.lang) {
        language = params.lang;
      }
      this.translateService.use(language);
      localStorage.setItem('lang',language);
    });
    // this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    if (this.uuid === undefined
        || this.uuid === null || this.uuid.toString() === '') {
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
      localStorage.removeItem('user');
      this.accountService.userSubject.next(null);
      this.getMsisdnFromLaoApp();
      // this.signIn();
    }
  }

  signIn(msisdn) {
    const isdn = getIsdn(msisdn);
    const loginDefault = this.accountService.login(environment.UID_SYSTEM.USER_NAME_DEFAULT, environment.UID_SYSTEM.KEY_PASS_DEFAULT, null, 'loginWithPassword',isdn)
        .pipe(first())
        .subscribe(
            data => {
              if (data.errorCode === '0') {
                const userFake = this.accountService.userValue;
                userFake.data.fullName = isdn;
                userFake.data.userName = isdn;
                userFake.data.avatarStr = './assets/img/upoint-logo.png';
                localStorage.setItem('user', JSON.stringify(userFake));
                localStorage.setItem('hideIcon', 'true');
                localStorage.removeItem('backApp');
                this.accountService.userSubject.next(userFake);
                // save log
                const saveLog = this.accountService.autoLoginLog()
                    .pipe(first())
                    .subscribe(log => {
                      if (log.errorCode === '0') {
                      }
                    });
                this.subscriptions.push(saveLog);
                this.router.navigate(['/home']);
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
                // modalRef.result.then(() => {
                //   this.router.navigate(['/']);
                // }, () => {
                // });
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
              // modalRefError.result.then(() => {
              //   this.router.navigate(['/']);
              // }, () => {
              // });
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
                this.signIn(data.data.msisdn);
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}
