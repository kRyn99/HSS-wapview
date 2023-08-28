import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CallbackService {


  constructor(private http: HttpClient) {
  }

  verifier(code) {
    return this.http.post<any>(`${environment.UID_SYSTEM.API_UID}/users/verifier`, {
      code: code,
      secretKey: environment.UID_SYSTEM.SECRET_KEY
    });
  }

  getUser() {
    return this.http.get<any>(`${environment.UID_SYSTEM.API_UID}/users`);
  }

  getUpointCust(custIsdn) {
    return this.http.get<any>(`${environment.API_HOST_NAME}/api/v1/upointMerchant/get-upoint-cust?custIsdn=${custIsdn}`);
  }

  directLoginUniId() {
    window.location.href = `${environment.UID_SYSTEM.API_UID}/credentials/sign-in/oauth/consent?clientId=${environment.UID_SYSTEM.CLIENT_ID_UID}&redirectUri=${environment.UID_SYSTEM.LINK_CALL_BACK_UID}&isFromWeb=true`;
  }
}
