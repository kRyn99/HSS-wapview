import { Component, OnInit } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { BsDatepickerConfig, BsLocaleService } from "ngx-bootstrap/datepicker";
import { PeriodicElement } from "@app/modules/idea/PeriodicElement";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { MessagePopupComponent } from "@app/modules/common-items/components/message-popup/message-popup.component";
import { environment } from "@env/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DataService } from "../../../../shared/service/data.service";
import { HomepageService } from "@app/modules/home/shared/service/homepage.service";
import { NotificationService } from "@app/shared/service/notification.service";
interface IdeaDetail {
  ideaId: number;
  ideaName: string;
  applyStartTime: string;
  applyEndTime: string;
  unitNames: string;
  specialtyName: string;
  approveStatusName: string;
  beforeApplyStatus: string;
  content: string;
  applyRange: string;
  effectiveness: string;
  nextStep: string;
  note: string;
  approveStatus: any;
}
interface document {
  name: string;
  objId: number;
}
@Component({
  selector: "app-idea-detail",
  templateUrl: "./idea-detail.component.html",
  styleUrls: ["./idea-detail.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class IdeaDetailComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig>;
  dataSource: any;
  dataSource2: any;
  columnsToDisplay = ["staffCode", "fullName", "percentage"];
  columnsToDisplayWithExpand = ["expand", ...this.columnsToDisplay];
  columnsToDisplay2 = ["fullName", "percentage"];
  columnsToDisplayWithExpand2 = ["expand", ...this.columnsToDisplay2];
  expandedElement: PeriodicElement | null;
  ideaId = JSON.parse(localStorage.getItem("ideaIdInLocalStorage"));
  token = JSON.parse(localStorage.getItem("tokenInLocalStorage"));
  backToPage = "idea/list";

  constructor(
    private bsLocaleService: BsLocaleService,
    private router: Router,
    private modalService: NgbModal,
    private translateService: TranslateService,
    private http: HttpClient,
    public DataService: DataService,
    private route: ActivatedRoute,
    public homeService: HomepageService,
    private notificationService: NotificationService
  ) {}
  onSelectFile(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      // validate photo files
      const file = event.target.files[0];
      // check định dạng
      const regex = new RegExp(
        "[^\\s]+(.*?)\\.(txt|doc|docx|rar|zip|xls|xlsx|pdf|jpg|gif|png|ppt|pptx)$"
      );
      const isValidFile = regex.test(file.name);
      if (!isValidFile) {
        const modalRefError = this.modalService.open(MessagePopupComponent, {
          size: "sm",
          backdrop: "static",
          keyboard: false,
          centered: true,
        });
        modalRefError.componentInstance.type = "fail";
        modalRefError.componentInstance.title =
          this.translateService.instant(`COMMON.ERROR`);
        modalRefError.componentInstance.message = this.translateService.instant(
          `The file format is not correct, you can only select images in .txt, .doc, .docx, .rar, .zip, .xls, .xlsx, .pdf, .jpg, .gif, .png, .ppt, .pptx. format`
        );
        modalRefError.componentInstance.closeIcon = false;
        return;
      }
      // check dung luong
      if (file.size > 1024 * 1024 * 25) {
        const modalRefError = this.modalService.open(MessagePopupComponent, {
          size: "sm",
          backdrop: "static",
          keyboard: false,
          centered: true,
        });
        modalRefError.componentInstance.type = "fail";
        modalRefError.componentInstance.title =
          this.translateService.instant(`COMMON.ERROR`);
        modalRefError.componentInstance.message = this.translateService.instant(
          `Upload files no larger than 25MB, please check again!`
        );
        modalRefError.componentInstance.closeIcon = false;
        return;
      }
    }
  }
  ngOnInit() {
    // this.dataSource = this.ELEMENT_DATA;
    this.getIdeaDetail();
    this.route.queryParams.subscribe((params) => {
      if (params.id) {
        this.backToPage = "idea/list";
      } else if (params.ideaId) {
        this.backToPage = "home/homepage";
      }
    });
  }

  get backRoute() {
    return this.backToPage
  }

  ideaDetail: IdeaDetail;
  listContributorDTO: [];
  documentDTO: document;
  canEdit: boolean = false;
  lang = localStorage.getItem("lang");
  getIdeaDetail() {
    const url = `${environment.API_HOST_NAME}/api/get-idea-detail`;
    const headers = new HttpHeaders({
      "Accept-Language": this.lang,
      Authorization: `Bearer ` + this.token,
    });
    const requestBody = {
      ideaDTO: {
        ideaId: this.ideaId,
      },
    };
    return this.http.post<any>(url, requestBody, { headers }).subscribe(
      (response) => {
        this.ideaDetail = response.data;
        if (this.ideaDetail && this.ideaDetail.approveStatus == 0) {
          this.canEdit = true;
        }
        this.listContributorDTO = response.data.listContributorDTO;
        this.documentDTO = response.data.documentDTO;
        console.log(this.ideaDetail);
        const listContributorIn = response.data.listContributorDTO.filter(
          (contributor) => contributor.staffCode
        );
        const listContributorOut = response.data.listContributorDTO.filter(
          (contributor) => !contributor.staffCode
        );
        this.dataSource = listContributorIn;
        this.dataSource2 = listContributorOut;
      },
      (error) => {
        console.error(error.data);
      }
    );
  }
  AddInsideAuthor() {
    this.router.navigate(["idea/inside-author"]);
    window.scrollTo(0, 0);
  }
  AddOutsideAuthor() {
    this.router.navigate(["idea/outside-author"]);
    window.scrollTo(0, 0);
  }
  goToEdit() {
    this.DataService.backFromEdit = false;
    this.DataService.ideaName2.next(null);
    this.DataService.selectedLanguage.next(null);
    this.DataService.selectedStartDate.next(null);
    this.DataService.selectedUnitValueEdit.next(null);
    this.DataService.selectedSpecialtyValueEdit.next(null);
    this.DataService.selectedEndDate.next(null);
    this.DataService.beforeApplyStatus.next(null);
    this.DataService.content.next(null);
    this.DataService.applyRange.next(null);
    this.DataService.effectiveness.next(null);
    this.DataService.nextStep.next(null);
    this.DataService.note.next(null);
    this.DataService.isEndDateTouched=false;
    this.router.navigate(["idea/edit"], { queryParams: { id: this.ideaId } });
    window.scrollTo(0, 0);
  }

  handleFileDownload() {
    //
    const url = `${environment.API_HOST_NAME}/api/download-document`;
    const headers = new HttpHeaders({
      "Accept-Language": this.lang,
      Authorization: `Bearer ` + this.token,
    });
    const request = {
      requestSupportDTO: {
        requestSupportType: 1,
        objId: this.documentDTO.objId,
      },
    };
    return this.http.post<any>(url, request, { headers }).subscribe((res) => {
      if (res.errorCode === "0") {
        let mimeType = res.data.typeFile;
        const a = document.createElement("a");
        a.href = "data:" + mimeType + ";base64," + res.data.fileContent;
        a.download = this.documentDTO.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        a.remove();
      } else {
        // show error
      }
    });
  }
  apiApprove() {
    const modalRefSuccess = this.modalService.open(MessagePopupComponent, {
      size: "sm",
      backdrop: "static",
      keyboard: false,
      centered: true,
    });
    modalRefSuccess.componentInstance.type = "confirm";
    modalRefSuccess.componentInstance.title = this.translateService.instant(
      `ADD-INSIDE-IDEA.CONFIRM.CONFIRM`
    );
    modalRefSuccess.componentInstance.message = this.translateService.instant(
      `IDEA_MANAGEMENT.MESSAGE.CONFIRM_EVALUATION_MESSAGE`,
      { id: this.ideaId }
    );
    modalRefSuccess.componentInstance.closeIcon = false;
    const url = `${environment.API_HOST_NAME}/api/request-approve-idea`;
    const headers = new HttpHeaders({
      "Accept-Language": this.lang,
      Authorization: `Bearer ` + this.token,
    });
    const request = {
      ideaDTO: {
        ideaId: this.ideaId,
      },
    };
    modalRefSuccess.componentInstance.next.subscribe((result: any) => {
      if (result === true) {
        return this.http.post<any>(url, request, { headers }).subscribe(
          (response) => {
            if (response.errorCode == 0) {
              this.notificationService.notify("success", response.description);
              this.router.navigate(["idea"]);
            } else {
              const modalRef = this.modalService.open(MessagePopupComponent, {
                size: "sm",
                backdrop: "static",
                keyboard: false,
                centered: true,
              });
              modalRef.componentInstance.type = "fail";
              modalRef.componentInstance.title = this.translateService.instant(
                `ADD-INSIDE-IDEA.VALIDATE.ERROR`
              );
              modalRef.componentInstance.message =
                modalRef.componentInstance.message = response.description;
              modalRef.componentInstance.closeIcon = false;
            }
          },
          (error) => {
            console.error(error.data);
          }
        );
      } else {
      }
    });
  }
}
