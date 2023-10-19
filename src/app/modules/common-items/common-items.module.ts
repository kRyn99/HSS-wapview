import { VoucherCardComponent } from './components/voucher-card/voucher-card.component';
import { BrandCardComponent } from './components/brand-card/brand-card.component';
import {MessagePopupComponent} from './components/message-popup/message-popup.component';
import {TransactionCardComponent} from './components/transaction-card/transaction-card.component';
import {InputDatepickerComponent} from './components/input-datepicker/input-datepicker.component';
import {UserCardComponent} from './components/user-card/user-card.component';
import {TextareaFieldComponent} from './components/textarea-field/textarea-field.component';
import {DropdownFieldComponent} from './components/dropdown-field/dropdown-field.component';
import {TitleNavComponent} from './components/title-nav/title-nav.component';
import {InputPasswordComponent} from './components/input-password/input-password.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InputFieldComponent} from './components/input-field/input-field.component';
import {InputOtpComponent} from './components/input-otp/input-otp.component';
import {FormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {NgxCurrencyModule} from 'ngx-currency';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '@app/app.module';
import {HttpClient} from '@angular/common/http';
import {NgbDateParserFormatter, NgbModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {FooterNavComponent} from './components/footer-nav/footer-nav.component';
import {NgbDateCustomParserFormatter} from '@app/shared/utils/ngb-date-custom-parser-formatter';
import {OtpPopupComponent} from './components/otp-popup/otp-popup.component';
import {DatepickerRangeComponent} from '@app/modules/common-items/components/datepicker-range/datepicker-range.component';
import {DataPickerComponent} from '@app/modules/common-items/components/calenda-box/data-picker/data-picker.component';
import {InputFieldCalendaComponent} from '@app/modules/common-items/components/calenda-box/input-field-calenda/input-field-calenda.component';
import {PickerPopupComponent} from '@app/modules/common-items/components/calenda-box/picker-popup/picker-popup.component';
import {SearchFieldComponent} from './components/search-field/search-field.component';
import {LanguageSelectorComponent} from './components/language-selector/language-selector.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
// Import your AvatarModule
import {AvatarModule} from 'ngx-avatar';
import {TruncatePipe} from '@app/shared/utils/truncatePipe';
import {CalculatorBoxComponent} from './components/calculator-box/calculator-box.component';
import { ScreenLoadingComponent } from './components/screen-loading/screen-loading.component';
import {HeaderHomeComponent} from '@app/modules/common-items/components/header-home/header-home.component';
import { MerchantVoucherCardComponent } from './components/merchant-voucher-card/merchant-voucher-card.component';
import {PickMapComponent} from '@app/modules/common-items/components/pick-map/pick-map.component';
import {AgmCoreModule} from '@agm/core';
import {BannerComponent} from '@app/modules/common-items/components/banner/banner.component';
import {DealRenewalComponent} from '@app/modules/common-items/components/deal-renewal/deal-renewal.component';
import {ArticleCardComponent} from '@app/modules/common-items/components/article-card/article-card.component';
import {BroadcastCardComponent} from '@app/modules/common-items/components/broadcast-card/broadcast-card.component';
import { FooterNavNoFixComponent } from './components/footer-nav-no-fix/footer-nav-no-fix.component';
import {ConfirmPaymentPopupComponent} from '@app/modules/common-items/components/confirm-payment-popup/confirm-payment-popup.component';
import {ConfirmModalComponent} from '@app/modules/common-items/components/confirm-modal/confirm-modal.component';
import {NavMenuComponent} from '@app/modules/common-items/components/nav-menu/nav-menu.component';
import { RecentIdeaComponent } from './components/recent-idea/recent-idea.component';
import { RecentContrivanceComponent } from './components/recent-contrivance/recent-contrivance.component';
import { StatusColorComponent } from './components/status-color/status-color.component';
import {SwiperModule} from "swiper/angular";
import { SharedDisplayHtmlModule } from '@app/shared/shared-display-html/shared-display-html.module';
import { TitleNavIdeaComponent } from './components/title-nav-idea/title-nav-idea.component';

// @ts-ignore
// @ts-ignore
@NgModule({
  declarations: [
    TruncatePipe,
    InputFieldComponent,
    InputOtpComponent,
    InputPasswordComponent,
    TitleNavComponent,
    TitleNavIdeaComponent,
    FooterNavComponent,
    FooterNavNoFixComponent,
    DropdownFieldComponent,
    TextareaFieldComponent,
    UserCardComponent,
    InputDatepickerComponent,
    TransactionCardComponent,
    OtpPopupComponent,
    MessagePopupComponent,
    ConfirmPaymentPopupComponent,
    DatepickerRangeComponent,
    DataPickerComponent,
    InputFieldCalendaComponent,
    PickerPopupComponent,
    SearchFieldComponent,
    LanguageSelectorComponent,
    CalculatorBoxComponent,
    ScreenLoadingComponent,
    HeaderHomeComponent,
    BrandCardComponent,
    VoucherCardComponent,
    MerchantVoucherCardComponent,
    PickMapComponent,
    BannerComponent,
    DealRenewalComponent,
    ArticleCardComponent,
    BroadcastCardComponent,
    ConfirmModalComponent,
    NavMenuComponent,
    RecentIdeaComponent,
    RecentContrivanceComponent,
    StatusColorComponent,
    TitleNavIdeaComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    NgxMaskModule.forRoot({
      validation: true
    }),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxCurrencyModule,
    NgbModalModule,
    BsDatepickerModule.forRoot(),
    // Specify AvatarModule as an import
    AvatarModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAjzb199fG8eP1kqSnK2caE51IThbXU6tc'
    }),
    SwiperModule,
    SharedDisplayHtmlModule
  ],
  exports: [
    TruncatePipe,
    InputFieldComponent,
    InputOtpComponent,
    InputPasswordComponent,
    TitleNavComponent,
    TitleNavIdeaComponent,
    FooterNavComponent,
    FooterNavNoFixComponent,
    DropdownFieldComponent,
    TextareaFieldComponent,
    UserCardComponent,
    InputDatepickerComponent,
    TransactionCardComponent,
    OtpPopupComponent,
    MessagePopupComponent,
    DatepickerRangeComponent,
    DataPickerComponent,
    InputFieldCalendaComponent,
    PickerPopupComponent,
    SearchFieldComponent,
    LanguageSelectorComponent,
    CalculatorBoxComponent,
    ScreenLoadingComponent,
    HeaderHomeComponent,
    BrandCardComponent,
    VoucherCardComponent,
    MerchantVoucherCardComponent,
    PickMapComponent,
    BannerComponent,
    ArticleCardComponent, BroadcastCardComponent,
    ConfirmPaymentPopupComponent,
    NavMenuComponent, RecentIdeaComponent, RecentContrivanceComponent,StatusColorComponent
  ],
  bootstrap: [],
  providers: [
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
  ]
})
export class CommonItemsModule {
}
