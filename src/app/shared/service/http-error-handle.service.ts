import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { UrlConstants } from '@app/shared/contants/url.constants';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
export type HandleError =
  <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;
@Injectable(
  {
    providedIn: 'root'
  }
)
export class HttpErrorHandleService {
  constructor(
    private messageService: MessageService,
    private router: Router,
    private translateService: TranslateService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) { }

  /** Create curried handleError function that already knows the service name */

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param serviceName = name of the data service that attempted the operation
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
}

