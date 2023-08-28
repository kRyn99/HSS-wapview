import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit{
    @Input() title: string;
    @Input() message: string;
    @Input() closeIcon: any = false;
    @Output() next = new EventEmitter<any>();
    constructor(public modalService: NgbActiveModal) {
    }
    ngOnInit(){

    }

    handleClose() {
        this.modalService.close();
    }

    handleNext() {
        this.next.emit(true);
    }
}
