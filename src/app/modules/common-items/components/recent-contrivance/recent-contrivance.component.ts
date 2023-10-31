import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import SwiperCore, {
  Keyboard,
  Pagination,
  Navigation,
  Virtual,
  Autoplay,
} from "swiper";
import { ContrivanceService } from "@app/shared/service/contrivance.service";

SwiperCore.use([Keyboard, Pagination, Navigation, Virtual, Autoplay]);
@Component({
  selector: "app-recent-contrivance-idea",
  templateUrl: "./recent-contrivance.component.html",
  styleUrls: ["./recent-contrivance.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class RecentContrivanceIdeaComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private modalService: NgbModal,
    private contrivanceService: ContrivanceService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}
  listData: any[] = [];
  ngOnChanges(): void {
  }

  ngOnInit(): void {
    if (this.type == "idea") {
      this.imgURL = "assets/img/icon/good-idea2.png";
    } else {
      this.imgURL = "assets/img/icon/good-idea.png";
    }
  }

  ngAfterViewInit() {
    // Lấy phần tử pagination
    const paginationElement =
      this.el.nativeElement.querySelector(".swiper-pagination");
    // Lấy phần tử slideshow-header
    const slideshowHeader = this.el.nativeElement.querySelector(".progessbar");
    // Kiểm tra xem cả hai phần tử đều tồn tại
    if (paginationElement && slideshowHeader) {
      // Sử dụng Renderer2 để di chuyển phần tử pagination vào trong slideshow-header
      this.renderer.appendChild(slideshowHeader, paginationElement);
    }
  }
  swiperConfig: any = {
    slidesPerView: 1.15,
    spaceBetween: 8,
    navigation: true,
    hashNavigation: true,
    pagination: { clickable: true },
    centeredSlides: false,
    initialSlide: 0,
  
  };
  user: any;
  token: string;
  @Input() list: any[] = [];
  @Input() type: string = "";
  imgURL: String = "";
  viewDetail(id) {
    if (this.type == "idea") {
      this.contrivanceService.requestContrivanceIdSelected = id;
      this.router.navigate(["idea/detail"], {
        queryParams: { ideaId: id },
      });
      localStorage.setItem("ideaIdInLocalStorage", JSON.stringify(id));
    } else if (this.type == "contrivance") {
      this.contrivanceService.requestContrivanceIdSelected = id;
      this.router.navigate(["contrivance/detail"], {
        queryParams: { contrivanceId: id },
      });
      localStorage.setItem("contrivanceIdInLocalStorage", JSON.stringify(id));
    }
  }
}
