import { Component, OnInit } from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {environment} from '@env/environment';
import {TranslateService} from '@ngx-translate/core';
import {filter} from 'rxjs/operators';
import {COMMON_CONFIG} from '@app/shared/contants/common-constants';

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  language: LanguageFlag;
  languages: LanguageFlag[] = [
    {
      lang: 'vi',
      name: 'Vietnamese',
      flag: './assets/img/lang/vietnam.png',
    },
    {
      lang: 'en',
      name: 'English',
      flag: './assets/img/lang/united-kingdom.png',
    },
    {
      lang: 'la',
      name: 'Laos',
      flag: './assets/img/lang/laos.png',
    },
    {
      lang: 'zh',
      name: 'Chinese',
      flag: './assets/img/lang/china.png',
    }
  ];

  constructor(
      private translateService: TranslateService,
      private router: Router
  ) {
    let lang = localStorage.getItem(COMMON_CONFIG.KEY.LOCALIZATION);

    if (!lang) {
      lang = environment.defaultLang;
    }

    this.translateService.use(lang);
  }

  ngOnInit() {
    // this.setSelectedLanguage();
    // this.router.events
    //     .pipe(filter((event) => event instanceof NavigationStart))
    //     .subscribe((event) => {
    //       this.setSelectedLanguage();
    //     });
  }

  setLanguageWithRefresh(lang) {
    this.setLanguage(lang);
    // window.location.reload();
  }

  setLanguage(lang) {
    this.languages.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
    this.translateService.use(lang);
    this.translateService.setDefaultLang(lang);
    localStorage.setItem(COMMON_CONFIG.KEY.LOCALIZATION,lang);
  }

  // setSelectedLanguage(): any {
  //   this.setLanguage(this.translateService.getDefaultLang());
  // }

}
