import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {catchError, map} from 'rxjs/operators';
import { ResponseModel } from '../model/response.model';
import { CONFIG } from './constants';

@Injectable({
  providedIn: 'root',
})
export class HTTPService {
  initHeader: {};
  checkError = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, 
    // private authService: AuthService,
              private toastrService: ToastrService) {
    const token = JSON.parse(localStorage.getItem(CONFIG.KEY.TOKEN));
    const language = localStorage.getItem(CONFIG.KEY.LOCALIZATION);
    this.initHeader = {
      Authorization: `Bearer ` + token,
      'Accept-Language': language,
      'Content-Type': 'application/json',
    };
  }

  // public methods
  post(url: string, data: {}, headers: {} , options?: {}): Observable<ResponseModel> {
    headers = {
      ...headers,
      ...this.initHeader
    };

    return this.http.post<ResponseModel>(url, data, { headers: new HttpHeaders(headers) }).pipe(
      map((response: any) => {
        // tslint:disable-next-line:triple-equals
        if (response.statusCode == 401) {
          this.toastrService.error('Phiên của bạn đã hết hạn, vui lòng đăng nhập lại');
          // this.authService.logout();
          window.location.href = 'auth/login';
        }
        return response;
      }),
      catchError(error => {
        // tslint:disable-next-line:triple-equals
        if (this.checkError.value == false || error.status != 200) {
          this.toastrService.error('Lỗi khi call API');
        }
        // tslint:disable-next-line:triple-equals
        if (error.status === 401){
          this.toastrService.error('Phiên của bạn đã hết hạn, vui lòng đăng nhập lại');
          // this.authService.logout();
          window.location.href = 'auth/login';
        }
        this.checkError.next(true);
        return of([]);
      })
    );
  }

  get(url: string, params: {}, headers: {}): Observable<ResponseModel> {
    headers = {
      ...headers,
      ...this.initHeader
    };

    return this.http.get<ResponseModel>(url, {
      headers: new HttpHeaders(headers),
      params
    });
  }

  getReport(url: string, params: {}, headers: {}): Observable<string> {
    headers = {
      ...headers,
      ...this.initHeader
    };

    return this.http.get<string>(url, {
      headers: new HttpHeaders(headers),
      params
    });
  }
}
