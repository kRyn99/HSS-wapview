import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { HomepageService } from "@app/modules/home/shared/service/homepage.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.scss"],
})
export class NavMenuComponent {
  // isIdeaChecked:boolean = null;
  // isContrivanceChecked:boolean = null;
 

  constructor(private router: Router, public homeService: HomepageService) {}
  ideaRoute() {
    this.homeService.isIdeaChecked.next(true);
    this.homeService.isContrivanceChecked.next(false);
    console.log();
    
    this.router.navigate(["idea/list"]);
  }
  contrivanceRoute() {
    this.homeService.isIdeaChecked.next(false);
    this.homeService.isContrivanceChecked.next(true);
    this.router.navigate(["contrivance/list"]);
  }
  homeRoute() {
    this.homeService.isIdeaChecked.next(false);
    this.homeService.isContrivanceChecked.next(false)
    this.router.navigate(["home/homepage"]);
  }
}
