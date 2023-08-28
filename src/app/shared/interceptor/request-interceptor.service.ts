import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor {

  private requests: HttpRequest<any>[] = [];
  constructor(private loaderService: LoaderService) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url !== './assets/i18n/vi.json') {
      request = request.clone({
        withCredentials: true,
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }
    this.requests.push(request);
    this.loaderService.isLoading.next(true);

    return Observable.create(observer => {
      const subscription = next.handle(request)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(request);
              observer.next(event);
            }
          },
          err => {
            // alert('error returned');
            this.removeRequest(request);
            observer.error(err);
          },
          () => {
            this.removeRequest(request);
            observer.complete();
          });
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(request);
        subscription.unsubscribe();
      };
    });
    // request = request.clone({
    //   withCredentials: true,
    // });
    // return next.handle(request);
    // .pipe(
    //   catchError(err => this.handleAuthError(err))
    // );
  }
}
