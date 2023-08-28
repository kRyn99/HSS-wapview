import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AccountService } from "@app/modules/auth/service/account.service";
import { MessagePopupComponent } from "@app/modules/common-items/components/message-popup/message-popup.component";
import { TranslateService } from "@ngx-translate/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { routes } from "@app/app-routing.module";
import { Router } from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private accountService: AccountService,
    private translateService: TranslateService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err && err.status) {
          if (err.status === 401) {
            // show error
            const modalRefError = this.modalService.open(
              MessagePopupComponent,
              {
                size: "sm",
                backdrop: "static",
                keyboard: false,
                centered: true,
              }
            );
            localStorage.removeItem("tokenInLocalStorage");
            modalRefError.componentInstance.type = "fail";
            modalRefError.componentInstance.title =
              this.translateService.instant(`COMMON.ERROR`);
            modalRefError.componentInstance.message =
              this.translateService.instant(
                `COMMON.LOCK_OR_DELETE_ACCOUNT_OR_END_SESSION`
              );
            modalRefError.componentInstance.closeIcon = false;
            modalRefError.result.then(
              () => {
                this.router.navigate(["/home/homepage"]);
                // this.accountService.logout();
              },
              () => {}
            );
            // auto logout if 401 response returned from api
          }
          const error = err.error.message || err.statusText;
          return throwError(error);
        } else {
          return throwError("first request");
        }
      })
    );
  }
}
