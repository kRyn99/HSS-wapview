import {GuideLineComponent} from './components/guide-line/guide-line.component';
import {StepAccountInformationComponent} from './components/step-account-information/step-account-information.component';
import {StepPrivateInformationComponent} from './components/step-private-information/step-private-information.component';
import {StepCategoryComponent} from './components/step-category/step-category.component';
import {StepAccountTypeComponent} from './components/step-account-type/step-account-type.component';
import {TermAndConditionsComponent} from './components/term-and-conditions/term-and-conditions.component';
import {SignUpRoutingModule} from './../sign-up/sign-up-routing.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonItemsModule} from '../../../common-items/common-items.module';
import {SignUpComponent} from './sign-up.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '@app/app.module';
import {HttpClient} from '@angular/common/http';
// Import your AvatarModule
import { AvatarModule } from 'ngx-avatar';
import {FooterComponent} from '@app/modules/auth/features/sign-up/shared/container/footer/footer.component';
import {NavComponent} from '@app/modules/auth/features/sign-up/shared/container/nav/nav.component';

@NgModule({
  imports: [
    CommonModule,
    SignUpRoutingModule,
    CommonItemsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    // Specify AvatarModule as an import
    AvatarModule
  ],
  declarations: [
    SignUpComponent,
    TermAndConditionsComponent,
    StepAccountTypeComponent,
    StepCategoryComponent,
    StepPrivateInformationComponent,
    StepAccountInformationComponent,
    GuideLineComponent,
    FooterComponent,
    NavComponent
  ]
})
export class SignUpModule {
}
