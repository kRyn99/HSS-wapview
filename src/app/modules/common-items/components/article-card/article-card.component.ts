import { formatNumber } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {FILTER_VOUCHER} from '@app/shared/contants/common-constants';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {
  @Input() avatarUrl: string;
  @Input() name: string;
  @Input() content: string;
  @Input() styleTxt: string;

  constructor() { }

  ngOnInit() {

  }

}
