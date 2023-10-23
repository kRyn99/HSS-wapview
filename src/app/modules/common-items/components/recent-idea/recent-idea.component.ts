import {Component, Input, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import SwiperCore, {Autoplay, Keyboard, Navigation, Pagination, Virtual} from 'swiper';
import { ContrivanceService } from '@app/shared/service/contrivance.service';

SwiperCore.use([Keyboard, Pagination, Navigation, Virtual, Autoplay]);
@Component({
  selector: 'app-recent-idea',
  templateUrl: './recent-idea.component.html',
  styleUrls: ['./recent-idea.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class RecentIdeaComponent {
  swiperConfig: any = {
    scrollbar: {
      el: '.swiper-scrollbar', // Chọn phần tử chứa Scrollbar
      hide: false, // Hiển thị Scrollbar
    },
    slidesPerView: 1.15,
    spaceBetween: 8,
    navigation: true,
    hashNavigation: true,
    pagination: { clickable: true },
    centeredSlides: false,
    initialSlide: 0
  };
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private translateService: TranslateService,
      private modalService: NgbModal,
      private contrivanceService: ContrivanceService
  ) {
  }
  private subscriptions: Subscription[] = [];
  user: any;
  token: string;
  @Input() listIdea: any[] = [];
  viewDetail(id){
    this.contrivanceService.requestContrivanceIdSelected = id;
    this.router.navigate(['idea/detail'],{
      queryParams: { ideaId: id },
    }); 
    localStorage.setItem('ideaIdInLocalStorage', JSON.stringify(id));
  }
}
