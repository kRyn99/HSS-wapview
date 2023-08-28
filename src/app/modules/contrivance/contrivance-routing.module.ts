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
import { CheckDuplicateComponent } from './components/check-duplicate/check-duplicate.component';

const routes: Routes =[
    {
        path:'',
        data:{
            title:'Contrivance'
        },
        component:ContrivanceComponent,
        children:[
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            },
            {
                path:'list',
                data:{
                    title:'Contrivance List'
                },
                component:ContrivanceListComponent
            },
            {
                path:'detail',
                data:{
                    title:'Contrivance Detail'
                },
                component:ContrivanceDetailComponent
            },
            {
                path:'edit',
                data:{
                    title:'Contrivance Edit'
                },
                component:ContrivanceEditComponent
            },
            {
                path:'register',
                data:{
                    title:'Contrivance Register'
                },
                component:ContrivanceRegisterComponent
            },
            {
                path:'check-duplicate',
                data:{
                    title:'Contrivance Register'
                },
                component:CheckDuplicateComponent
            }
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContrivanceRoutingModule{
}
