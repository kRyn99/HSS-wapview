import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonItemsModule} from '@app/modules/common-items/common-items.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '@app/app.module';
import {HttpClient} from '@angular/common/http';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {FormsModule} from '@angular/forms';
import {AvatarModule} from 'ngx-avatar';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {AddInsideAuthorComponent} from '@app/modules/author/components/add-inside-author/add-inside-author.component';
import {
    AddOutsideAuthorComponent
} from '@app/modules/author/components/add-outside-author/add-outside-author.component';
import {
    EditOutsideAuthorComponent
} from '@app/modules/author/components/edit-outside-author/edit-outside-author.component';
import {
    EditInsideAuthorComponent
} from '@app/modules/author/components/edit-inside-author/edit-inside-author.component';
import {InsideTableComponent} from '@app/modules/author/components/inside-table/inside-table.component';
import {OutsideTableComponent} from '@app/modules/author/components/outside-table/outside-table.component';
import {AuthorComponent} from '@app/modules/author/author.component';
import {AuthorRoutingModule} from '@app/modules/author/author-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedDisplayHtmlModule } from '@app/shared/shared-display-html/shared-display-html.module';
import { EditInsideEditComponent } from './components/edit-inside-edit/edit-inside-edit.component';
import { EditOutsideEditComponent } from './components/edit-outside-edit/edit-outside-edit.component';
import { AddInsideEditComponent } from './components/add-inside-edit/add-inside-edit.component';
import { AddOutsideEditComponent } from './components/add-outside-edit/add-outside-edit.component';
import { ChangeDomDirective } from './components/change-dom.directive';


@NgModule({
    imports: [
        CommonModule,
        CommonItemsModule,
        AuthorRoutingModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        CollapseModule,
        FormsModule,
        AvatarModule,
        BsDatepickerModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        NgSelectModule,
        SharedDisplayHtmlModule,
    ],
    declarations: [
        AuthorComponent,
        AddInsideAuthorComponent,
        AddOutsideAuthorComponent,
        EditOutsideAuthorComponent,
        EditInsideAuthorComponent,
        InsideTableComponent,
        OutsideTableComponent,
        EditInsideEditComponent,
        EditOutsideEditComponent,
        AddInsideEditComponent,
        AddOutsideEditComponent,
        ChangeDomDirective
    ]
})
export class AuthorModule{
}
