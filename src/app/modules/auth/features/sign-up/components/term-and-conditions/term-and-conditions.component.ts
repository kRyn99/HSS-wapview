import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
  selector: 'app-term-and-conditions',
  templateUrl: './term-and-conditions.component.html',
  styleUrls: ['../../sign-up.component.scss']
})
export class TermAndConditionsComponent implements OnInit, OnDestroy,AfterViewInit {
  // private subscriptions: Subscription[] = [];
  // @ViewChild('content') vcCont : ElementRef;

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
  }

  ngAfterViewInit(){
    // const term = this.signUpService.getTermAndConditions()
    //     .pipe(first())
    //     .subscribe(data => {
    //           if (data.errorCode === '0') {
    //             // const arr = data.data.value.split('\\n');
    //             // data.data.value.replace(/\n/g,'<br/>')
    //             this.content = data.data.value;
    //             this.vcCont.nativeElement.innerHTML = data.data.value;
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
    // this.subscriptions.push(term);
  }

  nextStep() {
    this.router.navigate(['auth/sign-up/step-account-type'], {});
  }

  ngOnDestroy(): void {
    // this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}
