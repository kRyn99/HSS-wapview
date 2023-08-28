import { EndUserModule } from './features/end-user/end-user.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInModule } from './features/sign-in/sign-in.module';
import { SignUpModule } from './features/sign-up/sign-up.module';
import { ForgotPasswordModule } from './features/forgot-password/forgot-password.module';
import { CallBackModule } from './features/call-back/call-back.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SignInModule,
    SignUpModule,
    CallBackModule,
    ForgotPasswordModule,
    EndUserModule
  ],
  declarations: [
    AuthComponent
  ]
})
export class AuthModule { }
