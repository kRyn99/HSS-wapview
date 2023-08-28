import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HomepageService } from '@app/modules/home/shared/service/homepage.service';

@Component({
  selector: 'app-title-nav',
  templateUrl: './title-nav.component.html',
  styleUrls: ['./title-nav.component.scss']
})
export class TitleNavComponent {
  @Input() shouldNavigateByUrl: boolean = false;
  @Input() title: string;
  @Input() backRoute: string;
  @Input() createRoute: string;
  @Input() createRouteEdit: string;
  @Input() actionRoute: string;
  @Input() linkRoute: string;
  @Input() linkLabel: string;
  @Input() qrCode: any = null;
  @Input() logo: any = null;
  @Input() flash: any = null;
  @Input() done: any = null;
  @Input() print: any = null;
  @Input() customEventLabel: string;
  @Input() merchantModel: any = null;
  @Input() collaboratorModel: any = null;
  @Input() endUserModel: any = null;
  @Input() styleText: string = '';
  @Input() applyWhenBack: boolean;
  @Output() create = new EventEmitter<any>();
  @Output() action = new EventEmitter<any>();
  @Output() applyChange = new EventEmitter<any>();
  @Output() customEvent = new EventEmitter<any>();
  @Output() logoEvent = new EventEmitter<any>();
  @Output() printEvent = new EventEmitter<any>();
  baseUrl: string = window.location.origin;
  hiddenMerchantUpoint = true;

  constructor(private router: Router, public homeService: HomepageService) {
  }

  handleBack() {
    if (this.applyWhenBack) {
      this.applyChange.emit();
    } else if(this.shouldNavigateByUrl){
      this.router.navigateByUrl(this.backRoute);
    } else {
      this.router.navigate([this.backRoute]);
    }
    
    this.homeService.isIdeaChecked.next(false);
    this.homeService.isContrivanceChecked.next(false)
  }

  handleCreate() {
    if (this.createRoute === 'this') {
      this.create.emit();
    } else {
      this.router.navigate([this.createRoute]);
    }
  }
   handleEdit() {
    if (this.createRouteEdit === 'edit') {
      this.create.emit();
    } else {
      this.router.navigate([this.createRouteEdit]);
    }
  }

  handleAction() {
    if (this.actionRoute === 'this') {
      this.action.emit();
    } else {
      this.router.navigate([this.actionRoute]);
    }
  }

  handleDone() {
    this.applyChange.emit();
  }

  handleCustomeEvent(){
    this.customEvent.emit();
  }

  handleLinkRoute() {
    console.log(this.linkRoute);
    
    this.router.navigate([this.linkRoute]);
  }

  onClickRight(link) {
    this.router.navigate([link]);
  }

  handleLogoEvent(){
    this.logoEvent.emit();
  }

  handlePrintEvent(){
    this.printEvent.emit();
  }

  onApply() {
    this.applyChange.emit('');
  }

  toggleMerchantUpoint() {
    this.hiddenMerchantUpoint = !this.hiddenMerchantUpoint;
  }

  openFlashlight() {

  }
}
