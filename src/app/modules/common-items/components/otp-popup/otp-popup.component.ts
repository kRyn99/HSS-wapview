import {Component, OnInit, Output, EventEmitter, Input, OnDestroy} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {COMMON_CONFIG} from '@app/shared/contants/common-constants';
import {first} from 'rxjs/operators';
import {MessagePopupComponent} from '@app/modules/common-items/components/message-popup/message-popup.component';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-otp-popup',
  templateUrl: './otp-popup.component.html',
  styleUrls: ['./otp-popup.component.scss']
})
export class OtpPopupComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  otpInput: any = '';
  otp: any = '';
  @Input() timer = COMMON_CONFIG.TIME_LOADDING_TRANS * 60;
  timeCountDown: number;
  @Input() isdn = '';
  @Input() title = '';
  @Input() content = '';
  @Input() actionIsdn = '';
  @Input() actionType: number;
  @Input() currentService: string;
  @Output() next = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  constructor(
      private router: Router,
      private translateService: TranslateService,
      private modalService: NgbModal,
      public modal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    this.timeCountDown = this.timer;
    this.countdown();
  }

  validateOTP() {
    // validate
    if (this.otpInput.length === 0) return;
    if (!/^[0-9]+$/gi.test(this.otpInput)) {
      // Nếu không phải dạng số thì xóa input và set về giá trị cũ gần nhất
      // ví dụ đang 123 -> nhập thành 123a -> xóa đi cho set trở lại giá trị 123
      this.otpInput = this.otp ? this.otp : '';
    } else {
      this.otp = this.otpInput;
    }
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

  handleCancel() {
    this.modal.close();
  }

  handleNext() {
    // this.next.emit(this.otp);
    // this.modal.close();

  }

  resendOTP() {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}
