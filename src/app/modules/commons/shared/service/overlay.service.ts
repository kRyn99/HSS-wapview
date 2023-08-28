import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalPosition, InsidePlacement, OutsidePlacement, RelativePosition, Toppy } from 'toppy';
import { FuncsGlobalService } from '@app/shared/service/funcs-global.services';
@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  private overlay: any;
  private _loading = false;

  constructor(private modal: NgbModal, toppy: Toppy,
    private funcs: FuncsGlobalService) {
    this.overlay = toppy
      .position(new GlobalPosition({
        placement: InsidePlacement.CENTER
      }))
      .config({
        backdrop: true,
        containerClass: 'overlay-container',
        backdropClass: 'overlay-backdrop'
      })
      .content(`
        <div class="text-center">
            <div class="spinner-border spin-branch-color" role="status">
              <span class="sr-only">Loading...</span>
            </div>
        </div>`, { hasHTML: true })
      .create();
  }

  get loading() {
    return this._loading;
  }

  startRequest() {
    this._loading = true;
    this.overlay.open();
  }

  finishRequest() {
    this.overlay.close();
    this._loading = false;
  }
}
