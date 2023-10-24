import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
import { CheckDuplicateComponent } from './components/check-duplicate/check-duplicate.component';
import { CRUDTableModule } from '@app/shared/crud-table';
import { DatePipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { IdeaModule } from '../idea/idea.module';
import { AuthorModule } from '../author/author.module';
import { EditOutsideEditComponent } from '../author/components/edit-outside-edit/edit-outside-edit.component';
import { AddOutsideEditComponent } from '../author/components/add-outside-edit/add-outside-edit.component';
import { AddInsideEditComponent } from '../author/components/add-inside-edit/add-inside-edit.component';
import { EditInsideEditComponent } from '../author/components/edit-inside-edit/edit-inside-edit.component';
import { EditOutsideAuthorComponent } from '../author/components/edit-outside-author/edit-outside-author.component';
import { AddOutsideAuthorComponent } from '../author/components/add-outside-author/add-outside-author.component';
import { EditInsideAuthorComponent } from '../author/components/edit-inside-author/edit-inside-author.component';
import { AddInsideAuthorComponent } from '../author/components/add-inside-author/add-inside-author.component';
@NgModule({
    imports: [
        AuthorModule,
        NgSelectModule,
        CommonModule,
        CommonItemsModule,
        ContrivanceRoutingModule,
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
    declarations:[
        ContrivanceComponent,
        ContrivanceListComponent,
        ContrivanceDetailComponent,
        ContrivanceEditComponent,
        ContrivanceRegisterComponent,
        CheckDuplicateComponent
    ],
    providers: [
        DatePipe, // Thêm DatePipe vào danh sách providers
        // ...
      ],
})
export class ContrivanceModule{
}
