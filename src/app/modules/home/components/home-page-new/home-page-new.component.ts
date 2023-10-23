import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {first} from 'rxjs/operators';
import {MessagePopupComponent} from '@app/modules/common-items/components/message-popup/message-popup.component';
import {HomepageService} from '@app/modules/home/shared/service/homepage.service';

@Component({
  selector: 'app-home-page-new',
  templateUrl: './home-page-new.component.html',
  styleUrls: ['./home-page-new.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class HomePageNewComponent implements OnInit{
  private subscriptions: Subscription[] = [];
  user: any;
  token: string;
  listIdea:any[]=[];
  subListIdea:any[] = [];
  startIndex =0;
  listContrivance:any[]=[];
  subListContrivance:any[] = [];
  backToPage = "contrivance-new/list-new";
  get backRoute() {
    return this.backToPage
  }
  constructor(
      private route:ActivatedRoute,
      private router: Router,
      private translateService: TranslateService,
      private modalService:NgbModal,
      public HomepageService:HomepageService,
  ) {
  }
  tokenLogin(){
    const TokenLogin ={
      tokenAutoLogin : this.token
    }
    const autoToken = this.HomepageService.redirectList(TokenLogin)
        .pipe(first())
        .subscribe(res => {
              if (res.errorCode === '0') {
                this.HomepageService.tokenAutoLogin = res.data.token
                this.HomepageService.accountInfo = res.data.accountInfo
                localStorage.setItem('tokenInLocalStorage', JSON.stringify(res.data.token));
                this.getListIdea();
                JSON.parse(localStorage.getItem(''));
                // console.log(res.data.token)
                // this.router.navigate(['/home']);
              } else {
                // show error
                const modalRefError = this.modalService.open(MessagePopupComponent, {
                  size: 'sm',
                  backdrop: 'static',
                  keyboard: false,
                  centered: true
                });
                modalRefError.componentInstance.type = 'fail';
                modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
                modalRefError.componentInstance.message = res.description;
                modalRefError.componentInstance.closeIcon = false;
              }
            },
            error => {
              // show error neu exception
              const modalRefError = this.modalService.open(MessagePopupComponent, {
                size: 'sm',
                backdrop: 'static',
                keyboard: false,
                centered: true
              });
              modalRefError.componentInstance.type = 'fail';
              modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
              modalRefError.componentInstance.message = this.translateService.instant(`COMMON.ERROR_SERVICE`);
              modalRefError.componentInstance.closeIcon = false;
            });
    this.subscriptions.push(autoToken)
  }
  getListIdea(){
    const listIdea = this.HomepageService.getInfoHomepage()
        .pipe(first())
        .subscribe(res =>{
              if (res.errorCode === '0'){
                this.listIdea = res.data.listIdea;
                this.listContrivance = res.data.listContrivance;
              } else {
                // show error
                const modalRefError = this.modalService.open(MessagePopupComponent, {
                  size: 'sm',
                  backdrop: 'static',
                  keyboard: false,
                  centered: true
                });
                modalRefError.componentInstance.type = 'fail';
                modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
                modalRefError.componentInstance.message = res.description;
                modalRefError.componentInstance.closeIcon = false;
              }
            },
            error => {
              // show error neu exception
              const modalRefError = this.modalService.open(MessagePopupComponent, {
                size: 'sm',
                backdrop: 'static',
                keyboard: false,
                centered: true
              });
              modalRefError.componentInstance.type = 'fail';
              modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
              modalRefError.componentInstance.message = this.translateService.instant(`COMMON.ERROR_SERVICE`);
              modalRefError.componentInstance.closeIcon = false;
            });
    this.subscriptions.push(listIdea)
  }
  ngOnInit(): void{
    if(localStorage.getItem('tokenInLocalStorage')){
      this.getListIdea();
    }
    this.route.queryParams.subscribe(params => {
      if(params && params.token){
        this.token = params.token;
        if(!localStorage.getItem('tokenInLocalStorage')){
          this.tokenLogin()
        }

      }
      if(params && params.lang){
        localStorage.setItem('lang',params.lang);
        this.translateService.use(params.lang);
        this.translateService.setDefaultLang(params.lang);
      }
    })
  }
}
