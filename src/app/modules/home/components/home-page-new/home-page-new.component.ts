import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { first } from "rxjs/operators";
import { MessagePopupComponent } from "@app/modules/common-items/components/message-popup/message-popup.component";
import { HomepageService } from "@app/modules/home/shared/service/homepage.service";
import { ContrivanceService } from "@app/shared/service/contrivance.service";

@Component({
  selector: "app-home-page-new",
  templateUrl: "./home-page-new.component.html",
  styleUrls: ["./home-page-new.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class HomePageNewComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  user: any;
  token: string;
  listIdea: any[] = [];
  subListIdea: any[] = [];
  startIndex = 0;
  listContrivance: any[] = [];
  subListContrivance: any[] = [];
  backToPage = "home";
  get backRoute() {
    return this.backToPage;
  }

  goBack() {
    let links = [];
    if(localStorage.getItem("deeplink")) {
      const modalRefError = this.modalService.open(MessagePopupComponent, {
        size: "sm",
        backdrop: "static",
        keyboard: false,
        centered: true,
      });
      modalRefError.componentInstance.type = "confirm";
      modalRefError.componentInstance.title =
        this.translateService.instant(`COMMON.CONFIRMATION`);
      modalRefError.componentInstance.message =
        this.translateService.instant(`COMMON.CONFIRM_BACK_TO_HOME`);
      modalRefError.componentInstance.closeIcon = false;
      modalRefError.result.then(
        () => {

          let links = [];
          if (localStorage.getItem("deeplink")) {
            links.push(localStorage.getItem("deeplink"));
            window.open(links.join(""), "_self");
          }
          // this.accountService.logout();
        },
        () => {}
      );

    }else {
      const modalRefError = this.modalService.open(MessagePopupComponent, {
        size: "sm",
        backdrop: "static",
        keyboard: false,
        centered: true,
      });
      modalRefError.componentInstance.type = "fail";
      modalRefError.componentInstance.title =
        this.translateService.instant(`COMMON.ERROR`);
      modalRefError.componentInstance.message =
        this.translateService.instant(`COMMON.DEEP_LINK_ERROR`);
      modalRefError.componentInstance.closeIcon = false;
    }

  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private modalService: NgbModal,
    public HomepageService: HomepageService,
    public contrivanceService: ContrivanceService
  ) {}

    //check deeplink
     isDeepLink(string) {
      // Sử dụng biểu thức chính quy để kiểm tra
      const pattern = /^(?!https?:\/\/).*:\/\//;
      return pattern.test(string);
    }

  tokenLogin() {
    const TokenLogin = {
      tokenAutoLogin: this.token,
    };
    const autoToken = this.HomepageService.redirectList(TokenLogin)
      .pipe(first())
      .subscribe(
        (res) => {
          if (res.errorCode === "0") {
            this.HomepageService.tokenAutoLogin.next(res.data.token);
            this.HomepageService.accountInfo.next(res.data.accountInfo);
            localStorage.setItem(
              "tokenInLocalStorage",
              JSON.stringify(res.data.token)
            );
            localStorage.setItem(
              "accountInfo",
              JSON.stringify(res.data.accountInfo)
            );

            this.getListIdea();
            JSON.parse(localStorage.getItem(""));
            // console.log(res.data.token)
            // this.router.navigate(['/home']);
          } else {
            // show error
            const modalRefError = this.modalService.open(
              MessagePopupComponent,
              {
                size: "sm",
                backdrop: "static",
                keyboard: false,
                centered: true,
              }
            );
            modalRefError.componentInstance.type = "fail";
            modalRefError.componentInstance.title =
              this.translateService.instant(`COMMON.ERROR`);
            modalRefError.componentInstance.message = res.description;
            modalRefError.componentInstance.closeIcon = false;
          }
        },
        (error) => {
          // show error neu exception
          const modalRefError = this.modalService.open(MessagePopupComponent, {
            size: "sm",
            backdrop: "static",
            keyboard: false,
            centered: true,
          });
          modalRefError.componentInstance.type = "fail";
          modalRefError.componentInstance.title =
            this.translateService.instant(`COMMON.ERROR`);
          modalRefError.componentInstance.message =
            this.translateService.instant(`COMMON.ERROR_SERVICE`);
          modalRefError.componentInstance.closeIcon = false;
        }
      );
    this.subscriptions.push(autoToken);
  }
  getListIdea() {
    const listIdea = this.HomepageService.getInfoHomepage()
      .pipe(first())
      .subscribe(
        (res) => {
          if (res.errorCode === "0") {
            this.listIdea = res.data.listIdea;
            this.listContrivance = res.data.listContrivance;
          } else {
            // show error
            const modalRefError = this.modalService.open(
              MessagePopupComponent,
              {
                size: "sm",
                backdrop: "static",
                keyboard: false,
                centered: true,
              }
            );
            modalRefError.componentInstance.type = "fail";
            modalRefError.componentInstance.title =
              this.translateService.instant(`COMMON.ERROR`);
            modalRefError.componentInstance.message = res.description;
            modalRefError.componentInstance.closeIcon = false;
          }
        },
        (error) => {
          // show error neu exception
          const modalRefError = this.modalService.open(MessagePopupComponent, {
            size: "sm",
            backdrop: "static",
            keyboard: false,
            centered: true,
          });
          modalRefError.componentInstance.type = "fail";
          modalRefError.componentInstance.title =
            this.translateService.instant(`COMMON.ERROR`);
          modalRefError.componentInstance.message =
            this.translateService.instant(`COMMON.ERROR_SERVICE`);
          modalRefError.componentInstance.closeIcon = false;
        }
      );
    this.subscriptions.push(listIdea);
  }
  ngOnInit(): void {
    if (localStorage.getItem("tokenInLocalStorage")) {
      this.getListIdea();
    }
    this.route.queryParams.subscribe( async (params) => {
      if (params.lang) {
        this.translateService.setDefaultLang(params.lang);
        try {
          await this.translateService.use(params.lang).toPromise();
        } catch (err) {
        }
      }
      if (params && params.token) {
        if (params.deeplink && this.isDeepLink(params.deeplink)) {
          localStorage.setItem("deeplink", params.deeplink);
        }else {
          if(!localStorage.getItem("deeplink") || !this.isDeepLink(localStorage.getItem("deeplink")) ){
            const modalRefError = this.modalService.open(MessagePopupComponent, {
              size: "sm",
              backdrop: "static",
              keyboard: false,
              centered: true,
            });
            modalRefError.componentInstance.type = "fail";
            modalRefError.componentInstance.title =
              this.translateService.instant(`COMMON.ERROR`);
            modalRefError.componentInstance.message =
              this.translateService.instant(`COMMON.DEEP_LINK_ERROR`);
            modalRefError.componentInstance.closeIcon = false;
            return;
          }     
        }
        this.token = params.token;
        if (!localStorage.getItem("tokenInLocalStorage")) {
          this.tokenLogin();
        }
      }

    });
  }
}
