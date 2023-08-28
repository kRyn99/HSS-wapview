import {CallbackService} from '@app/modules/auth/service/call-back.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AccountService} from '@app/modules/auth/service/account.service';
import {first} from 'rxjs/operators';
import {ForgotPasswordService} from '@app/modules/auth/service/forgot-password.service';
import {MessagePopupComponent} from '@app/modules/common-items/components/message-popup/message-popup.component';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GetIpService} from '@app/shared/service/get-ip.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sign-in-with-password',
  templateUrl: './sign-in-with-password.component.html',
  styleUrls: ['./sign-in-with-password.component.scss']
})
export class SignInWithPasswordComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  hiddenPassword: boolean = true;
  form: UntypedFormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  // phase 2
  userName = '';
  password = '';

  constructor(
      private formBuilder: UntypedFormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService,
      public forgotPasswordService: ForgotPasswordService,
      private translateService: TranslateService,
      private modalService: NgbModal,
      private callbackService: CallbackService,
      private getIpService: GetIpService
  ) {
  }

  ngOnInit() {
    // debugger;
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
    // this.getClientPublicIP();
  }

  get f() {
    return this.form.controls;
  }

  togglePassword() {
    this.hiddenPassword = !this.hiddenPassword;
  }

  handleRedirect(url: string) {
    this.router.navigate([url]);
  }

  forgotPassword(url: string) {
    let checked = false;
    if (this.f.username.value !== null && this.f.username.value.trim() !== '') {
      checked = true;
    } else {
      const modalRefError = this.modalService.open(MessagePopupComponent, {
        size: 'sm',
        backdrop: 'static',
        keyboard: false,
        centered: true
      });
      modalRefError.componentInstance.type = 'fail';
      modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
      modalRefError.componentInstance.message = this.translateService.instant(`FORGOT_PASSWORD.USERNAME_NOT_NULL`);
      modalRefError.componentInstance.closeIcon = false;
    }
    if (checked) {
      // this.loading = true;
      this.accountService.checkLoginUserNameInfor(this.f.username.value, 3, this.f.username.value)
          .pipe(first())
          .subscribe(
              data => {
                if (data.errorCode === '0') {
                  if (data.data !== null) {
                    // this.forgotPasswordService.otp = data.data.otp;
                    this.forgotPasswordService.isdn = this.f.username.value;
                    this.forgotPasswordService.checkType = false;
                    this.forgotPasswordService.actionType = 3;
                    this.forgotPasswordService.actionIsdn = this.f.username.value;
                    this.router.navigate([url]);
                  }
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
                }
                // this.loading = false;
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
                // this.loading = false;
              });
    }
  }

  signIn() {
    // debugger;
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.login(this.f.username.value, this.f.password.value, null, 'loginWithPassword', null)
        .pipe(first())
        .subscribe(
            data => {
              if (data.errorCode === '0') {
                localStorage.removeItem('hideIcon');
                localStorage.removeItem('backApp');
                // this.getClientPublicIP();
                this.router.navigate([this.returnUrl]);
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
              }
              this.loading = false;
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
              this.loading = false;
            });
  }

  getClientPublicIP() {
    const ip = this.getIpService.getClientPublicIP()
        .pipe(first())
        .subscribe(data => {
          console.log(data);
          // const user = JSON.parse(localStorage.getItem('user'));
          // user.data.ip = data ? data : '';
          // localStorage.setItem('user', JSON.stringify(user));
          // this.accountService.userSubject.next(user);
        });
    this.subscriptions.push(ip);
  }

  signInUID() {
    this.callbackService.directLoginUniId();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
