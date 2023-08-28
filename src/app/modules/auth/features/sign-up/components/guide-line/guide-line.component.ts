import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {first} from 'rxjs/operators';
import {MessagePopupComponent} from '@app/modules/common-items/components/message-popup/message-popup.component';
import {SignUpService} from '@app/modules/auth/service/sign-up.service';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs';
import {COMMON_CONFIG} from '@app/shared/contants/common-constants';
import {environment} from '@env/environment';

@Component({
  selector: 'app-guide-line',
  templateUrl: './guide-line.component.html',
  styleUrls: ['../../sign-up.component.scss']
})
export class GuideLineComponent implements OnInit, OnDestroy {
  // private subscriptions: Subscription[] = [];
  // @ViewChild('content') vContent : ElementRef;

  submitDisabled: boolean = false;
  // content: string;
  lang: any;

  constructor(
      public signUpService: SignUpService,
      private router: Router,
      private translateService: TranslateService,
      private modalService: NgbModal
  ) {
    this.lang = localStorage.getItem(COMMON_CONFIG.KEY.LOCALIZATION);

    if (!this.lang) {
      this.lang = environment.defaultLang;
    }
  }

  ngOnInit() {
    if (this.signUpService.guideLine === undefined
        || this.signUpService.guideLine === null || this.signUpService.guideLine === '') {
      const modalRefError = this.modalService.open(MessagePopupComponent, {
        size: 'sm',
        backdrop: 'static',
        keyboard: false,
        centered: true
      });
      modalRefError.componentInstance.type = 'fail';
      modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
      modalRefError.componentInstance.message = this.translateService.instant(`SIGN_UP.WRONG_STEP`);
      modalRefError.componentInstance.closeIcon = false;
      modalRefError.result.then(() => {
        this.router.navigate(['auth/sign-up/step-account-type'], {});
      }, () => {
      });
    }else{
      // const guide = this.signUpService.getGuideline()
      //     .pipe(first())
      //     .subscribe(data => {
      //           if (data.errorCode === '0') {
      //             this.content = data.data;
      //             // this.vContent.nativeElement.innerHTML = data.data;
      //           } else {
      //             // show error
      //             const modalRefError = this.modalService.open(MessagePopupComponent, {
      //               size: 'sm',
      //               backdrop: 'static',
      //               keyboard: false,
      //               centered: true
      //             });
      //             modalRefError.componentInstance.type = 'fail';
      //             modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
      //             modalRefError.componentInstance.message = data.description;
      //             modalRefError.componentInstance.closeIcon = false;
      //           }
      //         },
      //         error => {
      //           // show error neu exception
      //           const modalRefError = this.modalService.open(MessagePopupComponent, {
      //             size: 'sm',
      //             backdrop: 'static',
      //             keyboard: false,
      //             centered: true
      //           });
      //           modalRefError.componentInstance.type = 'fail';
      //           modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
      //           modalRefError.componentInstance.message = this.translateService.instant(`COMMON.ERROR_SERVICE`);
      //           modalRefError.componentInstance.closeIcon = false;
      //         });
      // this.subscriptions.push(guide);
    }
  }

  nextStep() {
    this.router.navigate(['sign-up/step-account-type'], {});
  }

  ngOnDestroy(): void {
    // this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}
