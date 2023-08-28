import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputFieldComponent } from './components/input-field/input-field.component';
import { InputOtpComponent } from './components/input-otp/input-otp.component';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { TextareaFieldComponent } from './components/textarea-field/textarea-field.component';
import { TitleNavComponent } from './components/title-nav/title-nav.component';
import { DropdownFieldComponent } from './components/dropdown-field/dropdown-field.component';
import { SearchFieldComponent } from './components/search-field/search-field.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '@app/app.module';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QrCodeScannerComponent } from './components/qr-code-scanner/qr-code-scanner.component';
import { ViewImageComponent } from './components/view-image/view-image.component';

import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    InputFieldComponent,
    TextareaFieldComponent,
    TitleNavComponent,
    DropdownFieldComponent,
    InputOtpComponent,
    SearchFieldComponent,
    QrCodeScannerComponent,
    ViewImageComponent,
  ],
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    NgxMaskModule.forRoot({
      validation: true
    }),
    BsDatepickerModule.forRoot(),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxCurrencyModule
  ],
  exports: [
    InputFieldComponent,
    TextareaFieldComponent,
    TitleNavComponent,
    DropdownFieldComponent,
    InputOtpComponent,
    SearchFieldComponent,
    ViewImageComponent,
  ]
})
export class CommonsModule { }
