export class User {
  data?: DataUser;
  errorCode?: string;
  description?: string;
}

export class DataUser {
  lstFunction?: Array<any>;
  nameMerchant?: string;
  nameCtv?: string;
  currentUpoint?: number;
  role?: string;

  token?: string;
  userName?: string;
  password?: string;
  accountName?: string;
  introduction?: string;
  avatar?: string;
  accountType?: string;
  serviceType?: string;
  unitName?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  provinceId?: number;
  provdistrictIdinceId?: number;
  address?: string;
  userIp?: string;
  userBrowser?: string;
  paperType?: string;
  paperNo?: string;
  newPassword?: string;
  OTP?: string;
  expiredDate?: any;
  avatarStr?: any;
  merchantId?: number;
  staffId?: number;
  ip?: string;
}

export class UserDTO {
  userId?: number;
  userName?: string;
  password?: string;
  accountName?: string;
  introduction?: string;
  avatar?: string;
  avatarStr?: string;
  status?: number;
  lastLoginDate?: string;
  lastLogoutDate?: string;
  createDatetime?: string;
  createBy?: string;
  updateDatetime?: string;
  updateBy?: string;

  accountType?: string;
  serviceType?: string;
  unitName?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  userIp?: string;
  address?: string;
  userBrowser?: string;
  provinceId?: number;
  districtId?: number;
  gender?: number;
  birthday?: string;
  paperType?: string;
  paperNo?: string;
  newPassword?: string;
  otp?: string;
  cardCode?: string;
  typeTrans?: number;
  month?: string;
  cardSerial?: string;
  cardValue?: number;
  statusCard?: number;
  categoryId?: number;
  categoryCode?: string;
  isScanCode?: boolean;
  bankName?: string;
  bankCustName?: string;
  bankAccountNum?: string;
}
