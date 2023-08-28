import { Injectable, ElementRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Injectable({ providedIn: 'root' })
export class ModalService {
    ngbModalOptions: ModalOptions = {
        backdrop: 'static',
        keyboard: false,
        class: 'modal-lg'
    };

    private modals: BsModalRef[] = [];
    constructor(private modalService: BsModalService) { }

     open(template: any, config?: {}) {
        config = (config != null && config !== undefined) ? config : this.ngbModalOptions;

        const modalRef: any = this.modalService.show(template, config);
        this.modals.push(modalRef);

        return modalRef;
    }

    close(level?: number) {
        const mdRef = this.modals.pop();
        mdRef.hide();
    }

    isModalShown() {
        return this.modals.length > 0;
    }
}
