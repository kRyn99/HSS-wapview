import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/shared/service/data.service';
import { Location } from '@angular/common';
import { OverlayService } from '@app/modules/commons/shared/service/overlay.service';
import { AppService } from '@app/modules/commons/shared/service/app.service';
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   title = 'my-app';
// }
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@env/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { settings } from '@app/setting';
import {COMMON_CONFIG} from '@app/shared/contants/common-constants';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  data: any;
  index: 0;
  constructor(
    private translate: TranslateService
  ) {
    let lang = localStorage.getItem(COMMON_CONFIG.KEY.LOCALIZATION);

    if (!lang) {
      lang = environment.defaultLang;
    }

    this.translate.use(lang);
    localStorage.setItem(COMMON_CONFIG.KEY.LOCALIZATION,lang);
  }

  ngOnInit() {
 
  }
}
