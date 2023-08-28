import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {getBrowserNameAndVersion} from '@app/shared/utils/data.utils';
import {first} from 'rxjs/operators';
import {GetIpService} from '@app/shared/service/get-ip.service';
import {Subscription} from 'rxjs';
import {MessagePopupComponent} from '@app/modules/common-items/components/message-popup/message-popup.component';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-confirm-payment-popup',
    templateUrl: './confirm-payment-popup.component.html',
    styleUrls: ['./confirm-payment-popup.component.scss']
})
export class ConfirmPaymentPopupComponent implements OnInit, OnDestroy {
    @Input() message: any;
    @Input() title: any;
    @Input() closeIcon: any = false;
    @Input() artifactType: any;
    @Input() artifactId: any;
    @Input() ticketAdditionalInfo: any;
    @Output() next = new EventEmitter<any>();
    @Output() cancel = new EventEmitter<any>();
    user: any;
    subscriptions: Subscription[] = [];
    ipUser = '';
    buyMethodSelected: number;
    remainUpoint: number;

    constructor(
        private modalService: NgbModal,
        public modal: NgbActiveModal,
        private getIpService: GetIpService,
        private translateService: TranslateService,
        private router: Router
    ) {
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.getClientPublicIP();
        this.getCurrentUpointCust();
    }

    changeBuyMethod(type) {
        this.buyMethodSelected = type;
    }

    handleClose() {
        this.cancel.emit(true);
        this.modal.close();
    }

    handleNext() {
        if (this.buyMethodSelected.toString() === '1') {
            this.getUnipayTrans();
        } else if (this.buyMethodSelected.toString() === '2') {
            if( this.artifactType && this.artifactType.toString() === '3'){
                this.next.emit('direct-payment');
            } else if( this.artifactType && this.artifactType.toString() === '4') {
                this.next.emit('continue-to-payment');
            } else if( this.artifactType && this.artifactType.toString() === '1') {
                this.next.emit('buy-voucher');
            } else if( this.artifactType && this.artifactType.toString() === '2') {
                this.next.emit('buy-gift');
            }
        }
        this.modal.close();
    }

    getUnipayTrans() {
        const request = {
            function: 'getUnipayTrans',
            type: this.artifactType,
            userDTO: {
                ip: this.ipUser,
                userBrowser: getBrowserNameAndVersion().name
            }
        };
        if (this.artifactType && this.artifactType.toString() === '1') {
            Object.assign(request, {
                voucherDTO: {
                    voucherId: this.artifactId,
                }
            })
        }
        if (this.artifactType && this.artifactType.toString() === '2') {
            Object.assign(request, {
                giftDTO: {
                    giftId: this.artifactId,
                }
            })
        }
        if (this.artifactType && this.artifactType.toString() === '3') {
            Object.assign(request, {
                ticketTransDTO: {
                    ticketId: this.artifactId,
                    ticketInfoDTOList: this.ticketAdditionalInfo[0],
                    totalPayment: this.ticketAdditionalInfo[1],
                    buyMethod: this.ticketAdditionalInfo[2]
                }
            })
        }
        if (this.artifactType && this.artifactType.toString() === '4') {
            Object.assign(request, {
                ticketTransDTO: {
                    ticketId: this.artifactId,
                    ticketInfoDTOList: this.ticketAdditionalInfo[0],
                    totalPayment: this.ticketAdditionalInfo[1],
                    ticketTransId: this.ticketAdditionalInfo[2]
                }
            })
        }
    }

    getClientPublicIP() {
        const ip = this.getIpService.getClientPublicIP()
            .pipe(first())
            .subscribe(data => {
                this.ipUser = data && data.ip ? data.ip : '';
            });
        this.subscriptions.push(ip);
    }

    getCurrentUpointCust() {
        const request = {
            function: 'get-current-upoint-cust',
            msisdn: this.user.data.userName ? this.user.data.userName :
                this.user.data.accountInfo? this.user.data.accountInfo?.custIsdn : undefined
        }
    }

    buyGiftAPI() {
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sb => sb.unsubscribe());
    }

}
