import {Component, Input,  ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import SwiperCore, { Keyboard, Pagination, Navigation, Virtual, Autoplay } from 'swiper';
import { ContrivanceService } from '@app/shared/service/contrivance.service';

SwiperCore.use([Keyboard, Pagination, Navigation, Virtual, Autoplay]);
@Component({
  selector: 'app-recent-contrivance',
  templateUrl: './recent-contrivance.component.html',
  styleUrls: ['./recent-contrivance.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class RecentContrivanceComponent{
  constructor(
      private route:ActivatedRoute,
      private router: Router,
      private translateService: TranslateService,
      private modalService:NgbModal,
      private contrivanceService:ContrivanceService
  ){
  }
  private subscriptions: Subscription[] = [];
  user: any;
  token: string;
  @Input()listContrivance: any [] =[];
  viewDetail(id){
    this.contrivanceService.requestContrivanceIdSelected = id;
    this.router.navigate(["contrivance/detail"], {
      queryParams: { contrivanceId: id },
    });
    localStorage.setItem('contrivanceIdInLocalStorage', JSON.stringify(id));
  }
}

