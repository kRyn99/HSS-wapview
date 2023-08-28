import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '@app/shared/directive/directives.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '@app/app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { AppBreadcrumbModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { CallBackComponent } from './call-back.component';
import { CallBackRoutingModule } from './call-back-routing.module';
import {CallBackEndpointComponent} from './components/sign-in-with-password/call-back-endpoint.component';

@NgModule({
    declarations: [
        CallBackComponent,
        CallBackEndpointComponent
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
        CallBackRoutingModule
    ]
})
export class CallBackModule { }
