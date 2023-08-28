import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class UpointHistoryService {

  constructor(
      public translateService: TranslateService,
      private router: Router,
      private http: HttpClient
  ) {
  }

  getListUpointTrans(fromDate,toDate,limit,offset,typeTrans, directApi) {
    return this.http.post<any>(`${environment.API_HOST_NAME}/api/v1/history/` + directApi,{fromDate,toDate,typeTrans,limit,offset})
  }

  getListUpointTransDetail(upointTransId) {
    return this.http.get<any>(`${environment.API_HOST_NAME}/api/v1/history/getListUpointTransDetail?upointTransId=${upointTransId}`)
  }
}
