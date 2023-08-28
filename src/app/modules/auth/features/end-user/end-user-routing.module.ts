import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndUserComponent } from './end-user.component';
import {EndUserConfirmComponent} from '@app/modules/auth/features/end-user/components/end-user-confirm/end-user-confirm.component';

const routes: Routes = [
	{
		path: '',
		data: {
			title: 'example module'
		},
		component: EndUserComponent,
		children: [
			{
				path: '',
				redirectTo: 'end-point',
				pathMatch: 'full'
			},
			{
				path: 'confirm',
				data: {
					title: 'EndUserConfirmComponent'
				},
				component: EndUserConfirmComponent
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EndUserRoutingModule { }
