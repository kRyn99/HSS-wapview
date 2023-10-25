import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { BsDatepickerConfig, BsLocaleService } from "ngx-bootstrap/datepicker";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { MessagePopupComponent } from "@app/modules/common-items/components/message-popup/message-popup.component";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { PeriodicElement } from "@app/modules/idea/PeriodicElement";
import { environment } from "@env/environment";
import { DataService } from "../../../../shared/service/data.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MatTableDataSource } from "@angular/material/table";
import { NotificationService } from "@app/shared/service/notification.service";
import { ToastrService } from "ngx-toastr";

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
  specialty: number;
}
@Component({
  selector: "app-idea-edit",
  templateUrl: "./idea-edit.component.html",
  styleUrls: ["./idea-edit.component.scss"],
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
export class IdeaEditComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig>;
  bsFromConfig:Partial<BsDatepickerConfig>;
  dataSource: any;
  dataSource2: any;
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
  ];
  constructor(
    private bsLocaleService: BsLocaleService,
    private router: Router,
    private modalService: NgbModal,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private http: HttpClient,
    public DataService: DataService,
    private cdRef: ChangeDetectorRef,
    private notificationService: NotificationService,
    public toastrService: ToastrService
  ) {
    this.bsConfig = {
      dateInputFormat: "DD/MM/YYYY",
    };
    this.bsFromConfig = {
      containerClass: 'theme-dark-blue',
      dateInputFormat: "DD/MM/YYYY", // Định dạng ngày/tháng/năm
    };
  }
  ideaId = JSON.parse(localStorage.getItem("ideaIdInLocalStorage"));
  isTypeOfString(element) {
    return typeof element == "string";
  }
  ngOnInit() {
    this.selectedLanguage = this.DataService.selectedLanguage.value;

    this.getIdeaDetail();
    this.getListSpecialty();

    // this.dataSource = this.ELEMENT_DATA;
    this.dataSource = new MatTableDataSource(
      this.DataService.lstContributorDTOServiceEdit.value
    );
    this.dataSource2 = new MatTableDataSource(
      this.DataService.lstContributorDTOServiceOutEdit.value
    );
  }
  ideaNameValue;
  applyStartTime: Date;
  applyEndTime: Date = null;
  specialty: number;
  beforeApplyStatus;
  content;
  applyRange;
  effectiveness;
  token = JSON.parse(localStorage.getItem("tokenInLocalStorage"));
  ideaDetail: IdeaDetail;
  listContributorDTO: [];
  // documentDTO;
  nextStep;
  note;
  applyStartTimeString;
  applyEndTimeString;
  lang = localStorage.getItem("lang");
  selectedLanguage: string = "";
  onLanguageChange() {
    this.DataService.selectedLanguage.next(this.selectedLanguage);
    console.log(this.DataService.selectedLanguage.value);
  }
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
        this.listContributorDTO = response.data.listContributorDTO;
        this.DataService.documentDTO.next(response.data.documentDTO);
       
        
        // this.selectedSpecialtyValue = response.data.specialty;
        // this.selectedUnitValue = response.data.listUnitDTO;
        const listContributorIn = response.data.listContributorDTO.filter(
          (contributor) => contributor.staffCode
        );
        const listContributorOut = response.data.listContributorDTO.filter(
          (contributor) => !contributor.staffCode
        );
        // this.dataSource = listContributorIn;
        // this.dataSource2 = listContributorOut
        if (!this.DataService.backFromEdit) {
          this.DataService.lstContributorDTOServiceEdit.next(listContributorIn);
          this.DataService.lstContributorDTOServiceOutEdit.next(
            listContributorOut
          );
          this.dataSource = new MatTableDataSource(
            this.DataService.lstContributorDTOServiceEdit.value
          );
          this.dataSource2 = new MatTableDataSource(
            this.DataService.lstContributorDTOServiceOutEdit.value
          );
          this.cdRef.detectChanges();
        }
        if (this.DataService.ideaName2.value) {
          this.ideaNameValue = this.DataService.ideaName2.value;
        } else {
          this.ideaNameValue = response.data.ideaName;
        }

        // if (this.DataService.selectedEndDate.value) {
        //   this.applyEndTime = this.DataService.selectedEndDate.value
        // } else {
        //   if(this.DataService.selectedEndDate.value){
        //     this.applyEndTime=null;
        //   }
        //   else(response.data.applyEndTime) {
        //     this.applyEndTime = new Date(response.data.applyEndTime.split('/').reverse().join('/'));
        //   }
        // }

        if (this.DataService.selectedEndDate.value) {
          this.applyEndTime = this.DataService.selectedEndDate.value;
        } else if (
          !this.DataService.selectedEndDate.value &&
          this.DataService.isEndDateTouched
        ) {
          this.applyEndTime = null;
        } else {
          if (response.data.applyEndTime) {
            this.applyEndTime = new Date(
              response.data.applyEndTime.split("/").reverse().join("/")
            );
          }
        }

        if (this.DataService.selectedStartDate.value) {
          this.applyStartTime = this.DataService.selectedStartDate.value;
        } else {
          this.applyStartTime = new Date(
            response.data.applyStartTime.split("/").reverse().join("/")
          );
        }
        // else{
        //     this.applyStartTimeString = this.applyStartTime.toLocaleDateString();
        //   }

        if (this.DataService.beforeApplyStatus.value) {
          this.beforeApplyStatus = this.DataService.beforeApplyStatus.value;
        } else {
          this.beforeApplyStatus = this.ideaDetail.beforeApplyStatus;
        }
        if (this.DataService.content.value) {
          this.content = this.DataService.content.value;
        } else {
          this.content = this.ideaDetail.content;
        }
        if (this.DataService.applyRange.value) {
          this.applyRange = this.DataService.applyRange.value;
        } else {
          this.applyRange = this.ideaDetail.applyRange;
        }
        if (this.DataService.effectiveness.value) {
          this.effectiveness = this.DataService.effectiveness.value;
        } else {
          this.effectiveness = this.ideaDetail.effectiveness;
        }
        if (this.DataService.nextStep.value) {
          this.nextStep = this.DataService.nextStep.value;
        } else {
          this.nextStep = this.ideaDetail.nextStep;
        }
        if (this.DataService.note.value) {
          this.note = this.DataService.note.value;
        } else {
          this.note = this.ideaDetail.note;
        }
        if (this.DataService.selectedUnitValueEdit.value) {
          this.DataService.selectedUnitValueEdit.subscribe((value) => {
            this.selectedUnitValue = value;
          });
        } else {
          this.selectedUnitValue = response.data.listUnitDTO;
          console.log(this.selectedUnitValue);
        }
        if (this.DataService.selectedUnitValueEdit.value) {
          this.DataService.selectedUnitValueEdit.subscribe((value) => {
            this.selectedUnit = value;
          });
        } else {
          const unit = [];
          for (let i = 0; i < response.data.listUnitDTO.length; i++) {
            unit.push(response.data.listUnitDTO[i].unitId);
          }
          this.selectedUnit = [...unit];
          // this.selectedUnit = response.data.listUnitDTO.unitId;
          console.log(this.selectedUnit);
        }
        if (this.DataService.selectedSpecialtyValueEdit.value) {
          this.specialty = this.DataService.selectedSpecialtyValueEdit.value;
        } else {
          this.specialty = response.data.specialty;
        }
        if (this.DataService.selectedLanguage.value) {
          this.selectedLanguage = this.DataService.selectedLanguage.value;
        } else {
          this.selectedLanguage = response.data.language;
        }

        this.getListUnit();
      },
      (error) => {
        console.error(error.data);
      }
    );
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
  selectedUnitValue: any[] = [];
  listUnit: [];
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
            // this.onCheckboxChange(item);
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
  selectedUnit;
  onNgSelectChange(item) {
    this.unitFieldTouched = true;
    this.selectedUnitValue = [...item];
    this.DataService.selectedUnit.next(this.selectedUnit);
    this.DataService.selectedUnitValueEdit.next(this.selectedUnitValue);
  }
  selectAllForDropdownItems(items: any[]) {
    let allSelect = (items) => {
      items.forEach((element) => {
        element["selectedAllGroup"] = "selectedAllGroup";
      });
    };

    allSelect(items);
  }
  selectedSpecialtyValue;
  onSelectSpecialtyChange() {
    this.DataService.selectedSpecialtyValueEdit.next(this.specialty);
  }
  beforeApplyStatusChange() {
    this.DataService.beforeApplyStatus.next(this.beforeApplyStatus);
  }
  contentChange() {
    this.DataService.content.next(this.content);
  }
  applyRangeChange() {
    this.DataService.applyRange.next(this.applyRange);
  }
  effectivenessChange() {
    this.DataService.effectiveness.next(this.effectiveness);
  }
  nextStepChange() {
    this.DataService.nextStep.next(this.nextStep);
  }
  noteChange() {
    this.DataService.note.next(this.note);
  }
  toggleDropdown() {
    this.DataService.showDropdownEdit = !this.DataService.showDropdownEdit;
  }
  onCheckboxChange(item: any) {
    if (item) {
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

    this.DataService.selectedUnitValueEdit.next(this.selectedUnitValue);
    console.log(this.selectedUnitValue);
  }

  lstContributorDTO: any[] = [];
  listUnitDTO: any[] = [];

  // AddInsideAuthor() {
  //   this.router.navigate(["author/add-inside-edit"], {
  //     queryParams: { for: "idea" },
  //   });
  //   window.scrollTo(0, 0);
  // }
  AddInsideAuthor() {
    this.DataService.showAddInsideEdit = true;
    this.DataService.showBg = true;
    if (this.DataService.showBg && this.DataService.showAddInsideEdit) {
      document.body.style.overflow = "hidden";
    }
  }
  AddOutsideAuthor() {
    this.DataService.showAddOutsideEdit = true;
    this.DataService.showBg = true;
    if (this.DataService.showBg && this.DataService.showAddOutsideEdit) {
      document.body.style.overflow = "hidden";
    }
    // this.router.navigate(["author/add-outside-edit"], {
    //   queryParams: { for: "idea" },
    // });
    // window.scrollTo(0, 0);
  }
  EditInsideAuthor(id: number) {
    this.DataService.showEditInsideEdit = true;
    this.DataService.showBg = true;
    this.DataService.idEditInsideAuthor = id;
    if (this.DataService.showBg && this.DataService.showEditInsideEdit) {
      document.body.style.overflow = "hidden";
    }
    // this.DataService.backFromEdit = true;
    // this.router.navigate(["author/edit-inside-edit"], {
    //   queryParams: { id: id, for: "idea" },
    // });
    // window.scrollTo(0, 0);

    // localStorage.setItem('ideaIdInLocalStorage', JSON.stringify(id));
    // this.router.navigate(["author/edit-inside"]);
  }
  EditOutsideAuthor(phoneNumber: any, email: any) {
    this.DataService.showEditOutsideEdit = true;
    this.DataService.showBg = true;
    this.DataService.phoneEditOutsideAuthor = phoneNumber;
    this.DataService.emailEditOutsideAuthor = email;
    if (this.DataService.showBg && this.DataService.showEditOutsideEdit) {
      document.body.style.overflow = "hidden";
    }
    // this.DataService.backFromEdit = true;
    // this.router.navigate(["author/edit-outside-edit"], {
    //   queryParams: { phoneNumber: phoneNumber, email: email, for: "idea" },
    // });
    // window.scrollTo(0, 0);
  }
  deleteInsideAuthor(id: any) {
    this.DataService.lstContributorDTOServiceEdit.value.forEach(
      (item, index) => {
        if (item.staffId === id) {
          this.DataService.lstContributorDTOServiceEdit.value.splice(index, 1);
          this.dataSource = new MatTableDataSource(
            this.DataService.lstContributorDTOServiceEdit.value
          );
        }
      }
    );
  }
  deleteOutsideAuthor(phoneNumber: any, email: any) {
    this.DataService.lstContributorDTOServiceOutEdit.value.forEach(
      (item, index) => {
        if (item.phoneNumber === phoneNumber && item.email === email) {
          this.DataService.lstContributorDTOServiceOutEdit.value.splice(
            index,
            1
          );
          this.dataSource2 = new MatTableDataSource(
            this.DataService.lstContributorDTOServiceOutEdit.value
          );
        }
      }
    );
  }

  showFileName: boolean = false;

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
      // this.documentDTO = file
      // this.fileURL = file.name;
      // upload img

      // this.DataService.file.next(file);
      // this.DataService.file.subscribe((value) => {
      //   this.documentDTO = value;
      // });
      this.DataService.documentDTO.next(file)
      const formData: FormData = new FormData();
      formData.append("listDocument", file);
      const url = `${environment.API_HOST_NAME}/api/upload-document`;
      return this.http
        .post<any>(url, formData, { headers })
        .subscribe((res) => {
          if (res.errorCode === "0" || res.errorCode === "200") {
            // const currentFileValue = this.DataService.file.value;
            this.DataService.documentDTO.value.url =res.data;
            // this.DataService.file.next(currentFileValue);
          } else {
            this.notificationService.notify("fail", res.description);
          }
        });
      // this.subscriptions.push(uploadFileAva);
    }
  }

  validate() {
    let now = new Date();
    now.setHours(0, 0, 0, 0);
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

      return false;
    }
    if (
      this.ideaNameValue === undefined ||
      this.ideaNameValue === null ||
      this.ideaNameValue === "" ||
      this.ideaNameValue.trim() === ""
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
      return false;
    }
    if (this.applyStartTime === undefined || this.applyStartTime === null) {
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
      return false;
    }
    if (
      this.applyStartTime > this.applyEndTime &&
      this.applyEndTime !== null &&
      this.applyEndTime !== undefined
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

      return false;
    }
    if (
      this.applyStartTime < now ||
      (this.applyEndTime < now &&
        this.applyEndTime !== null &&
        this.applyEndTime !== undefined)
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
      return false;
    }
    // if (endDate === undefined || endDate === null) {
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
      return false;
    }
    if (!this.specialty) {
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
      return false;
    }

    if (this.DataService.lstContributorDTOServiceEdit.value.length === 0) {
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
  deleteIdea() {
    const url = `${environment.API_HOST_NAME}/api/update-idea-status`;
    const headers = new HttpHeaders({
      "Accept-Language": this.lang,
      Authorization: `Bearer ` + this.token,
    });
    const requestBody = {
      ideaDTO: {
        ideaId: this.ideaId,
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
      `ADD-INSIDE-IDEA.CONFIRM.CONFIRM-DELETE`
    );
    modalRefSuccess.componentInstance.closeIcon = false;
    modalRefSuccess.componentInstance.next.subscribe((result: any) => {
      if (result === true) {
        return this.http.post<any>(url, requestBody, { headers }).subscribe(
          (res) => {
            if (res.errorCode === "0") {
              this.notificationService.notify("success", res.description);
              this.router.navigate(["idea"]);
            } else {
              this.notificationService.notify("fail", res.description);
            }
          },
          (error) => {
            console.log(error.data);
          }
        );
      } else {
      }
    });
  }

  duplicationCheck() {
    this.validateBeforeCheckDuplicate();
  }

  ideaDTO: any;
  checkStartDate = false;
  checkNow = false;
  checkNow2 = false;
  unitFieldTouched = false;
  onInputValueChange() {
    this.DataService.ideaName2.next(this.ideaNameValue);
  }
  selectStartDate() {
    let now = new Date();
    now.setHours(0, 0, 0, 0);
    if (
      this.applyStartTime > this.applyEndTime &&
      this.applyEndTime !== null &&
      this.applyEndTime !== undefined
    ) {
      this.checkStartDate = true;
    } else {
      this.checkStartDate = false;
    }
    if (this.applyStartTime < now) {
      this.checkNow = true;
    } else {
      this.checkNow = false;
    }

    this.DataService.selectedStartDate.next(this.applyStartTime);
    this.getIdeaDTO();
  }
  isEndDateTouched = false;
  selectEndDate() {
    this.DataService.isEndDateTouched = true;
    let now = new Date();
    now.setHours(0, 0, 0, 0);
    console.log(this.applyEndTime);
    if (this.applyEndTime === null && this.applyEndTime === undefined) {
      if (this.applyStartTime > this.applyEndTime) {
        this.checkStartDate = false;
      } else {
        this.checkStartDate = false;
      }
      if (this.applyEndTime < now) {
        this.checkNow2 = false;
      } else {
        this.checkNow2 = false;
      }
      // this.getIdeaDTO()
    } else {
      if (
        this.applyStartTime > this.applyEndTime &&
        this.applyEndTime !== null &&
        this.applyEndTime !== undefined
      ) {
        this.checkStartDate = true;
      } else {
        this.checkStartDate = false;
      }
      if (this.applyEndTime < now) {
        this.checkNow2 = true;
      } else {
        this.checkNow2 = false;
      }
      this.getIdeaDTO();
    }
    this.DataService.selectedEndDate.next(this.applyEndTime);
  }
  endDateFormatted;
  getIdeaDTO() {
    const startDate = this.applyStartTime;
    if (this.applyEndTime) {
      const endDate = this.applyEndTime;
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
    const startDay = startDate.getDate();
    const startMonth = startDate.getMonth() + 1;
    const startYear = startDate.getFullYear();
    // const endDay = endDate.getDate();
    // const endMonth = endDate.getMonth() + 1;
    // const endYear = endDate.getFullYear();
    const startDateFormatted =
      startDay.toString().padStart(2, "0") +
      "/" +
      startMonth.toString().padStart(2, "0") +
      "/" +
      startYear;
    // const endDateFormatted =
    //   endDay.toString().padStart(2, "0") +
    //   "/" +
    //   endMonth.toString().padStart(2, "0") +
    //   "/" +
    //   endYear;

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
      ideaId: this.ideaId,
      ideaName: this.ideaNameValue,
      specialty: this.specialty,
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
    console.log(this.ideaDTO);
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
          this.DataService.lstContributorDTOServiceOutEdit.value.concat(
            this.DataService.lstContributorDTOServiceEdit.value
          ),
          documentDTO: {
            url: this.DataService.documentDTO.value?.url,
            name: this.DataService.documentDTO.value?.name,
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
                this.DataService.ideaDTOEdit.next(this.ideaDTO);
                this.DataService.isFromAdd = false;
                this.DataService.showDuplicateIdea = true;
                this.DataService.showBg = true;
                if (this.DataService.showBg && this.DataService.showDuplicateIdea) {
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
  handleAddInsideEdit() {
    this.dataSource = new MatTableDataSource(
      this.DataService.lstContributorDTOServiceEdit.value
    );
    this.dataSource2 = new MatTableDataSource(
      this.DataService.lstContributorDTOServiceOutEdit.value
    );
  }
  handleAddInsideEditPopup() {
    this.DataService.showBg = false;
    this.DataService.showAddInsideEdit = false;
    if (!this.DataService.showBg && !this.DataService.showAddInsideEdit) {
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
  handleEditInsideEdit() {
    this.DataService.idEditInsideAuthor = null;
    this.dataSource = new MatTableDataSource(
      this.DataService.lstContributorDTOServiceEdit.value
    );
    this.dataSource2 = new MatTableDataSource(
      this.DataService.lstContributorDTOServiceOutEdit.value
    );
  }
  handleEditInsideEditPopup() {
    this.DataService.showBg = false;
    this.DataService.showEditInsideEdit = false;
    if (!this.DataService.showBg && !this.DataService.showEditInsideEdit) {
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
  handleAddOutsideEdit() {
    this.dataSource = new MatTableDataSource(
      this.DataService.lstContributorDTOServiceEdit.value
    );
    this.dataSource2 = new MatTableDataSource(
      this.DataService.lstContributorDTOServiceOutEdit.value
    );
  }
  handleAddOutsideEditPopup() {
    this.DataService.showBg = false;
    this.DataService.showAddOutsideEdit = false;
    if (!this.DataService.showBg && !this.DataService.showAddOutsideEdit) {
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
  handleEditOutsideEdit() {
    this.DataService.idEditInsideAuthor = null;
    this.dataSource = new MatTableDataSource(
      this.DataService.lstContributorDTOServiceEdit.value
    );
    this.dataSource2 = new MatTableDataSource(
      this.DataService.lstContributorDTOServiceOutEdit.value
    );
  }
  handleEditOutsideEditPopup() {
    this.DataService.showBg = false;
    this.DataService.showEditOutsideEdit = false;
    if (!this.DataService.showBg && !this.DataService.showEditOutsideEdit) {
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
