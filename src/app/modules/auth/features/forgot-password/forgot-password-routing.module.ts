import { CreateNewPasswordComponent } from './components/create-new-password/create-new-password.component';
import { NgModule } from '@angular/core';
import { ForgotPasswordComponent } from './forgot-password.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		data: {
			title: 'example module'
		},
		component: ForgotPasswordComponent,
		children: [
			{
				path: '',
				redirectTo: 'create-new-password',
				pathMatch: 'full'
			},
			{
				path: 'create-new-password',
				data: {
					title: 'CreateNewPassword'
				},
				component: CreateNewPasswordComponent
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }
