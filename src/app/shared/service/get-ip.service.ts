import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GET_IP_URL } from '../contants/common-constants';

@Injectable({
  providedIn: 'root'
})
export class GetIpService {

constructor(private http: HttpClient) { }
  getClientPublicIP(){
    return this.http.get<any>(GET_IP_URL);
  }
}
