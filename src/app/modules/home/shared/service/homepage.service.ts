import {HttpClient} from '@angular/common/http';
import {Injectable, Input} from '@angular/core';
import {environment} from '@env/environment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HomepageService{
    accountInfo:any = {};
    tokenAutoLogin = new BehaviorSubject<any>([])
    isIdeaChecked= new BehaviorSubject<boolean>(false);
    isContrivanceChecked= new BehaviorSubject<boolean>(false);
    isHomeChecked= new BehaviorSubject<boolean>(true);

    constructor(private http:HttpClient) {
    }
    redirectList(token){
        return this.http.post<any>(`${environment.API_HOST_NAME}/api/auto-login-hss`,token)
    }
    getInfoHomepage(){
        return this.http.get<any>(`${environment.API_HOST_NAME}/api/get-home-page-ideas`, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('tokenInLocalStorage'))}` } })
    }
}
