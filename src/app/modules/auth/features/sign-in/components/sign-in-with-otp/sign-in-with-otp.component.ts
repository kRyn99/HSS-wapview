import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AccountService} from '@app/modules/auth/service/account.service';
import {first} from 'rxjs/operators';
import {SignUpService} from '@app/modules/auth/service/sign-up.service';
import {MessagePopupComponent} from '@app/modules/common-items/components/message-popup/message-popup.component';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CallbackService} from '@app/modules/auth/service/call-back.service';

@Component({
  selector: 'app-sign-in-with-otp',
  templateUrl: './sign-in-with-otp.component.html',
  styleUrls: ['./sign-in-with-otp.component.scss']
})
export class SignInWithOtpComponent implements OnInit {
  @ViewChild('otpInput') otpIp: ElementRef;

  form: UntypedFormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
      private router: Router,
      private formBuilder: UntypedFormBuilder,
      private route: ActivatedRoute,
      private accountService: AccountService,
      private signUpService: SignUpService,
      private translateService: TranslateService,
      private modalService: NgbModal,
      private callbackService: CallbackService
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      otp: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';

    // this.signUpService.getListAccountType()
    //     .subscribe(
    //         data => {
    //         },
    //         error => {
    //           // show error neu exception
    //           alert(error);
    //           this.loading = false;
    //         });
  }

  get f() {
    return this.form.controls;
  }

  eOnKeyUp(val) {
    // this.f.otp.setValue(this.f.otp.value.toString().replace(/\D/g, ''));
    if (val.target.value) {
      this.otpIp.nativeElement.value = val.target.value.replace(/[^0-9]/g, '');
      if(val.target.value.length > 6){
        this.otpIp.nativeElement.value = val.target.value.substr(0, 6);
      }
    }
    // this.f.otp.setValue(val.target.value.replace(/\D/g, ''));
  }

  handleRedirect(url: string) {
    this.router.navigate([url]);
  }

  sendOTP() {
    let checked = false;
    if (this.f.username.value !== null && this.f.username.value.trim() !== '') {
      checked = true;
    } else {
      const modalRef = this.modalService.open(MessagePopupComponent, {size: 'sm', backdrop: 'static', keyboard: false, centered: true});
      modalRef.componentInstance.type = 'fail';
      modalRef.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
      modalRef.componentInstance.message = this.translateService.instant(`FORGOT_PASSWORD.USERNAME_NOT_NULL`);
      modalRef.componentInstance.closeIcon = false;
    }
    if (checked) {
      this.accountService.checkLoginUserNameInfor(this.f.username.value,2,this.f.username.value)
          .pipe(first())
          .subscribe(
              data => {
                if (data.errorCode === '0') {
                  const modalRefSuccess = this.modalService.open(MessagePopupComponent, {
                    size: 'sm',
                    backdrop: 'static',
                    keyboard: false,
                    centered: true
                  });
                  modalRefSuccess.componentInstance.type = 'success';
                  modalRefSuccess.componentInstance.title = this.translateService.instant(`COMMON.SUCCESS`);
                  modalRefSuccess.componentInstance.message = this.translateService.instant(`SIGN_IN.MESSAGE.SEND_OTP_SUCCESS`);
                  modalRefSuccess.componentInstance.closeIcon = false;
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
              });
    }
  }

  signIn() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.login(this.f.username.value, null, this.f.otp.value, 'loginWithOTP',null)
        .pipe(first())
        .subscribe(
            data => {
              if (data.errorCode === '0') {
                localStorage.removeItem('hideIcon');
                localStorage.removeItem('backApp');
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

  signInUID() {
    this.callbackService.directLoginUniId();
  }
}
