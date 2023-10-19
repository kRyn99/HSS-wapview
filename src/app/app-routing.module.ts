import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AuthGuard } from './shared/_helpers';

export const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
	},
	{
		path: 'home',
		// canActivate: [AuthGuard],
		loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
	},
	{
		path: 'history',
		// canActivate: [AuthGuard],
		loadChildren: () => import('./modules/upoint-history/upoint-history.module').then(m => m.UpointHistoryModule)
	},
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
		// component: HomeComponent
	},
	{
		path: 'idea',
		// canActivate: [AuthGuard],
		loadChildren: () => import('./modules/idea/idea.module').then(m => m.IdeaModule)
	},
	{
		path: 'idea-new',
		// canActivate: [AuthGuard],
		loadChildren: () => import('./modules/idea-new/idea-new.module').then(m => m.IdeaNewModule)
	},
	
	{
		path:'author',
		// canActivate:[AuthGuard],
		loadChildren: () =>import('./modules/author/author.module').then((m =>m.AuthorModule))
	},
	{
		path:'contrivance',
		// canActivate:[AuthGuard],
		loadChildren: () =>import('./modules/contrivance/contrivance.module').then((m =>m.ContrivanceModule))
	},
	{
		path:'contrivance-new',
		// canActivate:[AuthGuard],
		loadChildren: () =>import('./modules/contrivance-new/contrivance-new.module').then((m =>m.ContrivanceNewModule))
	},
];

@NgModule({
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

