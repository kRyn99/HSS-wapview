import { GuideLineComponent } from './components/guide-line/guide-line.component';
import { StepPrivateInformationComponent } from './components/step-private-information/step-private-information.component';
import { StepCategoryComponent } from './components/step-category/step-category.component';
import { StepAccountTypeComponent } from './components/step-account-type/step-account-type.component';
import { TermAndConditionsComponent } from './components/term-and-conditions/term-and-conditions.component';
import { SignUpComponent } from './sign-up.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepAccountInformationComponent } from './components/step-account-information/step-account-information.component';

const routes: Routes = [
	{
		path: '',
		data: {
			title: 'example module'
		},
		component: SignUpComponent,
		children: [
			{
				path: '',
				redirectTo: 'term-and-conditions',
				pathMatch: 'full'
			},
			{
				path: 'term-and-conditions',
				data: {
					title: 'TermAndConditions'
				},
				component: TermAndConditionsComponent
			},
			{
				path: 'step-account-type',
				data: {
					title: 'AccountType'
				},
				component: StepAccountTypeComponent
			},
			{
				path: 'step-category',
				data: {
					title: 'Category'
				},
				component: StepCategoryComponent
			},
			{
				path: 'step-private-information',
				data: {
					title: 'PrivateInformation'
				},
				component: StepPrivateInformationComponent
			},
			{
				path: 'step-account-information',
				data: {
					title: 'AccountInformation'
				},
				component: StepAccountInformationComponent
			},
			{
				path: 'guide-line',
				data: {
					title: 'GuideLine'
				},
				component: GuideLineComponent
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SignUpRoutingModule { }
