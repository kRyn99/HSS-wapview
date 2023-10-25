import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
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
  currentPage = 1;
  constructor(
    private router: Router,
    private http: HttpClient,
    public DataService: DataService,
    private contrivanceService: ContrivanceService,
    public homeService: HomepageService
  ) {
    this.specialtyId = null;
    this.statusId = null;
  }
  token = JSON.parse(localStorage.getItem("tokenInLocalStorage"));
  isMoiNhatSelected: boolean = true;
  isLinhVucSelected: boolean = false;
  isTrangThaiSelected: boolean = false;

  selectTab(tab: string) {
    this.isMoiNhatSelected = tab === "MoiNhat";
    this.isLinhVucSelected = tab === "LinhVuc";
    this.isTrangThaiSelected = tab === "TrangThai";

    if ((this.isLinhVucSelected = tab === "LinhVuc")) {
    }
  }
  selectedSpecialty;
  onSpecialtyClick(specialty: { name: string }) {
    this.selectedSpecialty = specialty;
    console.log(this.selectedSpecialty.name);
  }
  backToPage = "home";
  get backRoute() {
    // alert('ok')
    return this.backToPage;
  }
  isdn;
  ngOnInit() {
    this.DataService.showBg = false;
    this.isdn = JSON.parse(localStorage.getItem('accountInfo')) ? JSON.parse(localStorage.getItem('accountInfo')).isdn : ''

    this.getListIdea();
    this.getListSpecialty();
    this.getListStatus();
  }
  listSpecialty: [];
  getListSpecialty() {
    const url = `${environment.API_HOST_NAME}/api/get-list-specialty`;
    const headers = new HttpHeaders({
      "Accept-Language": this.lang,
      Authorization: `Bearer ` + this.token,
    });
    return this.http.get<any>(url, { headers }).subscribe(
      (response) => {
        this.listSpecialty = response.data;
      },
      (error) => {
        console.error(error.description);
      }
    );
  }
  specialtyId;
  changeSpecialty() {
    this.currentPage = 1;
    this.listIdea=[]
    this.getListIdea();
  }
  listStatus: [];
  getListStatus() {
    const url = `${environment.API_HOST_NAME}/api/get-list-approve-status`;
    const headers = new HttpHeaders({
      "Accept-Language": this.lang,
      Authorization: `Bearer ` + this.token,
    });
    return this.http.get<any>(url, { headers }).subscribe(
      (response) => {
        this.listStatus = response.data;
      },
      (error) => {
        console.error(error.description);
      }
    );
  }
  statusId;
  changeStatus() {
    this.currentPage = 1;
    this.listIdea=[]
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
      userName: this.isdn,
      ideaDTO: {
        fromDate: null,
        toDate: null,
        specialty:this.specialtyId ?  Number(this.specialtyId) : null,
        approveStatus: this.statusId ?  Number(this.statusId) :null
      },
      pageIndex: this.currentPage,
      pageSize: 10,
    };
    return this.http.post<any>(url, requestBody, { headers }).subscribe(
      (response) => {
        if(!response.data || response.data.length == 0){
            this.listIdea=[]
        }

        if(this.listIdea.length == 0 ){
          this.listIdea = response.data.listIdea;
          this.DataService.listIdeaService = this.listIdea;
        }else {
          let tempArray = [...this.listIdea];
          tempArray = tempArray.concat(response.data.listIdea);
          this.listIdea = (tempArray);
          this.DataService.listIdeaService =  this.listIdea
        }
     
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

  onScroll(): void {
    this.currentPage += 1;
    this.getListIdea();
  }
  /* 
  handleBack() {
    this.homeService.isIdeaChecked.next(false);
    this.homeService.isContrivanceChecked.next(false)
  } */

  // ngAfterViewInit() {
  //   fromEvent(this.advanceSearch.nativeElement, "input")
  //     .pipe(
  //       debounceTime(500),
  //       map((e: InputEvent) => (e.target as HTMLInputElement).value),
  //       switchMap((value) =>
  //         this.contrivanceService.callApiCommon("get-list-idea-advance", {
  //           ideaDTO: {
  //             input: value,
  //           },
  //         })
  //       )
  //     )
  //     .subscribe((res) => {
  //       this.listIdea = res.data.listIdea;
  //       this.DataService.listIdeaService = this.listIdea;
  //     });
  // }
}
