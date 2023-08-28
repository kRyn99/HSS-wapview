import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "@env/environment";
import { DataService } from "../../../../shared/service/data.service";
import { fromEvent } from "rxjs/internal/observable/fromEvent";
import { debounceTime, map, switchMap } from "rxjs/operators";
import { ContrivanceService } from "@app/shared/service/contrivance.service";
import { ContrivanceDTO } from "@app/modules/contrivance/common/contrivanceDTO";
import { HomepageService } from "@app/modules/home/shared/service/homepage.service";

@Component({
  selector: "app-idea-list",
  templateUrl: "./idea-list.component.html",
  styleUrls: ["./idea-list.component.scss"],
})
export class IdeaListComponent implements OnInit {
  contrivanceDTO: ContrivanceDTO;
  @ViewChild("advanceSearch") advanceSearch: ElementRef;
  searchAdvance: string = "";

  constructor(
    private router: Router,
    private http: HttpClient,
    public DataService: DataService,
    private contrivanceService: ContrivanceService,
    public homeService: HomepageService
  ) {}
  token = JSON.parse(localStorage.getItem("tokenInLocalStorage"));
  ngOnInit() {
    this.getListIdea();
  }
  listIdea = [];
  backupListIdea = [];
  recordInfoDTO: any;
  lang = localStorage.getItem("lang");
  getListIdea() {
    const url = `${environment.API_HOST_NAME}/api/get-list-idea`;
    const headers = new HttpHeaders({
      "Accept-Language": this.lang,
      Authorization: `Bearer ` + this.token,
    });
    const requestBody = {
      userName: "hss_admin",
      ideaDTO: {
        fromDate: null,
        toDate: null,
      },
    };
    return this.http.post<any>(url, requestBody, { headers }).subscribe(
      (response) => {
        this.listIdea = response.data.listIdea;
        this.DataService.listIdeaService = this.listIdea;
        this.backupListIdea = [...this.listIdea];
        this.recordInfoDTO = response.data.recordInfoDTO;
        console.log(this.recordInfoDTO);
      },
      (error) => {
        console.error(error.data);
      }
    );
  }
  searchTerm: string;
  onSearch() {
    this.listIdea = this.backupListIdea.filter((item) =>
      item.ideaName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  redirectTodDetail(id: number) {
    this.router.navigate(["idea/detail"], {
      queryParams: { id: id, source: "ideaList" },
    });
    localStorage.setItem("ideaIdInLocalStorage", JSON.stringify(id));
  }

  handleCreate() {
    const reset = null;
    this.DataService.ideaName2.next(reset);
    this.DataService.selectedUnitValue.next(reset);
    this.DataService.selectedSpecialtyValue.next(reset);
    this.DataService.selectedStartDate.next(reset);
    this.DataService.selectedEndDate.next(reset);
    this.DataService.beforeApplyStatus.next(reset);
    this.DataService.content.next(reset);
    this.DataService.applyRange.next(reset);
    this.DataService.effectiveness.next(reset);
    this.DataService.nextStep.next(reset);
    this.DataService.note.next(reset);
    this.DataService.lstContributorDTOService.next([]);
    this.DataService.lstContributorDTOServiceOut.next([]);
    this.DataService.file.next({ url: "", name: "" });

    this.router.navigate(["idea/register"]);
  }
/* 
  handleBack() {
    this.homeService.isIdeaChecked.next(false);
    this.homeService.isContrivanceChecked.next(false)
  } */

  ngAfterViewInit() {
    fromEvent(this.advanceSearch.nativeElement, "input")
      .pipe(
        debounceTime(500),
        map((e: InputEvent) => (e.target as HTMLInputElement).value),
        switchMap((value) =>
          this.contrivanceService.callApiCommon("get-list-idea-advance", {
            ideaDTO: {
              input: value,
            },
          })
        )
      )
      .subscribe((res) => {
        this.listIdea = res.data.listIdea;
        this.DataService.listIdeaService = this.listIdea;
      });
  }
}