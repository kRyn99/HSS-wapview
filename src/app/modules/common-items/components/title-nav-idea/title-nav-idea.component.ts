import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomepageService } from '@app/modules/home/shared/service/homepage.service';

@Component({
  selector: 'app-title-nav-idea',
  templateUrl: './title-nav-idea.component.html',
  styleUrls: ['./title-nav-idea.component.scss']
})

export class TitleNavIdeaComponent implements OnInit {
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
  @Input() isBackHome: boolean;
  @Output() create = new EventEmitter<any>();
  @Output() action = new EventEmitter<any>();
  @Output() applyChange = new EventEmitter<any>();
  @Output() customEvent = new EventEmitter<any>();
  @Output() logoEvent = new EventEmitter<any>();
  @Output() printEvent = new EventEmitter<any>();
  baseUrl: string = window.location.origin;
  hiddenMerchantUpoint = true;
  isdn: string = '';
  constructor(private router: Router, public homeService: HomepageService) {
  }

  ngOnInit(): void {

    
    if(JSON.parse(localStorage.getItem('accountInfo')) &&   JSON.parse(localStorage.getItem('accountInfo')).isdn){
      this.isdn =  JSON.parse(localStorage.getItem('accountInfo')).isdn
    }
  }
  handleBack() {
    if(this.isBackHome){
    this.homeService.isIdeaChecked.next(false);
    this.homeService.isContrivanceChecked.next(false)
    }
    this.router.navigate([this.backRoute]);
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