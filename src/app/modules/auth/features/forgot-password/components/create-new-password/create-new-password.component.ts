import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ForgotPasswordService} from '@app/modules/auth/service/forgot-password.service';
import {first} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessagePopupComponent} from '@app/modules/common-items/components/message-popup/message-popup.component';
import {getBrowserNameAndVersion} from '@app/shared/utils/data.utils';

@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html',
  styleUrls: ['./create-new-password.component.scss']
})
export class CreateNewPasswordComponent implements OnInit {

  otp: string = '';
  password: string = '';
  retypePassword: string = '';
  submitDisabled: boolean = false;
  hiddenPassword: boolean = true;

  constructor(
      private router: Router,
      private translateService: TranslateService,
      public forgotPasswordService: ForgotPasswordService,
      private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    if (this.forgotPasswordService.isdn === undefined
        || this.forgotPasswordService.isdn === null || this.forgotPasswordService.isdn === '') {
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
      // Nếu là popup success/lỗi thì dùng
      modalRefError.result.then(() => {
        this.router.navigate(['auth/sign-in/password']);
        // Xử lý khi close modal
      }, () => {
        // Xử lý khi dismiss modal
      });
    }
  }

  togglePassword() {
    this.hiddenPassword = !this.hiddenPassword;
  }

  handleRedirect(url: string) {
    this.router.navigate([url]);
  }

  handleSubmit() {
    if (this.prepareActionModel()) {
      const userDTO = {
        userName: this.forgotPasswordService.isdn,
        newPassword: this.password,
        otp: this.otp,
        userBrowser: getBrowserNameAndVersion().name,
        actionType: this.forgotPasswordService.actionType,
        actionIsdn: this.forgotPasswordService.actionIsdn
      }
      this.forgotPasswordService.updateUserInformation(userDTO)
          .pipe(first())
          .subscribe(data => {
                if (data.errorCode === '0') {
                  const modalRefSuccess = this.modalService.open(MessagePopupComponent, {
                    size: 'sm',
                    backdrop: 'static',
                    keyboard: false,
                    centered: true
                  });
                  modalRefSuccess.componentInstance.type = 'success';
                  modalRefSuccess.componentInstance.title = this.translateService.instant(`COMMON.SUCCESS`);
                  modalRefSuccess.componentInstance.message = this.translateService.instant(`FORGOT_PASSWORD.CHANGE_PASS_SUCCESS`);
                  modalRefSuccess.componentInstance.closeIcon = false;
                  modalRefSuccess.result.then(() => {
                    this.router.navigate(['auth/sign-in/password']);
                  }, () => {
                  });
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
                  modalRefError.result.then(() => {
                    if (data.errorCode === '501') {
                      if (localStorage.getItem('hideIcon') === 'true'){
                        window.open('mocha://back', '_self');
                      }else{
                        this.router.navigate(['auth/sign-in/password']);
                      }
                    }
                  }, () => {
                  });
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
    }
  }

  prepareActionModel() {
    if (this.otp == null || this.otp === '') {
      const modalRef = this.modalService.open(MessagePopupComponent, {size: 'sm', backdrop: 'static', keyboard: false, centered: true});
      modalRef.componentInstance.type = 'fail';
      modalRef.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
      modalRef.componentInstance.message = this.translateService.instant(`FORGOT_PASSWORD.OTP_NOT_NULL`);
      modalRef.componentInstance.closeIcon = false;
      return false;
    } else {
      if (this.otp.length !== 6) {
        const modalRefError = this.modalService.open(MessagePopupComponent, {
          size: 'sm',
          backdrop: 'static',
          keyboard: false,
          centered: true
        });
        modalRefError.componentInstance.type = 'fail';
        modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
        modalRefError.componentInstance.message = this.translateService.instant(`FORGOT_PASSWORD.OTP_INVALID`);
        modalRefError.componentInstance.closeIcon = false;
        return false;
      } else {
        const regex = new RegExp('^[0-9]+$');
        if (regex.test(this.otp) === false) {
          const modalRefError = this.modalService.open(MessagePopupComponent, {
            size: 'sm',
            backdrop: 'static',
            keyboard: false,
            centered: true
          });
          modalRefError.componentInstance.type = 'fail';
          modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
          modalRefError.componentInstance.message = this.translateService.instant(`FORGOT_PASSWORD.OTP_WRONG_FORMAT`);
          modalRefError.componentInstance.closeIcon = false;
          return false;
        }
      }
      this.otp = this.otp.trim();
    }
    if (this.password == null || this.password === '') {
      const modalRef = this.modalService.open(MessagePopupComponent, {size: 'sm', backdrop: 'static', keyboard: false, centered: true});
      modalRef.componentInstance.type = 'fail';
      modalRef.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
      modalRef.componentInstance.message = this.translateService.instant(`FORGOT_PASSWORD.NEW_PASS_NOT_NULL`);
      modalRef.componentInstance.closeIcon = false;
      return false;
    } else {
      const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$');
      if (regex.test(this.password) === false) {
        const modalRefError = this.modalService.open(MessagePopupComponent, {
          size: 'sm',
          backdrop: 'static',
          keyboard: false,
          centered: true
        });
        modalRefError.componentInstance.type = 'fail';
        modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
        modalRefError.componentInstance.message = this.translateService.instant(`FORGOT_PASSWORD.PASS_INVALID`);
        modalRefError.componentInstance.closeIcon = false;
        return false;
      }
      this.password = this.password.trim();
    }
    if (this.retypePassword == null || this.retypePassword === '') {
      const modalRef = this.modalService.open(MessagePopupComponent, {size: 'sm', backdrop: 'static', keyboard: false, centered: true});
      modalRef.componentInstance.type = 'fail';
      modalRef.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
      modalRef.componentInstance.message = this.translateService.instant(`FORGOT_PASSWORD.RETYPE_NEW_PASS_NOT_NULL`);
      modalRef.componentInstance.closeIcon = false;
      return false;
    } else {
      this.retypePassword = this.retypePassword.trim();
    }
    if (this.password !== this.retypePassword) {
      const modalRef = this.modalService.open(MessagePopupComponent, {size: 'sm', backdrop: 'static', keyboard: false, centered: true});
      modalRef.componentInstance.type = 'fail';
      modalRef.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
      modalRef.componentInstance.message = this.translateService.instant(`FORGOT_PASSWORD.PASS_NOT_MATCH`);
      modalRef.componentInstance.closeIcon = false;
      return false;
    }
    return true;
  }


}
