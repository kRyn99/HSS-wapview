import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { PeriodicElement } from "@app/modules/idea/PeriodicElement";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbActiveModal, NgbDate, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UnitDTO } from "@app/shared/model/unit.model";
import { Subject, Subscription, BehaviorSubject } from "rxjs";
import { debounceTime, first } from "rxjs/operators";
import { NotificationService } from "@app/shared/service/notification.service";
import { ContrivanceService } from "@app/shared/service/contrivance.service";
import { CommonFormUtils } from "@app/shared/utils/form.utils";
import * as moment from "moment";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-contrivance-register",
  templateUrl: "./contrivance-register.component.html",
  styleUrls: ["./contrivance-register.component.scss"],
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
export class ContrivanceRegisterComponent implements OnInit, OnDestroy {
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
  contrivanceId: string = null;
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
  token = JSON.parse(localStorage.getItem("tokenInLocalStorage"));
  contrivancesDTO: any;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    public contrivanceService: ContrivanceService,
    private fb: FormBuilder,
    // private activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    public formUtils: CommonFormUtils
  ) {}

  ngOnInit() {
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
    if (event) {
      effectiveValue.setValue("");
      effectiveValue.clearValidators();
      effectiveValue.disable();
      bonus.setValue("");
      bonus.clearValidators();
      bonus.disable();
    } else {
      effectiveValue.setValidators(Validators.required);
      effectiveValue.enable();
      bonus.setValidators(Validators.required);
      bonus.enable();
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
          this.contrivanceService.isFromAdd = true;
          this.router.navigate(["contrivance/check-duplicate"]);
        } else {
          this.notificationService.notify("fail", response.description);
          this.formUtils.form.markAllAsTouched();
        }
      },
      (error) => {
        this.notificationService.notify("fail", "COMMON.ERROR_SERVICE");
      }
    );
    this.subscriptions.push(validate);
  }

  AddInsideAuthor() {
    this.getContrivancesDTO();
    this.contrivanceService.contrivancesDTO.next(this.contrivancesDTO);
    this.router.navigate(["author/add-inside"], {
      queryParams: { for: "contrivance" },
    });
    window.scrollTo(0, 0);
  }
  AddOutsideAuthor() {
    this.getContrivancesDTO();
    this.contrivanceService.contrivancesDTO.next(this.contrivancesDTO);
    this.router.navigate(["author/add-outside"], {
      queryParams: { for: "contrivance" },
    });
    window.scrollTo(0, 0);
  }
  EditInsideAuthor(id: number) {
    this.getContrivancesDTO();
    this.contrivanceService.contrivancesDTO.next(this.contrivancesDTO);
    this.router.navigate(["author/edit-inside"], {
      queryParams: { id: id, for: "contrivance" },
    });
    window.scrollTo(0, 0);
  }
  EditOutsideAuthor(phoneNumber: any, email: any) {
    this.getContrivancesDTO();
    this.contrivanceService.contrivancesDTO.next(this.contrivancesDTO);
    this.router.navigate(["author/edit-outside"], {
      queryParams: {
        phoneNumber: phoneNumber,
        email: email,
        for: "contrivance",
      },
    });
    window.scrollTo(0, 0);
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
