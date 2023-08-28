import { DetailInformationComponent } from './components/detail-information/detail-information.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import {HomePageNewComponent} from "@app/modules/home/components/home-page-new/home-page-new.component";

const routes: Routes = [
	{
		path: '',
		data: {
			title: 'example module'
		},
		component: HomeComponent,
		children: [
			{
				path: '',
				redirectTo: 'homepage',
				pathMatch: 'full'
			},
			// {
			// 	path: 'dashboard',
			// 	data: {
			// 		title: 'HomePage'
			// 	},
			// 	component: HomePageComponent
			// },
			{
				path: 'more',
				data: {
					title: 'Detail'
				},
				component: DetailInformationComponent
			},
			{
				path:'homepage',
				data:{
					title:'New Homepage'
				},
				component: HomePageNewComponent
			}
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeRoutingModule { }
