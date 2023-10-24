import { DetailInformationComponent } from './components/detail-information/detail-information.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CommonItemsModule } from '../common-items/common-items.module';
import { HomeRoutingModule } from './home-routing.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '@app/app.module';
import {HttpClient} from '@angular/common/http';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {FormsModule} from '@angular/forms';
import {AvatarModule} from 'ngx-avatar';
import { HomePageNewComponent } from './components/home-page-new/home-page-new.component';

@NgModule({
  imports: [
    CommonModule,
    CommonItemsModule,
    HomeRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CollapseModule,
    FormsModule,
    AvatarModule,
  ],
  declarations: [
    HomeComponent,
    DetailInformationComponent,
    HomePageNewComponent
  ]
})
export class HomeModule { }
