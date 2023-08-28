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

import {CommonItemsModule} from '@app/modules/common-items/common-items.module';
import {IntegrateRoutingModule} from '@app/modules/auth/features/integrate/integrate-routing.module';
import {IntegrateComponent} from '@app/modules/auth/features/integrate/integrate.component';
import {IntegrateTopupComponent} from '@app/modules/auth/features/integrate/components/integrate-topup/integrate-topup.component';

@NgModule({
    declarations: [
        IntegrateComponent,
        IntegrateTopupComponent
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
        IntegrateRoutingModule,
        CommonItemsModule
    ]
})
export class IntegrateModule { }
