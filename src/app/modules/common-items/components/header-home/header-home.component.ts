import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent {

  @Input() backRoute: string;
  // @Input() isAssistant = false;
  @Input() merchantModel: any = null;
  @Input() collaboratorModel: any = null;
  @Input() endUserModel: any = null;
  @Input() applyWhenBack: boolean;
  @Output() applyChange = new EventEmitter<any>();
  hiddenUpoint = false;
  user: any;
  moveRight = false;
  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  handleBack() {
    if (this.applyWhenBack) {
      this.applyChange.emit();
    } else {
      this.router.navigate([this.backRoute]);
    }
  }

  handleRedirect(url?: string) {
    this.router.navigate([url]);
  }

  // handleCreate() {
  //   if (this.createRoute === 'this') {
  //     this.create.emit();
  //   } else {
  //     this.router.navigate([this.createRoute]);
  //   }
  // }
  //
  // handleDone() {
  //   this.applyChange.emit();
  // }
  //
  // handleLinkRoute() {
  //   this.router.navigate([this.linkRoute]);
  // }
  //
  // onClickRight(link) {
  //   this.router.navigate([link]);
  // }
  //
  // onApply() {
  //   this.applyChange.emit('');
  // }
  //
  toggleUpoint() {
    this.hiddenUpoint = !this.hiddenUpoint;
  }
  //
  // openFlashlight() {
  //
  // }

  eClickMoreEU(){
    this.router.navigate(['home/more']);
  }
}
