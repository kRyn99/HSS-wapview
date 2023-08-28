import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SignUpService} from '@app/modules/auth/service/sign-up.service';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessagePopupComponent} from '@app/modules/common-items/components/message-popup/message-popup.component';
import {first} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {COMMON_CONFIG, REGEX} from '@app/shared/contants/common-constants';

@Component({
  selector: 'app-step-account-information',
  templateUrl: './step-account-information.component.html',
  styleUrls: ['../../sign-up.component.scss']
})
export class StepAccountInformationComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  submitDisabled = false;
  accountName = '';
  password = '';
  retypePassword = '';
  introduction = '';
  bankName = '';
  bankCustName = '';
  bankAccountNum = '';

  constructor(
      public signUpService: SignUpService,
      private router: Router,
      private translateService: TranslateService,
      private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    if (this.signUpService.userDTO.userName === undefined
        || this.signUpService.userDTO.userName === null || this.signUpService.userDTO.userName === '') {
      const modalRefError = this.modalService.open(MessagePopupComponent, {
        size: 'sm',
        backdrop: 'static',
        keyboard: false,
        centered: true
      });
      modalRefError.componentInstance.type = 'fail';
      modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
      modalRefError.componentInstance.message = this.translateService.instant(`SIGN_UP.WRONG_STEP`);
      modalRefError.componentInstance.closeIcon = false;
      modalRefError.result.then(() => {
        this.router.navigate(['auth/sign-up/step-account-type'], {});
      }, () => {
      });
    }

    // data avatar default
    // this.signUpService.userDTO.avatarStr = './assets/img/sign-up/ava_default.png'
  }

  nextStep() {
    if (this.prepareModel()) {
      this.signUpService.userDTO.password = this.password;
      this.signUpService.userDTO.accountName = this.accountName;
      this.signUpService.userDTO.introduction = this.introduction;
      this.signUpService.userDTO.bankName = this.bankName;
      this.signUpService.userDTO.bankCustName = this.bankCustName;
      this.signUpService.userDTO.bankAccountNum = this.bankAccountNum;
      const saveIn4 = this.signUpService.saveSignInfo()
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
                  modalRefSuccess.componentInstance.message = this.translateService.instant(`SIGN_UP.SIGN_UP_SUCCESS`);
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
      this.subscriptions.push(saveIn4);
    }
    // this.router.navigate(['auth/sign-up/success'], {});
  }

  prepareModel() {
    if (this.password == null || this.password === '') {
      const modalRef = this.modalService.open(MessagePopupComponent, {size: 'sm', backdrop: 'static', keyboard: false, centered: true});
      modalRef.componentInstance.type = 'fail';
      modalRef.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
      modalRef.componentInstance.message = this.translateService.instant(`SIGN_UP.MESSAGE.PASS_NOT_NULL`);
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
      modalRef.componentInstance.message = this.translateService.instant(`SIGN_UP.MESSAGE.RETYPE_PASS_NOT_NULL`);
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
    if (this.accountName == null || this.accountName === '') {
      const modalRef = this.modalService.open(MessagePopupComponent, {size: 'sm', backdrop: 'static', keyboard: false, centered: true});
      modalRef.componentInstance.type = 'fail';
      modalRef.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
      modalRef.componentInstance.message = this.translateService.instant(`SIGN_UP.MESSAGE.ACCOUNT_NAME_NOT_NULL`);
      modalRef.componentInstance.closeIcon = false;
      return false;
    } else {
      this.accountName = this.accountName.trim();
    }
    // trim
    // if (this.accountName !== null && this.accountName !== '') {
    //   this.accountName = this.accountName.trim();
    // }
    if (this.introduction !== null && this.introduction !== '') {
      this.introduction = this.introduction.trim();
    }
    return true;
  }

  onSelectFileOld(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      // validate photo files
      const file = event.target.files[0];
      // check định dạng
      const regex = new RegExp(REGEX.EXTENSION_FILE);
      const isValidImage = regex.test(file.name);
      if (!isValidImage) {
        const modalRefError = this.modalService.open(MessagePopupComponent, {
          size: 'sm',
          backdrop: 'static',
          keyboard: false,
          centered: true
        });
        modalRefError.componentInstance.type = 'fail';
        modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
        modalRefError.componentInstance.message = this.translateService.instant(`END_USER.MESSAGE.IMAGE_EXT_INVALID`);
        modalRefError.componentInstance.closeIcon = false;
        return;
      }
      // check dung luong
      // if (file.size > COMMON_CONFIG.MAX_IMAGE_SIZE_TEMPLATE) {
      //   const modalRefError = this.modalService.open(MessagePopupComponent, {
      //     size: 'sm',
      //     backdrop: 'static',
      //     keyboard: false,
      //     centered: true
      //   });
      //   modalRefError.componentInstance.type = 'fail';
      //   modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
      //   modalRefError.componentInstance.message = this.translateService.instant(`END_USER.MESSAGE.MAX_SIZE_IMAGE_UPLOAD`);
      //   modalRefError.componentInstance.closeIcon = false;
      //   return;
      // }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.signUpService.avatarStr = reader.result.toString();
      };
    } else {
    }
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      // validate photo files
      const file = event.target.files[0];
      // check định dạng
      const regex = new RegExp(REGEX.EXTENSION_FILE);
      const isValidImage = regex.test(file.name);
      if (!isValidImage) {
        const modalRefError = this.modalService.open(MessagePopupComponent, {
          size: 'sm',
          backdrop: 'static',
          keyboard: false,
          centered: true
        });
        modalRefError.componentInstance.type = 'fail';
        modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
        modalRefError.componentInstance.message = this.translateService.instant(`END_USER.MESSAGE.IMAGE_EXT_INVALID`);
        modalRefError.componentInstance.closeIcon = false;
        return;
      }

      // upload img
      const formData: FormData = new FormData();
      formData.append('fileImages', file);
      const uploadFileAva = this.signUpService.uploadListFileImage(formData, 'uploadImg', 1)
          .pipe(first())
          .subscribe(data => {
                if (data.errorCode === '0') {
                  if (data.data && data.data[0]) {
                    this.signUpService.avatarStr = data.data[0].content;
                    this.signUpService.userDTO.avatar = data.data[0].filePath + '/' + data.data[0].fileName;
                  }
                  const modalRefSuccess = this.modalService.open(MessagePopupComponent, {
                    size: 'sm',
                    backdrop: 'static',
                    keyboard: false,
                    centered: true
                  });
                  modalRefSuccess.componentInstance.type = 'success';
                  modalRefSuccess.componentInstance.title = this.translateService.instant(`COMMON.SUCCESS`);
                  modalRefSuccess.componentInstance.message = this.translateService.instant(`COMMON.MESSAGE.UPLOAD_IMAGE_SUCCESS`);
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
      this.subscriptions.push(uploadFileAva);
    }
  }

  seeGuideLine(redirect) {
    this.signUpService.guideLine = redirect;
    this.router.navigate(['auth/sign-up/guide-line'], {});
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}
