import { Injectable } from '@angular/core';
import { MessagePopupComponent } from '@app/modules/common-items/components/message-popup/message-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private translateService: TranslateService,
    private modalService: NgbModal
  ) { }

  public notify(type: string, message: string, title?: string) {
    let popupTitle = "";
    const modalRefError = this.modalService.open(MessagePopupComponent, {
      size: 'sm',
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    modalRefError.componentInstance.type = type;
    switch (type) {
      case 'fail':
        popupTitle = 'COMMON.ERROR';
        break;
      case 'success':
        popupTitle = 'COMMON.SUCCESS';
        break;
      case 'confirm':
        popupTitle = 'COMMON.CONFIRMATION';
        break;
      default:
        break;
    }
    if (title) {
      popupTitle = title;
    }
    modalRefError.componentInstance.title = this.translateService.instant(popupTitle);
    modalRefError.componentInstance.message = this.translateService.instant(message);
    modalRefError.componentInstance.closeIcon = false;
  }
}