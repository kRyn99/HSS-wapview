import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UrlConstants } from '@app/shared/contants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class HttpLoginTestService {

  constructor(private http: HttpClient) { }

  login(name: any, password: any, storeId: any): Observable<any> {
    let body = JSON.stringify({
      "userName": name,
      "password": password,
      "storeId": storeId
    });
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });

    return this.http.post(UrlConstants.LOGIN_URL, body).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: Response | any) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    const body = res.json();
    return body.data || {};
  }

  private handleError(error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return throwError(errMsg);
  }
}
