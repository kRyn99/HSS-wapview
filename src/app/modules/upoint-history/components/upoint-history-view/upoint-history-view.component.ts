import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BsDatepickerConfig, BsDatepickerViewMode, BsLocaleService} from 'ngx-bootstrap/datepicker';
import {NavigationExtras, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject, Subscription} from 'rxjs';
import {UpointTransDetailDTO} from '@app/modules/upoint-history/shared/_models/upointTransDetailDTO';
import {first} from 'rxjs/operators';
import {MessagePopupComponent} from '@app/modules/common-items/components/message-popup/message-popup.component';
import {UpointHistoryService} from '@app/modules/upoint-history/shared/service/upoint-history.service';
import {COMMON_CONFIG} from '@app/shared/contants/common-constants';

import {defineLocale} from 'ngx-bootstrap/chronos';
import {viLocale, enGbLocale, zhCnLocale} from 'ngx-bootstrap/locale';
import {environment} from '@env/environment';
import {formatDate} from '@angular/common';

defineLocale('vi', viLocale);
defineLocale('la', enGbLocale);
defineLocale('en', enGbLocale);
defineLocale('zh', zhCnLocale);

@Component({
  selector: 'app-upoint-history-view',
  templateUrl: './upoint-history-view.component.html',
  styleUrls: ['./upoint-history-view.component.scss']
})
export class UpointHistoryViewComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  dateRangePickerValue?: (Date | undefined)[];
  // minMode: BsDatepickerViewMode = 'month'; // change for month:year
  // bsConfig: Partial<BsDatepickerConfig>;
  subMonthDate: Date;
  maxDate: Date;

  @ViewChild('vDate') vcDate: ElementRef;
  fromDateRequest = '';
  toDateRequest = '';
  listUpointTrans = new BehaviorSubject<UpointTransDetailDTO[]>([]);
  user: any;
  typeTrans = '-1';
  navigarionExtras: NavigationExtras;
  listTypeTrans = COMMON_CONFIG.LINE_TRAN_TYPE;
  offset = 0;
  limit = COMMON_CONFIG.LIMIT_TRANS;

  transactionLst: {
    name: string,
    phone: string,
    transTime: Date,
    amount: number
  }[];
  dateTransLst: {
    date: any,
    trans: any[]
  }[] = [];
  lstTransShow = new BehaviorSubject<any>([]);
  constructor(
      // public accountService: AccountService,
      private upointHistoryService: UpointHistoryService,
      private router: Router,
      private translateService: TranslateService,
      private modalService: NgbModal,
      private bsLocaleService: BsLocaleService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    let lang = localStorage.getItem(COMMON_CONFIG.KEY.LOCALIZATION);
    if (!lang) {
      lang = environment.defaultLang;
    }
    this.bsLocaleService.use(lang); // fecha en español, datepicker
    this.maxDate = new Date();
    this.subMonthDate = new Date();
    this.subMonthDate.setDate(1);
    this.dateRangePickerValue = [this.subMonthDate, this.maxDate];
    this.offset = 0;
    this.limit = COMMON_CONFIG.LIMIT_TRANS;
  }

  ngOnInit(): void {
    // this.bsConfig = Object.assign({}, {
    //   minMode: this.minMode
    // });

  }

  ngAfterViewInit() {
    this.fromDateRequest = formatDate(new Date(new Date().getFullYear(), new Date().getMonth(),  1), 'dd-MM-yyyy' , 'en-US');
    this.toDateRequest = formatDate(new Date(), 'dd-MM-yyyy' , 'en-US');
    this.getListUpointTrans(false);
  }

  eChangeMonth() {
    if (this.vcDate) {
      this.limit = COMMON_CONFIG.LIMIT_TRANS;
      this.offset = 0;
      this.getListUpointTrans(false);
    }
  }

  // eChangeType() {
  //   this.getListUpointTrans();
  // }

  getListUpointTrans(isUpdate) {
    // const fake = '2095463185';
    let typeTrans = null;
    if (this.typeTrans.toString() !== '-1') {
      typeTrans = this.typeTrans;
    }
    let directApi = 'getListUpointTrans';
    let role = '';
    if (this.user.data && this.user.data.role === 'END_USER') {
      directApi = 'getListUpointTransForCust';
      role = 'END_USER';
    }
    if(this.vcDate){
      const arrDate = this.vcDate.nativeElement.value.split('-');
      if (arrDate.length > 1){
        const arrDateF = arrDate[0].trim().split('/');
        const arrDateT = arrDate[1].trim().split('/');
        if (arrDateF[0].length === 4){
          this.fromDateRequest = arrDateF.reverse().join('-');
        }else {
          this.fromDateRequest = arrDateF.join('-');
        }
        if (arrDateT[0].length === 4){
          this.toDateRequest = arrDateT.reverse().join('-');
        }else {
          this.toDateRequest = arrDateT.join('-');
        }
        // this.fromDateRequest = arrDate[0].trim().split('/').join('-');
        // this.toDateRequest = arrDate[1].trim().split('/').join('-');
      }
    }
    const listTrans = this.upointHistoryService.getListUpointTrans(this.fromDateRequest, this.toDateRequest, this.limit, this.offset, typeTrans, directApi)
        .pipe(first())
        .subscribe(data => {
           if (data.errorCode === '0') {
                if (data.data && data.data.length > 0) {
                  if(!isUpdate){
                    this.dateTransLst = [];
                  };
                  data.data.forEach(item => {
                    const arrDateTime = item.createDatetime.split('T');
                    const dateStr = arrDateTime[0].split('-').reverse().join('/');
                    // let date = item.transTime.getDate() + '/' + (item.transTime.getMonth() + 1) + '/' + item.transTime.getFullYear();
                    const arr = this.dateTransLst.find(itemDate => itemDate.date === dateStr);
                    item.role = role;
                    if (arr) {
                      arr.trans.push(item);
                    } else {
                      this.dateTransLst.push({
                        date: dateStr,
                        trans: [item]
                      });
                    }
                  });
                } else {
                  if(this.offset === 0){
                    this.dateTransLst = [];
                  }
                }
                this.lstTransShow.next(this.dateTransLst);
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
    this.subscriptions.push(listTrans);
  }

  eViewDetail(upointTransId) {
    this.navigarionExtras = {
      queryParams: {upointTransId}
    };
    this.router.navigate(['history/transaction-detail'], this.navigarionExtras);
  }

  eClickMoreTrans() {
    this.offset = this.offset + this.limit;
    this.getListUpointTrans(true);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}
