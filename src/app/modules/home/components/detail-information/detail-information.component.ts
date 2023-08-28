import {Router} from '@angular/router';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from '@app/modules/auth/service/account.service';
import {TranslateService} from '@ngx-translate/core';
import {MessagePopupComponent} from '@app/modules/common-items/components/message-popup/message-popup.component';
import {first} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs';
import {ForgotPasswordService} from '@app/modules/auth/service/forgot-password.service';
import {COMMON_CONFIG} from '@app/shared/contants/common-constants';

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

@Component({
  selector: 'app-detail-information',
  templateUrl: './detail-information.component.html',
  styleUrls: ['./detail-information.component.scss']
})
export class DetailInformationComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  user: any;

  model: any;
  isCollapsed: boolean = false;
  language: LanguageFlag;
  languages: LanguageFlag[] = [
    {
      lang: 'vi',
      name: 'Vietnamese',
      flag: './assets/img/lang/vietnam.png',
    },
    {
      lang: 'en',
      name: 'English',
      flag: './assets/img/lang/united-kingdom.png',
    },
    {
      lang: 'la',
      name: 'Laos',
      flag: './assets/img/lang/laos.png',
    },
    {
      lang: 'zh',
      name: 'Chinese',
      flag: './assets/img/lang/china.png',
    }
  ];

  constructor(
      private router: Router,
      private accountService: AccountService,
      public forgotPasswordService: ForgotPasswordService,
      private translateService: TranslateService,
      private modalService: NgbModal
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.model = {
      displayLogo: true,
      logo: null,
      name: 'Unknown Name',
      phone: 'Unknown number',
      availableUpoint: 1234
    }
    if (this.user && this.user.data) {
      if (this.user.data.currentUpoint !== null) {
        this.model.availableUpoint = this.user.data.currentUpoint;
      }
      if (this.user.data.userName !== null) {
        this.model.phone = this.user.data.userName ?
            this.user.data.userName : this.user.data.accountInfo ?
                this.user.data.accountInfo?.custIsdn : '';
      }
      if (this.user.data.role === 'ROLE_COLLABORATORS' || this.user.data.role === 'ROLE_ASSISTANT') {
        this.model.name = this.user.data.nameCtv;
      } else if (this.user.data.role === 'ROLE_MERCHANT') {
        this.model.name = this.user.data.nameMerchant ?
            this.user.data.nameMerchant : this.user.data.accountInfo ?
                this.user.data.accountInfo?.custName : '';
      } else if (this.user.data.role === 'END_USER') {
        this.model.name = this.user.data.fullName ?
            this.user.data.fullName : this.user.data.accountInfo ?
                this.user.data.accountInfo?.custName : '';
      }
      this.model.logo = this.user.data.avatarStr;
    }
  }

  handleRedirect(url: string) {
    this.router.navigate([url]);
  }

  handleChangePass(url: string) {
    let checked = false;
    const userName = this.user.data.userName;
    if (userName !== null && userName.trim() !== '') {
      checked = true;
    } else {
      const modalRefError = this.modalService.open(MessagePopupComponent, {
        size: 'sm',
        backdrop: 'static',
        keyboard: false,
        centered: true
      });
      modalRefError.componentInstance.type = 'fail';
      modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
      modalRefError.componentInstance.message = this.translateService.instant(`FORGOT_PASSWORD.USERNAME_NOT_NULL`);
      modalRefError.componentInstance.closeIcon = false;
    }
    if (checked) {
      // this.loading = true;
      const checkUser = this.accountService.checkLoginUserNameInfor(userName,4, userName)
          .pipe(first())
          .subscribe(
              data => {
                if (data.errorCode === '0') {
                  if (data.data !== null) {
                    this.forgotPasswordService.isdn = userName;
                    this.forgotPasswordService.checkType = true;
                    this.forgotPasswordService.actionType = 4;
                    this.forgotPasswordService.actionIsdn = userName;
                    this.router.navigate([url]);
                  }
                  // alert(data.data.otp);
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
                  modalRefError.componentInstance.message = data.description;
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
      this.subscriptions.push(checkUser);
    }
  }

  eCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  setLanguageWithRefresh(lang) {
    this.setLanguage(lang);
    this.eCollapse();
  }

  setLanguage(lang) {
    this.languages.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
    this.translateService.use(lang);
    this.translateService.setDefaultLang(lang);
    localStorage.setItem(COMMON_CONFIG.KEY.LOCALIZATION, lang);
  }


  handleLogout() {
    this.accountService.logout();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}
