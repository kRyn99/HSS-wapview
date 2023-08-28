import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SignUpService} from '@app/modules/auth/service/sign-up.service';
import {first} from 'rxjs/operators';
import {MessagePopupComponent} from '@app/modules/common-items/components/message-popup/message-popup.component';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
  selector: 'app-step-account-type',
  templateUrl: './step-account-type.component.html',
  styleUrls: ['../../sign-up.component.scss']
})
export class StepAccountTypeComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public listAccountTypeGrid = new BehaviorSubject<any>([]);

  constructor(
      public signUpService: SignUpService,
      private router: Router,
      private translateService: TranslateService,
      private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.setDataDefault();
    const acctype = this.signUpService.getListAccountType()
        .pipe(first())
        .subscribe(data => {
              if (data.errorCode === '0') {
                const res = data.data;
                if (res) {
                  const listAccountType = [];
                  for (let i = 0; i < res.length; i += 2) {
                    const grid = [];
                    grid.push(res[i]);
                    if (i + 1 < res.length) {
                      grid.push(res[i + 1]);
                    }
                    listAccountType.push(grid);
                  }
                  this.listAccountTypeGrid.next(listAccountType);
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
    this.subscriptions.push(acctype);
  }

  setDataDefault() {
    this.signUpService.userDTO = {};
    this.signUpService.guideLine = null;
    this.signUpService.avatarStr = null;
  }

  nextStep(val) {
    this.signUpService.userDTO.accountType = val;
    this.router.navigate(['auth/sign-up/step-category'], {});
  }

  contact() {

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}
