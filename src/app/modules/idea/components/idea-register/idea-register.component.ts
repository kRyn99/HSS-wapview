import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  BsDatepickerConfig,
  BsDatepickerDirective,
  BsLocaleService,
} from "ngx-bootstrap/datepicker";
import { MessagePopupComponent } from "@app/modules/common-items/components/message-popup/message-popup.component";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { NgbDate, NgbDateStruct, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { DataSource } from "@angular/cdk/collections";
import { PeriodicElement } from "@app/modules/idea/PeriodicElement";
import { environment } from "@env/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DataService } from "../../../../shared/service/data.service";
import { BehaviorSubject } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { DatePipe } from "@angular/common";
import { NotificationService } from "@app/shared/service/notification.service";
import { ToastrService } from "ngx-toastr";
interface ideaRegisterDTO {
  ideaName?: any;
  specialty?: string;
  applyStartTime?: string;
  applyEndTime?: string;
  beforeApplyStatus?: string;
  content?: number;
  applyRange?: string;
  effectiveness?: string;
  nextStep?: number;
  note?: string;
}
@Component({
  selector: "app-idea-register",
  templateUrl: "./idea-register.component.html",
  styleUrls: ["./idea-register.component.scss"],
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
export class IdeaRegisterComponent implements OnInit {
  showDropdown = false;
  // selectedStaffCode$ = this.getSelectedStaffCodeSubject();
  bsConfig: Partial<BsDatepickerConfig>;
  bsFromConfig: Partial<BsDatepickerConfig>;
  dataSource: any;
  columnsToDisplay = ["staffCode", "fullName", "percentage"];
  columnsToDisplayWithExpand = ["expand", ...this.columnsToDisplay];
  columnsToDisplay2 = ["fullName", "percentage"];
  columnsToDisplayWithExpand2 = ["expand", ...this.columnsToDisplay2];
  expandedElement: PeriodicElement | null;
  ELEMENT_DATA = [
    {
      position: 1,
      "TABLE.CODE": "NV001",
      "TABLE.NAME": "Nguyen Van A",
      "TABLE.CONTRIBUTION": 50,
      description: `Hydrogen is a chemical element with 'TABLE.NAME' H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
    },
    {
      position: 1,
      "TABLE.CODE": "NV001",
      "TABLE.NAME": "Nguyen Van A",
      "TABLE.CONTRIBUTION": 50,
      description: `Hydrogen is a chemical element with 'TABLE.NAME' H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
    },
  ];
  constructor(
    private bsLocaleService: BsLocaleService,
    private router: Router,
    private modalService: NgbModal,
    private translateService: TranslateService,
    private http: HttpClient,
    public DataService: DataService,
    private datePipe: DatePipe,
    private notificationService: NotificationService,
    public toastrService: ToastrService
  ) {
    this.selectedLanguage = null;
    this.bsConfig = {
      dateInputFormat: "DD/MM/YYYY", // Định dạng ngày/tháng/năm
    };
    this.bsFromConfig = {
      containerClass: "theme-dark-blue",
      dateInputFormat: "DD/MM/YYYY", // Định dạng ngày/tháng/năm
    };

    this.selectedSpecialtyValue = null;

    // DataService.selectedUnitValue.next(null)
  }
  dataSource2: any;
  ideaRegisterDTO: ideaRegisterDTO;
  token = JSON.parse(localStorage.getItem("tokenInLocalStorage"));

  isTypeOfString(element) {
    return typeof element == "string";
  }
  toggleDatePicker(datepickerInput: BsDatepickerDirective) {
    if (datepickerInput.isOpen) {
      datepickerInput.hide();
    } else {
      datepickerInput.show();
    }
  }

  ngOnInit() {
    this.getListUnit();
    this.dataSource = new MatTableDataSource(
      this.DataService.lstContributorDTOService.value
    );
    this.dataSource2 = new MatTableDataSource(
      this.DataService.lstContributorDTOServiceOut.value
    );

    this.inputValue = this.DataService.ideaName2.value;
    this.selectedLanguage = this.DataService.selectedLanguage.value;

    // this.selectedUnitValue = this.DataService.selectedUnitValue.value;
    this.DataService.selectedUnitValue.subscribe((value) => {
      this.selectedUnitValue = value;
    });
    this.DataService.selectedUnit.subscribe((value) => {
      this.selectedUnit = value;
    });

    console.log(this.DataService.lstContributorDTOServiceOut.value);

    // this.selectedUnitValue = this.DataService.selectedUnitValue$.value;
    this.selectedSpecialtyValue = this.DataService.selectedSpecialtyValue.value;
    if (this.DataService.selectedStartDate.value) {
      this.selectedStartDate = this.DataService.selectedStartDate.value;
    }
    if (this.DataService.selectedEndDate.value) {
      this.selectedEndDate = this.DataService.selectedEndDate.value;
    } else {
      this.selectedEndDate = null;
    }
    console.log(this.DataService.isEndDateTouched);

    // this.selectedEndDate = this.DataService.selectedEndDate.value;
    this.beforeApplyStatus = this.DataService.beforeApplyStatus.value;
    this.content = this.DataService.content.value;
    this.applyRange = this.DataService.applyRange.value;
    this.effectiveness = this.DataService.effectiveness.value;
    this.nextStep = this.DataService.nextStep.value;
    this.note = this.DataService.note.value;
    // this.inputValue = ''
    this.getListSpecialty();
  }
  selectedLanguage: string = "";
  isLangTouched = false;
  onLanguageChange() {
    this.isLangTouched = true;
    this.DataService.selectedLanguage.next(this.selectedLanguage);
    console.log(this.DataService.selectedLanguage.value);
  }
  toggleDropdown() {
    this.DataService.showDropdown = !this.DataService.showDropdown;
  }
  // selectedItems: any[] = [];
  // onCheckboxChange(item: any) {

  //   if (item) {
  //     if (item.selected) {
  //       if (!this.selectedUnitValue) {
  //         this.selectedUnitValue = []; // Khởi tạo mảng nếu chưa tồn tại
  //       }
  //       this.selectedUnitValue.push(item);
  //       // this.DataService.selectedItems.push(item.unitName);
  //     } else {
  //       // this.DataService.setItemSelection(item.unitId, item.selected);
  //       let tempListUnit = this.selectedUnitValue;
  //       tempListUnit.forEach((unit, index) => {
  //         if (unit.unitId == item.unitId) {
  //           tempListUnit.splice(index, 1);
  //         }
  //       });
  //       this.selectedUnitValue = tempListUnit;
  //       // const index = this.selectedUnitValue?.indexOf(item);
  //       // if (index !== undefined && index !== -1) {
  //       //     this.selectedUnitValue.splice(index, 1);
  //       //     this.DataService.selectedItems.splice(index, 1);
  //       //     // this.DataService.selectedItems.push(item.unitName);
  //       // }
  //     }
  //   }
  //   // if (item) {

  //   // }
  //   this.DataService.selectedUnitValue.next(this.selectedUnitValue);

  // }

  //   onSelectUnitChange() {
  //     // Xử lý khi lựa chọn các đơn vị áp dụng
  //     // this.selectedUnitValue chứa danh sách các đơn vị đã chọn
  //   }
  inputValue: string = "";

  listUnit: [];
  unitFieldTouched: boolean = false;
  selectedUnit;
  getListUnit() {
    const url = `${environment.API_HOST_NAME}/api/get-list-unit`;
    const headers = new HttpHeaders({
      "Accept-Language": this.lang,
      Authorization: `Bearer ` + this.token,
    });
    const requestBody = {
      userName: "hss_admin",
    };
    return this.http.post<any>(url, requestBody, { headers }).subscribe(
      (response) => {
        this.listUnit = response.data;
        this.selectAllForDropdownItems(this.listUnit);
        let listIdSelect = this.selectedUnitValue?.map((item) => item.unitId);
        this.listUnit.forEach((item: any) => {
          if (listIdSelect?.includes(item.unitId)) {
            item.selected = true;
          } else {
            item.selected = false;
          }
        });
        // this.DataService.listUnitService = response.data;

        // for (const item of this.DataService.listUnitService) {
        // }
        // this.listUnit.forEach(item => {
        //     const selected = this.DataService.selectedUnitValue(item.unitId);
        //     if (selected !== undefined) {
        //         item.selected = selected;
        //     }
        // });
      },
      (error) => {
        console.error(error.description);
      }
    );
  }
  selectAllForDropdownItems(items: any[]) {
    let allSelect = (items) => {
      items.forEach((element) => {
        element["selectedAllGroup"] = "selectedAllGroup";
      });
    };

    allSelect(items);
  }
  onNgSelectChange(item) {
    this.unitFieldTouched = true;
    this.selectedUnitValue = [...item];
    this.DataService.selectedUnit.next(this.selectedUnit);
    this.DataService.selectedUnitValue.next(this.selectedUnitValue);
  }
  loadingUnits: boolean = false;

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
  selectedUnitValue: any[] = [];
  //   selectedUnitValue: {
  //     unitId: number;
  //     unitName: string;
  //     unitCode: string;
  //   } | null = null;
  //   selectedUnitValue: BehaviorSubject<{
  //     unitId: number;
  //     unitName: string;
  //   } | null>;

  selectedSpecialtyValue: string = "";

  selectedStartDate = new Date();
  selectedEndDate = new Date();
  beforeApplyStatus: string = "";
  content: string = "";
  applyRange: string = "";
  effectiveness: string = "";
  nextStep: string = "";
  note: string = "";
  isInputTouched = false;
  onInputValueChange() {
    this.isInputTouched = true;
    this.DataService.ideaName2.next(this.inputValue);
  }

  // onSelectUnitChange() {
  //   this.DataService.selectedUnitValue.next(this.selectedUnitValue);

  // }
  specialtyTouched = false;
  onSelectSpecialtyChange() {
    this.DataService.selectedSpecialtyValue.next(this.selectedSpecialtyValue);
  }

  isStartDateTouched = false;
  isEndDateTouched = false;
  checkStartDate = false;
  checkNow = false;
  checkNow2 = false;
  duplicate=false;
  startDateChange() {
    let now = new Date();
    now.setHours(0, 0, 0, 0);
    this.isStartDateTouched = true;
    if (this.selectedStartDate > this.selectedEndDate) {
      this.checkStartDate = true;
    } else {
      this.checkStartDate = false;
    }
    if (this.selectedStartDate < now) {
      this.checkNow = true;
    } else {
      this.checkNow = false;
    }
    if (this.isStartDateTouched && this.checkStartDate) {
      // this.DataService.isEndDateTouched = false;
      this.duplicate=!this.duplicate;
    }
    this.DataService.selectedStartDate.next(this.selectedStartDate);
  }
  endDateChange() {
    let now = new Date();
    now.setHours(0, 0, 0, 0);
    if (this.selectedStartDate === null || this.selectedEndDate === undefined) {
      this.DataService.isEndDateTouched = true;
      if (this.selectedStartDate > this.selectedEndDate) {
        this.checkStartDate = false;
      } else {
        this.checkStartDate = false;
      }
      if (this.selectedEndDate < now) {
        this.checkNow2 = true;
      } else {
        this.checkNow2 = false;
      }
      this.DataService.selectedEndDate.next(this.selectedEndDate);
    } else {
      this.DataService.isEndDateTouched = true;
      if (this.selectedStartDate > this.selectedEndDate) {
        this.checkStartDate = true;
      } else {
        this.checkStartDate = false;
      }
      if (this.selectedEndDate < now) {
        this.checkNow2 = true;
      } else {
        this.checkNow2 = false;
      }
      this.DataService.selectedEndDate.next(this.selectedEndDate);
    }
    if (this.DataService.isEndDateTouched && this.checkStartDate) {
      // this.isStartDateTouched = false;
      this.duplicate=!this.duplicate;
    }
  }
  isBeforeApplyStatusTouched = false;
  beforeApplyStatusChange() {
    this.isBeforeApplyStatusTouched = true;
    this.DataService.beforeApplyStatus.next(this.beforeApplyStatus);
  }
  isContentTouched = false;
  contentChange() {
    this.isContentTouched = true;
    this.DataService.content.next(this.content);
  }
  isApplyRangeTouched = false;
  applyRangeChange() {
    this.isApplyRangeTouched = true;
    this.DataService.applyRange.next(this.applyRange);
  }
  isEffectivenesTouched = false;
  effectivenessChange() {
    this.isEffectivenesTouched = true;
    this.DataService.effectiveness.next(this.effectiveness);
  }

  nextStepChange() {
    this.DataService.nextStep.next(this.nextStep);
  }

  noteChange() {
    this.DataService.note.next(this.note);
  }

  ideaDTO: {};
  listUnitDTO: any[] = [];
  listUnitDTO2: any[] = [];
  endDateFormatted;
  getIdeaDTO() {
    const startDate = new Date(this.selectedStartDate);

    const startDay = startDate.getDate();
    const startMonth = startDate.getMonth() + 1;
    const startYear = startDate.getFullYear();
    if (this.selectedEndDate) {
      const endDate = new Date(this.selectedEndDate);
      const endDay = endDate.getDate();
      const endMonth = endDate.getMonth() + 1;
      const endYear = endDate.getFullYear();
      this.endDateFormatted =
        endDay.toString().padStart(2, "0") +
        "/" +
        endMonth.toString().padStart(2, "0") +
        "/" +
        endYear;
    }

    const startDateFormatted =
      startDay.toString().padStart(2, "0") +
      "/" +
      startMonth.toString().padStart(2, "0") +
      "/" +
      startYear;

    const updatedListUnitDTO = [...this.listUnitDTO];

    for (const item of this.selectedUnitValue) {
      if (this.selectedUnitValue) {
        updatedListUnitDTO.push({
          unitName: item.unitName,
          unitCode: item.unitCode,
          unitId: item.unitId,
        });
      }
    }
    this.ideaDTO = {
      language: this.selectedLanguage,
      ideaName: this.inputValue,
      specialty: this.selectedSpecialtyValue,

      applyStartTime: startDateFormatted,
      applyEndTime: this.endDateFormatted,
      beforeApplyStatus: this.beforeApplyStatus,
      content: this.content,
      applyRange: this.applyRange,
      effectiveness: this.effectiveness,
      nextStep: this.nextStep,
      note: this.note,
      listUnitDTO: updatedListUnitDTO,
    };
  }

  AddInsideAuthor() {
    this.DataService.showAddInsideAuthor = true;
    this.DataService.showBg = true;
    if (this.DataService.showBg && this.DataService.showAddInsideAuthor) {
      document.body.style.overflow = "hidden";
    }
  }
  AddOutsideAuthor() {
    this.DataService.showAddOutsideAuthor = true;
    this.DataService.showBg = true;
    if (this.DataService.showBg && this.DataService.showAddOutsideAuthor) {
      document.body.style.overflow = "hidden";
    }
  }

  EditInsideAuthor(id: number) {
    this.DataService.showEditInsideAuthor = true;
    this.DataService.showBg = true;
    this.DataService.idEditInsideAuthor = id;
    if (this.DataService.showBg && this.DataService.showEditInsideAuthor) {
      document.body.style.overflow = "hidden";
    }
    // this.router.navigate(["author/edit-inside"], {
    //   queryParams: { id: id, for: "idea" },
    // });
    // window.scrollTo(0, 0);
  }
  EditOutsideAuthor(phoneNumber: any, email: any) {
    this.DataService.showEditOutsideAuthor = true;
    this.DataService.showBg = true;
    this.DataService.phoneEditOutsideAuthor = phoneNumber;
    this.DataService.emailEditOutsideAuthor = email;
    if (this.DataService.showBg && this.DataService.showEditOutsideAuthor) {
      document.body.style.overflow = "hidden";
    }
    // this.router.navigate(["author/edit-outside"], {
    //   queryParams: { phoneNumber: phoneNumber, email: email, for: "idea" },
    // });
    // window.scrollTo(0, 0);
  }
  deleteInsideAuthor(id: any) {
    this.DataService.lstContributorDTOService.value.forEach((item, index) => {
      if (item.staffId === id) {
        this.DataService.lstContributorDTOService.value.splice(index, 1);
        this.dataSource = new MatTableDataSource(
          this.DataService.lstContributorDTOService.value
        );
      }
    });
  }
  deleteOutsideAuthor(phoneNumber: any, email: any) {
    this.DataService.lstContributorDTOServiceOut.value.forEach(
      (item, index) => {
        if (item.phoneNumber === phoneNumber && item.email === email) {
          this.DataService.lstContributorDTOServiceOut.value.splice(index, 1);
          this.dataSource2 = new MatTableDataSource(
            this.DataService.lstContributorDTOServiceOut.value
          );
        }
      }
    );
  }
  validateTemplate() {
    let now = new Date();
    now.setHours(0, 0, 0, 0);
    if (!this.selectedLanguage) {
      this.isLangTouched = true;
    }
    if (
      this.inputValue === undefined ||
      this.inputValue === null ||
      this.inputValue === "" ||
      this.inputValue.trim() === ""
    ) {
      this.isInputTouched = true;
    }
    if (
      this.selectedStartDate === undefined ||
      this.selectedStartDate === null
    ) {
      this.isStartDateTouched = true;
    }
    if (this.selectedStartDate > this.selectedEndDate) {
      this.checkStartDate = true;
    }
    if (this.selectedStartDate < now) {
      this.checkNow = true;
    }
    if (this.selectedEndDate === undefined || this.selectedEndDate === null) {
      this.DataService.isEndDateTouched = true;
    }
    if (this.selectedStartDate < now) {
      this.checkNow2 = true;
    }
    if (
      this.selectedUnitValue === undefined ||
      this.selectedUnitValue === null ||
      this.selectedUnitValue.length === 0
    ) {
      this.unitFieldTouched = true;
    }
    if (!this.selectedSpecialtyValue) {
      this.specialtyTouched = true;
    }
    if (
      this.beforeApplyStatus === undefined ||
      this.beforeApplyStatus === null ||
      this.beforeApplyStatus === "" ||
      this.beforeApplyStatus.trim() === ""
    ) {
      this.isBeforeApplyStatusTouched = true;
    }
    if (
      this.content === undefined ||
      this.content === null ||
      this.content === "" ||
      this.content.trim() === ""
    ) {
      this.isContentTouched = true;
    }
    if (
      this.applyRange === undefined ||
      this.applyRange === null ||
      this.applyRange === "" ||
      this.applyRange.trim() === ""
    ) {
      this.isApplyRangeTouched = true;
    }
    if (
      this.effectiveness === undefined ||
      this.effectiveness === null ||
      this.effectiveness === "" ||
      this.effectiveness.trim() === ""
    ) {
      this.isEffectivenesTouched = true;
    }
  }
  validate() {
    let now = new Date();
    now.setHours(0, 0, 0, 0);
    this.selectedStartDate.setHours(0, 0, 0, 0);
    if (
      this.inputValue === undefined ||
      this.inputValue === null ||
      this.inputValue === "" ||
      this.inputValue.trim() === ""
    ) {
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
      modalRef.componentInstance.message = this.translateService.instant(
        `ADD-INSIDE-IDEA.VALIDATE.IDEA-NAME`
      );
      modalRef.componentInstance.closeIcon = false;
      this.validateTemplate();
      return false;
    }
    if (
      this.selectedStartDate === undefined ||
      this.selectedStartDate === null ||
      (this.isStartDateTouched && !this.selectedStartDate)
    ) {
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
      modalRef.componentInstance.message = this.translateService.instant(
        `ADD-INSIDE-IDEA.VALIDATE.EMPTY_START_DATE`
      );
      modalRef.componentInstance.closeIcon = false;
      this.validateTemplate();
      return false;
    }
    if (
      this.selectedEndDate !== null &&
      this.selectedEndDate !== undefined &&
      this.selectedStartDate > this.selectedEndDate
    ) {
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
      modalRef.componentInstance.message = this.translateService.instant(
        `ADD-INSIDE-IDEA.VALIDATE.START_DAY`
      );
      modalRef.componentInstance.closeIcon = false;

      this.validateTemplate();
      return false;
    }
    if (
      (this.selectedStartDate < now || this.selectedEndDate < now) &&
      this.selectedEndDate !== null &&
      this.selectedEndDate !== undefined
    ) {
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
      modalRef.componentInstance.message = this.translateService.instant(
        `ADD-INSIDE-IDEA.VALIDATE.APPLY_TIME`
      );
      modalRef.componentInstance.closeIcon = false;
      this.validateTemplate();
      return false;
    }
    if (this.selectedEndDate === undefined || this.selectedEndDate === null) {
      // const modalRef = this.modalService.open(MessagePopupComponent, {
      //   size: "sm",
      //   backdrop: "static",
      //   keyboard: false,
      //   centered: true,
      // });
      // modalRef.componentInstance.type = "fail";
      // modalRef.componentInstance.title = this.translateService.instant(
      //   `ADD-INSIDE-IDEA.VALIDATE.ERROR`
      // );
      // modalRef.componentInstance.message = this.translateService.instant(
      //   `ADD-INSIDE-IDEA.VALIDATE.ERROR`
      // );
      // modalRef.componentInstance.closeIcon = false;
      // return false;
    }
    if (
      this.selectedUnitValue === undefined ||
      this.selectedUnitValue === null ||
      this.selectedUnitValue.length === 0
    ) {
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
      modalRef.componentInstance.message = this.translateService.instant(
        `ADD-INSIDE-IDEA.VALIDATE.UNIT`
      );
      modalRef.componentInstance.closeIcon = false;
      this.validateTemplate();
      return false;
    }
    if (!this.selectedSpecialtyValue) {
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
      modalRef.componentInstance.message = this.translateService.instant(
        `ADD-INSIDE-IDEA.VALIDATE.SPECIALTY`
      );
      modalRef.componentInstance.closeIcon = false;
      this.validateTemplate();
      return false;
    }
    if (!this.selectedLanguage) {
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
      modalRef.componentInstance.message = this.translateService.instant(
        `ADD-INSIDE-IDEA.VALIDATE.EMPTY_LANG`
      );
      modalRef.componentInstance.closeIcon = false;
      this.validateTemplate();
      return false;
    }
    if (
      this.beforeApplyStatus === undefined ||
      this.beforeApplyStatus === null ||
      this.beforeApplyStatus === "" ||
      this.beforeApplyStatus.trim() === ""
    ) {
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
      modalRef.componentInstance.message = this.translateService.instant(
        `ADD-INSIDE-IDEA.VALIDATE.BEFORE_APPLY_STATUS`
      );
      modalRef.componentInstance.closeIcon = false;
      this.validateTemplate();
      return false;
    }
    if (
      this.content === undefined ||
      this.content === null ||
      this.content === "" ||
      this.content.trim() === ""
    ) {
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
      modalRef.componentInstance.message = this.translateService.instant(
        `ADD-INSIDE-IDEA.VALIDATE.CONTENT`
      );
      modalRef.componentInstance.closeIcon = false;
      this.validateTemplate();
      return false;
    }
    if (
      this.applyRange === undefined ||
      this.applyRange === null ||
      this.applyRange === "" ||
      this.applyRange.trim() === ""
    ) {
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
      modalRef.componentInstance.message = this.translateService.instant(
        `ADD-INSIDE-IDEA.VALIDATE.APPLY_RANGE`
      );
      modalRef.componentInstance.closeIcon = false;
      this.validateTemplate();
      return false;
    }
    if (
      this.effectiveness === undefined ||
      this.effectiveness === null ||
      this.effectiveness === "" ||
      this.effectiveness.trim() === ""
    ) {
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
      modalRef.componentInstance.message = this.translateService.instant(
        `ADD-INSIDE-IDEA.VALIDATE.EFFECTIVENESS`
      );
      modalRef.componentInstance.closeIcon = false;
      this.validateTemplate();
      return false;
    }

    // if (this.DataService.file.value.url == "") {
    //   const modalRef = this.modalService.open(MessagePopupComponent, {
    //     size: "sm",
    //     backdrop: "static",
    //     keyboard: false,
    //     centered: true,
    //   });
    //   modalRef.componentInstance.type = "fail";
    //   modalRef.componentInstance.title = this.translateService.instant(
    //     `ADD-INSIDE-IDEA.VALIDATE.ERROR`
    //   );
    //   modalRef.componentInstance.message = this.translateService.instant(
    //     `ADD-INSIDE-IDEA.VALIDATE.FILE`
    //   );
    //   modalRef.componentInstance.closeIcon = false;
    //   return false;
    // }
    if (this.DataService.lstContributorDTOService.value.length === 0) {
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
      modalRef.componentInstance.message = this.translateService.instant(
        `ADD-INSIDE-IDEA.VALIDATE.AUTHOR_WITHIN`
      );
      modalRef.componentInstance.closeIcon = false;
      return false;
    }
    return true;
  }
  apiAdd() {
    if (this.validate()) {
      // const fileName = this.DataService.file.value.name;
      // const fileUrl = this.DataService.file.value.url;
      this.getIdeaDTO();
      const url = `${environment.API_HOST_NAME}/api/create-idea`;
      const headers = new HttpHeaders({
        "Accept-Language": this.lang,
        Authorization: `Bearer ` + this.token,
      });

      const requestBody = {
        ideaDTO: this.ideaDTO,
        lstContributorDTO:
          this.DataService.lstContributorDTOServiceOut.value.concat(
            this.DataService.lstContributorDTOService.value
          ),
        documentDTO: {
          url: this.DataService.file.value.url,
          name: this.DataService.file.value.name,
        },
      };
      return this.http.post<any>(url, requestBody, { headers }).subscribe(
        (response) => {
          if (response.errorCode == 0) {
            this.router.navigate(["/idea"]);
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
    }
  }
  showFileName: boolean = false;
  lang = localStorage.getItem("lang");
  onSelectFile(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      // validate photo files
      const file = event.target.files[0];
      // check định dạng
      const regex = new RegExp(
        "[^\\s]+(.*?)\\.(txt|doc|docx|rar|zip|xls|xlsx|pdf|jpg|gif|png|ppt|pptx|TXT|DOC|DOCX|RAR|ZIP|XLS|XLSX|PDF|JPG|GIF|PNG|PPT|PPTX)$"
      );
      const isValidFile = regex.test(file.name);
      if (!isValidFile) {
        const translatedMessage = this.translateService.instant(
          "IDEA_MANAGEMENT.MESSAGE.FILE_UPLOAD_INCORRECT_TYPE"
        );
        this.notificationService.notify("fail", translatedMessage);
        return;
      }
      if (file.size > 25 * 1024 * 1024) {
        const translatedMessage = this.translateService.instant(
          "ADD-INSIDE-IDEA.VALIDATE.FILE_SIZE"
        );
        this.notificationService.notify("fail", translatedMessage);
        return;
      }

      const headers = new HttpHeaders({
        "Accept-Language": this.lang,
        Authorization: `Bearer ` + this.token,
      });
      this.showFileName = true;
      // this.fileURL = file.name;
      // upload img
      const formData: FormData = new FormData();
      formData.append("listDocument", file);
      const url = `${environment.API_HOST_NAME}/api/upload-document`;
      return this.http
        .post<any>(url, formData, { headers })
        .subscribe((res) => {
          if (res.errorCode === "0" || res.errorCode === "200") {
            this.DataService.file.next({
              name: file.name,
              url: res.data,
            });
            // this.DataService.file.next(currentFileValue);
          } else {
          }
        });
      // this.subscriptions.push(uploadFileAva);
    }
  }
  duplicationCheck() {
    // if (!this.formUtils.isValidForm()) {
    //   this.formUtils.form.markAllAsTouched();
    // } else {
    this.validateBeforeCheckDuplicate();
    // }
  }

  validateBeforeCheckDuplicate() {
    if (this.validate()) {
      const url = `${environment.API_HOST_NAME}/api/validate-before-create-ideas-cms`;
      const headers = new HttpHeaders({
        "Accept-Language": this.lang,
        Authorization: `Bearer ` + this.token,
      });

      this.getIdeaDTO();
      const requestBody = {
        ideaDTO: { ...this.ideaDTO },
        lstContributorDTO:
          this.DataService.lstContributorDTOServiceOut.value.concat(
            this.DataService.lstContributorDTOService.value
          ),
        documentDTO: {
          url: this.DataService.file.value.url,
          name: this.DataService.file.value.name,
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
      if (this.selectedLanguage == "VI") {
        modalRefSuccess.componentInstance.message =
          this.translateService.instant(`ADD-INSIDE-IDEA.LANGUAGE.ENSURE_VI`);
      } else if (this.selectedLanguage === "LA") {
        modalRefSuccess.componentInstance.message =
          this.translateService.instant(`ADD-INSIDE-IDEA.LANGUAGE.ENSURE_LA`);
      } else if (this.selectedLanguage === "EN") {
        modalRefSuccess.componentInstance.message =
          this.translateService.instant(`ADD-INSIDE-IDEA.LANGUAGE.ENSURE_EN`);
      } else {
        modalRefSuccess.componentInstance.message =
          this.translateService.instant(
            `ADD-INSIDE-IDEA.LANGUAGE.INVALID_LANGUAGE`
          );
      }

      modalRefSuccess.componentInstance.closeIcon = false;
      modalRefSuccess.componentInstance.next.subscribe((result: any) => {
        if (result === true) {
          return this.http.post<any>(url, requestBody, { headers }).subscribe(
            (response) => {
              if (response.errorCode == 0) {
                this.DataService.ideaDTO.next(this.ideaDTO);
                this.DataService.isFromAdd = true;

                this.DataService.showDuplicateIdea = true;
                this.DataService.showBg = true;
                if (
                  this.DataService.showBg &&
                  this.DataService.showDuplicateIdea
                ) {
                  document.body.style.overflow = "hidden";
                }
              } else {
                const modalRef = this.modalService.open(MessagePopupComponent, {
                  size: "sm",
                  backdrop: "static",
                  keyboard: false,
                  centered: true,
                });
                modalRef.componentInstance.type = "fail";
                modalRef.componentInstance.title =
                  this.translateService.instant(
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
  handleAddInsideAuthor() {
    this.dataSource = new MatTableDataSource(
      this.DataService.lstContributorDTOService.value
    );
    this.dataSource2 = new MatTableDataSource(
      this.DataService.lstContributorDTOServiceOut.value
    );
    console.log(this.dataSource);
  }
  handleAddInsideAuthorPopup() {
    this.DataService.showBg = false;
    this.DataService.showAddInsideAuthor = false;
    if (!this.DataService.showBg && !this.DataService.showAddInsideAuthor) {
      document.body.style.overflow = "auto";
    }
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
    modalRef.componentInstance.message = this.translateService.instant(
      `ADD-INSIDE-IDEA.VALIDATE.CONTRIBUTOR`
    );
    modalRef.componentInstance.closeIcon = false;
    return false;
  }
  handleEditInsideAuthor() {
    this.DataService.idEditInsideAuthor = null;
    this.dataSource = new MatTableDataSource(
      this.DataService.lstContributorDTOService.value
    );
    this.dataSource2 = new MatTableDataSource(
      this.DataService.lstContributorDTOServiceOut.value
    );
  }
  handleEditInsideAuthorPopup() {
    this.DataService.showBg = false;
    this.DataService.showEditInsideAuthor = false;
    if (!this.DataService.showBg && !this.DataService.showEditInsideAuthor) {
      document.body.style.overflow = "auto";
    }
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
    modalRef.componentInstance.message = this.translateService.instant(
      `ADD-INSIDE-IDEA.VALIDATE.CONTRIBUTOR`
    );
    modalRef.componentInstance.closeIcon = false;
    return false;
  }
  handleAddOutsideAuthor() {
    this.dataSource = new MatTableDataSource(
      this.DataService.lstContributorDTOService.value
    );
    this.dataSource2 = new MatTableDataSource(
      this.DataService.lstContributorDTOServiceOut.value
    );
  }
  handleAddOutsideAuthorPopup() {
    this.DataService.showBg = false;
    this.DataService.showAddOutsideAuthor = false;
    if (!this.DataService.showBg && !this.DataService.showAddOutsideAuthor) {
      document.body.style.overflow = "auto";
    }

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
    modalRef.componentInstance.message = this.translateService.instant(
      `ADD-INSIDE-IDEA.VALIDATE.EXIST`
    );
    modalRef.componentInstance.closeIcon = false;
    return false;
  }
  handleEditOutsideAuthor() {
    this.DataService.idEditInsideAuthor = null;
    this.dataSource = new MatTableDataSource(
      this.DataService.lstContributorDTOService.value
    );
    this.dataSource2 = new MatTableDataSource(
      this.DataService.lstContributorDTOServiceOut.value
    );
    console.log(this.DataService.lstContributorDTOServiceOut.value);
  }
  handleEditOutsideAuthorPopup() {
    this.DataService.showBg = false;
    this.DataService.showEditOutsideAuthor = false;
    if (!this.DataService.showBg && !this.DataService.showEditOutsideAuthor) {
      document.body.style.overflow = "auto";
    }
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
    modalRef.componentInstance.message = this.translateService.instant(
      `ADD-INSIDE-IDEA.VALIDATE.EXIST`
    );
    modalRef.componentInstance.closeIcon = false;
    return false;
  }
}
