import {ContrivanceComponent} from '@app/modules/contrivance/contrivance.component';
import {
    ContrivanceDetailComponent
} from '@app/modules/contrivance/components/contrivance-detail/contrivance-detail.component';
import {
    ContrivanceEditComponent
} from '@app/modules/contrivance/components/contrivance-edit/contrivance-edit.component';
import {
    ContrivanceListComponent
} from '@app/modules/contrivance/components/contrivance-list/contrivance-list.component';
import {
    ContrivanceRegisterComponent
} from '@app/modules/contrivance/components/contrivance-register/contrivance-register.component';
import {RouterModule ,Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { ContrivanceListNewComponent } from './component/contrivance-list-new/contrivance-list-new.component';
import { ContrivanceNewComponent } from './contrivance-new.component';
// import { CheckDuplicateComponent } from './components/check-duplicate/check-duplicate.component';

const routes: Routes = [
  {
    path:'',
    data:{
        title:'Contrivance'
    },
    component:ContrivanceNewComponent,
    children:[
        {
            path: '',
            redirectTo: 'list-new',
            pathMatch: 'full'
        },
        {
            path:'list-new',
            data:{
                title:'Contrivance List'
            },
            component:ContrivanceListNewComponent
        }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContrivanceNewRoutingModule { }
