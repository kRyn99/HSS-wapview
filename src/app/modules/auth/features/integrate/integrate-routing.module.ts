import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IntegrateComponent} from '@app/modules/auth/features/integrate/integrate.component';
import {IntegrateTopupComponent} from '@app/modules/auth/features/integrate/components/integrate-topup/integrate-topup.component';

const routes: Routes = [
	{
		path: '',
		data: {
			title: 'integrate module'
		},
		component: IntegrateComponent,
		children: [
			{
				path: '',
				redirectTo: 'integrate-topup',
				pathMatch: 'full'
			},
			{
				path: 'integrate-topup',
				data: {
					title: 'IntegrateTopupComponent'
				},
				component: IntegrateTopupComponent
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class IntegrateRoutingModule { }
