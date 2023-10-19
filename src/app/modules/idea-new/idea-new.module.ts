import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdeaNewRoutingModule } from './idea-new-routing.module';
import { IdeaListNewComponent } from './component/idea-list-new/idea-list-new.component';
import { IdeaDetailNewComponent } from './component/idea-detail-new/idea-detail-new.component';
import { CommonItemsModule } from "@app/modules/common-items/common-items.module";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { IdeaRoutingModule } from "@app/modules/idea/idea-routing.module";
import { HttpLoaderFactory } from "@app/app.module";
import { HttpClient } from "@angular/common/http";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AvatarModule } from "ngx-avatar";
import { IdeaComponent } from "@app/modules/idea/idea.component";
import { IdeaListComponent } from "@app/modules/idea/components/idea-list/idea-list.component";
import { IdeaDetailComponent } from "@app/modules/idea/components/idea-detail/idea-detail.component";
import { IdeaRegisterComponent } from "@app/modules/idea/components/idea-register/idea-register.component";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { DirectivesModule } from "@app/shared/directive/directives.module";
import { CRUDTableModule } from "../../shared/crud-table/crud-table.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DatePipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    IdeaListNewComponent,
    IdeaDetailNewComponent
  ],
  imports: [
    NgSelectModule,
    CommonModule,
    CommonItemsModule,
    IdeaNewRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    CollapseModule,
    ReactiveFormsModule,
    FormsModule,
    AvatarModule,
    BsDatepickerModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    DirectivesModule,
    CRUDTableModule,
    MatFormFieldModule,
    NgbModalModule,
    NgbModule,
    IdeaNewRoutingModule
  ],
  providers: [
    DatePipe,

  ],
})
export class IdeaNewModule { }
