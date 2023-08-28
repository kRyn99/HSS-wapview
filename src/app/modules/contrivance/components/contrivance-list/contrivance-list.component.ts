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
import { ContrivanceDTO } from "../../common/contrivanceDTO";
import { DataService } from "@app/shared/service/data.service";
import { ContrivanceService } from "@app/shared/service/contrivance.service";
import { fromEvent } from "rxjs/internal/observable/fromEvent";

@Component({
  selector: "app-contrivance-list",
  templateUrl: "./contrivance-list.component.html",
  styleUrls: ["./contrivance-list.component.scss"],
})
export class ContrivanceListComponent implements OnInit, AfterViewInit {
  contrivanceDTO: ContrivanceDTO;
  public searchForm: FormGroup;
  listContrivance = new BehaviorSubject<ContrivanceDTO[]>([]);
  searchAdvance: string = "";
  currentPage = 1;
  pageSize;
  paginator = { page: 1, pageSize: 10, total: 0 };
  listContrivanceBackup: any[] = [];
  searchTerm: string;
  listSortContrivance = [];
  backupListContrivance = [];
  @ViewChild("advanceSearch") advanceSearch: ElementRef;
  apiDataService: any;

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

  ngAfterViewInit() {
    fromEvent(this.advanceSearch.nativeElement, "input")
      .pipe(
        debounceTime(500),
        map((e: InputEvent) => (e.target as HTMLInputElement).value),
        switchMap((value) =>
          this.contrivanceService.callApiCommon(
            "get-list-contrivance-advance",
            {
              contrivancesDTO: {
                input: value
              }
            }
          )
        )
      )
      .subscribe((res) =>{
        this.listContrivance.next(res.data?.listContrivancesDTO);
        this.contrivanceDTO = res.data.recordInfoDTO;
      }
      );
  }

  handleCreate() {
    this.router.navigate(["contrivance/register"]);
  }

  getListContrivance() {
    let params = {
      contrivancesDTO: {},
      pageSize: this.pageSize,
      pageIndex: this.currentPage + 1,
    };
    this.contrivanceService
      .callApiCommon("get-list-contrivance", params)
      .pipe(first())
      .subscribe((res) => {
        if (res && res.errorCode === "0") {
          if (res.data && res.data.listContrivancesDTO) {
            this.listContrivance.next(res.data?.listContrivancesDTO);
            this.contrivanceDTO = res.data.recordInfoDTO;
          }
        } else {
          this.listContrivance.next([]);
          this.toastrService.error(res.description);
        }
      });
  }

  ngbDateToString(ngbDate: NgbDate | null): string | null {
    if (ngbDate) {
      // Lấy giá trị của ngày, tháng, năm từ NgbDate
      const year = ngbDate.year;
      const month = ngbDate.month.toString().padStart(2, "0"); // Đảm bảo tháng có 2 chữ số
      const day = ngbDate.day.toString().padStart(2, "0"); // Đảm bảo ngày có 2 chữ số

      // Tạo chuỗi định dạng 'dd/MM/yyyy' từ các thành phần
      return `${day}/${month}/${year}`;
    }
    return null;
  }
  /* 
  sortContrivance() {
    if (
      this.searchAdvance != "" &&
      this.searchAdvance != null &&
      this.searchAdvance != undefined
    ) {
      this.searchAdvance = this.searchAdvance.trim();
      let params = {
        contrivancesDTO: {
          input: this.searchAdvance,
        },
        pageSize: this.pageSize,
        pageIndex: this.currentPage + 1,
      };
      this.contrivanceService
        .callApiCommon("get-list-contrivance-advance", params)
        .pipe(first())
        .subscribe((res) => {
          if (res && res.errorCode === "0") {
            if (res.data && res.data.listContrivancesDTO) {
              this.listSortContrivance = res.data.listContrivancesDTO;
              this.DataService.listContrivanceService = this.listSortContrivance;
              this.backupListContrivance = [...this.listSortContrivance];
              this.contrivanceDTO = res.data.recordInfoDTO;
            }
          } else {
            this.toastrService.error(res.description);
          }
        });
    }
  }

  onSearch() {
    this.listSortContrivance = this.backupListContrivance.filter((item) =>
      item.contrivanceName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  } */

  viewDetail(id) {
    this.router.navigate(["contrivance/detail"], {
      queryParams: { id: id },
    });
    localStorage.setItem('contrivanceIdInLocalStorage', JSON.stringify(id));
  }
}
