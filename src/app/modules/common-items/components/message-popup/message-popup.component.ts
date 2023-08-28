import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-message-popup',
  templateUrl: './message-popup.component.html',
  styleUrls: ['./message-popup.component.scss']
})
export class MessagePopupComponent implements OnInit {

  @Input() type: any;
  @Input() message: any;
  @Input() title: any;
  @Input() closeIcon: any = false;
  @Output() next = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  iconSrc: any;
  closeIconSrc: any;
  defaultIconSrc = './assets/img/icon/';
  undoWarning = '';

  constructor(
    private modalService: NgbModal,
    public modal: NgbActiveModal,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.undoWarning = '<span><br>' + this.translate.instant('COMMON.UNABLE_UNDO') + '</span>';
    switch (this.type) {
      case 'fail': {
        this.closeIconSrc = this.defaultIconSrc + 'icon-error-20px.svg';
        this.iconSrc = this.defaultIconSrc + 'icon-error-72px.svg';
        break;
      }
      case 'success': {
        this.closeIconSrc = this.defaultIconSrc + 'icon-close-success.svg';
        this.iconSrc = this.defaultIconSrc + 'icon-success-72px.svg';
        break;
      }
      case 'confirm': {
        this.closeIconSrc = this.defaultIconSrc + 'icon-close-warning.svg';
        this.iconSrc = this.defaultIconSrc + 'icon-warning-72px.svg';
        break;
      }
      case 'info': {
        this.closeIconSrc = this.defaultIconSrc + 'icon-close-info.svg';
        this.iconSrc = this.defaultIconSrc + 'icon-information-72px.svg';
        break;
      }
    }
  }

  handleClose() {
    this.cancel.emit(true);
    this.modal.close();
  }

  handleNext() {
    this.next.emit(true);
    this.modal.close();
  }

}
