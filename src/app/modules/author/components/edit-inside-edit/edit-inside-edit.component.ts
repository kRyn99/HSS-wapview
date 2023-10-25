import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { DataService } from "../../../../shared/service/data.service";
import { environment } from "@env/environment";
import { BehaviorSubject } from "rxjs";
import { MessagePopupComponent } from "@app/modules/common-items/components/message-popup/message-popup.component";
import { ContrivanceService } from "@app/shared/service/contrivance.service";
import { NgSelectConfig } from "@ng-select/ng-select";

@Component({
  selector: "app-edit-inside-edit",
  templateUrl: "./edit-inside-edit.component.html",
  styleUrls: ["./edit-inside-edit.component.scss"],
})
export class EditInsideEditComponent implements OnInit {
  contributorDTO: any;
  constructor(
    private config: NgSelectConfig,
    private http: HttpClient,
    private route: ActivatedRoute,
    public DataService: DataService,
    private router: Router,
    private modalService: NgbModal,
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
    console.log(this.DataService.lstContributorDTOServiceEdit.value);

    // this.route.queryParams.subscribe((params) => {
    //   if (params && params.for) {
    //     this.backRoute = params.for;
    //   }
    //   if (params && params.id) {
    //     if (this.backRoute == "contrivance") {
    //       this.contributorDTO = {
    //         ...this.contrivanceService.lstContributorDTOService.value.find(
    //           (item) => item.staffId == Number(params.id)
    //         ),
    //       };
    //     } else {
    //       this.contributorDTO = {
    //         ...this.DataService.lstContributorDTOServiceEdit.value.find(
    //           (item) => item.staffId == Number(params.id)
    //         ),
    //       };
    //     }
    //   }
    //   this.staffId = params.id;
    // });
    if(this.DataService.routerContrivance){
      this.contributorDTO = {
        ...this.contrivanceService.lstContributorDTOService.value.find(
          (item) => item.staffId == this.DataService.idEditInsideAuthor
        ),
      };
    }
    else {
      this.contributorDTO = {
        ...this.DataService.lstContributorDTOServiceEdit.value.find(
          (item) => item.staffId == this.DataService.idEditInsideAuthor
        ),
      };
   
    }
    this.staffId = this.DataService.idEditInsideAuthor;
    console.log(this.staffId);
    
    this.getListStaff();
  }
  checkPhoneFormat=false;
  checkValidatePhone(phoneNumber: string) {
    const phoneNumberRegex = /^\d{8,15}$/;
    if (phoneNumberRegex.test(phoneNumber)) {
     this.checkPhoneFormat = false;
    } else {
      this.checkPhoneFormat = true;
    }
  }
  changePhone(){
    this.checkValidatePhone(this.contributorDTO.phoneNumber);
    if(this.checkPhoneFormat) {
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
  getListStaff() {
    const url = `${environment.API_HOST_NAME}/api/get-list-staff`;
    const headers = new HttpHeaders({
      "Accept-Language": this.lang,
      Authorization: `Bearer ` + this.token,
    });
    const requestBody = {
      userName: "hss_admin",

      staffDTO: {
        staffCode: "",
      },
    };
    return this.http.post<any>(url, requestBody, { headers }).subscribe(
      (response) => {
        // this.listStaff = response.data.listStaffDTO;
        this.listStaff = response.data.listStaffDTO.map((item) => { item.displayName = `${item.staffCode} - ${item.fullName}`; return { ...item } });

        console.log(this.listStaff);
      },
      (error) => {
        console.error(error.description);
      }
    );
  }

  onSelectedStaffCodeChange(value: any) {
    this.contributorDTO = value;
    this.contributorDTO.staffId = value.id;
    this.contributorDTO.birthDay = this.contributorDTO.birthday;
    this.checkValidatePhone(this.contributorDTO.phoneNumber);
    if(this.checkPhoneFormat) {
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
      this.contributorDTO.phoneNumber === undefined ||
      this.contributorDTO.phoneNumber === null ||
      this.contributorDTO.phoneNumber === "" ||
      this.contributorDTO.phoneNumber.trim() === ""
    ) {
      // const modalRef = this.modalService.open(MessagePopupComponent, { size: 'sm', backdrop: 'static', keyboard: false, centered: true });
      // modalRef.componentInstance.type = 'fail';
      // modalRef.componentInstance.title = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.ERROR`);
      // modalRef.componentInstance.message = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.PHONE`);
      // modalRef.componentInstance.closeIcon = false;
      return false;
    }
    if(this.checkPhoneFormat){
      return false;
    }
    if (
      this.contributorDTO.email === undefined ||
      this.contributorDTO.email === null ||
      this.contributorDTO.email === "" ||
      this.contributorDTO.email.trim() === ""
    ) {
      // const modalRef = this.modalService.open(MessagePopupComponent, { size: 'sm', backdrop: 'static', keyboard: false, centered: true });
      // modalRef.componentInstance.type = 'fail';
      // modalRef.componentInstance.title = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.ERROR`);
      // modalRef.componentInstance.message = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.EMAIL`);
      // modalRef.componentInstance.closeIcon = false;
      return false;
    } else {
      if (!this.isValidEmail(this.contributorDTO.email)) {
        // const modalRef = this.modalService.open(MessagePopupComponent, { size: 'sm', backdrop: 'static', keyboard: false, centered: true });
        // modalRef.componentInstance.type = 'fail';
        // modalRef.componentInstance.title = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.ERROR`);
        // modalRef.componentInstance.message = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.EMAIL_FORM`);
        // modalRef.componentInstance.closeIcon = false;
        return false;
      }
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
            this.contributorDTO.staffId
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
            this.contributorDTO.staffId
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
