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
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { EditInsideEditComponent } from './components/edit-inside-edit/edit-inside-edit.component';
import { EditOutsideEditComponent } from './components/edit-outside-edit/edit-outside-edit.component';
import { AddInsideEditComponent } from './components/add-inside-edit/add-inside-edit.component';
import { AddOutsideEditComponent } from './components/add-outside-edit/add-outside-edit.component';


const routes: Routes = [
    {
        path: '',
        data: {
            title: 'author'
        },
        component: AuthorComponent,
        children: [
            {
                path: 'add-inside',
                data:{
                    title:'Add Inside Author'
                },
                component:AddInsideAuthorComponent
            },
            {
                path: 'add-outside',
                data:{
                    title:'Add Outside Author'
                },
                component:AddOutsideAuthorComponent
            },
            {
                path: 'edit-inside',
                data:{
                    title:'Edit Inside Author'
                },
                component:EditInsideAuthorComponent
            },
            {
                path: 'edit-inside-edit',
                data:{
                    title:'Edit Inside Edit'
                },
                component:EditInsideEditComponent
            },
            {
                path: 'edit-outside-edit',
                data:{
                    title:'Edit OutSide Edit'
                },
                component:EditOutsideEditComponent
            },
            {
                path: 'edit-outside',
                data:{
                    title:'Edit Outside Author'
                },
                component:EditOutsideAuthorComponent
            },
            {
                path: 'add-inside-edit',
                data:{
                    title:'Add InSide Edit'
                },
                component:AddInsideEditComponent
            },
            {
                path: 'add-outside-edit',
                data:{
                    title:'Add OutSide Edit'
                },
                component:AddOutsideEditComponent
            }
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthorRoutingModule{
}
