import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { CallBackComponent } from './features/call-back/call-back.component';

const routes: Routes = [
	{
		path: '',
		data: {
			title: 'example module'
		},
		component: AuthComponent,
		children: [
			{
				path: '',
				redirectTo: 'sign-in',
				pathMatch: 'full'
			},
			{
				path: 'sign-in',
				loadChildren: () => import('./features/sign-in/sign-in.module').then(m => m.SignInModule)
			},
			{
				path: 'sign-up',
				loadChildren: () => import('./features/sign-up/sign-up.module').then(m => m.SignUpModule)
			},
			{
				path: 'forgot-password',
				loadChildren: () => import('./features/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
			},
			{
				path: 'call-back',
				loadChildren: () => import('./features/call-back/call-back.module').then(m => m.CallBackModule)
			},
			{
				path: 'end-user',
				loadChildren: () => import('./features/end-user/end-user.module').then(m => m.EndUserModule)
			},
			{
				path: 'integrate',
				loadChildren: () => import('./features/integrate/integrate.module').then(m => m.IntegrateModule)
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule { }
