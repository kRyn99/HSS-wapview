import { Component, OnDestroy, OnInit } from "@angular/core";
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
import { first } from "rxjs/operators";
import { Subscription } from "rxjs";
import { ContrivanceService } from "@app/shared/service/contrivance.service";
import { NotificationService } from "@app/shared/service/notification.service";

interface ContrivanceData {
  contrivanceName?: string;
  applyStartTime?: string;
  applyEndTime?: string;
  unitNames?: string;
  specialtyName?: string;
  ideaName?: string;
  ideaId?: number;
  contrivanceId?: number;
  approveStatusName?: string;
  currentStatus?: string;
  content?: string;
  applianceCondition?: string;
  creativePoint?: string;
  effectiveness?: string;
  percentDup?: string;
  checkBonus?: any;
  approveStatus?: number;
  effectiveValue?:number;
  bonus?:number;
  listUnitDTO?: [];
}
interface Document {
  url: string;
  name: string;
  objId: number;
}
@Component({
  selector: "app-contrivance-detail",
  templateUrl: "./contrivance-detail.component.html",
  styleUrls: ["./contrivance-detail.component.scss"],
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
export class ContrivanceDetailComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  bsConfig: Partial<BsDatepickerConfig>;
  dataSource: any;
  dataSource2: any;
  columnsToDisplay = ['staffCode', 'fullName', 'percentage'];
  columnsToDisplayWithExpand = ['expand', ...this.columnsToDisplay,];
  columnsToDisplay2 = ["fullName", "percentage"];
  columnsToDisplayWithExpand2 = ["expand", ...this.columnsToDisplay2];
  expandedElement: PeriodicElement | null;
  contrivanceId = JSON.parse(
    localStorage.getItem("contrivanceIdInLocalStorage")
  );
  token = JSON.parse(localStorage.getItem("tokenInLocalStorage"));
  contrivanceData: ContrivanceData;
  listContributorDTO: [];
  listOutsideContributorDTO: [];
  documentDTO: Document;
  shouldNavigateByUrl = false;
  objectId: string;
  canEdit: boolean = false;
  backToPage='contrivance/list';
  constructor(
    private route: ActivatedRoute,
    private bsLocaleService: BsLocaleService,
    private router: Router,
    private modalService: NgbModal,
    private translateService: TranslateService,
    private contrivanceService: ContrivanceService,
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
        this.notificationService.notify(
          "fail",
          "The file format is not correct, you can only select images in .txt, .doc, .docx, .rar, .zip, .xls, .xlsx, .pdf, .jpg, .gif, .png, .ppt, .pptx. format"
        );
        return;
      }
      // check dung luong
      if (file.size > 1024 * 1024 * 25) {
        this.notificationService.notify(
          "fail",
          "Upload files no larger than 25MB, please check again!"
        );
        return;
      }
    }
  }

  getContrivanceDetail() {
    const request = {
      contrivancesDTO: {
        contrivanceId: this.contrivanceId,
      },
    };
    const listContrivance = this.contrivanceService
      .getContrivanceDetail(request)
      .pipe(first())
      .subscribe(
        (res) => {
          if (res.errorCode === "0") {
            this.contrivanceData = res.data;
            if (this.contrivanceData && this.contrivanceData.approveStatus == 0) {
              this.canEdit = true;
            }
            this.listContributorDTO = res.data.listContributorDTO;
            this.documentDTO = res.data.documentDTO;
            const listContributorIn = res.data.listContributorDTO.filter(contributor => contributor.staffCode);
            const listContributorOut = res.data.listContributorDTO.filter(contributor => !contributor.staffCode);
            this.dataSource = listContributorIn;
            this.dataSource2 = listContributorOut;
          } else {
            // show error
            this.notificationService.notify("fail", res.description);
          }
        },
        (error) => {
          // show error neu exception
          this.notificationService.notify("fail", "COMMON.ERROR_SERVICE");
        }
      );
    this.subscriptions.push(listContrivance);
  }
  ngOnInit() {
    this.getContrivanceDetail();
    this.route.queryParams.subscribe((params) => {
      if(params.id){
        this.backToPage = 'contrivance/list'
      }else if(params.contrivanceId){
        this.backToPage = 'home/homepage'
      }
      
    });
  }
  get backRoute() {
    return this.backToPage
  }
  goToEdit() {
    this.contrivanceService.selectedUnit.next(null);
    this.contrivanceData.checkBonus =
      this.contrivanceData.checkBonus == 0 ? true : false;
    this.contrivanceService.contrivancesDTO.next(this.contrivanceData);
    this.contrivanceService.lstContributorDTOService.next(
      this.listContributorDTO.filter((item: any) => item.staffId !== null)
    );
    this.contrivanceService.lstContributorDTOServiceOut.next(
      this.listContributorDTO.filter((item: any) => item.staffId === null)
    );
    this.contrivanceService.selectedUnitValue.next(
      this.contrivanceData.listUnitDTO
    );
    this.contrivanceService.file.next(this.documentDTO);
    this.router.navigate(["contrivance/edit"]);
  }
  handleFileDownload() {
    const request = {
      requestSupportDTO: {
        requestSupportType: 2,
        objId: this.documentDTO.objId,
      },
    };
    const sdd = this.contrivanceService
      .callApiCommon("download-document", request)
      .subscribe(
        (res) => {
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
            this.notificationService.notify("fail", res.description);
          }
        },
        (error) => {
          // show error neu exception
          this.notificationService.notify("fail", "COMMON.ERROR_SERVICE");
        }
      );
    this.subscriptions.push(sdd);
  }
  evaluateContrivance() {
    const modalRefSuccess = this.modalService.open(MessagePopupComponent, {
      size: "sm",
      backdrop: "static",
      keyboard: false,
      centered: true,
    });
    modalRefSuccess.componentInstance.type = "confirm";
    modalRefSuccess.componentInstance.title = this.translateService.instant(
      "COMMON_MODAL.WARNING"
    );
    modalRefSuccess.componentInstance.message = this.translateService.instant(
      "CONTRIVANCE_MAMAGEMENT.LABEL.CF_APPROVE_CONTRIVANCE",
      { name: this.contrivanceData?.contrivanceName }
    );
    modalRefSuccess.componentInstance.closeIcon = false;
    modalRefSuccess.componentInstance.next.subscribe((result: any) => {
      if (result === true) {
        const request = {
          contrivancesDTO: {
            contrivanceId: this.contrivanceId,
          },
        };
        this.contrivanceService
          .callApiCommon("request-approve-contrivance", request)
          .subscribe(
            (res) => {
              if (res && res.errorCode === "0") {                
                this.notificationService.notify("success", res.description);
                this.router.navigate(["contrivance"]);
              } else {
                this.notificationService.notify("fail", res.description);
              }
            },
            (error) => {
              this.notificationService.notify(
                "fail",
                error.err.message || error.message
              );
            }
          );
      }
    });
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  
  viewIdeaDetail(id){

  }
}
