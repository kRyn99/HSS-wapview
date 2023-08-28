import { HandleError, HttpErrorHandleService } from '@app/shared/service/http-error-handle.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlConstants } from '@app/shared/contants/url.constants';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DefaultHeaderService {

    private handleError: HandleError;

    constructor(
        private http: HttpClient,
        httpErrorService: HttpErrorHandleService
    ) {
        // this.handleError = httpErrorService.createHandleError('DefaultHeader');
    }

    logout(): Observable<any> {
        return this.http.get(UrlConstants.LOGOUT_URL).pipe(
            catchError(this.handleError('logout'))
        );
    }
}
