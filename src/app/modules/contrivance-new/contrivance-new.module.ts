import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContrivanceNewRoutingModule } from './contrivance-new-routing.module';
import {CommonItemsModule} from '@app/modules/common-items/common-items.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '@app/app.module';
import {HttpClient} from '@angular/common/http';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AvatarModule} from 'ngx-avatar';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ContrivanceComponent} from '@app/modules/contrivance/contrivance.component';
import {
    ContrivanceListComponent
} from '@app/modules/contrivance/components/contrivance-list/contrivance-list.component';
import {
    ContrivanceDetailComponent
} from '@app/modules/contrivance/components/contrivance-detail/contrivance-detail.component';
import {
    ContrivanceEditComponent
} from '@app/modules/contrivance/components/contrivance-edit/contrivance-edit.component';
import {
    ContrivanceRegisterComponent
} from '@app/modules/contrivance/components/contrivance-register/contrivance-register.component';
import {ContrivanceRoutingModule} from '@app/modules/contrivance/contrivance-routing.module';
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { ChangeColorDirective } from '../../shared/directive/change-color.directive';
import { DirectivesModule } from '@app/shared/directive/directives.module';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CRUDTableModule } from '@app/shared/crud-table';
import { DatePipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
// import { ContrivanceListComponent } from './component/contrivance-list/contrivance-list.component';
import { ContrivanceListNewComponent } from './component/contrivance-list-new/contrivance-list-new.component';


@NgModule({
  declarations: [
   
    ContrivanceListNewComponent
  ],
  imports: [
    NgSelectModule,
    CommonModule,
    CommonItemsModule,
    ContrivanceNewRoutingModule,
    TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    CollapseModule,
    ReactiveFormsModule,
    FormsModule,
    AvatarModule,
    BsDatepickerModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    CRUDTableModule,
    DirectivesModule,
    NgbModalModule,
    NgbModule
  ],
  providers: [
      DatePipe, // Thêm DatePipe vào danh sách providers
      // ...
    ],
})
export class ContrivanceNewModule { }
