import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {COMMON_CONFIG} from '@app/shared/contants/common-constants';
import {TranslateService} from '@ngx-translate/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-screen-loading',
  templateUrl: './screen-loading.component.html',
  styleUrls: ['./screen-loading.component.scss']
})
export class ScreenLoadingComponent implements OnInit {

  @Input() type: any;
  @Input() message: any;
  @Input() closeIcon: any = false;
  @Output() back = new EventEmitter<any>();

  display: any;
  btnClose = false;

  constructor(
      private translateService: TranslateService,
      public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.timer(COMMON_CONFIG.TIME_LOADDING_TRANS);
    this.btnClose = false;
  }

  timer(minute) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec = 60;

    const prefix = minute < 10 ? '0' : '';

    const timer = setInterval(() => {
      seconds--;
      if (statSec !== 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds === 0) {
        clearInterval(timer);
        this.message = this.translateService.instant(`COMMON.MESSAGE.OVER_TIME_TRANS`);
        this.btnClose =true;
      }
    }, 1000);
  }

  handleClose() {
    this.modal.close();
    this.back.emit(true);
  }

}
