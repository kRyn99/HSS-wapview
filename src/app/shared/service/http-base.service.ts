import { HttpParams } from '@angular/common/http';

export class HttpBaseService {

    buildParam(obj: any): any {
        let httpParams = new HttpParams();

        Object.keys(obj).forEach((key) => {
            httpParams = httpParams.append(key, obj[key]);
        });

        return httpParams;
    }

}
