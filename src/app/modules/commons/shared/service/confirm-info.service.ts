import { Injectable } from '@angular/core';
import { UrlConstants } from '@app/shared/contants/url.constants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandleService, HandleError } from '@app/shared/service/http-error-handle.service';
import { Observable, of } from 'rxjs';
import { ConfirmInfoDto } from '../../shared/model/confirm-info/confirm-info.dto';

@Injectable({
    providedIn: 'root'
})
export class ConfirmInfoService {

    private handleError: HandleError;

    constructor(
        private http: HttpClient,
        httpErrorService: HttpErrorHandleService
    ) {
        // this.handleError = httpErrorService.createHandleError('ConfirmInfoService');
    }

    getAll(): Observable<ConfirmInfoDto> {
        return this.http
            .get<ConfirmInfoDto>(UrlConstants.BASE_URL, {}).pipe(
                catchError(this.handleError<ConfirmInfoDto>('getAll'))
            );
    }
    getById(Id: number): Observable<ConfirmInfoDto> {
        let params = new HttpParams();
        params = params.append('Id', Id.toString());
        return this.http
            .get<ConfirmInfoDto>(UrlConstants.BASE_URL, { params }).pipe(
                catchError(this.handleError<ConfirmInfoDto>('getById'))
            );
    }

    post(request) {
        return this.http.post(UrlConstants.BASE_URL, request).pipe(
            catchError(this.handleError('post'))
        );
    }
}
