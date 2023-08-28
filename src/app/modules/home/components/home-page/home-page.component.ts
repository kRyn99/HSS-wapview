import {Router} from '@angular/router';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '@app/modules/auth/_models/user';
import {MessagePopupComponent} from '@app/modules/common-items/components/message-popup/message-popup.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {COMMON_CONFIG, FILTER_VOUCHER} from '@app/shared/contants/common-constants';
import {environment} from '@env/environment';
import {CategoryDTO, EndUserInfoModels, SpecialGiftDTO, TopBrandDTO} from '@app/modules/home/shared/_models/end-user-info.models';
import {PickMapComponent} from '@app/modules/common-items/components/pick-map/pick-map.component';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];

    merchantModel: any;
    collaboratorModel: any;
    endUserModel: any;
    hideIcon: string;
    user: User;
    // headerBase64 = 'data:image/png;base64, ';
    upointCurrent = 0;
    totalReceiving = 0;
    totalGiving = 0;
    upointMerchant = 0;
    upointCollaborator = 0;
    isdnOwner = '';
    isAssistant = false;
    lang = localStorage.getItem(COMMON_CONFIG.KEY.LOCALIZATION);
    latitude = 0;
    longitude = 0;

    endUserInfoModels = new EndUserInfoModels();
    address = '';
    logo = '';
    shopId = null;
    shopName = '';
    totalFollows = 0;
    totalTopup = 0;
    ratings = 0;

    // EU
    // lstSpecialGiftShow = new BehaviorSubject<SpecialGiftDTO[]>([]);
    lstCategoryShow = new BehaviorSubject<CategoryDTO[]>([]);
    lstTopBrandShow = new BehaviorSubject<TopBrandDTO[]>([]);
    inputSearch = '';
    activeFilter = FILTER_VOUCHER.BEST_SELLERS;
    listFilter = FILTER_VOUCHER;
    offsetVoucher = 0;
    limitVoucher = COMMON_CONFIG.LIMIT_VOUCHER;

    constructor(
        private router: Router,
        private modalService: NgbModal,
        private translateService: TranslateService,
    ) {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.hideIcon = localStorage.getItem('hideIcon');
        if (!this.lang) {
            this.lang = environment.defaultLang;
        }
    }

    ngOnInit() {
        // init param
        this.inputSearch = '';
        // this.lstSpecialGiftShow = new BehaviorSubject<SpecialGiftDTO[]>([]);
        this.lstCategoryShow = new BehaviorSubject<CategoryDTO[]>([]);
        this.lstTopBrandShow = new BehaviorSubject<TopBrandDTO[]>([]);
        this.offsetVoucher = 0;
        this.limitVoucher = COMMON_CONFIG.LIMIT_VOUCHER;

        if (this.user.data.role === 'END_USER') {
            this.getLocation();
        } else if (this.user.data.role === 'ROLE_MERCHANT') {
            this.getUpointCurrentForUser();
        } else if (this.user.data.role === 'ROLE_ASSISTANT') {
            this.getUpointCurrentForCollaborator();
            this.isAssistant = true;
        } else if (this.user.data.role === 'ROLE_COLLABORATORS') {
            this.getUpointCurrentForCollaborator();
        } else {
            this.getData();
        }
    }

    getUpointCurrentForUser() {
    }

    getUpointCurrentForCollaborator() {

    }

    getUpointCust() {

    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                    if (position) {
                        this.latitude = position.coords.latitude;
                        this.longitude = position.coords.longitude;
                    }
                    this.getUpointCust();
                },
                (error) => {
                    this.getUpointCust();
                });
        } else {
            this.getUpointCust();
            alert('Geolocation is not supported by this browser.');
        }
    }

    getData() {
        if (this.user && this.user.data) {
            if (this.user.data.lstFunction && this.user.data.role === 'ROLE_MERCHANT') {
                this.merchantModel = {
                    name: this.user.data.nameMerchant ? this.user.data.nameMerchant : '',
                    upointCurrent: this.upointCurrent ? this.upointCurrent : 0,
                    avatarStr: this.user.data.avatarStr ? this.user.data.avatarStr : '',
                    isdn: this.user.data.userName ? this.user.data.userName : '',
                    totalReceiving: this.totalReceiving ? this.totalReceiving : 0,
                    totalGiving: this.totalGiving ? this.totalGiving : 0,
                    address: this.address ? this.address : '',
                    logo: this.logo ? this.logo : '',
                    shopId: this.shopId ? this.shopId : null,
                    shopName: this.shopName ? this.shopName : '',
                    totalFollows: this.totalFollows ? this.totalFollows : 0,
                    totalTopup: this.totalTopup ? this.totalTopup : 0,
                    ratings: this.ratings ? this.ratings : 0,
                    ratingPercentage: (this.ratings / 5) * 100
                }
            }
            if (this.user.data.lstFunction && (this.user.data.role === 'ROLE_COLLABORATORS' || this.user.data.role === 'ROLE_ASSISTANT')) {
                this.collaboratorModel = {
                    name: this.user.data.nameCtv ? this.user.data.nameCtv : '',
                    upointMerchant: this.upointMerchant ? this.upointMerchant : 0,
                    upointCollaborator: this.upointCollaborator ? this.upointCollaborator : 0,
                    isdnOwner: this.isdnOwner ? this.isdnOwner : '',
                    avatarStr: this.user.data.avatarStr ? this.user.data.avatarStr : ''
                }
            }
            if (this.user.data.lstFunction && this.user.data.role === 'END_USER') {
                this.endUserModel = {
                    name: this.user.data.fullName ? this.user.data.fullName : '',
                    uniIdNumber: this.user.data.userName ? this.user.data.userName : '',
                    availableUpoint: this.user.data.currentUpoint ? this.user.data.currentUpoint : 0,
                    expDate: this.user.data.expiredDate ? this.user.data.expiredDate : '',
                    avatarStr: this.user.data.avatarStr ? this.user.data.avatarStr : ''
                }
                if (this.hideIcon === 'true') {
                    this.endUserModel.uniIdNumber = '';
                }
            }
        }
    }

    eBackApp() {
        window.open('mocha://back', '_self');
    }

    handleRedirect(url?: string) {
        this.router.navigate([url]);
    }

    handleMerchantFunction(key, url) {
        if (key === 'FUNCTION.ACCOUNT_DELETION'){
            const modalRefError = this.modalService.open(MessagePopupComponent, {
                size: 'sm',
                backdrop: 'static',
                keyboard: false,
                centered: true
            });
            modalRefError.componentInstance.type = 'confirm';
            modalRefError.componentInstance.closeIcon = true;
            modalRefError.componentInstance.title = this.translateService.instant('SCAN.BUTTON.CONFIRM');
            modalRefError.componentInstance.message = this.translateService.instant('COMMON.MESSAGE.DELETE_ACCOUNT');
            modalRefError.componentInstance.cancel.subscribe(res => {
                this.router.navigate(['home']);
            })
            modalRefError.componentInstance.next.subscribe(res => {
                const commonInputUpointDTO = {
                    function: 'accountDeletion',
                }
            });
        } else {
            this.router.navigate([url]);
        }
    }

    // EU
    handleRedirectUnitel(row) {
        if (row !== undefined && row !== null && row.description !== undefined && row.description !== null) {
            this.AddTokenLogin(row.description);
        }
    }

    showAllCategories() {
        this.router.navigate(['end-user/category-brands']);
    }

    showAllBrands() {
        this.router.navigate(['end-user/all-brands']);
    }

    handleClickCategory(rowData) {
        this.router.navigate(['end-user/top-brands']);
    }

    handleClickTopBrand(rowData) {
        this.router.navigate(['end-user/brand-detail']);
    }

    handleClickDeal(rowData) {

    }

    AddTokenLogin(link) {
    }

    eClickFilter(type) {
        this.activeFilter = type;
        this.offsetVoucher = 0;
        const commonInputUpointDTO = {
            function: 'filterDeal',
            filterDTO: {
                filterType: this.activeFilter,
                limit: this.limitVoucher,
                offset: this.offsetVoucher,
                currentLong: this.longitude,
                currentLat: this.latitude
            }
        }
        this.filterDeal(commonInputUpointDTO, false);
        // if (this.activeFilter !== type) {
        // }
    }

    eClickMoreVoucher() {
        this.offsetVoucher = this.offsetVoucher + this.limitVoucher;
        const commonInputUpointDTO = {
            function: 'filterDeal',
            filterDTO: {
                filterType: this.activeFilter,
                limit: this.limitVoucher,
                offset: this.offsetVoucher,
                currentLong: this.longitude,
                currentLat: this.latitude
            }
        }
        this.filterDeal(commonInputUpointDTO, true);
    }

    filterDeal(commonInputUpointDTO, isUpdate) {
    }

    eSearch() {
        if (this.inputSearch !== undefined && this.inputSearch !== null && this.inputSearch !== '') {
            this.lstCategoryShow.next(this.endUserInfoModels.lstCategory.filter(value => {
                if (value.name !== undefined && value.name !== null && value.name !== '' &&
                    value.name.toUpperCase().includes(this.inputSearch.toUpperCase()) === true) {
                    return value;
                }
            }));
            this.lstTopBrandShow.next(this.endUserInfoModels.lstTopBrand.filter(value => {
                if ((value.brandName !== undefined && value.brandName !== null && value.brandName !== '' &&
                        value.brandName.toUpperCase().includes(this.inputSearch.toUpperCase()) === true)
                    || (value.serviceTypeName !== undefined && value.serviceTypeName !== null && value.serviceTypeName !== ''
                        && value.serviceTypeName.includes(this.inputSearch) === true)
                    || (value.accountTypeName !== undefined && value.accountTypeName !== null && value.accountTypeName !== ''
                        && value.accountTypeName.includes(this.inputSearch) === true)
                    || (value.merchantIsdn !== undefined && value.merchantIsdn !== null && value.merchantIsdn !== ''
                        && value.merchantIsdn.includes(this.inputSearch) === true)) {
                    return value;
                }
            }));
        } else {
            this.resetParam();
        }
    }

    resetParam() {
        // this.lstSpecialGiftShow.next(this.endUserInfoModels.lstSpecialGift);
        this.lstCategoryShow.next(this.endUserInfoModels.lstCategory);
        this.lstTopBrandShow.next(this.endUserInfoModels.lstTopBrand);
    }

    eClickMap() {
        this.router.navigate(['../end-user/shop-near-by']);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sb => sb.unsubscribe());
    }

}
