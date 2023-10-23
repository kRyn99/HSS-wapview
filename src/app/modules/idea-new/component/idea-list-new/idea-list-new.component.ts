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
  selector: 'app-idea-list-new',
  templateUrl: './idea-list-new.component.html',
  styleUrls: ['./idea-list-new.component.scss']
})
export class IdeaListNewComponent implements OnInit {
  backToPage = "idea-new/list-new";
  get backRoute() {
    return this.backToPage
  }
  isMoiNhatSelected: boolean = true;
  isLinhVucSelected: boolean = false;
  isTrangThaiSelected: boolean = false;

  selectTab(tab: string) {
    this.isMoiNhatSelected = tab === 'MoiNhat';
    this.isLinhVucSelected = tab === 'LinhVuc';
    this.isTrangThaiSelected = tab === 'TrangThai';
  }
  constructor(
    private router: Router,
    private http: HttpClient,
    public DataService: DataService,
    private contrivanceService: ContrivanceService,
    public homeService: HomepageService
  ) {

  }
  ngOnInit() {
    this.getListIdea()
  }
  token = JSON.parse(localStorage.getItem("tokenInLocalStorage"));
  lang = localStorage.getItem("lang");
  listIdea = [];
  backupListIdea = [];
  recordInfoDTO: any;
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
  handleCreate() {
    const reset = null;
    this.DataService.ideaName2.next(reset);
    this.DataService.selectedLanguage.next(reset);
    this.DataService.selectedUnit.next(reset);
    this.DataService.selectedUnitValue.next(reset);
    this.DataService.selectedSpecialtyValue.next(reset);
    this.DataService.selectedStartDate.next(reset);
    this.DataService.selectedEndDate.next(new Date());
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
}
