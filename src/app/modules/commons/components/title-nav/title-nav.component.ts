import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { settings } from '@app/setting';
import { environment } from '@env/environment';
// import * as EventEmitter from 'events';

@Component({
  selector: 'app-title-nav',
  templateUrl: './title-nav.component.html',
  styleUrls: ['./title-nav.component.scss']
})
export class TitleNavComponent {
  @Input() applyWhenBack: boolean;
  @Input() title: string;
  @Input() backRoute: string;
  @Input() backRouteClick: string;
  @Input() history: any = null;
  @Input() filter: any = null;
  @Input() apply: any = null;
  @Input() qrCode: any = null;
  @Input() logo: any = null;
  @Output() applyChange = new EventEmitter<any>();
  baseUrl: string = window.location.origin;

  iOS: boolean = settings.iOS;


  constructor(private router: Router) { }

  handleBack() {
    this.router.navigate([this.backRoute]);
  }
  onClickRight(link) {
    this.router.navigate([link]);
  }
  onApply() {
    this.applyChange.emit();
  }
  handleBackClick() {
    if (this.applyWhenBack) {
      this.applyChange.emit();
    } else {
      this.router.navigate([this.backRouteClick]);
    }
  }
}
