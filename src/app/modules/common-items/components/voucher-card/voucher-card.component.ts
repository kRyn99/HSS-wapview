import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-voucher-card',
  templateUrl: './voucher-card.component.html',
  styleUrls: ['./voucher-card.component.scss']
})
export class VoucherCardComponent implements OnInit {
  @Input() name: string;
  @Input() avatarUrl: string;
  @Input() rate: string;
  @Input() description: string;
  @Input() expiredIn: string;
  @Input() expiredDate: string;
  @Input() usedDate: string;
  @Input() status: number;

  constructor() { }

  ngOnInit() {
  }

}
