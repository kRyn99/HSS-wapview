import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '@env/environment';
import {AccountService} from '@app/modules/auth/service/account.service';
import {Router} from '@angular/router';
import {COMMON_CONFIG} from '../contants/common-constants';
import {finalize} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
      private accountService: AccountService,
      private router: Router,
      private spinner: NgxSpinnerService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    // add auth header with jwt if user is logged in and request is to the api url
    let lang = localStorage.getItem('lang');
    if (!lang) {
      lang = environment.defaultLang;
      localStorage.setItem(COMMON_CONFIG.KEY.LOCALIZATION, lang);
    }
    const userLocal = localStorage.getItem('user');
    const user = this.accountService.userValue;
    const isLoggedIn = user && user.data.token;
    const isApiUrl = request.url.startsWith(environment.API_HOST_NAME) || request.url.startsWith(environment.UID_SYSTEM.API_UID);
    const url = window.location.href.indexOf('/auth/') > 0 && window.location.href.indexOf('/auth/call-back/') < 0
        && window.location.href.indexOf('/auth/sign-in/auto-login-end-user') < 0 && window.location.href.indexOf('/auth/sign-in/auto-login-merchant') < 0 && window.location.href.indexOf('/auth/sign-in/auto-login-to-redirect') < 0;
    request = request.clone({
      setHeaders: {
        'Accept-language': lang
      }
    });
    if (userLocal && isLoggedIn && isApiUrl && !url) {
      const authenticatedRequest = request.clone({
        headers: request.headers.set(
            'Authorization',
            `Bearer ${user.data.token}`
        )
      });
      return next.handle(authenticatedRequest).pipe(
          finalize(() => {
            this.spinner.hide();
          })
      );
    }else{
      const apiUnitel = request.url.startsWith(environment.HOST_UNITEL);
      if (apiUnitel){
        const authenticatedUnitelRequest = request.clone({
          headers: request.headers.set(
              'Authorization',
              `Bearer ${environment.AUTHOR_UNITEL}`
          )
        });
        return next.handle(authenticatedUnitelRequest).pipe(
            finalize(() => {
              this.spinner.hide();
            })
        );
      }
    }
    return next.handle(request).pipe(
        finalize(() => {
          this.spinner.hide();
        })
    );
  }
}
