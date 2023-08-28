import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BsDatepickerConfig, BsDatepickerViewMode} from 'ngx-bootstrap/datepicker';
import {formatNumber} from '@angular/common';
import {MessagePopupComponent} from '@app/modules/common-items/components/message-popup/message-popup.component';
import {TranslateService} from '@ngx-translate/core';
import {first} from 'rxjs/operators';
import {downExportExcel} from '@app/shared/utils/data.utils';
import {Subscription} from 'rxjs';
import {COMMON_CONFIG} from '@app/shared/contants/common-constants';
import {environment} from '@env/environment';

@Component({
    selector: 'app-deal-renewal',
    templateUrl: './deal-renewal.component.html',
    styleUrls: ['./deal-renewal.component.scss']
})
export class DealRenewalComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];
    bsConfig: Partial<BsDatepickerConfig>;
    minMode: BsDatepickerViewMode = 'day'; // change for month:year
    voucherErrorFileContent = '';
    voucherErrorFileName = '';
    expiredDate: Date;
    minDate: Date;
    dealCodeAmountInput = '';
    amountSend = '';
    listDealSend: string[] = [];
    dateToSendString = '';
    voucherCodeAmountUploaded = '';
    showErrorFile = false;
    dateRenewal = '';
    lang = '';
    @Input() type: any;
    @Input() dealType: any;
    @Input() title: any;
    @Input() closeIcon: any = false;
    @Output() next = new EventEmitter<any>();
    @ViewChild('expDate') expDate: ElementRef;

    constructor(
        public modal: NgbActiveModal,
        public translateService: TranslateService,
        public modalService: NgbModal,
    ) {
        this.lang = localStorage.getItem(COMMON_CONFIG.KEY.LOCALIZATION);
        if (!this.lang) {
            this.lang = environment.defaultLang;
        }
    }

    ngOnInit() {
        this.bsConfig = Object.assign({}, {
            minMode: this.minMode
        });
        this.minDate = new Date();
    }

    handleSelectExpiredDate() {
        if (this.expDate) {
            if (this.lang !== 'zh') {
                if (/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)(\d{4})$/gi.test(this.expDate.nativeElement.value)) {
                    const arrDateF = this.expDate.nativeElement.value.trim().split('/');
                    if (arrDateF[2].length === 4) {
                        this.dateRenewal = arrDateF.reverse().join('-');
                    } else {
                        this.dateRenewal = arrDateF.join('-');
                    }
                }
            } else if (this.lang === 'zh') {
                if (/^(\d{4})(\/)(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])$/gi.test(this.expDate.nativeElement.value)) {
                    const arrDateF = this.expDate.nativeElement.value.trim().split('/');
                    if (arrDateF[0].length === 4) {
                        this.dateRenewal = arrDateF.join('-');
                    } else {
                        this.dateRenewal = arrDateF.reverse().join('-');
                    }
                }
            }
            this.dateRenewal += 'T23:59:59.000Z';
            this.dateToSendString = this.dateRenewal;
        }
    }

    formatNumberInput() {
        if (isNaN(+this.dealCodeAmountInput.replace(/,/gi, ''))) {
            // Nếu không phải dạng số thì xóa input và set về giá trị cũ gần nhất
            // ví dụ đang 123 -> nhập thành 123a -> xóa đi cho set trở lại giá trị 123
            this.dealCodeAmountInput = this.amountSend ? formatNumber(+this.amountSend, 'en-US', '1.0') : '';
        } else {
            this.amountSend = this.dealCodeAmountInput.replace(/,/gi, '');
            this.dealCodeAmountInput = this.amountSend ? formatNumber(+this.amountSend, 'en-US', '1.0') : '';
        }
    }

    handleClose() {
        this.modal.close();
    }

    handleNext() {
        if (this.prepareActionModel()) {
            // tslint:disable-next-line:triple-equals
            if (this.dealType == 1 || this.dealType == 3) {
                this.next.emit([this.dateToSendString, this.dealCodeAmountInput.replace(',','')]);
            }
            // tslint:disable-next-line:triple-equals
            else if (this.dealType == 2) {
                this.next.emit([this.dateToSendString, this.listDealSend]);
            }
        }
        ;
    }

    prepareActionModel() {
        if (this.dateToSendString === undefined || this.dateToSendString == null
            || this.dateToSendString === '' || this.dateToSendString.trim() === '') {
            const modalRef = this.modalService.open(MessagePopupComponent, {
                size: 'sm',
                backdrop: 'static',
                keyboard: false,
                centered: true
            });
            modalRef.componentInstance.type = 'fail';
            modalRef.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
            modalRef.componentInstance.message = this.translateService.instant(`VOUCHER.MESSAGE.EXPIRED_DATE_NOT_NULL`);
            modalRef.componentInstance.closeIcon = false;
            return false;
        } else {
            this.dateToSendString = this.dateToSendString.trim();
        }
        if (this.dealType === 1 && (this.amountSend === undefined
            || this.amountSend == null || this.amountSend === ''
            || this.amountSend.trim() === '' || this.amountSend === '0')) {
            const modalRef = this.modalService.open(MessagePopupComponent, {
                size: 'sm',
                backdrop: 'static',
                keyboard: false,
                centered: true
            });
            modalRef.componentInstance.type = 'fail';
            modalRef.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
            modalRef.componentInstance.message = this.translateService.instant(`VOUCHER.MESSAGE.VOUCHER_CODE_AMOUNT_NOT_NULL`);
            modalRef.componentInstance.closeIcon = false;
            return false;
        } else if (this.dealType === 2 && (this.listDealSend === undefined
            || this.listDealSend == null || this.listDealSend.length < 1)) {
            const modalRef = this.modalService.open(MessagePopupComponent, {
                size: 'sm',
                backdrop: 'static',
                keyboard: false,
                centered: true
            });
            modalRef.componentInstance.type = 'fail';
            modalRef.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
            modalRef.componentInstance.message = this.translateService.instant(`VOUCHER.MESSAGE.LIST_VOUCHER_CODE_NOT_NULL`);
            modalRef.componentInstance.closeIcon = false;
            return false;
        } else if (this.dealType === 3 && (this.amountSend === undefined
            || this.amountSend == null || this.amountSend === ''
            || this.amountSend.trim() === '' || this.amountSend === '0')) {
            const modalRef = this.modalService.open(MessagePopupComponent, {
                size: 'sm',
                backdrop: 'static',
                keyboard: false,
                centered: true
            });
            modalRef.componentInstance.type = 'fail';
            modalRef.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
            modalRef.componentInstance.message = this.translateService.instant(`GIFT.MESSAGE.GIFT_CODE_AMOUNT_NOT_NULL`);
            modalRef.componentInstance.closeIcon = false;
            return false;
        }
        return true;
    }

    formatDate(date) {
        let dateNumber, monthNumber;
        if (date.getDate() < 10) {
            dateNumber = '0' + date.getDate();
        } else {
            dateNumber = date.getDate();
        }
        // tslint:disable-next-line:radix
        let month = parseInt(date.getMonth()) + 1;
        if (month < 10) {
            monthNumber = '0' + month;
        } else {
            monthNumber = month;
        }
        return (dateNumber + '/' + (monthNumber) + '/' + date.getFullYear());
    }

    eDownTemp() {
    }

    validateFile(event) {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            // check định dạng
            if (
                file.name.substring(file.name.lastIndexOf('.') + 1) !== 'xls' &&
                file.name.substring(file.name.lastIndexOf('.') + 1) !== 'xlsx'
            ) {
                const modalRefError = this.modalService.open(MessagePopupComponent, {
                    size: 'sm',
                    backdrop: 'static',
                    keyboard: false,
                    centered: true
                });
                modalRefError.componentInstance.type = 'fail';
                modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
                modalRefError.componentInstance.message = this.translateService.instant(`COMMON.LABEL.FILE_MALFORMED`);
                modalRefError.componentInstance.closeIcon = false;
                return;
            }
            // check dung luong
            // if (file.size > COMMON_CONFIG.MAX_FILE_SIZE_TEMPLATE) {
            //   const modalRefError = this.modalService.open(MessagePopupComponent, {
            //     size: 'sm',
            //     backdrop: 'static',
            //     keyboard: false,
            //     centered: true
            //   });
            //   modalRefError.componentInstance.type = 'fail';
            //   modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
            //   modalRefError.componentInstance.message = this.translateService.instant(`COMMON.LABEL.MAX_SIZE_FILE_UPLOAD`);
            //   modalRefError.componentInstance.closeIcon = false;
            //   return;
            // }
            this.uploadFileVoucher(file);
        }
    }

    uploadFileVoucher(file) {
        if (file) {
            const formData: FormData = new FormData();
            formData.append('file', file);
        }
    }

    eDownErrorFile() {
        downExportExcel(this.voucherErrorFileContent, this.voucherErrorFileName);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sb => sb.unsubscribe());
    }

}
