import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
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
import { IdeaEditComponent } from "./components/idea-edit/idea-edit.component";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { DirectivesModule } from "@app/shared/directive/directives.module";
import { CheckDuplicateComponentIdea } from "./components/check-duplicate/check-duplicate-idea.component";
import { CRUDTableModule } from "../../shared/crud-table/crud-table.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DatePipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    IdeaComponent,
    IdeaListComponent,
    IdeaDetailComponent,
    IdeaRegisterComponent,
    IdeaEditComponent,
    CheckDuplicateComponentIdea,
  ],
  imports: [
    NgSelectModule,
    CommonModule,
    CommonItemsModule,
    IdeaRoutingModule,
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
    NgbModule
  ],
  providers: [
    DatePipe,

  ],
})
export class IdeaModule {}
