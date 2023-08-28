import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from '@app/modules/auth/service/account.service';
import {CallbackService} from '@app/modules/auth/service/call-back.service';
import {User} from '@app/modules/auth/_models';
import {MessagePopupComponent} from '@app/modules/common-items/components/message-popup/message-popup.component';
import {environment} from '@env/environment';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {first} from 'rxjs/operators';
import {ActivatedRoute} from 'testing';
import {GetIpService} from '@app/shared/service/get-ip.service';

@Component({
  selector: 'app-call-back-endpoint',
  templateUrl: './call-back-endpoint.component.html',
  styleUrls: ['./call-back-endpoint.component.scss']
})
export class CallBackEndpointComponent implements OnInit {
  constructor(private callBackService: CallbackService,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private translateService: TranslateService,
              private router: Router,
              private accountService: AccountService
  ) {
  }

  ngOnInit() {
    this.route.queryParams
        .subscribe(params => {
              const code = params.code;
              if (code) {
                this.callBackService.verifier(code).subscribe(res => {
                      if (res && res.status == 100) {
                        const userUid = {
                          data: {
                            token: res.data.accessToken
                          }
                        }
                        localStorage.setItem('user', JSON.stringify(userUid));
                        this.accountService.userSubject.next(userUid);
                        this.callBackService.getUser().subscribe(resUser => {
                              if (resUser && resUser.status == 100) {
                                this.signIn(resUser.data);
                              } else {
                                const modalRefError = this.modalService.open(MessagePopupComponent, {
                                  size: 'sm',
                                  backdrop: 'static',
                                  keyboard: false,
                                  centered: true
                                });
                                modalRefError.componentInstance.type = 'fail';
                                modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
                                modalRefError.componentInstance.message = this.translateService.instant(`UID.SYSTEM_ERROR`);
                                modalRefError.componentInstance.closeIcon = false;
                                // Nếu là popup success/lỗi thì dùng
                                modalRefError.result.then(() => {
                                  this.router.navigate(['/']);
                                  // Xử lý khi close modal
                                }, () => {
                                  // Xử lý khi dismiss modal
                                });
                              }
                            },
                            (error) => {
                              const modalRefError = this.modalService.open(MessagePopupComponent, {
                                size: 'sm',
                                backdrop: 'static',
                                keyboard: false,
                                centered: true
                              });
                              modalRefError.componentInstance.type = 'fail';
                              modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
                              modalRefError.componentInstance.message = this.translateService.instant(`UID.SYSTEM_ERROR`);
                              modalRefError.componentInstance.closeIcon = false;
                              // Nếu là popup success/lỗi thì dùng
                              modalRefError.result.then(() => {
                                this.router.navigate(['/']);
                                // Xử lý khi close modal
                              }, () => {
                                // Xử lý khi dismiss modal
                              });
                            });
                      } else {
                        const modalRefError = this.modalService.open(MessagePopupComponent, {
                          size: 'sm',
                          backdrop: 'static',
                          keyboard: false,
                          centered: true
                        });
                        modalRefError.componentInstance.type = 'fail';
                        modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
                        modalRefError.componentInstance.message = this.translateService.instant(`UID.SYSTEM_ERROR`);
                        modalRefError.componentInstance.closeIcon = false;
                        // Nếu là popup success/lỗi thì dùng
                        modalRefError.result.then(() => {
                          this.router.navigate(['/']);
                          // Xử lý khi close modal
                        }, () => {
                          // Xử lý khi dismiss modal
                        });
                      }
                    },
                    (error) => {
                      const modalRefError = this.modalService.open(MessagePopupComponent, {
                        size: 'sm',
                        backdrop: 'static',
                        keyboard: false,
                        centered: true
                      });
                      modalRefError.componentInstance.type = 'fail';
                      modalRefError.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
                      modalRefError.componentInstance.message = this.translateService.instant(`UID.SYSTEM_ERROR`);
                      modalRefError.componentInstance.closeIcon = false;
                      // Nếu là popup success/lỗi thì dùng
                      modalRefError.result.then(() => {
                        this.router.navigate(['/']);
                        // Xử lý khi close modal
                      }, () => {
                        // Xử lý khi dismiss modal
                      });
                    });
              } else {
                this.router.navigate(['/']);
              }
            }
        );
  }

  signIn(user) {
    localStorage.removeItem('user');
    this.accountService.userSubject.next(null);
    this.accountService.login(
        environment.UID_SYSTEM.USER_NAME_DEFAULT,
        environment.UID_SYSTEM.KEY_PASS_DEFAULT,
        null, 'loginWithPassword', user.phone)
        .pipe(first())
        .subscribe(
            data => {
              if (data.errorCode === '0') {
                const userFake = this.accountService.userValue;
                if (userFake) {
                  // set lai info cho user
                  userFake.data.fullName = user.name;
                  userFake.data.userName = user.phone;
                  userFake.data.avatarStr = user.avatar;
                  localStorage.setItem('user', JSON.stringify(userFake));
                  this.accountService.userSubject.next(userFake);
                  localStorage.removeItem('hideIcon');
                  localStorage.removeItem('backApp');
                  this.router.navigate(['/home']);
                } else {
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
                  modalRefError.result.then(() => {
                    this.router.navigate(['/']);
                  }, () => {
                  });
                }
              } else {
                // show error
                const modalRef = this.modalService.open(MessagePopupComponent, {
                  size: 'sm',
                  backdrop: 'static',
                  keyboard: false,
                  centered: true
                });
                modalRef.componentInstance.type = 'fail';
                modalRef.componentInstance.title = this.translateService.instant(`COMMON.ERROR`);
                modalRef.componentInstance.message = data.description;
                modalRef.componentInstance.closeIcon = false;
                modalRef.result.then(() => {
                  this.router.navigate(['/']);
                }, () => {
                });
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
              modalRefError.result.then(() => {
                this.router.navigate(['/']);
              }, () => {
              });
            }
        );
  }
}
