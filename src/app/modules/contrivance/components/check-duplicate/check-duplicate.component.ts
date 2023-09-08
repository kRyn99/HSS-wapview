import { map } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgSelectConfig } from "@ng-select/ng-select";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ContrivanceService } from "@app/shared/service/contrivance.service";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NotificationService } from "@app/shared/service/notification.service";
import * as moment from 'moment';
import { MessagePopupComponent } from '@app/modules/common-items/components/message-popup/message-popup.component';

@Component({
  selector: "app-check-duplicate",
  templateUrl: "./check-duplicate.component.html",
  styleUrls: ["./check-duplicate.component.scss"],
})

export class CheckDuplicateComponent implements OnInit {
  listContrivance = new BehaviorSubject<any[]>([]);
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
  recordTotal: number;
  isFromAdd: boolean;
  contrivanceId = JSON.parse(
    localStorage.getItem("contrivanceIdInLocalStorage")
  );
  
  constructor(
    public contrivanceService: ContrivanceService,
    private router: Router,
    private modalService: NgbModal,
    private translateService: TranslateService,
    private notificationService: NotificationService,
  ) {
  }
  
  ngOnInit() {
    if (this.contrivanceService.contrivancesDTO.value == null) {
      this.notificationService.notify("fail", "CONTRIVANCE_MAMAGEMENT.LABEL.ACTION_CORRUPTED");
      this.router.navigate(["contrivance/list"]);
    }
    this.isFromAdd = this.contrivanceService.isFromAdd;
    this.checkDuplicate();
  }
  
  checkDuplicate() {
    if (this.contrivanceService.contrivancesDTO.value) {
      let requestBody = {
        contrivancesDTO: {
          contrivanceName: this.contrivanceService.contrivancesDTO.value?.contrivanceName,
          specialty: this.contrivanceService.contrivancesDTO.value?.specialty,
          content: this.contrivanceService.contrivancesDTO.value?.content,
        },
      };
      this.contrivanceService.callApiCommon("check-duplicate-contrivance", requestBody).subscribe(
        (res) => {
          if (res.errorCode == "0" || res.errorCode == "200") {
            let data = res.data.map((item) => ({...item, isCollapsed: true}));
            //Pagination
            this.listContrivanceFull = data;
            this.recordTotal = data.length;
            this.paginator.total = this.recordTotal;
            this.paginator.page = 1;
            this.handlePaginatorChange();
    
          } else {
            this.notificationService.notify("fail", res.description);
          }
        },
        (err) => {
          this.notificationService.notify("fail", "COMMON.ERROR_SERVICE");
        }
      );
    }
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
    this.firstIndex = this.recordTotal == 0 ? 0 : ((this.paginator.page - 1) * this.paginator.pageSize + 1);
    this.lastIndex = this.firstIndex + +this.paginator.pageSize > this.recordTotal ? this.recordTotal : (this.paginator.page * this.paginator.pageSize);
    let pageList = [...this.listContrivanceFull];
    this.listContrivance.next(pageList.slice((this.paginator.page - 1) * this.paginator.pageSize, this.paginator.page * this.paginator.pageSize));
  }

  register() {
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
      this.isFromAdd ? "CONTRIVANCE_MAMAGEMENT.LABEL.CF_ADD_CONTRIVANCE" : "CONTRIVANCE_MAMAGEMENT.LABEL.CF_UPDATE_CONTRIVANCE"
    );
    modalRefSuccess.componentInstance.closeIcon = false;
    modalRefSuccess.componentInstance.next.subscribe((result: any) => {
      if (result === true) {
        const currentFileValue = this.contrivanceService.file.getValue();
        const fileName = currentFileValue?.name;
        const fileUrl = currentFileValue?.url;
        const requestBody = {
          contrivancesDTO: {
            ...this.contrivanceService.contrivancesDTO.value,
            contrivanceId: this.isFromAdd ? null : this.contrivanceId,
          },
          lstContributorDTO:
            this.contrivanceService.lstContributorDTOServiceOut.value.concat(
              this.contrivanceService.lstContributorDTOService.value
            ),
          documentDTO: {
            url: fileUrl,
            name: fileName,
          },
        };
        requestBody.contrivancesDTO.checkBonus = requestBody.contrivancesDTO.checkBonus ? 0 : 1;
        requestBody.contrivancesDTO.applyStartTime =  moment(requestBody.contrivancesDTO.applyStartTime).format("DD/MM/YYYY");
        requestBody.contrivancesDTO.applyEndTime = !requestBody.contrivancesDTO.applyEndTime ? null : moment(requestBody.contrivancesDTO.applyEndTime).format("DD/MM/YYYY");
        this.contrivanceService.callApiCommon(this.isFromAdd ? "create-contrivance" : "update-contrivance", requestBody).subscribe(
          (response) => {
            if (response.errorCode == 0) {
              this.notificationService.notify("success", response.description);
              this.router.navigate(["contrivance"]);
            } else {
              this.notificationService.notify("fail", response.description);
            }
          },
          (error) => {
            this.notificationService.notify("fail", "COMMON.ERROR_SERVICE");
          }
        );
      }
    });
  }
}
