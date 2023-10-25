import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from "../../../../shared/service/data.service";
import { environment } from '@env/environment';
import { BehaviorSubject } from 'rxjs';
import { MessagePopupComponent } from '@app/modules/common-items/components/message-popup/message-popup.component';
import { ContrivanceService } from '@app/shared/service/contrivance.service';




@Component({
    selector: 'app-edit-outside-edit',
    templateUrl: './edit-outside-edit.component.html',
    styleUrls: ['./edit-outside-edit.component.scss']
})


export class EditOutsideEditComponent implements OnInit {
    contributorDTO: any;
    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        public DataService: DataService,
        private router: Router,
        private modalService: NgbModal,
        private translateService: TranslateService,
        public contrivanceService: ContrivanceService
    ) { }

    oldNumber: number = 0;
    oldEmail: string = '';
    token = JSON.parse(localStorage.getItem("tokenInLocalStorage"));
    ngOnInit() {
        // this.route.queryParams.subscribe((params) => {
        //     if (params && params.for) {
        //         this.backRoute = params.for;
        //     }
        //     if (params && params.phoneNumber) {
        //         if (this.backRoute == "contrivance") {
        //             this.contributorDTO = { ...this.contrivanceService.lstContributorDTOServiceOut.value.find((item) => (item.phoneNumber == Number(params.phoneNumber) && item.email == params.email)) }
        //         }
        //         else {
        //             this.contributorDTO = { ...this.DataService.lstContributorDTOServiceOutEdit.value.find((item) => (item.phoneNumber == Number(params.phoneNumber) && item.email == params.email)) }
        //         }
        //     }

        // })
        if(this.DataService.routerContrivance){
            this.contributorDTO = { ...this.contrivanceService.lstContributorDTOServiceOut.value.find((item) => (item.phoneNumber == this.DataService.phoneEditOutsideAuthor && item.email == this.DataService.emailEditOutsideAuthor)) }

        }
       else{
            this.contributorDTO = {
                ...this.DataService.lstContributorDTOServiceOutEdit.value.find(
                    (item) => (item.phoneNumber == this.DataService.phoneEditOutsideAuthor && item.email == this.DataService.emailEditOutsideAuthor)
                ),
            };
        }
        this.oldNumber = this.contributorDTO.phoneNumber;
        this.oldEmail = this.contributorDTO.email;

        if(!this.contributorDTO.displayName){
            this.contributorDTO.displayName=this.contributorDTO.fullName
        }
        
        this.apiListContributorOut()
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
    listContributorOut: []
    lang = localStorage.getItem('lang');
    apiListContributorOut() {
        const url = `${environment.API_HOST_NAME}/api/get-list-contributor-cms`;
        const headers = new HttpHeaders({
            'Accept-Language': this.lang,
            Authorization: `Bearer ` + this.token,
        });
        const requestBody = {
            userName: "hss_admin",
            contributorDTO: {
                fullName: '',
                outsideCorp: 1,
            }
        };
        return this.http.post<any>(url, requestBody, { headers }).subscribe(
            (response) => {
                this.listContributorOut = response.data.map((item) => { item.displayName = `${item.fullName} - ${item.phoneNumber}`; return { ...item } });


            },
            (error) => {
                console.error(error.data);
            },
        );
    }
    fullName;
    onSelectedStaffCodeChange(value: any) {
        this.contributorDTO = value;
        this.fullName=this.contributorDTO.displayName;


        console.log(value);
    }
    percentageValueChange(newValue: string) {
        const parsedValue = parseInt(newValue, 10);
        if (!isNaN(parsedValue)) {
            if (parsedValue >= 1) { // Thay đổi điều kiện này để đảm bảo giá trị >= 1
                if (parsedValue > 100) {
                    this.contributorDTO.percentage = '100';
                } else {
                    this.contributorDTO.percentage = parsedValue.toString();
                }
            } else {
                this.contributorDTO.percentage = '1'; // Nếu giá trị nhỏ hơn 1, đặt thành 1
            }

        }
    }
    updateJobAddress(newValue: string) {
        if (this.contributorDTO) {
            this.contributorDTO.jobAddress = newValue;
        }
    }
    updateJobPosition(newValue: string) {
        if (this.contributorDTO) {
            this.contributorDTO.jobPosition = newValue;
        }
    }
    phone;
    updatePhoneNumber(newValue: string) {
        this.phone=newValue;
        if (this.contributorDTO) {
            this.contributorDTO.phoneNumber = newValue;
        }
    }
    checkEmail = false;
    updateEmail(newValue: string) {
        if (this.contributorDTO) {
            this.contributorDTO.email = newValue;
            if (!this.isValidEmail(this.contributorDTO.email)) {
                this.checkEmail = true;
            } else {

                this.checkEmail = false;
            }
        }
    }
    updateProfessionalQualification(newValue: string) {
        if (this.contributorDTO) {
            this.contributorDTO.professionalQualification = newValue;
        }
    }
    validate() {
        if (
            this.contributorDTO.percentage === undefined ||
            this.contributorDTO.percentage === null ||
            this.contributorDTO.percentage === ''
        ) {
            // const modalRef = this.modalService.open(MessagePopupComponent, { size: 'sm', backdrop: 'static', keyboard: false, centered: true });
            // modalRef.componentInstance.type = 'fail';
            // modalRef.componentInstance.title = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.ERROR`);
            // modalRef.componentInstance.message = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.PERCENT`);
            // modalRef.componentInstance.closeIcon = false;
            return false;
        }
        if (
            this.contributorDTO.displayName === undefined ||
            this.contributorDTO.displayName === null ||
            this.contributorDTO.displayName === '' ||
            this.contributorDTO.displayName.trim() === ''
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
            this.contributorDTO.phoneNumber === '' ||
            this.contributorDTO.phoneNumber.trim() === ''
        ) {
            // const modalRef = this.modalService.open(MessagePopupComponent, { size: 'sm', backdrop: 'static', keyboard: false, centered: true });
            // modalRef.componentInstance.type = 'fail';
            // modalRef.componentInstance.title = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.ERROR`);
            // modalRef.componentInstance.message = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.PHONE`);
            // modalRef.componentInstance.closeIcon = false;
            return false;
        }

        if ((!this.isValidEmail(this.contributorDTO.email)) && this.contributorDTO.email) {
            // const modalRef = this.modalService.open(MessagePopupComponent, { size: 'sm', backdrop: 'static', keyboard: false, centered: true });
            // modalRef.componentInstance.type = 'fail';
            // modalRef.componentInstance.title = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.ERROR`);
            // modalRef.componentInstance.message = this.translateService.instant(`ADD-INSIDE-IDEA.VALIDATE.EMAIL_FORM`);
            // modalRef.componentInstance.closeIcon = false;
            return false;
        }
        let hasDuplicate = false;
        let lstContributorDTO = [];
        if (this.DataService.routerContrivance) {
            lstContributorDTO = [...this.contrivanceService.lstContributorDTOServiceOut.value];
        } else {
            lstContributorDTO = [...this.DataService.lstContributorDTOServiceOutEdit.value];
        }

        if (lstContributorDTO.length > 1) {
            for (let i = 0; i < lstContributorDTO.length; i++) {
                if (this.oldEmail == lstContributorDTO[i].email && this.oldNumber == lstContributorDTO[i].phoneNumber) {
                    lstContributorDTO[i] = this.contributorDTO;
                    break;
                }
            }

            if (this.contributorDTO.email && this.contributorDTO.email !== '') {
                let listDuplicate = lstContributorDTO.filter(item => {
                    return item.email == this.contributorDTO.email;
                });

                if (listDuplicate.length > 1) {
                    this.handleEditOutsideEditPopup.emit();
                    hasDuplicate = true;
                    return;
                }
            }

            let phoneDuplicate = lstContributorDTO.filter(item => {
                return item.phoneNumber == this.contributorDTO.phoneNumber;
            });

            if (phoneDuplicate.length > 1) {
                this.handleEditOutsideEditPopup.emit();
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
                for (let i = 0; i < this.contrivanceService.lstContributorDTOServiceOut.value.length; i++) {
                    if (
                        this.oldEmail == this.contrivanceService.lstContributorDTOServiceOut.value[i].email && this.oldNumber == this.contrivanceService.lstContributorDTOServiceOut.value[i].phoneNumber
                    ) {
                        this.contrivanceService.lstContributorDTOServiceOut.value[i] = this.contributorDTO;
                        break;
                    }

                    //   this.contrivanceService.lstContributorDTOServiceOut.value[i] = this.contributorDTO;

                }
                this.router.navigate(["contrivance/edit"]);
            } else {
                for (let i = 0; i < this.DataService.lstContributorDTOServiceOutEdit.value.length; i++) {
                    if (
                        (this.oldEmail == this.DataService.lstContributorDTOServiceOutEdit.value[i].email) && this.oldNumber == this.DataService.lstContributorDTOServiceOutEdit.value[i].phoneNumber
                    ) {
                        this.DataService.lstContributorDTOServiceOutEdit.value[i] = this.contributorDTO
                        break;
                    }


                }
                this.router.navigate(["idea/edit"]);
            }
        }


    }

    @Output() handleEditOutsideEditPopup = new EventEmitter<void>();
    @Output() handleEditOutsideEdit = new EventEmitter<void>();
    editNew() {
        if (this.validate()) {
            if (this.DataService.routerContrivance) {
                for (let i = 0; i < this.contrivanceService.lstContributorDTOServiceOut.value.length; i++) {
                    if (
                        this.oldEmail == this.contrivanceService.lstContributorDTOServiceOut.value[i].email && this.oldNumber == this.contrivanceService.lstContributorDTOServiceOut.value[i].phoneNumber
                    ) {
                        // this.contrivanceService.lstContributorDTOServiceOut.value[i] = this.contributorDTO;
                        if(this.fullName && this.oldNumber){
                            if(this.fullName.includes("-")){
                              let temp = this.fullName.split ("-");
                              this.fullName = temp[0]
                        
                            }
                            this.contributorDTO.displayName = `${this.fullName} - ${this.phone? this.phone : this.contributorDTO.phoneNumber}`
                            this.contributorDTO.fullName = this.fullName
                            
                           }


                        this.contrivanceService.lstContributorDTOServiceOut.value[i] = {
                            fullName: this.fullName,
                            ... this.contributorDTO
                          }
                        break;
                    }
                 
               

                }
                this.handleEditOutsideEdit.emit();
                this.DataService.showBg = false;
                this.DataService.showEditOutsideEdit = false;
                document.body.style.overflow = "auto";
                // this.router.navigate(["contrivance/edit"]);
            } else {
                for (let i = 0; i < this.DataService.lstContributorDTOServiceOutEdit.value.length; i++) {
                    if (
                        (this.oldEmail == this.DataService.lstContributorDTOServiceOutEdit.value[i].email) && this.oldNumber == this.DataService.lstContributorDTOServiceOutEdit.value[i].phoneNumber
                    ) { 
                        if(this.fullName && this.oldNumber){
                            if(this.fullName.includes("-")){
                              let temp = this.fullName.split ("-");
                              this.fullName = temp[0]
                        
                            }
                            this.contributorDTO.displayName = `${this.fullName} - ${this.phone? this.phone : this.contributorDTO.phoneNumber}`
                            this.contributorDTO.fullName = this.fullName
                            
                           }


                        this.DataService.lstContributorDTOServiceOutEdit.value[i] = {
                            fullName: this.fullName,
                            ... this.contributorDTO
                          }
                        break;
                    }


                }
                this.handleEditOutsideEdit.emit();
                this.DataService.showBg = false;
                this.DataService.showEditOutsideEdit = false;
                document.body.style.overflow = "auto";
            }
        }
    }

}
