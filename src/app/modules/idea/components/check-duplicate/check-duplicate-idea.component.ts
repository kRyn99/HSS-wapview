import { map } from "rxjs/operators";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgSelectConfig } from "@ng-select/ng-select";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ContrivanceService } from "@app/shared/service/contrivance.service";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NotificationService } from "@app/shared/service/notification.service";
import * as moment from "moment";
import { DataService } from "../../../../shared/service/data.service";
import { environment } from "@env/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MessagePopupComponent } from "@app/modules/common-items/components/message-popup/message-popup.component";

@Component({
  selector: "app-check-duplicate-idea",
  templateUrl: "./check-duplicate-idea.component.html",
  styleUrls: ["./check-duplicate-idea.component.scss"],
})
export class CheckDuplicateComponentIdea implements OnInit {
  listContrivance = new BehaviorSubject<any[]>([]);
  listIdea = new BehaviorSubject<any[]>([]);
  paginator = { page: 1, pageSize: 10, total: 0 };
  firstIndex = 0;
  lastIndex = 0;
  records = [
    {
      value: 10,
    },
    {
      value: 15,
    },
    {
      value: 20,
    },
    {
      value: 30,
    },
    {
      value: 50,
    },
  ];
  listContrivanceFull = [];
  listIdeaFull = [];
  recordTotal: number;
  isFromAdd: boolean;

  constructor(
    public contrivanceService: ContrivanceService,
    private router: Router,
    private modalService: NgbModal,
    private translateService: TranslateService,
    private notificationService: NotificationService,
    public DataService: DataService,
    private http: HttpClient
  ) {
    this.isFromAdd = this.DataService.getFromAdd();
  }
  goBack(){
    this.DataService.showBg = false;
    this.DataService.showAddInsideAuthor = false;
    this.DataService.showEditInsideAuthor = false;
    this.DataService.showAddOutsideAuthor = false;
    this.DataService.showEditOutsideAuthor = false;
    this.DataService.showDuplicateIdea = false;
    this.DataService.showAddInsideEdit = false;
    this.DataService.showEditInsideEdit = false;
    this.DataService.showAddOutsideEdit = false;
    this.DataService.showEditOutsideEdit = false;
    if (!this.DataService.showBg) {
      document.body.style.overflow = "auto";
    }
  }
  ngOnInit() {
    console.log(this.DataService.ideaDTO);

    this.checkDuplicate();
  }

  token = JSON.parse(localStorage.getItem("tokenInLocalStorage"));
  lang = localStorage.getItem("lang");
  checkDuplicate() {
    const url = `${environment.API_HOST_NAME}/api/check-duplicate-idea`;
    const headers = new HttpHeaders({
      "Accept-Language": this.lang,
      Authorization: `Bearer ` + this.token,
    });

    let requestBody = {};

    if (this.isFromAdd) {
      requestBody = {
        ideaDTO: {
          ideaName: this.DataService.ideaDTO.value?.ideaName,
          specialty: this.DataService.ideaDTO.value?.specialty,
          content: this.DataService.ideaDTO.value?.content,
        },
      };
    } else {
      requestBody = {
        ideaDTO: {
          ideaName: this.DataService.ideaDTOEdit.value?.ideaName,
          specialty: this.DataService.ideaDTOEdit.value?.specialty,
          content: this.DataService.ideaDTOEdit.value?.content,
        },
      };
    }

    return this.http.post<any>(url, requestBody, { headers }).subscribe(
      (res) => {
        if (res.errorCode == "0" || res.errorCode == "200") {
          let data = res.data.map((item) => ({ ...item, isCollapsed: true }));
          // Pagination
          this.listIdeaFull = data;
          this.recordTotal = data.length;
          this.paginator.total = this.recordTotal;
          this.paginator.page = 1;
          this.handlePaginatorChange();
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
          modalRef.componentInstance.message = res.description;
          modalRef.componentInstance.closeIcon = false;
        }
      },
      (error) => {
        console.error(error.data);
      }
    );
  }

  changeNumberOfRecord(event) {
    this.paginator.pageSize = event.target.value;
    this.paginator.page = 1;
    this.handlePaginatorChange();
  }

  pageChange(page) {
    this.paginator.page = page;
    this.handlePaginatorChange();
  }

  handlePaginatorChange() {
    this.firstIndex =
      this.recordTotal == 0
        ? 0
        : (this.paginator.page - 1) * this.paginator.pageSize + 1;
    this.lastIndex =
      this.firstIndex + +this.paginator.pageSize > this.recordTotal
        ? this.recordTotal
        : this.paginator.page * this.paginator.pageSize;
    let pageList = [...this.listIdeaFull];
    this.listIdea.next(
      pageList.slice(
        (this.paginator.page - 1) * this.paginator.pageSize,
        this.paginator.page * this.paginator.pageSize
      )
    );
  }

  register() {
    const url = `${environment.API_HOST_NAME}/api/create-idea`;

    const headers = new HttpHeaders({
      "Accept-Language": this.lang,
      Authorization: `Bearer ` + this.token,
    });
    const requestBody = {
      ideaDTO: { ...this.DataService.ideaDTO.value },
      lstContributorDTO:
        this.DataService.lstContributorDTOServiceOut.value.concat(
          this.DataService.lstContributorDTOService.value
        ),
      documentDTO: {
        url:this.DataService.documentDTO.value ?this.DataService.documentDTO.value.url : '',
        name: this.DataService.documentDTO.value ?  this.DataService.documentDTO.value.name:'' 
      },
    };
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
      `IDEA_MANAGEMENT.MESSAGE.CF_ADD_IDEA`
    );
    modalRefSuccess.componentInstance.closeIcon = false;
    modalRefSuccess.componentInstance.next.subscribe((result: any) => {
      if (result === true) {
        return this.http.post<any>(url, requestBody, { headers }).subscribe(
          (response) => {
            if (response.errorCode == 0) {
              this.DataService.showBg = false;
              this.DataService.showDuplicateIdea = false;
              this.notificationService.notify("success", response.description);
              this.router.navigate(["/idea/list"]);
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

  registerEdit() {
    const newList = [];
    for (let i = 0; i < this.DataService.lstContributorDTOServiceOutEdit.value.length; i++) {
      const newItem = { ...this.DataService.lstContributorDTOServiceOutEdit.value[i] };
      delete newItem.displayName;
      newList.push(newItem);   
    }
    console.log(newList);
    console.log(this.DataService.lstContributorDTOServiceOutEdit.value);
    
    const url = `${environment.API_HOST_NAME}/api/update-idea`;

    const headers = new HttpHeaders({
      "Accept-Language": this.lang,
      Authorization: `Bearer ` + this.token,
    });
    const requestBody = {
      ideaDTO: { ...this.DataService.ideaDTOEdit.value },
      lstContributorDTO:
        newList.concat(
          this.DataService.lstContributorDTOServiceEdit.value
        ),
      documentDTO: {
        url: this.DataService.documentDTO.value ? this.DataService.documentDTO.value.url : '',
        name: this.DataService.documentDTO.value ? this.DataService.documentDTO.value.name: '',
      },
    };
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
      `IDEA_MANAGEMENT.MESSAGE.CF_UPDATE_IDEA`
    );
    modalRefSuccess.componentInstance.closeIcon = false;
    modalRefSuccess.componentInstance.next.subscribe((result: any) => {
      if (result === true) {
        return this.http.post<any>(url, requestBody, { headers }).subscribe(
          (response) => {
            if (response.errorCode == 0) {
              this.DataService.showBg = false;
              this.DataService.showDuplicateIdea = false;
              this.notificationService.notify("success", response.description);
              this.router.navigate(["/idea/list"]);
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
