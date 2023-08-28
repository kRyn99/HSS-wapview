import { environment } from '@env/environment';

export class UrlConstants {

	// SIGN_UP
	public static SIGN_UP_CHECK_ACCOUNT = `${environment.API_HOST_NAME}/api/v1/sign-up/check-signUp-condition`;
	public static SIGN_UP_GET_OTP = `${environment.API_HOST_NAME}/api/v1/sign-up/otp-signUp`;
	public static SIGN_UP_GET_CONFIRM = `${environment.API_HOST_NAME}/api/v1/sign-up/confirm-signUp`;
	public static SIGN_UP_ACTIVE_ACCOUNT = `${environment.API_HOST_NAME}/api/v1/sign-up/active-signUp`;
	// TRANSFER_TO_NON_UMONEY
	public static TRANSFER_TO_NON_UMONEY_INFO = `${environment.API_HOST_NAME}/api/v1/commons/transaction-recent/non-u-money`;
	public static TRANSFER_TO_NON_UMONEY_CHECK_ACCOUNT = `${environment.API_HOST_NAME}/api/v1/transfer-to-non-umoney/check`;
	public static TRANSFER_TO_NON_UMONEY_CONFIRM = `${environment.API_HOST_NAME}/api/v1/transfer-to-non-umoney/confirm`;
	// TRANSFER_TO_UMONEY
	public static TRANSFER_TO_UMONEY_INFO = `${environment.API_HOST_NAME}/api/v1/commons/transaction-recent/u-money`;
	public static TRANSFER_TO_UMONEY_CHECK_ACCOUNT = `${environment.API_HOST_NAME}/api/v1/transfer-to-umoney/check`;
	public static TRANSFER_TO_UMONEY_CONFIRM_TRANSACTION = `${environment.API_HOST_NAME}/api/v1/transfer-to-umoney/confirm`;
	// TRANSFER_TO_BANK
	public static LIST_BANK = `${environment.API_HOST_NAME}/api/v1/transfer-to-bank/list-bank`;
	public static TRANSFER_TO_BANK_INFO = `${environment.API_HOST_NAME}/api/v1/commons/transaction-recent/bank`;
	public static TRANSFER_TO_BANK_CHECK_ACCOUNT = `${environment.API_HOST_NAME}/api/v1/transfer-to-bank/check-account`;
	public static TRANSFER_TO_BANK_CONFIRM = `${environment.API_HOST_NAME}/api/v1/transfer-to-bank/confirm-bank`;
	public static TRANSFER_TO_BANK_CHECK_ACCOUNT_NO_AMOUNT = `${environment.API_HOST_NAME}/api/v1/transfer-to-bank/check-account/no_fee`;
	// COMMONS
	public static COMMON_CHECK_PIN = `${environment.API_HOST_NAME}/api/v1/commons/get-otp`;
	public static COMMON_RESEND_OTP = `${environment.API_HOST_NAME}/api/v1/commons/get-otp`;
	public static CHECK_ACCOUNT_UMONEY_MOCHA = `${environment.API_HOST_NAME}/api/v1/commons/sendRequest`;

	// TOP-UP
	public static TOPUP_CHECK = `${environment.API_HOST_NAME}/api/v1/top-up/check-topup`;
	public static TOPUP_CONFIRM = `${environment.API_HOST_NAME}/api/v1/top-up/confirm-topup`;
	public static TOPUP_LIST_RECENT = `${environment.API_HOST_NAME}/api/v1/top-up/topup-recent`;

	// Internet bill
	public static INTERNET_BILL_CONFIRM = `${environment.API_HOST_NAME}/api/v1/internet/confirm-internet`;
	public static CHECK_INTERNET_ACCOUNT = `${environment.API_HOST_NAME}/api/v1/internet/check-internet`;


	// Buy data
	public static LIST_DATA_PACKAGES = `${environment.API_HOST_NAME}/api/v1/buy-data/listPackages`;
	public static PACKAGE_DETAIL = `${environment.API_HOST_NAME}/api/v1/buy-data/packageDetail`;
	public static CONFIRM_BUYDATA = `${environment.API_HOST_NAME}/api/v1/buy-data/confirm`;
	// Water bill

	public static LIST_SUPPLIER_WATER = `${environment.API_HOST_NAME}/api/v1/water-bill/listProviders`;
	public static GET_ALL_RECENT_WATER_BILL = `${environment.API_HOST_NAME}/api/v1/water-bill/listRecent`;
	public static CHECK_WATER_BILL_ACCOUNT = `${environment.API_HOST_NAME}/api/v1/water-bill/check`;
	public static WATER_CONFIRM = `${environment.API_HOST_NAME}/api/v1/water-bill/confirm`;

	// electric
	public static LIST_EDL_BRANCH = `${environment.API_HOST_NAME}/api/v1/electric-bill/listBranches`;
	public static CHECK_EDL = `${environment.API_HOST_NAME}/api/v1/electric-bill/check-electric-info`;
	public static CHECK_EDL_POLICY = `${environment.API_HOST_NAME}/api/v1/electric-bill/check-electric-policy`;
	public static EDL_CONFIRM = `${environment.API_HOST_NAME}/api/v1/electric-bill/confirm-electric-transaction`;
	public static EDL_RECENT = `${environment.API_HOST_NAME}/api/v1/electric-bill/electric-recent`;

	// Car Ínsurance new
	public static LIST_TYPE = `${environment.API_HOST_NAME}/api/v1/lvi/vehicle-list`;
	public static LIST_PACKAGE = `${environment.API_HOST_NAME}/api/v1/lvi/packages`;
	public static INSURANCE_PACKAGE_DETAIL = `${environment.API_HOST_NAME}/api/v1/lvi/package-detail`;
	public static UPLOAD_IMG = `${environment.API_HOST_NAME}/api/v1/lvi/upload-file`;
	public static CAR_INSURANCE_NEW_CHECK = `${environment.API_HOST_NAME}/api/v1/lvi/check-vehicle`;
	public static CAR_INSURANCE_NEW_CONFIRM = `${environment.API_HOST_NAME}/api/v1/lvi/confirm-vehicle`;
	public static DELIVERY_LIST = `${environment.API_HOST_NAME}/api/v1/lvi/delivery-list`;

	// ACCIDENT
	public static ACCIDENT_INSURANCE_CHECK = `${environment.API_HOST_NAME}/api/v1/lvi/check-accident`;
	public static ACCIDENT_INSURANCE_CONFIRM = `${environment.API_HOST_NAME}/api/v1/lvi/confirm-accident`;


	// SOKXAY LOTTERY
	public static SOKXAY_HISTORY = `${environment.API_HOST_NAME}/api/v1/sokxay/list-recent-sokxay`;
	public static SOKXAY_CHECK_POLICY = `${environment.API_HOST_NAME}/api/v1/sokxay/check-policy`;
	public static SOKXAY_CONFIRM_TRANSACTION = `${environment.API_HOST_NAME}/api/v1/sokxay/confirm-sokxay`;

	// TEST_NEW

	// AUTHOR
	public static LOGIN_URL = `${environment.API_HOST_NAME}/v1/login`;
	public static LOGOUT_URL = `${environment.API_HOST_NAME}/v1/logout`;
	public static SEND_TOKEN = `${environment.API_HOST_NAME}/api/v1/commons/check-account-ewallet`;
	public static BASE_URL = `${environment.API_HOST_NAME}`;
	public static MOCHA_CHECH_FONE = `${environment.API_HOST_NAME}/api/v1/commons/mocha/checkPhonenumber`;
}
