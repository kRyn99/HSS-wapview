import { SignInWithOtpComponent } from './components/sign-in-with-otp/sign-in-with-otp.component';
import { SignInWithPasswordComponent } from './components/sign-in-with-password/sign-in-with-password.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '@app/shared/directive/directives.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '@app/app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { AppBreadcrumbModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInRoutingModule } from './sign-in-routing.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { SignInComponent } from './sign-in.component';
import { HeaderComponent } from './shared/container/header/header.component';
import { FooterComponent } from './shared/container/footer/footer.component';
import { NavComponent } from './shared/container/nav/nav.component';
import {CommonItemsModule} from '@app/modules/common-items/common-items.module';
import { SignInEndUserComponent } from './components/sign-in-end-user/sign-in-end-user.component';
import { AutoLoginEndUserComponent } from './components/auto-login-end-user/auto-login-end-user.component';
import { AutoLoginMerchantComponent } from './components/auto-login-merchant/auto-login-merchant.component';
import { AutoLoginToRedirectComponent } from './components/auto-login-to-redirect/auto-login-to-redirect.component';

@NgModule({
    declarations: [
        SignInComponent,
        SignInWithPasswordComponent,
        SignInWithOtpComponent,
        HeaderComponent,
        FooterComponent,
        NavComponent,
        SignInEndUserComponent,
        AutoLoginEndUserComponent,
        AutoLoginMerchantComponent,
        AutoLoginToRedirectComponent,
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
        SignInRoutingModule,
        CommonItemsModule
    ]
})
export class SignInModule { }
