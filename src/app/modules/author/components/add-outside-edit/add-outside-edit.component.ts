import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from "@env/environment";
import { NgSelectConfig } from "@ng-select/ng-select";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { MessagePopupComponent } from "../../../../modules/common-items/components/message-popup/message-popup.component";

import {
  BsDatepickerConfig,
  BsDatepickerViewMode,
} from "ngx-bootstrap/datepicker";
import { DataService } from "../../../../shared/service/data.service";
import { BehaviorSubject } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ContrivanceService } from "@app/shared/service/contrivance.service";

@Component({
  selector: "app-add-outside-edit",
  templateUrl: "./add-outside-edit.component.html",
  styleUrls: ["./add-outside-edit.component.scss"],
})
export class AddOutsideEditComponent implements OnInit {
  public selectedStaffCodeSubject = new BehaviorSubject<any>({});
  setSelectedStaffCode(code: any) {
    this.selectedStaffCodeSubject.next(code);
    // this.DataService.selectedStaffCodeSubject.next(code);
  }

  getSelectedStaffCodeSubject() {
    return this.selectedStaffCodeSubject.asObservable();
  }
  selectedFullName;
  selectedJobAddress;
  selectedJobPosition;
  selectedPhoneNumber;
  selectedEmail;
  selectedProfessionalQualification;
  selectedPercentage;
  msgPhoneError = "";
  searchValue = "";
  listStaffOut = [];
  constructor(
    private http: HttpClient,
    private config: NgSelectConfig,
    public DataService: DataService,
    private router: Router,
    private modalService: NgbModal,
    private translateService: TranslateService,
    public contrivanceService: ContrivanceService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit() {
    // this.apiListContributorOut();
    this.route.queryParams.subscribe((params) => {
      if (params && params.for) {
        this.backRoute = params.for;
      }
    });
  }

  onSearch(searchText: any) {
    this.selectedFullName = "";
    this.searchValue = searchText.term;
  }

  onBlur() {
    // Xử lý khi hộp chọn mất focus
    if (this.searchValue.length > 0) {
      this.selectedStaffCodeSubject.next({});
      this.selectedFullName = this.searchValue;
      this.selectedPhoneNumber = "";
      this.selectedEmail = "";
      this.selectedPercentage = "";
      this.cd.detectChanges();
    }
  }

  goBack() {
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

  getListContributorOut() {
    let contributorDTO = null;
    contributorDTO = {
      fullName: this.selectedStaffCodeSubject.value?.fullName
        ? this.selectedStaffCodeSubject.value?.fullName
        : this.selectedStaffCodeSubject.value?.displayName
        ? this.selectedStaffCodeSubject.value?.displayName
        : this.selectedFullName,
      percentage: this.DataService.percentageOut.value,
      phoneNumber: this.selectedPhoneNumber,
      email: this.selectedEmail,
      jobPosition: this.selectedJobPosition,
      jobAddress: this.selectedJobAddress,
      professionalQualification: this.selectedProfessionalQualification,
      displayName: this.selectedStaffCodeSubject.value?.fullName
        ? `${this.selectedStaffCodeSubject.value?.fullName} - ${this.selectedPhoneNumber}`
        : `${
            this.selectedStaffCodeSubject.value?.displayName
              ? this.selectedStaffCodeSubject.value?.displayName
              : this.selectedFullName
          } - ${this.selectedPhoneNumber}`,
    };
    if (this.DataService.routerContrivance) {
      this.contrivanceService.lstContributorDTOServiceOut.value.push(
        contributorDTO
      );
    } else {
      this.DataService.lstContributorDTOServiceOutEdit.value.push(
        contributorDTO
      );
    }
    this.DataService.backFromEdit = true;
  }
  token = JSON.parse(localStorage.getItem("tokenInLocalStorage"));
  listContributorOut: [];
  lang = localStorage.getItem("lang");

  isInputTouched = false;
  onSelectedStaffCodeChange(value: any) {
    this.setSelectedStaffCode({...value});
    this.searchValue = "";
    this.isInputTouched = true;
    this.selectedPhoneNumber = this.selectedStaffCodeSubject.value?.phoneNumber;
    this.selectedEmail = this.selectedStaffCodeSubject.value?.email;
    this.selectedJobPosition = this.selectedStaffCodeSubject.value?.jobPosition;
    this.selectedJobAddress = this.selectedStaffCodeSubject.value?.jobAddress;
    this.selectedProfessionalQualification =
      this.selectedStaffCodeSubject.value?.professionalQualification;

    this.checkPhoneNumber();
  }
  percentageValueChange(newValue: string) {
    const parsedValue = parseInt(newValue, 10);
    if (!isNaN(parsedValue)) {
      if (parsedValue >= 1) {
        // Thay đổi điều kiện này để đảm bảo giá trị >= 1
        if (parsedValue > 100) {
          this.selectedPercentage = "100";
        } else {
          this.selectedPercentage = parsedValue.toString();
        }
      } else {
        this.selectedPercentage = "1"; // Nếu giá trị nhỏ hơn 1, đặt thành 1
      }
      this.DataService.percentageOut.next(this.selectedPercentage);
    }
  }

  changeJobAddress() {
    this.selectedStaffCodeSubject.value.jobAddress = this.selectedJobAddress;
  }

  changeJobPosition() {
    this.selectedStaffCodeSubject.value.jobPosition = this.selectedJobPosition;
  }
  phoneTouched = false;

  checkValidatePhone(phoneNumber: string) {
    const phoneNumberRegex = /^\d{8,15}$/;
    if (phoneNumberRegex.test(phoneNumber)) {
      return true;
    } else {
      return false;
    }
  }

  checkPhoneNumber() {
    if (!this.selectedPhoneNumber || this.selectedPhoneNumber.length === 0) {
      this.msgPhoneError = this.translateService.instant(
        `ADD-INSIDE-IDEA.VALIDATE.PHONE`
      );
      return false;
    }
    if (!this.checkValidatePhone(this.selectedPhoneNumber)) {
      this.msgPhoneError =
        this.translateService.instant(`IDEA_NEW.PHONE_ERROR`);
      return false;
    }
    this.msgPhoneError = "";
    return true;
  }

  changePhone() {
    debugger
    if (!this.checkPhoneNumber()) {
      return;
    }
    this.selectedStaffCodeSubject.value.phoneNumber = this.selectedPhoneNumber;
  }
  emailTouched = false;
  checkEmail = false;
  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
  changeEmail() {
    this.emailTouched = true;
    this.selectedStaffCodeSubject.value.email = this.selectedEmail;
    if (!this.isValidEmail(this.selectedStaffCodeSubject.value.email)) {
      this.checkEmail = true;
    } else {
      this.checkEmail = false;
    }
  }
  qualificationTouched = false;
  changeQualification() {
    this.selectedStaffCodeSubject.value.professionalQualification =
      this.selectedProfessionalQualification;
    this.qualificationTouched = true;
  }
  percentageTouched = false;
  changePercentage() {
    this.percentageTouched = true;
  }
  validateTemplate() {
    if (!this.selectedStaffCodeSubject.value) {
      this.isInputTouched = true;
    }

    if (
      this.selectedPhoneNumber === undefined ||
      this.selectedPhoneNumber === null ||
      this.selectedPhoneNumber === ""
    ) {
      this.phoneTouched = true;
    }

    // if (
    //   this.selectedProfessionalQualification === undefined ||
    //   this.selectedProfessionalQualification === null ||
    //   this.selectedProfessionalQualification === ''
    // ) {
    //   this.qualificationTouched = true;
    // }
    if (
      this.selectedPercentage === undefined ||
      this.selectedPercentage === null ||
      this.selectedPercentage === ""
    ) {
      this.percentageTouched = true;
    }
  }
  validate() {
    function isValidEmail(email: string): boolean {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      return emailRegex.test(email);
    }
    // let hasDuplicate = false;
    if (!this.selectedStaffCodeSubject.value) {
      // const modalRef = this.modalService.open(MessagePopupComponent, { size: 'sm', backdrop: 'static', keyboard: false, centered: true });
      // modalRef.componentInstance.type = 'fail';
      // modalRef.componentInstance.title = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.ERROR`);
      // modalRef.componentInstance.message = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.STAFF-CODE`);
      // modalRef.componentInstance.closeIcon = false;
      this.validateTemplate();
      return false;
    }
    if (
      this.selectedPercentage === undefined ||
      this.selectedPercentage === null ||
      this.selectedPercentage === ""
    ) {
      // const modalRef = this.modalService.open(MessagePopupComponent, { size: 'sm', backdrop: 'static', keyboard: false, centered: true });
      // modalRef.componentInstance.type = 'fail';
      // modalRef.componentInstance.title = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.ERROR`);
      // modalRef.componentInstance.message = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.PERCENT`);
      // modalRef.componentInstance.closeIcon = false;
      return false;
    }
    if (!this.checkPhoneNumber()) {
      // const modalRef = this.modalService.open(MessagePopupComponent, { size: 'sm', backdrop: 'static', keyboard: false, centered: true });
      // modalRef.componentInstance.type = 'fail';
      // modalRef.componentInstance.title = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.ERROR`);
      // modalRef.componentInstance.message = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.PHONE`);
      // modalRef.componentInstance.closeIcon = false;
      return false;
    }
    if (!isValidEmail(this.selectedEmail) && this.selectedEmail) {
      // const modalRef = this.modalService.open(MessagePopupComponent, { size: 'sm', backdrop: 'static', keyboard: false, centered: true });
      // modalRef.componentInstance.type = 'fail';
      // modalRef.componentInstance.title = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.ERROR`);
      // modalRef.componentInstance.message = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.EMAIL_FORM`);
      // modalRef.componentInstance.closeIcon = false;
      this.checkEmail = true;
      return false;
    }

    // if (
    //   this.selectedProfessionalQualification === undefined ||
    //   this.selectedProfessionalQualification === null ||
    //   this.selectedProfessionalQualification === ''
    // ) {
    //   const modalRef = this.modalService.open(MessagePopupComponent, { size: 'sm', backdrop: 'static', keyboard: false, centered: true });
    //   modalRef.componentInstance.type = 'fail';
    //   modalRef.componentInstance.title = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.ERROR`);
    //   modalRef.componentInstance.message = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.QUALIFICATION`);
    //   modalRef.componentInstance.closeIcon = false;
    //   return false;
    // }
    let lstContributorDTO = [];
    if (this.DataService.routerContrivance) {
      lstContributorDTO =
        this.contrivanceService.lstContributorDTOServiceOut.value;
    } else {
      lstContributorDTO =
        this.DataService.lstContributorDTOServiceOutEdit.value;
    }

    let staffCheck = {
      phoneNumber: this.selectedStaffCodeSubject.value.phoneNumber
        ? this.selectedStaffCodeSubject.value.phoneNumber
        : this.selectedPhoneNumber,
      email: this.selectedStaffCodeSubject.value.email
        ? this.selectedStaffCodeSubject.value.email
        : this.selectedEmail,
      fullName: this.selectedStaffCodeSubject.value.fullName
        ? this.selectedStaffCodeSubject.value.fullName
        : this.selectedFullName,
    };
    let duplicate = lstContributorDTO.some((item) => {
      return (
        item.phoneNumber == staffCheck.phoneNumber ||
        (staffCheck.email &&
          item.email.toLowerCase() == staffCheck.email.toLowerCase())
      );
    });
    if (duplicate) {
      this.handleAddOutsideEditPopup.emit();
      return false;
      // return;
    }

    // if (hasDuplicate) {
    //      return false;
    // }
    return true;
  }

  backRoute = null;
  @Output() handleAddOutsideEditPopup = new EventEmitter<void>();
  @Output() handleAddOutsideEdit = new EventEmitter<void>();
  addNew() {
    if (this.validate()) {
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
        `ADD-INSIDE-IDEA.CONFIRM.CONFIRM-ADD`
      );
      modalRefSuccess.componentInstance.closeIcon = false;

      // Xử lý khi modal được đóng
      modalRefSuccess.componentInstance.next.subscribe((result: any) => {
        // Người dùng đã đồng ý cập nhật, thực hiện tác vụ cập nhật tại đây
        if (result === true) {
          this.getListContributorOut();
          if (this.backRoute == "contrivance") {
            this.router.navigate(["contrivance/edit"]);
          } else {
            this.router.navigate(["idea/edit"]);
          }
        } else {
          // Người dùng không đồng ý cập nhật
          // Thực hiện các tác vụ khác nếu cần
        }
      });
    }
  }
  add() {
    if (this.validate()) {
      this.handleAddOutsideEdit.emit();
      this.DataService.showBg = false;
      this.DataService.showAddOutsideEdit = false;
      document.body.style.overflow = "auto";
      this.getListContributorOut();
    }
  }
}
