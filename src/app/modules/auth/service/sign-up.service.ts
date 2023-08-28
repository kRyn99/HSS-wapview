import {Injectable, OnDestroy} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Subscription, BehaviorSubject, Observable} from 'rxjs';
import {User, UserDTO} from '@app/modules/auth/_models';
import {environment} from '@env/environment';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AccountType, ListAccountType} from '@app/modules/auth/_models/AccountType';
import {Address} from '../_models/Address';
import {GuideLineComponent} from '@app/modules/auth/features/sign-up/components/guide-line/guide-line.component';

@Injectable({
  providedIn: 'root',
})
export class SignUpService implements OnDestroy {
  subscriptions: Subscription[] = [];

  // cac bien can reset
  guideLine: string;
  avatarStr: string;
  userDTO = new UserDTO();

  constructor(
      // private httpService: HTTPService,
      public translateService: TranslateService,
      private router: Router,
      private http: HttpClient
  ) {
  }

  getTermAndConditions() {
    return this.http.get<any>(`${environment.API_HOST_NAME}/api/v1/signUp/getTermAndConditions`)
  }

  getGuideline() {
    return this.http.get<any>(`${environment.API_HOST_NAME}/api/v1/signUp/` + this.guideLine)
  }

  getListAccountType() {
    return this.http.get<AccountType>(`${environment.API_HOST_NAME}/api/v1/signUp/getListAccountType`)
  }

  getListServiceType() {
    return this.http.get<AccountType>(`${environment.API_HOST_NAME}/api/v1/signUp/getListServiceType`)
  }

  getListProvince() {
    return this.http.get<Address>(`${environment.API_HOST_NAME}/api/v1/signUp/getListProvince`)
  }

  getListDistrict(provinceId) {
    return this.http.get<Address>(`${environment.API_HOST_NAME}/api/v1/signUp/getListDistrict?provinceId=${provinceId}`)
  }

  checkDuplicateAccount(userDTO) {
    return this.http.post<any>(`${environment.API_HOST_NAME}/api/v1/signUp/checkDuplicateAccount`, userDTO)
  }

  sendOTP(username, actionType, actionIsdn) {
    const mt = {
      msisdn: username,
      actionType,
      actionIsdn
    }
    return this.http.post<any>(`${environment.API_HOST_NAME}/api/v1/signUp/sendOTP`, {mt})
  }

  validateOTP(userName, otp, actionType, actionIsdn) {
    return this.http.post<any>(`${environment.API_HOST_NAME}/api/v1/signUp/validateOTP`, {userName, otp, actionType, actionIsdn})
  }

  saveSignInfo() {
    return this.http.post<User>(`${environment.API_HOST_NAME}/api/v1/signUp/saveSignInfo`, {
      userDTO: this.userDTO
    })
  }

  getConfigTimeOtp() {
    return this.http.get<any>(`${environment.API_HOST_NAME}/api/v1/signUp/getConfigTimeOtp`);
  }

  redirectFunctionUpoint(commonInputUpointDTO) {
    return this.http.post<any>(`${environment.API_HOST_NAME}/api/v1/redirect/redirectFunctionUpoint`, commonInputUpointDTO)
  }

  uploadListFileImage(formData: FormData, functionName, type) {
    const url = `${environment.API_HOST_NAME}/api/v1/redirect/redirect-function-upoint-list-file?functionName=`
        + functionName + '&type=' + type;
    return this.http.post<any>(url, formData, {
      reportProgress: true
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
