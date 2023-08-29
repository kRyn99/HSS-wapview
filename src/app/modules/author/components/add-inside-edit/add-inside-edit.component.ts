import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
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
  selector: "app-add-inside-edit",
  templateUrl: "./add-inside-edit.component.html",
  styleUrls: ["./add-inside-edit.component.scss"],
})
export class AddInsideEditComponent implements OnInit {
  public selectedStaffCodeSubject = new BehaviorSubject<any>(null);
  setSelectedStaffCode(code: any) {
    this.selectedStaffCodeSubject.next(code);
    this.DataService.selectedStaffCodeSubject.next(code);
  }

  getSelectedStaffCodeSubject() {
    return this.selectedStaffCodeSubject.asObservable();
  }
  selectedStaffCode: any;
  token = JSON.parse(localStorage.getItem("tokenInLocalStorage"));
  constructor(
    private http: HttpClient,
    private config: NgSelectConfig,
    public DataService: DataService,
    private router: Router,
    private modalService: NgbModal,
    private translateService: TranslateService,
    public contrivanceService: ContrivanceService,
    private route: ActivatedRoute
  ) {
    this.config.notFoundText = this.translateService.instant(`STAFF_CODE_NOT_EXIST`);
    this.config.appendTo = "body";
    // set the bindValue to global config when you use the same
    // bindValue in most of the place.
    // You can also override bindValue for the specified template
    // by defining `bindValue` as property
    // Eg : <ng-select bindValue="some-new-value"></ng-select>
    this.config.bindValue = "value";
  }
  // bsConfig: Partial<BsDatepickerConfig>;
  bsConfig = {
    dateInputFormat: "DD/MM/YYYY",
  };
  minMode: BsDatepickerViewMode = "day";
  ngOnInit() {
    this.getListStaff();
    this.route.queryParams.subscribe((params) => {
      if (params && params.for) {
        this.backRoute = params.for;
      }
    });
  }
  listStaff: [];
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
        this.listStaff = response.data.listStaffDTO;
        console.log(this.listStaff);
      },
      (error) => {
        console.error(error.description);
      }
    );
  }
  goBackEdit() {
    alert("ok");
  }
  onSelectedStaffCodeChange(value: any) {
    this.setSelectedStaffCode(value);

    console.log(value);
  }
  percentageValue: string;
  phoneNumber: string;
  email: string;
  birthday: Date;
  percentageValueChange(newValue: string) {
    const parsedValue = parseInt(newValue, 10);
    if (!isNaN(parsedValue)) {
      if (parsedValue >= 1) {
        // Thay đổi điều kiện này để đảm bảo giá trị >= 1
        if (parsedValue > 100) {
          this.percentageValue = "100";
        } else {
          this.percentageValue = parsedValue.toString();
        }
      } else {
        this.percentageValue = "1"; // Nếu giá trị nhỏ hơn 1, đặt thành 1
      }
      this.DataService.percentage.next(this.percentageValue);
    }
  }

  phoneNumberChange() {
    this.phoneNumber = this.phoneNumber.replace(/\D/g, "");
    if (this.phoneNumber.length > 12) {
      this.phoneNumber = this.phoneNumber.slice(0, 12);
    }
    console.log(this.phoneNumber);
    this.DataService.phoneNumber.next(this.phoneNumber);
  }
  emailChange() {
    console.log(this.email);
    this.DataService.email.next(this.email);
  }

  birthdayChange(event: Event): void {
    console.log(this.birthday);
    event.preventDefault();
    this.DataService.birthday.next(this.birthday);
  }

  getLstContributorDTO() {
    let contributorDTO = null;
    contributorDTO = {
      staffId: this.selectedStaffCodeSubject.value?.id,
      percentage: this.DataService.percentage.value,
      birthday: this.selectedStaffCodeSubject.value?.birthday,
      staffCode: this.selectedStaffCodeSubject.value?.staffCode,
      fullName: this.selectedStaffCodeSubject.value?.fullName,
      phoneNumber: this.selectedStaffCodeSubject.value?.phoneNumber,
      email: this.selectedStaffCodeSubject.value?.email,
      jobPosition: this.selectedStaffCodeSubject.value?.jobPosition,
      jobAddress: this.selectedStaffCodeSubject.value?.jobAddress,
      professionalQualification:
        this.selectedStaffCodeSubject.value?.proQualification,
    };

    if (this.backRoute == "contrivance") {
      this.contrivanceService.lstContributorDTOService.value.push(
        contributorDTO
      );
    } else {
      this.DataService.lstContributorDTOServiceEdit.value.push(contributorDTO);
    }
    this.DataService.backFromEdit = true;
  }

  isEdit: boolean;
  ClickEdit() {
    this.isEdit = !this.isEdit;
  }
  ////////////
  validate() {
    let hasDuplicate = false;
    if (!this.selectedStaffCodeSubject.value) {
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
        `ADD-INSIDE-IDEA.VALIDATE.STAFF-CODE`
      );
      modalRef.componentInstance.closeIcon = false;
      return false;
    }
    if (
      this.percentageValue === undefined ||
      this.percentageValue === null ||
      this.percentageValue === ""
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
        `ADD-INSIDE-IDEA.VALIDATE.PERCENT`
      );
      modalRef.componentInstance.closeIcon = false;
      return false;
    }
    let lstContributorDTO = [];
    if (this.backRoute == "contrivance") {
      lstContributorDTO = this.contrivanceService.lstContributorDTOService.value;
    } else {
      lstContributorDTO = this.DataService.lstContributorDTOServiceEdit.value;
    }
    lstContributorDTO.forEach((item) => {
      if (item.staffId == this.selectedStaffCodeSubject.value?.id) {
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
        hasDuplicate = true;
        return;
      }
    });
    if (hasDuplicate) {
      return false;
    }
    return true;
  }

  backRoute = null;
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
          this.getLstContributorDTO();
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
}
