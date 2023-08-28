import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  checkType = false;
  otp: string;
  isdn : string;
  actionIsdn : string;
  actionType : number;
  constructor(
      private router: Router,
      private http: HttpClient
  ) {
  }

  sendOTP() {
    const mt = {
      msisdn: this.isdn,
      actionType: this.actionType,
      actionIsdn: this.actionIsdn
    }
    return this.http.post<any>(`${environment.API_HOST_NAME}/api/v1/signUp/sendOTP`, {mt});
  }

  updateUserInformation(userDTO) {
    return this.http.post<any>(`${environment.API_HOST_NAME}/api/v1/forgotPassword/updateUserInformation`, {userDTO});
  }

}
