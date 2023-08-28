import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@env/environment';

export class LangService {
    constructor(
        translate: TranslateService,
        private route: ActivatedRoute
    ) {
        this.route.queryParams.subscribe(params => {
            if (params.lang === undefined) {
                translate.setDefaultLang(environment.defaultLang);
                translate.use(environment.defaultLang);
            } else {
                translate.setDefaultLang(params.lang);
                translate.use(params.lang);
            }
        }
        );
    }
}
