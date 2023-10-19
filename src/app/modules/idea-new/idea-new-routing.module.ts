import { IdeaDetailComponent } from "@app/modules/idea/components/idea-detail/idea-detail.component";
import { IdeaListComponent } from "@app/modules/idea/components/idea-list/idea-list.component";
import { IdeaRegisterComponent } from "@app/modules/idea/components/idea-register/idea-register.component";
import { IdeaComponent } from "@app/modules/idea/idea.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { IdeaEditComponent } from "@app/modules/idea/components/idea-edit/idea-edit.component";
import { IdeaNewComponent } from "./idea-new.component";
import { IdeaListNewComponent } from "./component/idea-list-new/idea-list-new.component";
// import { CheckDuplicateComponentIdea } from "./components/check-duplicate/check-duplicate-idea.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Idea",
    },
    component: IdeaNewComponent,
    children: [
      {
        path: "",
        redirectTo: "list-new",
        pathMatch: "full",
      },
      {
        path: "list-new",
        data: {
          title: "Idea list",
        },
        component: IdeaListNewComponent,
      }
    
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdeaNewRoutingModule { }
