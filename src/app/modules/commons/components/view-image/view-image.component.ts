import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss']
})
export class ViewImageComponent implements OnInit {

  @Input() image;

  constructor(
    public activeModal: NgbActiveModal,
    private sanitizer: DomSanitizer
  ) {
  }
  ngOnInit() {
    this.image = this.sanitizer.bypassSecurityTrustUrl(this.image);
  }

  handleBack() {
    this.activeModal.dismiss();
  }
}
