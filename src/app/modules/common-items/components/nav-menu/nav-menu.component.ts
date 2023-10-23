import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { HomepageService } from "@app/modules/home/shared/service/homepage.service";
import { BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.scss"],
})
export class NavMenuComponent implements OnInit {
  // isIdeaChecked:boolean = null;
  // isContrivanceChecked:boolean = null;

  constructor(
    private router: Router,
    public homeService: HomepageService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const currentUrl = this.router.routerState.snapshot.url;
    if (currentUrl.includes("idea")) {
      this.homeService.isIdeaChecked.next(true);
      this.homeService.isContrivanceChecked.next(false);
      this.homeService.isHomeChecked.next(false);
    } else if (currentUrl.includes("contrivance")) {
      this.homeService.isIdeaChecked.next(false);
      this.homeService.isContrivanceChecked.next(true);
      this.homeService.isHomeChecked.next(false);
    }else if(currentUrl.includes("home")){
      this.homeService.isIdeaChecked.next(false);
      this.homeService.isContrivanceChecked.next(false);
      this.homeService.isHomeChecked.next(true);
    }
  }

  ideaRoute() {
    this.homeService.isIdeaChecked.next(true);
    this.homeService.isContrivanceChecked.next(false);
    this.homeService.isHomeChecked.next(false);
    this.router.navigate(["idea/list"]);
  }
  contrivanceRoute() {
    this.homeService.isIdeaChecked.next(false);
    this.homeService.isContrivanceChecked.next(true);
    this.homeService.isHomeChecked.next(false);

    this.router.navigate(["contrivance/list"]);
  }
  homeRoute() {
    this.homeService.isIdeaChecked.next(false);
    this.homeService.isContrivanceChecked.next(false);
    this.homeService.isHomeChecked.next(true);
    this.router.navigate(["home/homepage"]);
  }
}
