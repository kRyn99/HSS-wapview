import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { DataService } from "../../../../shared/service/data.service";
import { ContrivanceService } from "@app/shared/service/contrivance.service";
import { NgSelectConfig } from "@ng-select/ng-select";

@Component({
  selector: "app-edit-inside-edit",
  templateUrl: "./edit-inside-edit.component.html",
  styleUrls: ["./edit-inside-edit.component.scss"],
})
export class EditInsideEditComponent implements OnInit {
  contributorDTO: any;
  msgPhoneError = '';
  constructor(
    private config: NgSelectConfig,
    public DataService: DataService,
    private router: Router,
    private translateService: TranslateService,
    public contrivanceService: ContrivanceService
  ) {
    this.config.notFoundText =
      this.translateService.instant(`STAFF_CODE_NOT_EXIST`);
    this.config.appendTo = "body";
    this.config.bindValue = "value";
  }
  token = JSON.parse(localStorage.getItem("tokenInLocalStorage"));
  staffId;
  ngOnInit() {
    if(this.DataService.routerContrivance){ 
      this.contributorDTO = {
        ...this.contrivanceService.lstContributorDTOService.value.find(
          (item) => item.staffId == this.DataService.idEditInsideAuthor
        ),
      };
      this.selectedStaffCode = this.contributorDTO.fullName;
    }
    else {
      this.contributorDTO = {
        ...this.DataService.lstContributorDTOServiceEdit.value.find(
          (item) => item.staffId == this.DataService.idEditInsideAuthor
        ),
      };
      this.selectedStaffCode = this.contributorDTO.fullName;
    }
    this.staffId = this.DataService.idEditInsideAuthor;

  }


  
  checkValidatePhone(phoneNumber: string) {
    const phoneNumberRegex = /^\d{8,15}$/;
    if (phoneNumberRegex.test(phoneNumber)) {
     return true;
    } else {
      return false;
    }
  }

  checkPhoneNumber(){
    if(!this.contributorDTO.phoneNumber || this.contributorDTO.phoneNumber.length ===0) {
      this.msgPhoneError = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.PHONE`);
      return false;
    }
    if(!this.checkValidatePhone(this.contributorDTO.phoneNumber)) {
      this.msgPhoneError = this.translateService.instant(`IDEA_NEW.PHONE_ERROR`);
      return false;
    }
    this.msgPhoneError = '';
    return true;
  }
  changePhone() {
    if(!this.checkPhoneNumber()){
        return;
    }
  
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
  listStaff: [];
  selectedStaffCode: any;
  lang = localStorage.getItem("lang");

  onSelectedStaffCodeChange(value: any) {
    this.contributorDTO = value;
    this.contributorDTO.staffId = value.id;
    this.contributorDTO.birthDay = this.contributorDTO.birthday;
    if(this.checkPhoneNumber()) {
      return;
    }
  }
  bsConfig = {
    dateInputFormat: "DD/MM/YYYY",
  };
  percentageValueChange(newValue: string) {
    const parsedValue = parseInt(newValue, 10);
    if (!isNaN(parsedValue)) {
      if (parsedValue >= 1) {
        // Thay đổi điều kiện này để đảm bảo giá trị >= 1
        if (parsedValue > 100) {
          this.contributorDTO.percentage = "100";
        } else {
          this.contributorDTO.percentage = parsedValue.toString();
        }
      } else {
        this.contributorDTO.percentage = "1"; // Nếu giá trị nhỏ hơn 1, đặt thành 1
      }
    }
  }
  checkEmail = false;
  changeEmail() {
    if (!this.isValidEmail(this.contributorDTO.email)) {
      this.checkEmail = true;
    } else {
      this.checkEmail = false;
    }
  }
  // changeBirthDay(){
  //     console.log(this.contributorDTO.birthDay);

  // }
  validate() {
    if (
      this.contributorDTO.staffCode === undefined ||
      this.contributorDTO.staffCode === null ||
      this.contributorDTO.staffCode === "" ||
      this.contributorDTO.staffCode.trim() === ""
    ) {
      // const modalRef = this.modalService.open(MessagePopupComponent, { size: 'sm', backdrop: 'static', keyboard: false, centered: true });
      // modalRef.componentInstance.type = 'fail';
      // modalRef.componentInstance.title = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.ERROR`);
      // modalRef.componentInstance.message = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.STAFF-CODE`);
      // modalRef.componentInstance.closeIcon = false;
      return false;
    }
    if (
      this.contributorDTO.percentage === undefined ||
      this.contributorDTO.percentage === null ||
      this.contributorDTO.percentage === ""
    ) {
      // const modalRef = this.modalService.open(MessagePopupComponent, { size: 'sm', backdrop: 'static', keyboard: false, centered: true });
      // modalRef.componentInstance.type = 'fail';
      // modalRef.componentInstance.title = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.ERROR`);
      // modalRef.componentInstance.message = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.PERCENT`);
      // modalRef.componentInstance.closeIcon = false;
      return false;
    }
    if (
      this.contributorDTO.fullName === undefined ||
      this.contributorDTO.fullName === null ||
      this.contributorDTO.fullName === "" ||
      this.contributorDTO.fullName.trim() === ""
    ) {
      // const modalRef = this.modalService.open(MessagePopupComponent, { size: 'sm', backdrop: 'static', keyboard: false, centered: true });
      // modalRef.componentInstance.type = 'fail';
      // modalRef.componentInstance.title = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.ERROR`);
      // modalRef.componentInstance.message = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.NAME`);
      // modalRef.componentInstance.closeIcon = false;
      return false;
    }
    if (
        !this.checkPhoneNumber()
    ) {
      // const modalRef = this.modalService.open(MessagePopupComponent, { size: 'sm', backdrop: 'static', keyboard: false, centered: true });
      // modalRef.componentInstance.type = 'fail';
      // modalRef.componentInstance.title = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.ERROR`);
      // modalRef.componentInstance.message = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.PHONE`);
      // modalRef.componentInstance.closeIcon = false;
      return false;
    }


    let hasDuplicate = false;
    let lstContributorDTO = [];
    if (this.DataService.routerContrivance) {
      lstContributorDTO = [
        ...this.contrivanceService.lstContributorDTOService.value,
      ];
    } else {
      lstContributorDTO = [
        ...this.DataService.lstContributorDTOServiceEdit.value,
      ];
    }
    if (lstContributorDTO.length > 1) {
      for (let i = 0; i < lstContributorDTO.length; i++) {
        if (this.staffId == lstContributorDTO[i].staffId) {
          lstContributorDTO[i] = this.contributorDTO;
          break;
        }
      }
      let listDuplicate = lstContributorDTO.filter((item) => {
        return item.staffId == this.contributorDTO.staffId;
      });
      if (listDuplicate.length > 1) {
        this.handleEditInsideEditPopup.emit();
        hasDuplicate = true;
        return;
      }
    }

    if (hasDuplicate) {
      return false;
    }
    return true;
  }
  isValidEmail(email: string): boolean {
    // Biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Sử dụng test() để kiểm tra xem email có khớp với biểu thức chính quy không
    return emailRegex.test(email);
  }
  backRoute = null;
  edit() {
    if (this.validate()) {
      if (this.backRoute == "contrivance") {
        for (
          let i = 0;
          i < this.contrivanceService.lstContributorDTOService.value.length;
          i++
        ) {
          if (
            this.contrivanceService.lstContributorDTOService.value[i].staffId ==
            this.staffId
          ) {
            this.contrivanceService.lstContributorDTOService.value[i] =
              this.contributorDTO;
          }
        }
        this.router.navigate(["contrivance/edit"]);
      } else {
        for (
          let i = 0;
          i < this.DataService.lstContributorDTOServiceEdit.value.length;
          i++
        ) {
          if (
            this.DataService.lstContributorDTOServiceEdit.value[i].staffId ==
            this.staffId
          ) {
            this.DataService.lstContributorDTOServiceEdit.value[i] =
              this.contributorDTO;
          }
        }
        this.router.navigate(["idea/edit"]);
      }
    }
  }
  @Output() handleEditInsideEditPopup = new EventEmitter<void>();
  @Output() handleEditInsideEdit = new EventEmitter<void>();
  editNew() {
    if (this.validate()) {
      if (this.DataService.routerContrivance) {
        for (
          let i = 0;
          i < this.contrivanceService.lstContributorDTOService.value.length;
          i++
        ) {
          if (
            this.contrivanceService.lstContributorDTOService.value[i].staffId ==
            this.staffId
          ) {
            this.contrivanceService.lstContributorDTOService.value[i] =
              this.contributorDTO;
          }
        }
        this.handleEditInsideEdit.emit();
        this.DataService.showBg = false;
        this.DataService.showEditInsideEdit = false;
        document.body.style.overflow = "auto";
      } else {
        for (
          let i = 0;
          i < this.DataService.lstContributorDTOServiceEdit.value.length;
          i++
        ) {
          if (
            this.DataService.lstContributorDTOServiceEdit.value[i].staffId ==
            this.staffId
          ) {
            this.DataService.lstContributorDTOServiceEdit.value[i] =
              this.contributorDTO;
          }
        }
        this.handleEditInsideEdit.emit();
        this.DataService.showBg = false;
        this.DataService.showEditInsideEdit = false;
        document.body.style.overflow = "auto";
      }
    }
  }
}
