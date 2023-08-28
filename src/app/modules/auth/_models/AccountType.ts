export class AccountType {
  data?: ListAccountType[];
  errorCode?: string;
  description?: string;
}

export class ListAccountType{
  name?: string;
  value?: string;
  logo?: string;
  strLogo?: string;
  description?: string;
  categoryId?: number;
  categoryName?: string;
  createBy?: string;
  createDatetime?: string;
  status?: number;
  categoryCode?: string;
}

export class ListAccountTypeGrid{
  name?: string;
  value?: string;
  logo?: string;
  strLogo?: string;
  description?: string;
}
