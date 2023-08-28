import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../_models/user';
import {environment} from '@env/environment';
import {GET_IP_URL} from '@app/shared/contants/common-constants';


@Injectable({providedIn: 'root'})
export class AccountService {
  public userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  ip = '';

  constructor(
      private router: Router,
      private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
    // this.http.get<any>(GET_IP_URL).subscribe(value => this.ip = value ? value : '');
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username, password, otp, directApi, custIsdn) {
    let actionType;
    if (directApi === 'loginWithOTP') {
      actionType = 2;
    }
    return this.http.post<User>(`${environment.API_HOST_NAME}/api/v1/auth/` + directApi, {
      userName: username,
      password,
      otp,
      actionType,
      actionIsdn: username,
      custIsdn
    })
        .pipe(map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          if (user && user.errorCode === '0') {
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
          }
          return user;
        }));
  }

  checkLoginUserNameInfor(username, actionType, actionIsdn) {
    return this.http.post<any>(`${environment.API_HOST_NAME}/api/v1/forgotPassword/checkLoginUserNameInfor`, {
      userName: username,
      actionType,
      actionIsdn
    });
  }

  logout() {
    // remove user from local storage and set current user to null
    if ((this.userSubject.value && this.userSubject.value.data && this.userSubject.value.data.role && this.userSubject.value.data.role === 'END_USER')
        || (JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).data
            && JSON.parse(localStorage.getItem('user')).data.role && JSON.parse(localStorage.getItem('user')).data.role === 'END_USER')) {
      localStorage.removeItem('user');
      this.userSubject.next(null);
      this.router.navigate(['/auth/sign-in/end-user']);
    } else {
      localStorage.removeItem('user');
      this.userSubject.next(null);
      this.router.navigate(['/']);
    }
  }

  // clear cookie
  clearCookie() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  getMsisdnFromLaoApp(loginFromLaoAppDTO) {
    return this.http.post<any>(`${environment.API_HOST_NAME}/api/v1/auth/getMsisdnFromLaoApp`, loginFromLaoAppDTO);
  }

  autoLoginForMerchant(loginFromLaoAppDTO) {
    return this.http.post<any>(`${environment.API_HOST_NAME}/api/v1/auth/autoLoginForMerchant`, loginFromLaoAppDTO);
  }

  autoLoginLog() {
    return this.http.post<any>(`${environment.API_HOST_NAME}/api/v1/auth/autoLoginLog`, {});
  }

  checkMerchantByIsdn(loginFromLaoAppDTO) {
    return this.http.post<any>(`${environment.API_HOST_NAME}/api/v1/auth/checkMerchantByIsdn`, loginFromLaoAppDTO);
  }

  redirectFunctionUpoint(commonInputUpointDTO) {
    return this.http.post<any>(`${environment.API_HOST_NAME}/api/v1/redirect/redirectFunctionUpoint`, commonInputUpointDTO)
  }

}
