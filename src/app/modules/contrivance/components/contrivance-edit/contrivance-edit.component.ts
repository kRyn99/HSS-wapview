import {Component, OnDestroy, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {PeriodicElement} from '@app/modules/idea/PeriodicElement';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UnitDTO } from '@app/shared/model/unit.model';
import { ContrivanceService } from '@app/shared/service/contrivance.service';
import { NotificationService } from '@app/shared/service/notification.service';
import { CommonFormUtils } from '@app/shared/utils/form.utils';
import * as moment from 'moment';
import { Subject, Subscription, BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { MessagePopupComponent } from '@app/modules/common-items/components/message-popup/message-popup.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contrivance-edit',
  templateUrl: './contrivance-edit.component.html',
  styleUrls: ['./contrivance-edit.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class ContrivanceEditComponent implements OnInit, OnDestroy{
  bsConfig: Partial<BsDatepickerConfig> = {
    isAnimated: true,
    dateInputFormat: "DD/MM/YYYY",
    displayOneMonthRange: false,
    displayMonths: 1,
  };
  columnsToDisplay = ["staffCode", "fullName", "percentage"];
  columnsToDisplayWithExpand = [
    "expand",
    ...this.columnsToDisplay
  ];
  columnsToDisplay2 = ["fullName", "percentage"];
  columnsToDisplayWithExpand2 = [
    "expand",
    ...this.columnsToDisplay2
  ];
  columnName = {
    staffCode: "CONTRIVANCE_MAMAGEMENT.LABEL.STAFF_CODE_SHORT_LABEL",
    staffName: "CONTRIVANCE_MAMAGEMENT.LABEL.STAFF_NAME_SHORT_LABEL",
    contributePercent: "IDEA_MANAGEMENT.LABEL.CONTRIBUTE_PERCENT",
  };
  requiredColumnInGroup = ["staffCode", "percentage"];
  requiredColumnOutGroup = ["fullName", "percentage"];
  expandedElement: PeriodicElement | null;

  msgListUnit = "";
  showFileName: boolean = false;
  fileInfo = { url: "", name: "" };
  listUnitData: UnitDTO[] = [];
  unitName: string = "";
  startDateModel = new Date();
  endDateModel = new Date();
  userName: string = "";
  listSelect: any;
  modelChangedIn = new Subject<string>();
  modelChangedOut = new Subject<string>();
  subscriptions: Subscription[] = [];
  listStaffInData = new BehaviorSubject<any>([]);
  listStaffOutData = new BehaviorSubject<any>([]);
  listStaffInCheck: any[] = [];
  listStaffOutCheck: any[] = [];
  detailContrivance: any = null;
  mode: string = "add";
  selectedFile: File | undefined;

  selectedUnitValue: any[] = [];
  dataSource: any;
  dataSource2: any;
  contrivanceId = JSON.parse(localStorage.getItem('contrivanceIdInLocalStorage'));
  token = JSON.parse(localStorage.getItem("tokenInLocalStorage"));
  contrivancesDTO: any;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private contrivanceService: ContrivanceService,
    private fb: FormBuilder,
    private translateService: TranslateService,
    public modalService: NgbModal,
    public formUtils: CommonFormUtils
  ) {}

  ngOnInit() {
    if (this.contrivanceService.contrivancesDTO.value == null) {
      this.notificationService.notify("fail", "CONTRIVANCE_MAMAGEMENT.LABEL.ACTION_CORRUPTED");
      this.router.navigate(["contrivance/list"]);
    }
    const slu = this.getListUnit();
    this.subscriptions.push(slu);
    const sls = this.getListSpecialty();
    this.subscriptions.push(sls);
    const sli = this.getListIdea();
    this.subscriptions.push(sli);
    this.dataSource = new MatTableDataSource(
      this.contrivanceService.lstContributorDTOService.value
    );
    this.dataSource2 = new MatTableDataSource(
      this.contrivanceService.lstContributorDTOServiceOut.value
    );
    this.contrivanceService.selectedUnitValue.subscribe((value) => {
      this.selectedUnitValue = value;
    });
    this.contrivanceService.file.subscribe((value) => {
      this.fileInfo = value;
    });
    this.loadAddForm();
  }

  listUnit: any[] = [];
  getListUnit() {
    const requestBody = {
      userName: "hss_admin",
    };
    return this.contrivanceService
      .callApiCommon("get-list-unit", requestBody)
      .subscribe(
        (response) => {
          this.listUnit = response.data;
          let listIdSelect = this.selectedUnitValue?.map((item) => item.unitId);
          this.listUnit.forEach((item: any) => {
            if (listIdSelect?.includes(item.unitId)) {
              item.selected = true;
            } else {
              item.selected = false;
            }
          });
        },
        (error) => {
          console.error(error.description);
        }
      );
  }

  listSpecialty: any[] = [];
  getListSpecialty() {
    const requestBody = {};
    return this.contrivanceService
      .callApiCommonUsingGet("get-list-specialty", requestBody)
      .subscribe(
        (response) => {
          this.listSpecialty = response.data;
        },
        (error) => {
          console.error(error.description);
        }
      );
  }

  listIdea: any[] = [];
  getListIdea() {
    const requestBody = {};
    return this.contrivanceService
      .callApiCommonUsingGet("get-list-ideas-approved", requestBody)
      .subscribe(
        (response) => {
          this.listIdea = response.data;
        },
        (error) => {
          console.error(error.description);
        }
      );
  }

  loadAddForm() {
    this.startDateModel.setHours(0, 0, 0, 0);
    this.endDateModel.setHours(0, 0, 0, 0);
    if (this.contrivanceService.contrivancesDTO.value) {
      let contrivancesDTO = this.contrivanceService.contrivancesDTO.value;
      this.formUtils.setForm(
        this.fb.group({
          contrivanceName: [contrivancesDTO.contrivanceName, Validators.required],
          currentStatus: [contrivancesDTO.currentStatus, Validators.required],
          content: [contrivancesDTO.content, Validators.required],
          applianceCondition: [contrivancesDTO.applianceCondition, Validators.required],
          applyStartTime: [contrivancesDTO.applyStartTime, Validators.required],
          applyEndTime: [contrivancesDTO.applyEndTime, Validators.required],
          effectiveness: [contrivancesDTO.effectiveness, Validators.required],
          creativePoint: [contrivancesDTO.creativePoint, Validators.required],
          specialty: [contrivancesDTO.specialty, Validators.required],
          ideaId: [contrivancesDTO.ideaId, Validators.required],
          checkBonus: [contrivancesDTO.checkBonus],
          effectiveValue: [contrivancesDTO.effectiveValue, Validators.required],
          bonus: [contrivancesDTO.bonus, Validators.required],
          listUnitDTO: [contrivancesDTO.listUnitDTO, Validators.required],
        })
      );
    } else {
      this.formUtils.setForm(
        this.fb.group({
          contrivanceName: ["", Validators.required],
          currentStatus: ["", Validators.required],
          content: ["", Validators.required],
          applianceCondition: ["", Validators.required],
          applyStartTime: [this.startDateModel, Validators.required],
          applyEndTime: [this.endDateModel, Validators.required],
          effectiveness: ["", Validators.required],
          creativePoint: ["", Validators.required],
          specialty: [null, Validators.required],
          ideaId: [null, Validators.required],
          checkBonus: [false],
          effectiveValue: ["", Validators.required],
          bonus: ["", Validators.required],
          listUnitDTO: [[], Validators.required],
        })
      );
    }
  }

  toggleDropdown() {
    this.contrivanceService.showDropdown =
      !this.contrivanceService.showDropdown;
  }

  onCheckboxChange(item: any, event: any) {
    if (item) {
      item.selected = event.target.checked;
      if (item.selected) {
        if (!this.selectedUnitValue) {
          this.selectedUnitValue = []; // Khởi tạo mảng nếu chưa tồn tại
        }
        this.selectedUnitValue.push(item);
      } else {
        let tempListUnit = this.selectedUnitValue;
        tempListUnit.forEach((unit, index) => {
          if (unit.unitId == item.unitId) {
            tempListUnit.splice(index, 1);
          }
        });
        this.selectedUnitValue = tempListUnit;
      }
    }
    this.contrivanceService.selectedUnitValue.next(this.selectedUnitValue);
    this.formUtils.control("listUnitDTO").setValue(this.selectedUnitValue);
    this.formUtils.control("listUnitDTO").markAsTouched();
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      // validate photo files
      const file = event.target.files[0];
      // check định dạng
      const regex =
        /[^\s]+(.*?)\.(txt|doc|docx|rar|zip|xls|xlsx|pdf|jpg|gif|png|ppt|pptx)$/;
      const isValidFile = regex.test(file.name);
      if (!isValidFile) {
        this.notificationService.notify(
          "fail",
          `IDEA_MANAGEMENT.MESSAGE.FILE_UPLOAD_INCORRECT_TYPE`
        );
        return;
      }
      // check dung luong
      if (file.size > 1024 * 1024 * 25) {
        this.notificationService.notify(
          "fail",
          `IDEA_MANAGEMENT.MESSAGE.FILE_UPLOAD_MAX_CAPACITY`
        );
        return;
      }
      this.fileInfo.name = file.name;

      const formData: FormData = new FormData();
      formData.append("listDocument", file);
      const uploadFile = this.contrivanceService
        .callApiCommon("upload-document", formData)
        .pipe(first())
        .subscribe((res) => {
          if (res.errorCode === "0" || res.errorCode === "200") {
            this.fileInfo.url = res.data;
          } else {
            this.notificationService.notify("fail", res.description);
          }
        });
      this.subscriptions.push(uploadFile);
    }
  }

  changeCheckBonus(event) {
    let effectiveValue = this.formUtils.control("effectiveValue");
    let bonus = this.formUtils.control("bonus");
    if (event.target.checked) {
      effectiveValue.setValue("");
      effectiveValue.clearValidators();
      bonus.setValue("");
      bonus.clearValidators();
    } else {
      effectiveValue.setValidators(Validators.required);
      bonus.setValidators(Validators.required);
    }
    effectiveValue.updateValueAndValidity();
    bonus.updateValueAndValidity();
  }

  duplicationCheck() {
    // if (!this.formUtils.isValidForm()) {
    //   this.formUtils.form.markAllAsTouched();
    // } else {
    this.validateBeforeCheckDuplicate();
    // }
  }

  getContrivancesDTO() {
    this.contrivancesDTO = {
      contrivanceName: this.formUtils.control("contrivanceName").value,
      currentStatus: this.formUtils.control("currentStatus").value,
      content: this.formUtils.control("content").value,
      applianceCondition: this.formUtils.control("applianceCondition").value,
      applyStartTime: this.formUtils.control("applyStartTime").value,
      applyEndTime: this.formUtils.control("applyEndTime").value,
      effectiveness: this.formUtils.control("effectiveness").value,
      creativePoint: this.formUtils.control("creativePoint").value,
      specialty: this.formUtils.control("specialty").value,
      ideaId: this.formUtils.control("ideaId").value,
      checkBonus: this.formUtils.control("checkBonus").value,
      effectiveValue: this.formUtils.control("effectiveValue").value,
      bonus: this.formUtils.control("bonus").value,
      listUnitDTO: this.formUtils.control("listUnitDTO").value,
    };
    this.contrivanceService.file.next(this.fileInfo);
  }

  validateBeforeCheckDuplicate() {
    const currentFileValue = this.contrivanceService.file.getValue();
    const fileName = currentFileValue.name;
    const fileUrl = currentFileValue.url;
    this.getContrivancesDTO();
    const requestBody = {
      contrivancesDTO: {...this.contrivancesDTO},
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
    requestBody.contrivancesDTO.applyStartTime = moment(requestBody.contrivancesDTO.applyStartTime).format("DD/MM/YYYY");
    requestBody.contrivancesDTO.applyEndTime = moment(requestBody.contrivancesDTO.applyEndTime).format("DD/MM/YYYY");
    const validate = this.contrivanceService.callApiCommon("validate-before-create-contrivance-cms", requestBody).subscribe(
      (response) => {
        if (response.errorCode == 0) {
          this.contrivanceService.contrivancesDTO.next(this.contrivancesDTO);
          this.contrivanceService.isFromAdd = false;
          this.router.navigate(["contrivance/check-duplicate"]);
        } else {
          this.notificationService.notify("fail", response.description);
          this.formUtils.form.markAllAsTouched();
        }
      },
      () => {
        this.notificationService.notify("fail", "COMMON.ERROR_SERVICE");
      }
    );
    this.subscriptions.push(validate);
  }

  deleteContrivance() {
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
      "CONTRIVANCE_MAMAGEMENT.LABEL.CF_DELETE_CONTRIVANCE",
      { name: this.contrivanceService.contrivancesDTO.value.contrivanceName }
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
          .callApiCommon("update-contrivance-status", request)
          .subscribe(
            (res) => {
              if (res && res.errorCode === "0") {
                this.notificationService.notify("success", res.description);
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

  AddInsideAuthor() {
    this.getContrivancesDTO();
    this.contrivanceService.contrivancesDTO.next(this.contrivancesDTO);
    this.router.navigate(["author/add-inside-edit"], {
      queryParams: { for: "contrivance" },
    });
  }
  AddOutsideAuthor() {
    this.getContrivancesDTO();
    this.contrivanceService.contrivancesDTO.next(this.contrivancesDTO);
    this.router.navigate(["author/add-outside-edit"], {
      queryParams: { for: "contrivance" },
    });
  }
  EditInsideAuthor(id: number) {
    this.getContrivancesDTO();
    this.contrivanceService.contrivancesDTO.next(this.contrivancesDTO);
    this.router.navigate(["author/edit-inside-edit"], {
      queryParams: { id: id, for: "contrivance" },
    });
  }
  EditOutsideAuthor(phoneNumber: any, email: any) {
    this.getContrivancesDTO();
    this.contrivanceService.contrivancesDTO.next(this.contrivancesDTO);
    this.router.navigate(["author/edit-outside-edit"], {
      queryParams: {
        phoneNumber: phoneNumber,
        email: email,
        for: "contrivance",
      },
    });
  }
  deleteInsideAuthor(id: any) {
    this.contrivanceService.lstContributorDTOService.value.forEach(
      (item, index) => {
        if (item.staffId === id) {
          this.contrivanceService.lstContributorDTOService.value.splice(
            index,
            1
          );
          this.dataSource = new MatTableDataSource(
            this.contrivanceService.lstContributorDTOService.value
          );
        }
      }
    );
  }
  deleteOutsideAuthor(phoneNumber: any, email: any) {
    this.contrivanceService.lstContributorDTOServiceOut.value.forEach(
      (item, index) => {
        if (item.phoneNumber === phoneNumber && item.email === email) {
          this.contrivanceService.lstContributorDTOServiceOut.value.splice(
            index,
            1
          );
          this.dataSource2 = new MatTableDataSource(
            this.contrivanceService.lstContributorDTOServiceOut.value
          );
        }
      }
    );
  }

  // get addForm(): FormGroup {
  //   return this.formUtils.form;
  // }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}

