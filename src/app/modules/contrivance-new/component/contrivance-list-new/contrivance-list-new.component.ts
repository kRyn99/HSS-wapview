
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-date";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { debounceTime, first, map, switchMap } from "rxjs/operators";
import { ContrivanceDTO } from "../../../contrivance/common/contrivanceDTO"
import { DataService } from "@app/shared/service/data.service";
import { ContrivanceService } from "@app/shared/service/contrivance.service";
import { fromEvent } from "rxjs/internal/observable/fromEvent";
@Component({
  selector: 'app-contrivance-list-new',
  templateUrl: './contrivance-list-new.component.html',
  styleUrls: ['./contrivance-list-new.component.scss']
})
export class ContrivanceListNewComponent implements OnInit  {
  constructor(
    private router: Router,
    public toastrService: ToastrService,
    private contrivanceService: ContrivanceService,
    public DataService: DataService
  ) {}
  ngOnInit(): void {
    this.contrivanceService.clearData();
    this.getListContrivance();
  }
  backToPage = "contrivance-new/list-new";
  get backRoute() {
    return this.backToPage
  }
  listContrivance = new BehaviorSubject<ContrivanceDTO[]>([]);
  contrivanceDTO: ContrivanceDTO;
  getListContrivance() {
    let params = {
      contrivancesDTO: {},
    };
    this.contrivanceService
      .callApiCommon("get-list-contrivance", params)
      .pipe(first())
      .subscribe((res) => {
        if (res && res.errorCode === "0") {
          if (res.data && res.data.listContrivancesDTO) {
            this.listContrivance.next(res.data?.listContrivancesDTO);
            this.contrivanceDTO = res.data.recordInfoDTO;
            console.log(this.contrivanceDTO);
            
          }
        } else {
          this.listContrivance.next([]);
          this.toastrService.error(res.description);
        }
      });
  }
}
