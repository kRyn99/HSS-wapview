import { formatNumber } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  @Input() bannerUrl: string;
  @Input() logoUrl: string;
  @Input() logoStyle: string;
  @Input() bannerStyle: string;
  @Input() name: string;
  @Input() description: string;

  constructor() {}

  ngOnInit() {
  }
}
