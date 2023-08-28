import {Component, OnDestroy, OnInit} from '@angular/core';
import {UpointHistoryService} from '@app/modules/upoint-history/shared/service/upoint-history.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessagePopupComponent} from '@app/modules/common-items/components/message-popup/message-popup.component';
import {first} from 'rxjs/operators';
import {BehaviorSubject, Subscription} from 'rxjs';
import {UpointTransDetailDTO} from '@app/modules/upoint-history/shared/_models/upointTransDetailDTO';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  upointTransId: number;
  listTransactionDetail = new BehaviorSubject<UpointTransDetailDTO[]>([]);
  user: any;

  constructor(
      private upointHistoryService: UpointHistoryService,
      private router: Router,
      private route: ActivatedRoute,
      private translateService: TranslateService,
      private modalService: NgbModal
  ) {
    this.route.queryParams.subscribe(params => {
      if (params.upointTransId) {
        this.upointTransId = params.upointTransId;
      }
    });
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    if (this.upointTransId === undefined
        || this.upointTransId === null || this.upointTransId.toString() === '') {
      const modalRefError = this.modalService.open(MessagePopupComponent, {
        size: 'sm',
        backdrop: 'static',
        keyboard: false,
        centered: true
      });
      modalRefError.componentInstance.type = 'fail';
      modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
      modalRefError.componentInstance.message = this.translateService.instant(`COMMON.SELECT_ROW`);
      modalRefError.componentInstance.closeIcon = false;
      modalRefError.result.then(() => {
        this.router.navigate(['history/upoint-history-view'], {});
      }, () => {
      });
    } else {
      const transDetail = this.upointHistoryService.getListUpointTransDetail(this.upointTransId)
          .pipe(first())
          .subscribe(data => {
                if (data.errorCode === '0') {
                  if (data.data) {
                    // data.data.forEach(item => {
                    //   const arr = item.createDatetime.split('T');
                    //   item.createDatetime = arr[0].split('-').reverse().join('/') + ' ' + arr[]
                    // })
                    this.listTransactionDetail.next(data.data);
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
      this.subscriptions.push(transDetail);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}
