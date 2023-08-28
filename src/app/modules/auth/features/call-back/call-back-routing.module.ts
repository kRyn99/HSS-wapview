import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallBackComponent } from './call-back.component';
import { CallBackEndpointComponent } from './components/sign-in-with-password/call-back-endpoint.component';

const routes: Routes = [
	{
		path: '',
		data: {
			title: 'example module'
		},
		component: CallBackComponent,
		children: [
			{
				path: '',
				redirectTo: 'end-point',
				pathMatch: 'full'
			},
			{
				path: 'end-point',
				data: {
					title: 'CallBackEndpointComponent'
				},
				component: CallBackEndpointComponent
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CallBackRoutingModule { }
