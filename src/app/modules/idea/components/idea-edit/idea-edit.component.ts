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
  ) {
    this.bsConfig = {
      dateInputFormat: 'DD/MM/YYYY',
    };
  }
  ideaId = JSON.parse(localStorage.getItem("ideaIdInLocalStorage"));
  isTypeOfString(element) {
    return typeof element == 'string';
  }
  ngOnInit() {
    console.log(this.DataService.lstContributorDTOServiceEdit.value);

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
  applyEndTime: Date;
  specialty;
  beforeApplyStatus;
  content;
  applyRange;
  effectiveness;
  token = JSON.parse(localStorage.getItem("tokenInLocalStorage"));
  ideaDetail: IdeaDetail;
  listContributorDTO: [];
  documentDTO;
  nextStep;
  note;
  applyStartTimeString;
  applyEndTimeString;
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
        this.listContributorDTO = response.data.listContributorDTO;
        this.documentDTO = response.data.documentDTO;
        this.selectedSpecialtyValue = response.data.specialty;
        this.selectedUnitValue = response.data.listUnitDTO;
        console.log(this.documentDTO);

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


        this.ideaNameValue = this.ideaDetail.ideaName;
        this.applyStartTime = new Date(response.data.applyStartTime.split('/').reverse().join('/'));
        this.applyEndTime = new Date(response.data.applyEndTime.split('/').reverse().join('/'));
        this.specialty = this.ideaDetail.specialty;
        this.beforeApplyStatus = this.ideaDetail.beforeApplyStatus;
        this.content = this.ideaDetail.content;
        this.applyRange = this.ideaDetail.applyRange;
        this.effectiveness = this.ideaDetail.effectiveness;
        this.nextStep = this.ideaDetail.nextStep;
        this.note = this.ideaDetail.note;
        this.applyStartTimeString = this.applyStartTime.toLocaleDateString();
        this.applyEndTimeString = this.applyEndTime.toLocaleDateString();
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
        console.log(this.listUnit);

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
  selectedSpecialtyValue;
  onSelectSpecialtyChange() {
    this.DataService.selectedSpecialtyValueEdit.next(this.specialty);
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

  AddInsideAuthor() {
    this.router.navigate(["author/add-inside-edit"], {
      queryParams: { for: "idea" },
    });
    window.scrollTo(0, 0);
  }
  AddOutsideAuthor() {
    this.router.navigate(["author/add-outside-edit"], {
      queryParams: { for: "idea" },
    });
    window.scrollTo(0, 0);
  }
  EditInsideAuthor(id: number) {
    this.DataService.backFromEdit = true;
    this.router.navigate(["author/edit-inside-edit"], {
      queryParams: { id: id, for: "idea" },
    });
    window.scrollTo(0, 0);

    // localStorage.setItem('ideaIdInLocalStorage', JSON.stringify(id));
    // this.router.navigate(["author/edit-inside"]);
  }
  EditOutsideAuthor(phoneNumber: any, email: any) {
    this.DataService.backFromEdit = true;
    this.router.navigate(["author/edit-outside-edit"], {
      queryParams: { phoneNumber: phoneNumber, email: email, for: "idea" },
    });
    window.scrollTo(0, 0);
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
        // this.toastrService.error(
        //   this.translate.instant(
        //     "IDEA_MANAGEMENT.MESSAGE.FILE_UPLOAD_INCORRECT_TYPE"
        //   )
        // );
        return;
      }
      if (file.size > 25 * 1024 * 1024) {
        // this.toastrService.error(
        //   this.translate.instant(
        //     "IDEA_MANAGEMENT.MESSAGE.FILE_UPLOAD_MAX_CAPACITY"
        //   )
        // );
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
            // const currentFileValue = this.DataService.file.value;
            this.documentDTO.name = file.name;
            this.documentDTO.url = res.data;
            // this.DataService.file.next(currentFileValue);
          } else {
          }
        });
      // this.subscriptions.push(uploadFileAva);
    }
  }
  // finishEdit() {
  //   const url = `${environment.API_HOST_NAME}/api/update-idea`;
  //   const headers = new HttpHeaders({
  //     "Accept-Language": this.lang,
  //     Authorization: `Bearer ` + this.token,
  //   });

  //   const updatedListUnitDTO = [...this.listUnitDTO];

  //   for (const item of this.selectedUnitValue) {
  //     if (this.selectedUnitValue) {
  //       updatedListUnitDTO.push({
  //         unitName: item.unitName,
  //         unitCode: item.unitCode,
  //         unitId: item.unitId,
  //       });
  //     }
  //   }
  //   const requestBody = {
  //     ideaDTO: {
  //       ideaId: this.ideaId,
  //       ideaName: this.ideaNameValue,
  //       specialty: this.specialty,
  //       applyStartTime: this.applyStartTime,
  //       applyEndTime: this.applyEndTime,
  //       beforeApplyStatus: this.beforeApplyStatus,
  //       content: this.content,
  //       applyRange: this.applyRange,
  //       effectiveness: this.effectiveness,
  //       nextStep: this.nextStep,
  //       note: this.note,
  //       listUnitDTO: updatedListUnitDTO,
  //     },
  //     lstContributorDTO:
  //       this.DataService.lstContributorDTOServiceOutEdit.value.concat(
  //         this.DataService.lstContributorDTOServiceEdit.value
  //       ),
  //     documentDTO: {
  //       url: this.documentDTO.url,
  //       name: this.documentDTO.name,
  //     },
  //   };
  //   if (this.validate()) {
  //     const modalRefSuccess = this.modalService.open(MessagePopupComponent, {
  //       size: "sm",
  //       backdrop: "static",
  //       keyboard: false,
  //       centered: true,
  //     });
  //     modalRefSuccess.componentInstance.type = "confirm";
  //     modalRefSuccess.componentInstance.title = this.translateService.instant(
  //       `ADD-INSIDE-IDEA.CONFIRM.CONFIRM`
  //     );
  //     modalRefSuccess.componentInstance.message = this.translateService.instant(
  //       `ADD-INSIDE-IDEA.CONFIRM.CONFIRM-EDIT`
  //     );
  //     modalRefSuccess.componentInstance.closeIcon = false;
  //     modalRefSuccess.componentInstance.next.subscribe((result: any) => {
  //       if (result === true) {
  //         return this.http.post<any>(url, requestBody, { headers }).subscribe(
  //           (res) => {
  //             if (res.errorCode === "0") {
  //               this.router.navigate(["idea/detail"]);
  //             } else {
  //               const modalRef = this.modalService.open(MessagePopupComponent, {
  //                 size: "sm",
  //                 backdrop: "static",
  //                 keyboard: false,
  //                 centered: true,
  //               });
  //               modalRef.componentInstance.type = "fail";
  //               modalRef.componentInstance.title =
  //                 this.translateService.instant(
  //                   `ADD-INSIDE-IDEA.VALIDATE.ERROR`
  //                 );
  //               modalRef.componentInstance.message = res.description;
  //               modalRef.componentInstance.closeIcon = false;
  //               return false;
  //             }
  //           },
  //           (error) => {}
  //         );
  //       } else {
  //       }
  //     });
  //   }
  // }
  validate() {


    let now = new Date();
    now.setHours(0, 0, 0, 0);

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
        `ADD-INSIDE-IDEA.VALIDATE.ERROR`
      );
      modalRef.componentInstance.closeIcon = false;
      return false;
    }
    if (this.applyStartTime > this.applyEndTime) {
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
    if (this.applyStartTime < now || this.applyEndTime < now) {
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
    if (endDate === undefined || endDate === null) {
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
    if (
      this.nextStep === undefined ||
      this.nextStep === null ||
      this.nextStep === "" ||
      this.nextStep.trim() === ""
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
        `ADD-INSIDE-IDEA.VALIDATE.NEXT`
      );
      modalRef.componentInstance.closeIcon = false;
      return false;
    }
    // if (
    //   this.note === undefined ||
    //   this.note === null ||
    //   this.note === "" ||
    //   this.note.trim() === ""
    // ) {
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
    //     `ADD-INSIDE-IDEA.VALIDATE.NOTE`
    //   );
    //   modalRef.componentInstance.closeIcon = false;
    //   return false;
    // }
    // if (this.documentDTO.url == "") {
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
  // updatedListUnitDTO: any[] = [];
  // getUpdatedListUnitDTO() {
  //   this.updatedListUnitDTO = [...this.listUnitDTO];

  //   for (const item of this.selectedUnitValue) {
  //     if (this.selectedUnitValue) {
  //       this.updatedListUnitDTO.push({
  //         unitName: item.unitName,
  //         unitCode: item.unitCode,
  //         unitId: item.unitId,
  //       });
  //     }
  //   }
  //   this.DataService.updatedListUnitDTO.next(this.updatedListUnitDTO)
  // }
  ideaDTO: any;
  checkStartDate = false;
  checkNow = false;
  checkNow2 = false;
  unitFieldTouched=false;
  selectStartDate() {

    let now = new Date();
    now.setHours(0, 0, 0, 0);
    if (this.applyStartTime > this.applyEndTime
    ) {
      this.checkStartDate = true;
    } else {
      this.checkStartDate = false;
    }
    if (this.applyStartTime < now) {
      this.checkNow = true;
    }
    else {
      this.checkNow = false;
    }


    this.getIdeaDTO()

  }
  selectEndDate() {
    let now = new Date();
    now.setHours(0, 0, 0, 0);
 
    if (this.applyStartTime > this.applyEndTime) {
      this.checkStartDate = true;
    } else {
      this.checkStartDate = false;
    }
    if (this.applyEndTime < now) {
      this.checkNow2 = true;
    }
    else {
      this.checkNow2 = false;
    }
    this.getIdeaDTO()


  }
  getIdeaDTO() {
    const startDate = this.applyStartTime;
    const endDate = this.applyEndTime;
    const startDay = startDate.getDate();
    const startMonth = startDate.getMonth() + 1;
    const startYear = startDate.getFullYear();
    const endDay = endDate.getDate();
    const endMonth = endDate.getMonth() + 1;
    const endYear = endDate.getFullYear();
    const startDateFormatted =
      startDay.toString().padStart(2, "0") +
      "/" +
      startMonth.toString().padStart(2, "0") +
      "/" +
      startYear;
    const endDateFormatted =
      endDay.toString().padStart(2, "0") +
      "/" +
      endMonth.toString().padStart(2, "0") +
      "/" +
      endYear;


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
      ideaId: this.ideaId,
      ideaName: this.ideaNameValue,
      specialty: this.specialty,
      applyStartTime: startDateFormatted,
      applyEndTime: endDateFormatted,
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
          url: this.documentDTO.url,
          name: this.documentDTO.name,
        },
      };


      return this.http.post<any>(url, requestBody, { headers }).subscribe(
        (response) => {
          if (response.errorCode == 0) {
            this.DataService.ideaDTOEdit.next(this.ideaDTO);
            this.DataService.isFromAdd = false;
            this.router.navigate(["idea/check-duplicate-idea"]);
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
}
