import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { LOCATION_INITIALIZED } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { COMMON_CONFIG } from './shared/contants/common-constants';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

export function ApplicationInitializerFactory(
  translate: TranslateService, injector: Injector) {
  return async () => {
    await injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    let lang = localStorage.getItem(COMMON_CONFIG.KEY.LOCALIZATION);
    let deaultLang = environment.defaultLang;
    if(lang){
      deaultLang=lang;
    }
    translate.addLangs(['en','la','vi','zh']);
    translate.setDefaultLang(deaultLang);
    localStorage.setItem('lang',deaultLang);
    try {
      await translate.use(deaultLang).toPromise();
    } catch (err) {
    }
  };
}
