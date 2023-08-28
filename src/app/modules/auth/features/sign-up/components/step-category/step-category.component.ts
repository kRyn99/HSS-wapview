import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SignUpService} from '@app/modules/auth/service/sign-up.service';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject, Subscription} from 'rxjs';
import {MessagePopupComponent} from '@app/modules/common-items/components/message-popup/message-popup.component';
import {first} from 'rxjs/operators';
import {ListAccountType} from '@app/modules/auth/_models/AccountType';

@Component({
  selector: 'app-step-category',
  templateUrl: './step-category.component.html',
  styleUrls: ['../../sign-up.component.scss']
})
export class StepCategoryComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public listServiceType = new BehaviorSubject<ListAccountType[]>([]);
  serviceType = '';
  submitDisabled: boolean = false;

  constructor(
      public signUpService: SignUpService,
      private router: Router,
      private translateService: TranslateService,
      private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    if (this.signUpService.userDTO.accountType === undefined
        || this.signUpService.userDTO.accountType === null || this.signUpService.userDTO.accountType === '') {
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
    }

    const category = this.signUpService.getListServiceType()
        .pipe(first())
        .subscribe(data => {
              if (data.errorCode === '0') {
                if (data.data) {
                  this.listServiceType.next(data.data);
                }
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
    this.subscriptions.push(category);
  }

  eClickLabel(val) {
    this.serviceType = val;
  }

  nextStep() {
    if (this.serviceType === undefined
        || this.serviceType === null || this.serviceType === '') {
      const modalRefError = this.modalService.open(MessagePopupComponent, {
        size: 'sm',
        backdrop: 'static',
        keyboard: false,
        centered: true
      });
      modalRefError.componentInstance.type = 'fail';
      modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
      modalRefError.componentInstance.message = this.translateService.instant(`SIGN_UP.SERVICE_TYPE_NOT_NULL`);
      modalRefError.componentInstance.closeIcon = false;
    }else{
      this.signUpService.userDTO.categoryCode = this.serviceType;
      this.router.navigate(['auth/sign-up/step-private-information'], {});
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}
