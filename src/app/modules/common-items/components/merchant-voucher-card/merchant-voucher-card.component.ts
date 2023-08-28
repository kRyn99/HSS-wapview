import { formatNumber } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {FILTER_VOUCHER} from '@app/shared/contants/common-constants';

@Component({
  selector: 'app-merchant-voucher-card',
  templateUrl: './merchant-voucher-card.component.html',
  styleUrls: ['./merchant-voucher-card.component.scss']
})
export class MerchantVoucherCardComponent implements OnInit {
  @Input() cardType: number;
  @Input() avatarUrl: string;
  @Input() name: string;
  @Input() price: number;
  @Input() totalNumber: string;
  @Input() exchangedNumber: string;
  @Input() remainNumber: number;
  @Input() usedNumber: number;
  @Input() description: string;
  @Input() index: number;
  @Input() styleTxt: string;
  @Input() filterInfoEnabled: boolean = false;
  @Input() avgRating: any = '';
  @Input() distance: any = '';
  @Input() totalBought: any = '';
  @Input() discount: any = '';
  @Input() activeFilter: any = '';
  @Input() usageAmount: number;
  listFilter = FILTER_VOUCHER;

  constructor() { }

  ngOnInit() {
    this.avgRating = this.avgRating > 0 ? this.avgRating : '--';
    this.distance = this.distance >= 1 ? formatNumber(this.distance, 'en-US', '1.0-1') + 'km' : formatNumber(this.distance * 1000, 'en-US', '1.0-1') + 'm';
  }

}
