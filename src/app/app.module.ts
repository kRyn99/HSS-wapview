import { BrowserModule } from "@angular/platform-browser";
import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  Injector,
  NgModule,
} from "@angular/core";
import { ToppyModule } from "toppy";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { HttpErrorHandleService } from "@app/shared/service/http-error-handle.service";
import { MessageService } from "@app/shared/service/message.service";
import { TreeModule } from "@circlon/angular-tree-component";
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { LoaderComponent } from "@app/shared/container/custom-component/loader/loader.component";
import { LoaderService } from "@app/shared/interceptor/loader.service";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { OverlayService } from "./modules/commons/shared/service/overlay.service";
import { CommonsModule } from "./modules/commons/commons.module";
import { ErrorInterceptor, JwtInterceptor } from "./shared/_helpers";
import { ApplicationInitializerFactory } from "./translation.config";
import { NgxSpinnerModule } from "ngx-spinner";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { IdeaNewComponent } from "./modules/idea-new/idea-new.component";
import { ContrivanceNewComponent } from "./modules/contrivance-new/contrivance-new.component";

declare global {
  interface Navigator {
    msSaveBlob: (blob: Blob, fileName: string) => boolean;
  }
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    IdeaNewComponent,
    ContrivanceNewComponent,
  ],
  imports: [
    CommonsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    // thienvv
    HttpClientModule,
    // end
    AppRoutingModule,
    ToppyModule,
    BrowserAnimationsModule,

    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: "toast-top-left",
      preventDuplicates: true,
    }),
    TreeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: "toast-top-center",
      preventDuplicates: true,
    }),
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
  ],
  providers: [
    HttpErrorHandleService,
    MessageService,
    LoaderService,
    TranslateService,
    OverlayService,
    //  { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true }
    // thienvv
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: ApplicationInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
