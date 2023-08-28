import { IdeaDetailComponent } from "@app/modules/idea/components/idea-detail/idea-detail.component";
import { IdeaListComponent } from "@app/modules/idea/components/idea-list/idea-list.component";
import { IdeaRegisterComponent } from "@app/modules/idea/components/idea-register/idea-register.component";
import { IdeaComponent } from "@app/modules/idea/idea.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { IdeaEditComponent } from "@app/modules/idea/components/idea-edit/idea-edit.component";
import { CheckDuplicateComponentIdea } from "./components/check-duplicate/check-duplicate-idea.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Idea",
    },
    component: IdeaComponent,
    children: [
      {
        path: "",
        redirectTo: "list",
        pathMatch: "full",
      },
      {
        path: "list",
        data: {
          title: "Idea list",
        },
        component: IdeaListComponent,
      },
      {
        path: "register",
        data: {
          title: "Idea register",
        },
        component: IdeaRegisterComponent,
      },
      {
        path: "detail",
        data: {
          title: "Idea detail",
        },
        component: IdeaDetailComponent,
      },
      {
        path: "edit",
        data: {
          title: "Idea edit",
        },
        component: IdeaEditComponent,
      },
      {
        path: "check-duplicate-idea",
        data: {
          title: "Check duplicate idea",
        },
        component: CheckDuplicateComponentIdea,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdeaRoutingModule {}
