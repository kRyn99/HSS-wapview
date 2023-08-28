import { CreateNewPasswordComponent } from './components/create-new-password/create-new-password.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '@app/shared/directive/directives.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '@app/app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { AppBreadcrumbModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { ForgotPasswordComponent } from './forgot-password.component';
import { HeaderComponent } from './shared/container/header/header.component';
import { FooterComponent } from './shared/container/footer/footer.component';
import { NavComponent } from './shared/container/nav/nav.component';
// import { NgxMaskModule } from 'ngx-mask';
// import { NgxCurrencyModule } from 'ngx-currency';
import { CommonItemsModule } from '../../../common-items/common-items.module';

@NgModule({
    declarations: [
        ForgotPasswordComponent,
        CreateNewPasswordComponent,
        HeaderComponent,
        FooterComponent,
        NavComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        DirectivesModule,
        BsDatepickerModule.forRoot(),
        TooltipModule.forRoot(),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        // AppBreadcrumbModule.forRoot(),
        HttpClientModule,
        ForgotPasswordRoutingModule,
        CommonItemsModule
    ]
})
export class ForgotPasswordModule { }
