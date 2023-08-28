import {Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {MessagePopupComponent} from '@app/modules/common-items/components/message-popup/message-popup.component';
import {SignUpService} from '@app/modules/auth/service/sign-up.service';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject, Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {ListAddress} from '@app/modules/auth/_models/Address';
import {COMMON_CONFIG} from '@app/shared/contants/common-constants';

@Component({
  selector: 'app-step-private-information',
  templateUrl: './step-private-information.component.html',
  styleUrls: ['../../sign-up.component.scss']
})
export class StepPrivateInformationComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public listProvince = new BehaviorSubject<ListAddress[]>([]);
  public listDistrict = new BehaviorSubject<ListAddress[]>([]);

  submitDisabled: boolean = false;
  unitName: string = '';
  fullName: string = '';
  phoneNumber: string = '';
  email: string = '';
  provinceId: string = '';
  provinceLst: any = [];
  districtId: string = '';
  districtLst: any = [];
  address: string = '';
  enterOTP: boolean = false;
  otp: string = '';
  timer = COMMON_CONFIG.TIME_LOADDING_TRANS * 60;
  timeCountDown: number;

  // @ViewChild('otpInputVw') otpInputVw: InputOtpComponent;

  constructor(
      public signUpService: SignUpService,
      private router: Router,
      private translateService: TranslateService,
      private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    if (this.signUpService.userDTO.categoryCode === undefined
        || this.signUpService.userDTO.categoryCode === null) {
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
    } else {
      this.getListProvince();
      const rqTime = this.signUpService.getConfigTimeOtp().subscribe(
          res => {
            if (res.errorCode === '0') {
              this.timer = res.data * 60;
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
              modalRefError.componentInstance.message = res.description;
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
      this.subscriptions.push(rqTime);
    }
  }

  getListProvince() {
    const province = this.signUpService.getListProvince()
        .pipe(first())
        .subscribe(data => {
              if (data.errorCode === '0') {
                if (data.data && data.data.length > 0) {
                  // this.provinceLst = data.data;
                  data.data.forEach(dt => {
                    dt.value = dt.provinceId;
                    dt.name = dt.provinceName;
                  })
                  this.listProvince.next(data.data);
                  // this.getListDistrict(data.data[0].provinceId);
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
    this.subscriptions.push(province);
  }

  eChangeProvince() {
    if (this.provinceId !== null && this.provinceId.toString() !== '-1') {
      this.getListDistrict(this.provinceId);
    } else {
      this.listDistrict.next([]);
    }
  }

  getListDistrict(provinceId) {
    const district = this.signUpService.getListDistrict(provinceId)
        .pipe(first())
        .subscribe(data => {
              if (data.errorCode === '0') {
                if (data.data && data.data.length > 0) {
                  data.data.forEach(dt => {
                    dt.value = dt.districtId;
                    dt.name = dt.districtName;
                  })
                  this.listDistrict.next(data.data);
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
    this.subscriptions.push(district);
  }

  nextStep() {
    if (!this.enterOTP) {
      if (this.prepareModel()) {
        const userDTO = {
          userName: this.phoneNumber,
          actionType: 1,
          actionIsdn: this.phoneNumber,
          unitName: this.unitName,
          fullName: this.fullName,
          provinceId: +this.provinceId,
          districtId: +this.districtId,
          address: this.address
        }
        const checkDup = this.signUpService.checkDuplicateAccount(userDTO)
            .pipe(first())
            .subscribe(data => {
                  if (data.errorCode === '0') {
                    this.enterOTP = true;
                    this.submitDisabled = true;
                    // countdown
                    this.timeCountDown = this.timer;
                    this.countdown();
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
        this.subscriptions.push(checkDup);
      }
      // this.enterOTP = true;
      // this.submitDisabled = true;
    } else {
      if (this.otp == null || this.otp === '') {
        const modalRef = this.modalService.open(MessagePopupComponent, {size: 'sm', backdrop: 'static', keyboard: false, centered: true});
        modalRef.componentInstance.type = 'fail';
        modalRef.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
        modalRef.componentInstance.message = this.translateService.instant(`FORGOT_PASSWORD.OTP_NOT_NULL`);
        modalRef.componentInstance.closeIcon = false;
        return false;
      } else {
        this.otp = this.otp.trim();
      }
      const valiOtp = this.signUpService.validateOTP(this.phoneNumber, this.otp, 1, this.phoneNumber)
          .pipe(first())
          .subscribe(data => {
                if (data.errorCode === '0') {
                  this.signUpService.userDTO.unitName = this.unitName;
                  this.signUpService.userDTO.fullName = this.fullName;
                  this.signUpService.userDTO.userName = this.phoneNumber;
                  this.signUpService.userDTO.email = this.email;
                  this.signUpService.userDTO.address = this.address;
                  if (this.provinceId.toString() !== '-1') {
                    this.signUpService.userDTO.provinceId = +this.provinceId;
                  } else {
                    this.signUpService.userDTO.provinceId = null;
                  }
                  if (this.districtId.toString() !== '-1') {
                    this.signUpService.userDTO.districtId = +this.districtId;
                  } else {
                    this.signUpService.userDTO.districtId = null;
                  }
                  this.router.navigate(['auth/sign-up/step-account-information'], {});
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
                      if (localStorage.getItem('hideIcon') === 'true') {
                        window.open('mocha://back', '_self');
                      } else {
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
              });
      this.subscriptions.push(valiOtp);
      // this.signUpService.userDTO.unitName = this.unitName;
      // this.signUpService.userDTO.fullName = this.fullName;
      // this.signUpService.userDTO.userName = this.phoneNumber;
      // this.signUpService.userDTO.email = this.email;
      // this.signUpService.userDTO.address = this.address;
      // this.signUpService.userDTO.provinceId = +this.provinceId;
      // this.signUpService.userDTO.districtId = +this.districtId;
      // this.router.navigate(['auth/sign-up/step-account-information'], {});
    }
  }

  prepareModel() {
    if (this.unitName == null || this.unitName === '') {
      const modalRef = this.modalService.open(MessagePopupComponent, {size: 'sm', backdrop: 'static', keyboard: false, centered: true});
      modalRef.componentInstance.type = 'fail';
      modalRef.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
      modalRef.componentInstance.message = this.translateService.instant(`SIGN_UP.UNIT_NAME_NOT_NULL`);
      modalRef.componentInstance.closeIcon = false;
      return false;
    } else {
      this.unitName = this.unitName.trim();
    }
    if (this.fullName == null || this.fullName === '') {
      const modalRef = this.modalService.open(MessagePopupComponent, {size: 'sm', backdrop: 'static', keyboard: false, centered: true});
      modalRef.componentInstance.type = 'fail';
      modalRef.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
      modalRef.componentInstance.message = this.translateService.instant(`SIGN_UP.FULL_NAME_NOT_NULL`);
      modalRef.componentInstance.closeIcon = false;
      return false;
    } else {
      this.fullName = this.fullName.trim();
    }
    if (this.phoneNumber == null || this.phoneNumber === '') {
      const modalRef = this.modalService.open(MessagePopupComponent, {size: 'sm', backdrop: 'static', keyboard: false, centered: true});
      modalRef.componentInstance.type = 'fail';
      modalRef.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
      modalRef.componentInstance.message = this.translateService.instant(`SIGN_UP.PHONE_NUMBER_NOT_NULL`);
      modalRef.componentInstance.closeIcon = false;
      return false;
    } else {
      this.phoneNumber = this.phoneNumber.trim();
      const reg = new RegExp('^[0-9]*$');
      if (reg.test(this.phoneNumber) === false) {
        const modalRef = this.modalService.open(MessagePopupComponent, {size: 'sm', backdrop: 'static', keyboard: false, centered: true});
        modalRef.componentInstance.type = 'fail';
        modalRef.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
        modalRef.componentInstance.message = this.translateService.instant(`SIGN_UP.MESSAGE.PHONE_IS_NUMBER`);
        modalRef.componentInstance.closeIcon = false;
        return false;
      }
    }
    // trim
    if (this.email !== null && this.email !== '') {
      this.email = this.email.trim();
      const regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if (regex.test(this.email) === false) {
        const modalRef = this.modalService.open(MessagePopupComponent, {
          size: 'sm',
          backdrop: 'static',
          keyboard: false,
          centered: true
        });
        modalRef.componentInstance.type = 'fail';
        modalRef.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
        modalRef.componentInstance.message = this.translateService.instant(`COLLABORATOR.EMAIL.INVALID`);
        modalRef.componentInstance.closeIcon = false;
        return false;
      }
      this.email = this.email.trim();
    }
    if (this.provinceId === null || this.provinceId.toString() === '' || this.provinceId.toString() === '-1') {
      const modalRef = this.modalService.open(MessagePopupComponent, {size: 'sm', backdrop: 'static', keyboard: false, centered: true});
      modalRef.componentInstance.type = 'fail';
      modalRef.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
      modalRef.componentInstance.message = this.translateService.instant(`SIGN_UP.MESSAGE.PROVINCE_NOT_NULL`);
      modalRef.componentInstance.closeIcon = false;
      return false;
    }
    if (this.districtId === null || this.districtId.toString() === '' || this.districtId.toString() === '-1') {
      const modalRef = this.modalService.open(MessagePopupComponent, {size: 'sm', backdrop: 'static', keyboard: false, centered: true});
      modalRef.componentInstance.type = 'fail';
      modalRef.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
      modalRef.componentInstance.message = this.translateService.instant(`SIGN_UP.MESSAGE.DISTRICT_NOT_NULL`);
      modalRef.componentInstance.closeIcon = false;
      return false;
    }
    if (this.address === null || this.address === '' || this.address.trim() === '') {
      const modalRef = this.modalService.open(MessagePopupComponent, {size: 'sm', backdrop: 'static', keyboard: false, centered: true});
      modalRef.componentInstance.type = 'fail';
      modalRef.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
      modalRef.componentInstance.message = this.translateService.instant(`SIGN_UP.MESSAGE.ADDRESS_NOT_NULL`);
      modalRef.componentInstance.closeIcon = false;
      return false;
    } else {
      this.address = this.address.trim();
    }
    return true;
  }

  validateOTP() {
    // validate
    this.otp = this.otp.replace(/\D/g, '');
    this.submitDisabled = this.otp.length !== 6;
  }

  resetTimer() {
    if (this.timer === 0) {
      this.timer = this.timeCountDown;
      this.countdown();
    } else {
      this.timer = this.timeCountDown;
    }
  }

  countdown(): void {
    const time = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        clearInterval(time);
      }
    }, 1000)
  }

  resendOTP() {
    const otp = this.signUpService.sendOTP(this.phoneNumber, 1, this.phoneNumber)
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
    this.subscriptions.push(otp);
    this.resetTimer();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}
