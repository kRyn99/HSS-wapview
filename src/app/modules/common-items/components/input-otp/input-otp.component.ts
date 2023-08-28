import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ForgotPasswordService} from '@app/modules/auth/service/forgot-password.service';
import {first} from 'rxjs/operators';
import {MessagePopupComponent} from '@app/modules/common-items/components/message-popup/message-popup.component';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs';
import {COMMON_CONFIG} from '@app/shared/contants/common-constants';

@Component({
  selector: 'app-input-otp',
  templateUrl: './input-otp.component.html',
  styleUrls: ['./input-otp.component.scss']
})
export class InputOtpComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  @ViewChild('otp') vOtp: ElementRef;
  @Input() message: string;
  @Input() messageStyle: string;

  @Input() label: string;
  @Input() labelLink: string;
  @Input() errmsg: string;
  @Input() errHidden = false;
  @Input() required = false;
  @Input() name: string;
  @Input() value: any = '';
  @Input() placeholder: string;
  @Input() rightSide: string;
  @Input() maxlength: number = 6;
  @Input() pattern: string;
  @Input() readonly: boolean;
  @Output() valueChange = new EventEmitter<any>();
  @Output() focusOut = new EventEmitter<any>();

  @Input() timer = COMMON_CONFIG.TIME_LOADDING_TRANS * 60;
  timeCountDown: number;

  constructor(
      public forgotPasswordService: ForgotPasswordService,
      private translateService: TranslateService,
      private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.timeCountDown = this.timer;
    this.countdown();
  }

  valueChangeEvent() {
    const regex = new RegExp(/^\d*$/g);
    if (!regex.test(this.value)) {
      this.value = '';
    }
    this.valueChange.emit(this.value);
  }

  eOnKeyUp() {
    this.vOtp.nativeElement.value = this.vOtp.nativeElement.value.replace(/\D/g, '');
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
        // this.onDisble();
      }
    }, 1000)
  }

  sendOTP() {
    const otp = this.forgotPasswordService.sendOTP()
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
