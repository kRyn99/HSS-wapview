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

import { EndUserComponent } from './end-user.component';
import { EndUserRoutingModule } from './end-user-routing.module';
import { EndUserConfirmComponent } from './components/end-user-confirm/end-user-confirm.component';

@NgModule({
    declarations: [
        EndUserComponent,
        EndUserConfirmComponent
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
        EndUserRoutingModule
    ]
})
export class EndUserModule { }
