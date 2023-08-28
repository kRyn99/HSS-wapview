import { SignInWithPasswordComponent } from './components/sign-in-with-password/sign-in-with-password.component';
import { NgModule } from '@angular/core';
import { SignInComponent } from './sign-in.component';
import { RouterModule, Routes } from '@angular/router';
import { SignInWithOtpComponent } from './components/sign-in-with-otp/sign-in-with-otp.component';
import {SignInEndUserComponent} from '@app/modules/auth/features/sign-in/components/sign-in-end-user/sign-in-end-user.component';
import {AutoLoginEndUserComponent} from '@app/modules/auth/features/sign-in/components/auto-login-end-user/auto-login-end-user.component';
import {AutoLoginMerchantComponent} from '@app/modules/auth/features/sign-in/components/auto-login-merchant/auto-login-merchant.component';
import {AutoLoginToRedirectComponent} from '@app/modules/auth/features/sign-in/components/auto-login-to-redirect/auto-login-to-redirect.component';

const routes: Routes = [
	{
		path: '',
		data: {
			title: 'example module'
		},
		component: SignInComponent,
		children: [
			{
				path: '',
				redirectTo: 'password',
				// redirectTo: 'end-user',
				pathMatch: 'full'
			},
			{
				path: 'password',
				data: {
					title: 'SignInWithPassword'
				},
				component: SignInWithPasswordComponent
			},
			{
				path: 'otp',
				data: {
					title: 'SignInWithOTP'
				},
				component: SignInWithOtpComponent
			},
			{
				path: 'end-user',
				data: {
					title: 'SignInEndUser'
				},
				component: SignInEndUserComponent
			},
			{
				path: 'auto-login-end-user',
				data: {
					title: 'AutoLoginEndUser'
				},
				component: AutoLoginEndUserComponent
			},
			{
				path: 'auto-login-merchant',
				data: {
					title: 'AutoLoginMerchant'
				},
				component: AutoLoginMerchantComponent
			},
			{
				path: 'auto-login-to-redirect',
				data: {
					title: 'AutoLoginToRedirect'
				},
				component: AutoLoginToRedirectComponent
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SignInRoutingModule { }
