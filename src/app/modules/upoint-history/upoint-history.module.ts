import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UpointHistoryViewComponent} from './components/upoint-history-view/upoint-history-view.component';
import {UpointHistoryRoutingModule} from '@app/modules/upoint-history/upoint-history-routing.module';
import {UpointHistoryComponent} from '@app/modules/upoint-history/upoint-history.component';
import {CommonItemsModule} from '@app/modules/common-items/common-items.module';
import { TransactionDetailComponent } from './components/transaction-detail/transaction-detail.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '@app/app.module';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    UpointHistoryComponent,
    UpointHistoryViewComponent,
    TransactionDetailComponent,
  ],
  imports: [
    FormsModule,
    UpointHistoryRoutingModule,
    CommonModule,
    CommonItemsModule,
    BsDatepickerModule.forRoot(),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
})
export class UpointHistoryModule {
}
